<?php
namespace App\Controller;

use App\Entity\Member;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\ConstraintViolationList;

Class MemberController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/members/new",
     *    name = "members_create"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("member", converter="fos_rest.request_body")
     */
    public function new(Member $member, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            return $this->view($violations, Response::HTTP_BAD_REQUEST);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($member);
        $em->flush();

        return $this->view(
            $member,
            Response::HTTP_CREATED,
            ['Location' =>$this->generateUrl(
                'members_id',
                ['id' => $member->getId(),
                UrlGeneratorInterface::ABSOLUTE_URL])
            ]
        );
    }
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
     * @Rest\Get(
     *    path = "/members/view/{id}",
     *    name = "members_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId(Member $member)
    {
        return $member;
    }
}