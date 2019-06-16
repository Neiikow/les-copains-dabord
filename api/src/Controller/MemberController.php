<?php
namespace App\Controller;

use App\Entity\Member;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use FOS\RestBundle\Controller\Annotations\View;

Class MemberController extends Controller
{
    /**
     * @Route("/members", name="members_show")
     * @View
     */
    public function showAll()
    {
        $members = $this->getDoctrine()->getRepository('App:Member')->findAll();
        
        return $members;
    }
    /**
     * @Route("/members/new", name="member_create")
     * @Method({"POST"})
     * @View(
     *  statusCode = 201
     * )
     * @ParamConverter("member", converter="fos_rest.request_body")
     */
    public function new(Member $member)
    {
        $em = $this->getDoctrine()->getManager();
        $em->persist($member);
        $em->flush();

        return $member;
    }
}