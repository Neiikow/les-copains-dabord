<?php
namespace App\Controller;

use App\Entity\Member;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

Class AuthController extends FOSRestController
{
    /**
     * @Rest\Get(
     *    path = "/auth",
     *    name = "auth"
     * )
     * @Rest\View
     */
    public function auth(Member $member)
    {
        $datas = $this->getDoctrine()->getRepository('App:Member')->findBy(
            array(
                'name' => $member->getName(),
                'password' => $member->getPassword()
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