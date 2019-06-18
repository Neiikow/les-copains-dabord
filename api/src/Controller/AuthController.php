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

Class AuthController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/users/login",
     *    name = "users_login"
     * )
     * @Rest\View
     */
    public function login()
    {
        return $this->json(['login' => true]);
    }
}