<?php
namespace App\Controller;

use App\Entity\Event;
use App\Method\Pagination;
use App\Method\Archive;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use App\Exception\ResourceValidationException;

Class EventController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/api/events/new",
     *    name = "events_create"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("event", converter="fos_rest.request_body")
     */
    public function new(Event $event, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }

            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($event);
        $em->flush();

        return $this->view(
            $event,
            Response::HTTP_CREATED,
            ['Location' =>$this->generateUrl(
                'events_id',
                ['id' => $event->getId(),
                UrlGeneratorInterface::ABSOLUTE_URL])
            ]
        );
    }
    /**
     * @Rest\Post(
     *    path = "/api/events/edit/{id}",
     *    name = "events_edit",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     * @ParamConverter("event", converter="fos_rest.request_body")
     */
    public function edit($id, Event $event, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }

            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $data = $em->getRepository(Event::class)->find($id);        

        $data->setTitle($event->getTitle());
        $data->setContent($event->getContent());
        $data->setSupport($event->getSupport());
        $data->setStatus($event->getStatus());
        $data->setDate($event->getDate());
        $data->setTime($event->getTime());

        $em->flush();

        return $data;
    }
    /**
     * @Rest\Delete(
     *    path = "/api/events/delete/{id}",
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
     * @Rest\Post(
     *    path = "/api/events/show/{status}",
     *    name = "events_status",
     *    requirements = {"status"="[a-z,A-Z]+"}
     * )
     * @Rest\View
     */
    public function showStatus(Archive $archive, $status, Pagination $pagin, Request $request)
    {
        $content = json_decode($request->getContent());
        $events = $this->getDoctrine()->getRepository('App:Event')->findBy(
            array('status' => $status)
        );
        if (!$events) {
            return 'Aucune donnée disponible';
        }

        $em = $this->getDoctrine()->getManager();
        foreach ($events as $event) {
            if ($event->getStatus() === 'active') {
                $date = $event->getDate() . $event->getTime();
                $isExpired = $archive->byExpiredDate($date);
                if ($isExpired) {
                    $event->setStatus('archive');
                    $em->flush();
                }
            }
        }

        $options = $pagin->getPager(
            count($events),
            $content->currentPage,
            $content->pageSize
        );

        $queryBuilder = $this->getDoctrine()->getManager()->createQueryBuilder()
            ->select('e')
            ->from('App:Event', 'e')
            ->where('e.status = :status')->setParameter('status', $status)
            ->setFirstResult($options['startIndex'])
            ->setMaxResults($options['pageSize']);
        $query = $queryBuilder->getQuery();
        $events = $query->getResult();
        return [
            'options' => $options,
            'events' => $events,
        ];
    }
    /**
     * @Rest\Get(
     *    path = "/api/events/view/{id}",
     *    name = "events_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId(Archive $archive, Event $event)
    {
        if ($event->getStatus() === 'active') {
            $em = $this->getDoctrine()->getManager();
            $date = $event->getDate() . $event->getTime();
            $isExpired = $archive->byExpiredDate($date);

            if ($isExpired) {
                $event->setStatus('archive');
                $em->flush();
            }
        }

        return $event;
    }
    /**
     * @Rest\Post(
     *    path = "/api/events",
     *    name = "events_list",
     * )
     * @Rest\View
     */
    public function showAll(Pagination $pagin, Archive $archive, Request $request)
    {
        $content = json_decode($request->getContent());
        $events = $this->getDoctrine()->getRepository('App:Event')->findAll();
        
        $em = $this->getDoctrine()->getManager();
        foreach ($events as $event) {
            if ($event->getStatus() === 'active') {
                $date = $event->getDate() . $event->getTime();
                $isExpired = $archive->byExpiredDate($date);
                if ($isExpired) {
                    $event->setStatus('archive');
                    $em->flush();
                }
            }
        }

        $options = $pagin->getPager(
            count($events),
            $content->currentPage,
            $content->pageSize
        );

        $queryBuilder = $this->getDoctrine()->getManager()->createQueryBuilder()
            ->select('a')
            ->from('App:Event', 'a')
            ->setFirstResult($options['startIndex'])
            ->setMaxResults($options['pageSize']);
        $query = $queryBuilder->getQuery();
        $events = $query->getResult();

        return [
            'options' => $options,
            'events' => $events,
        ];
    }
}