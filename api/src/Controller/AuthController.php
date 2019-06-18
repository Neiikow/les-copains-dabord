<?php
namespace App\Controller;

use App\Entity\User;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

Class AuthController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/login",
     *    name = "login"
     * )
     * @Rest\View
     */
    public function login(User $user)
    {
        $datas = $this->getDoctrine()->getRepository('App:User')->findBy(
            array(
                'username' => $user->getUsername(),
                'password' => $user->getPassword()
            )
        );
        if (!$datas) {
            $response = new Response();
            $response->headers->set('Content-Type', 'application/json');

            return $response;
        }
        $data = $this->get('jms_serializer')->serialize($datas, 'json');
        
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}