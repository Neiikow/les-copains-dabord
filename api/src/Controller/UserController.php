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

Class UserController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/users/register",
     *    name = "users_register"
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
                $user,
                Response::HTTP_CREATED,
                ['Location' =>$this->generateUrl(
                    'members_id',
                    ['id' => $user->getId(),
                    UrlGeneratorInterface::ABSOLUTE_URL])
                ]
            );
        }
        catch(UniqueConstraintViolationException $e)
        {
            $errors['code'] = 400;
            $errors['message'] = "Pseudo ou email déjà utilisé...";
            return $this->json([
                'errors' => $errors
            ], 400);
        }
    }
    /**
     * @Rest\Get(
     *    path = "/users",
     *    name = "users_show"
     * )
     * @Rest\View
     */
    public function showAll()
    {
        $user = $this->getDoctrine()->getRepository('App:User')->findAll();
        
        return $user;
    }
    /**
     * @Rest\Get(
     *    path = "/users/view/{id}",
     *    name = "users_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId(User $user)
    {
        return $user;
    }
}