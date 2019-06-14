<?php
namespace App\Controller;

use App\Entity\Member;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

Class MemberController extends Controller
{
    /**
     * @Route("/members", name="members_show")
     */
    public function showAll()
    {
        $members = $this->getDoctrine()->getRepository('App:Member')->findAll();

        $data = $this->get('jms_serializer')->serialize($members, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:4200');
        
        return $response;
    }
}