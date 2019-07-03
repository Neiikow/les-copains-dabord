<?php
namespace App\Controller;

use App\Entity\User;
use App\Entity\Event;
use App\Entity\EventSubscriber;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use App\Exception\ResourceValidationException;

Class EventSubscriberController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/api/events/subscribe",
     *    name = "events_subscribe"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("eventSub", converter="fos_rest.request_body")
     */
    public function subscribe(EventSubscriber $eventSub, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }
        $eventId = $eventSub->getEventId();
        $userId = $eventSub->getUserId();

        $event = $this->getDoctrine()->getRepository(Event::class)->find($eventId);
        if (!$event) {
            throw $this->createNotFoundException(
                'Aucun event correspondant à l\'id : '.$eventId
            );
        }

        $user = $this->getDoctrine()->getRepository(User::class)->find($userId);
        if (!$user) {
            throw $this->createNotFoundException(
                'Aucun utilisateur correspondant à l\'id : '.$userId
            );
        }
        
        $events = $this->getDoctrine()->getRepository('App:EventSubscriber')->findBy(
            array('eventId' => $eventId)
        );
        for ($i=0; $i < count($events); $i++) { 
            $subscriberId = $events[$i]->getUserId();
            if ($subscriberId === $userId) {
                return 'Utilisateur déjà enregistré pour cet event';
            }
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($eventSub);
        $em->flush();

        return $this->view(
            $eventSub,
            Response::HTTP_CREATED,
            ['Location' =>$this->generateUrl(
                'events_subscriber_id',
                ['id' => $eventSub->getId()])
            ]
        );
    }
    /**
     * @Rest\Post(
     *    path = "/api/events/unsubscribe",
     *    name = "events_unsubscribe",
     * )
     * @Rest\View
     * @ParamConverter("eventSubscriber", converter="fos_rest.request_body")
     */
    public function unsubscribe(EventSubscriber $eventSub, ConstraintViolationList $violations)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->find($id);

        if (!$user) {
            throw $this->createNotFoundException(
                'Aucun utilisateur correspondant à l\'id : '.$id
            );
        }

        $em->remove($user);
        $em->flush();

        return $user;
    }
    /**
     * @Rest\Get(
     *    path = "/api/events/subscribers/{id}",
     *    name = "events_subscribers",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showSubscribers($id)
    {
        $subscribers = [];
        $events = $this->getDoctrine()->getRepository('App:EventSubscriber')->findBy(
            array('eventId' => $id)
        );
        for ($i=0; $i < count($events); $i++) { 
            $userId = $events[$i]->getUserId();
            $user = $this->getDoctrine()->getRepository(User::class)->find($userId);
            $subscriber = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'picture' => $user->getPicture(),
                'subscription' => $events[$i]->getId(),
             ];
            array_push($subscribers, $subscriber);
        }
        if (!$subscribers) {
            return 'Aucun utilisateur abonné à cet event';
        }
        return $subscribers;
    }
    /**
     * @Rest\Get(
     *    path = "/api/events/subscriber/{id}",
     *    name = "events_subscriber_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showSubscriberId(EventSubscriber $eventSub)
    {
        if (!$eventSub) {
            throw $this->createNotFoundException(
                'Aucun enregistrement correspondant'
            );
        }
        return $eventSub;
    }
}