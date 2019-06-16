<?php
namespace App\Controller;

use App\Entity\Member;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

Class AuthController extends Controller
{
    /**
     * @Route("/auth", name="auth")
     * @Method({"POST"})
     */
    public function auth(Request $request)
    {
        $dataClient = $request->getContent();
        $memberObj = $this->get('jms_serializer')->deserialize($dataClient, Member::class, 'json');
        $member = $this->getDoctrine()->getRepository('App:Member')->findBy(
            array(
                'name' => $memberObj->getName(),
                'password' => $memberObj->getPassword()
            )
        );
        if (!$member) {
            $response = new Response();
            $response->headers->set('Content-Type', 'application/json');

            return $response;
        }
        $data = $this->get('jms_serializer')->serialize($member, 'json');
        
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}