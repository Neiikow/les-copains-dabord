<?php
namespace App\Controller;

use App\Entity\User;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;
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
            return $this->json($errors, 400);
        }
    }
    /**
     * @Rest\Post(
     *    path = "/api/users/edit/{id}",
     *    name = "users_edit",
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
        $data->setUsername($user->getUsername());
        $data->setEmail($user->getEmail());

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
        
        try
        {
            $em->flush();
            return $this->view(
                'Profil de '.$data->getUsername().' édité !',
                Response::HTTP_CREATED,
                ['Location' =>$this->generateUrl(
                    'users_id',
                    ['id' => $data->getId()])
                ]
            );
        }
        catch(UniqueConstraintViolationException $e)
        {
            $errors['message'] = "Pseudo ou adresse Email déjà utilisés !";
            return $this->json($errors, 400);
        }
    }
    /**
     * @Rest\Get(
     *    path = "/api/users",
     *    name = "users_show"
     * )
     * @Rest\View
     */
    public function showAll()
    {
        $queryBuilder = $this->getDoctrine()->getManager()->createQueryBuilder()
            ->select('u.username, u.email, u.roles, u.discord, u.picture')
            ->from('App:User', 'u');
        $query = $queryBuilder->getQuery();
        $results = $query->getResult();

        return $results;
    }
    /**
     * @Rest\Get(
     *    path = "/api/users/view/{id}",
     *    name = "users_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId(User $user)
    {
        $user = [
           'username' => $user->getUsername(),
           'email' => $user->getEmail(),
           'roles' => $user->getRoles(),
           'discord' => $user->getDiscord(),
           'picture' => $user->getPicture(),
        ];

        return $user;
    }
}