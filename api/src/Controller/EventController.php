<?php
namespace App\Controller;

use App\Entity\Event;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

Class EventController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/events/new",
     *    name = "events_create"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("event", converter="fos_rest.request_body")
     */
    public function new(Event $event)
    {
        $em = $this->getDoctrine()->getManager();
        $em->persist($event);
        $em->flush();

        return $event;
    }
    /**
     * @Rest\Post(
     *    path = "/events/edit/{id}",
     *    name = "events_edit",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     * @ParamConverter("event", converter="fos_rest.request_body")
     */
    public function edit($id, Event $event)
    {
        $em = $this->getDoctrine()->getManager();
        $event = $em->getRepository(Event::class)->find($id);        

        $event->setTitle($parsed_json->{'title'});
        $event->setContent($parsed_json->{'content'});
        $event->setSupport($parsed_json->{'support'});
        $event->setStatus($parsed_json->{'status'});
        $event->setDate($parsed_json->{'date'});
        $event->setTime($parsed_json->{'time'});
        $em->flush();

        return $event;
    }
    /**
     * @Rest\Delete(
     *    path = "/events/delete/{id}",
     *    name = "events_delete",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function delete($id)
    {
        $em = $this->getDoctrine()->getManager();
        $event = $em->getRepository(Event::class)->find($id);

        if (!$event) {
            throw $this->createNotFoundException(
                'Aucun event correspondant à l\'id : '.$id
            );
        }

        $em->remove($event);
        $em->flush();

        return $event;
    }
    /**
     * @Rest\Get(
     *    path = "/events/{status}",
     *    name = "events_status",
     *    requirements = {"status"="[a-z,A-Z]+"}
     * )
     * @Rest\View
     */
    public function showStatus($status)
    {
        $events = $this->getDoctrine()->getRepository('App:Event')->findBy(
            array('status' => $status)
        );

        return $events;
    }
    /**
     * @Rest\Get(
     *    path = "/events/view/{id}",
     *    name = "events_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId(Event $event)
    {
        return $event;
    }
}