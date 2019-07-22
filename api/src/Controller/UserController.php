<?php
namespace App\Controller;

use App\Entity\User;
use App\Method\Pagination;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use App\Exception\ResourceValidationException;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityRepository;

Class UserController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/api/register",
     *    name = "register"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("user", converter="fos_rest.request_body")
     */
    public function register(UserPasswordEncoderInterface $passwordEncoder, User $user, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            foreach ($violations as $violation) {
                $message = sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }
        $encodedPassword = $passwordEncoder->encodePassword(
            $user,
            $user->getPassword()
        );
        $user->setPassword($encodedPassword);

        try
        {
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            return $this->view(
                'Bienvenue '.$user->getUsername().' !',
                Response::HTTP_CREATED,
                ['Location' =>$this->generateUrl(
                    'users_id',
                    ['id' => $user->getId()])
                ]
            );
        }
        catch(UniqueConstraintViolationException $e)
        {
            $errors['message'] = "Pseudo ou adresse Email déjà utilisés !";
            return $this->json($errors, 404);
        }
    }
    /**
     * @Rest\Post(
     *    path = "/api/edit/{id}",
     *    name = "edit",
     *    requirements = {"id"="\d+"}
     * )
     * @ParamConverter("user", converter="fos_rest.request_body")
     */
    public function edit(UserPasswordEncoderInterface $passwordEncoder, User $user, $id, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            foreach ($violations as $violation) {
                $message = sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }
        $em = $this->getDoctrine()->getManager();
        $data = $em->getRepository(User::class)->find($id);

        $data->setEmail($user->getEmail());
        $data->setRoles($user->getRoles());

        if ($user->getPassword()) {
            $encodedPassword = $passwordEncoder->encodePassword(
                $user,
                $user->getPassword()
            );
            $data->setPassword($encodedPassword);
        } else {
            $user->setPassword($data->getPassword());
        }
        if ($user->getDiscord()) {
            $data->setDiscord($user->getDiscord());
        }
        if ($user->getPicture()) {
            $data->setPicture($user->getPicture());
        }
        $jwtManager = $this->container->get('lexik_jwt_authentication.jwt_manager');
        $token = $jwtManager->create($data);

        try {
            $em->flush();
            $msg = [
                'content' => 'Profil de '.$data->getUsername().' édité !',
                'token' => $token
            ];
            return $this->json(
                $msg,
                Response::HTTP_CREATED,
                ['Location' =>$this->generateUrl(
                    'users_id',
                    ['id' => $data->getId()])
                ]
            );
        }
        catch(UniqueConstraintViolationException $e) {
            $errors['message'] = "Pseudo ou adresse Email déjà utilisés !";
            return $this->json($errors, 400);
        }
    }
    /**
     * @Rest\Delete(
     *    path = "/api/users/delete/{id}",
     *    name = "users_delete",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function delete($id)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->find($id);

        if (!$user) {
            $errors['message'] = 'Aucun utilisateur correspondant à l\'id : '.$id;
            return $this->json($errors, 404);
        }

        $em->remove($user);
        $em->flush();

        return $user;
    }
    /**
     * @Rest\Post(
     *    path = "/api/users",
     *    name = "users_show"
     * )
     * @Rest\View
     */
    public function showAll(Pagination $pagin, Request $request)
    {
        $content = json_decode($request->getContent());
        $users = $this->getDoctrine()->getRepository('App:User')->findAll();
        
        $options = $pagin->getPager(
            count($users),
            $content->currentPage,
            $content->pageSize
        );

        $queryBuilder = $this->getDoctrine()->getManager()->createQueryBuilder()
            ->select('u.id, u.username, u.email, u.roles, u.discord, u.picture, u.createDate')
            ->from('App:User', 'u')
            ->setFirstResult($options['startIndex'])
            ->setMaxResults($options['pageSize']);
        $query = $queryBuilder->getQuery();
        $users = $query->getResult();
        
        return [
            'options' => $options,
            'users' => $users,
        ];
    }
    /**
     * @Rest\Get(
     *    path = "/api/users/view/{id}",
     *    name = "users_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId($id)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->find($id);

        if ($user) {
            $data = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
                'discord' => $user->getDiscord(),
                'picture' => $user->getPicture(),
                'createDate' => $user->getCreateDate(),
            ];
    
            return $data;
        } else {
            $errors['message'] = 'Aucun utilisateur correspondant à l\'id : '.$id;
            return $this->json($errors, 404);
        }
    }
    /**
     * @Rest\Post(
     *    path = "/api/users/match",
     *    name = "match_password",
     * )
     * @Rest\View
     * @ParamConverter("user", converter="fos_rest.request_body")
     */
    public function passwordMatch(UserPasswordEncoderInterface $passwordEncoder, User $user)
    {
        $id = $user->getId();
        $em = $this->getDoctrine()->getManager();
        $userMatch = $em->getRepository(User::class)->find($id);

        if (!$userMatch) {
            $errors['message'] = 'Aucun utilisateur correspondant à l\'id : '.$id;
            return $this->json($errors, 404);
        }

        $encodedPassword = $passwordEncoder->encodePassword(
            $userMatch,
            $user->getPassword()
        );
        if ($encodedPassword !== $userMatch->getPassword()) {
            $errors['message'] = "Ancien mot de passe incorrect";
            return $this->json($errors, 404);
        } else {
            return true;
        }
    }
}