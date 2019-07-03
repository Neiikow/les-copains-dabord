<?php
namespace App\Controller;

use App\Entity\Article;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use App\Exception\ResourceValidationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

Class ArticleController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/api/articles/new",
     *    name = "articles_create"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("article", converter="fos_rest.request_body")
     */
    public function new(Article $article, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }

            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($article);
        $em->flush();

        return $this->view(
            $article,
            Response::HTTP_CREATED,
            ['Location' =>$this->generateUrl(
                'articles_id',
                ['id' => $article->getId()])
            ]
        );
    }
    /**
     * @Rest\Post(
     *    path = "/api/articles/edit/{id}",
     *    name = "articles_edit",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     * @ParamConverter("article", converter="fos_rest.request_body")
     */
    public function edit($id, Article $article, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }

            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $data = $em->getRepository(Article::class)->find($id);        
        $type = $article->getType();

        $data->setTitle($article->getTitle());
        $data->setContent($article->getContent());
        $data->setStatus($article->getStatus());
        if ($type === 'ground') {
            $data->setPicture($article->getPicture());
            $data->setLocationX($article->getLocationX());
            $data->setLocationY($article->getLocationY());
        }
        if ($type === 'plugin') {
            $data->setPicture($article->getPicture());
            $data->setLink($article->getLink());
            $data->setVersion($article->getVersion());
        }

        $em->flush();

        return $data;
    }
    /**
     * @Rest\Delete(
     *    path = "/api/articles/delete/{id}",
     *    name = "articles_delete",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function delete($id)
    {
        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository(Article::class)->find($id);

        if (!$article) {
            throw $this->createNotFoundException(
                'Aucun article correspondant à l\'id : '.$id
            );
        }

        $em->remove($article);
        $em->flush();

        return $article;
    }
    /**
     * @Rest\Get(
     *    path = "/api/articles/{type}",
     *    name = "articles_type",
     *    requirements = {"type"="[a-z,A-Z]+"}
     * )
     * @Rest\View
     */
    public function showType($type)
    {
        $articles = $this->getDoctrine()->getRepository('App:Article')->findBy(
            array('type' => $type)
        );
        
        return $articles;
    }
    /**
     * @Rest\Get(
     *    path = "/api/articles/view/{id}",
     *    name = "articles_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId(Article $article)
    {
        if (!$article) {
            throw $this->createNotFoundException(
                'Aucun article correspondant'
            );
        }
        return $article;
    }
    /**
     * @Rest\Get(
     *    path = "/api/articles",
     *    name = "articles_list",
     * )
     * @Rest\View
     */
    public function showAll()
    {
        $articles = $this->getDoctrine()->getRepository('App:Article')->findAll();

        return $articles;
    }
}