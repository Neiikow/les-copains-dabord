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
        
        return $response;
    }
    /**
     * @Route("/members/new", name="member_create")
     * @Method({"POST"})
     */
    public function new(Request $request)
    {
        $data = $request->getContent();
        $member = $this->get('jms_serializer')->deserialize($data, Member::class, 'json');
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($member);
        $em->flush();

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}