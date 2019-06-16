<?php
namespace App\Controller;

use App\Entity\Event;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use FOS\RestBundle\Controller\Annotations\View;
use Psr\Log\LoggerInterface;

Class EventController extends Controller
{
    /**
     * @Route("/events/new", name="event_create")
     * @Method({"POST"})
     * @View(
     *  statusCode = 201
     * )
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
     * @Route("/events/edit/{id}", name="event_edit", requirements = {"id"="\d+"})
     * @Method({"POST"})
     * @View
     */
    public function edit($id, Request $request)
    {
        $parsed_json = json_decode($request->getContent());

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
     * @Route("/events/delete/{id}", name="event_delete", requirements = {"id"="\d+"})
     * @Method({"DELETE"})
     * @View
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
     * @Route("/events/{status}", name="events_status", requirements = {"status"="[a-z,A-Z]+"})
     * @View
     */
    public function showStatus($status)
    {
        $events = $this->getDoctrine()->getRepository('App:Event')->findBy(
            array('status' => $status)
        );

        return $events;
    }
    /**
     * @Route("/events/view/{id}", name="event_view", requirements = {"id"="\d+"})
     * @View
     */
    public function showId(Event $event)
    {
        return $event;
    }
}