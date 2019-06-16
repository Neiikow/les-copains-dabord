<?php
namespace App\Controller;

use App\Entity\Event;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Psr\Log\LoggerInterface;

Class EventController extends Controller
{
    /**
     * @Route("/events/new", name="event_create")
     * @Method({"POST"})
     */
    public function new(Request $request)
    {
        $data = $request->getContent();
        $event = $this->get('jms_serializer')->deserialize($data, Event::class, 'json');

        $em = $this->getDoctrine()->getManager();
        $em->persist($event);
        $em->flush();
        
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
    /**
     * @Route("/events/edit/{id}", name="event_edit", requirements = {"id"="\d+"})
     * @Method({"POST"})
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

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
    /**
     * @Route("/events/delete/{id}", name="event_delete", requirements = {"id"="\d+"})
     * @Method({"DELETE"})
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
        
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
    /**
     * @Route("/events/{status}", name="events_status", requirements = {"status"="[a-z,A-Z]+"})
     */
    public function showStatus($status)
    {
        $events = $this->getDoctrine()->getRepository('App:Event')->findBy(
            array('status' => $status)
        );

        $data = $this->get('jms_serializer')->serialize($events, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }
    /**
     * @Route("/events/view/{id}", name="event_view", requirements = {"id"="\d+"})
     */
    public function showId(Event $event)
    {
        $data = $this->get('jms_serializer')->serialize($event, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}