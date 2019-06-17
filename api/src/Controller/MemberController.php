<?php
namespace App\Controller;

use App\Entity\Member;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

Class MemberController extends FOSRestController
{
    /**
     * @Rest\Get(
     *    path = "/members",
     *    name = "members_show"
     * )
     * @Rest\View
     */
    public function showAll()
    {
        $members = $this->getDoctrine()->getRepository('App:Member')->findAll();
        
        return $members;
    }
    /**
     * @Rest\Post(
     *    path = "/members/new",
     *    name = "members_create"
     * )
     * @Rest\View(StatusCode = 201)
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