<?php
namespace App\Controller;

use App\Entity\Article;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Psr\Log\LoggerInterface;

Class ArticleController extends Controller
{
    /**
     * @Route("/articles/new", name="article_create")
     * @Method({"POST"})
     */
    public function new(Request $request)
    {
        $data = $request->getContent();
        $article = $this->get('jms_serializer')->deserialize($data, Article::class, 'json');

        $em = $this->getDoctrine()->getManager();
        $em->persist($article);
        $em->flush();
        
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
    /**
     * @Route("/articles/edit/{id}", name="article_edit", requirements = {"id"="\d+"})
     * @Method({"POST"})
     */
    public function edit($id, Request $request)
    {
        $parsed_json = json_decode($request->getContent());

        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository(Article::class)->find($id);        
        $type = $article->getType();

        $article->setTitle($parsed_json->{'title'});
        $article->setContent($parsed_json->{'content'});
        $article->setStatus($parsed_json->{'status'});
        if ($type === 'ground') {
            $article->setPicture($parsed_json->{'picture'});
            $article->setLocationX($parsed_json->{'location_x'});
            $article->setLocationY($parsed_json->{'location_y'});
        }
        if ($type === 'plugin') {
            $article->setPicture($parsed_json->{'picture'});
            $article->setLink($parsed_json->{'link'});
            $article->setVersion($parsed_json->{'version'});
        }
        $em->flush();

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
    /**
     * @Route("/articles/delete/{id}", name="article_delete", requirements = {"id"="\d+"})
     * @Method({"DELETE"})
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
        
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
    /**
     * @Route("/articles/{type}", name="articles_type", requirements = {"type"="[a-z,A-Z]+"})
     */
    public function showType($type)
    {
        $articles = $this->getDoctrine()->getRepository('App:Article')->findBy(
            array('type' => $type)
        );

        $data = $this->get('jms_serializer')->serialize($articles, 'json');
        
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }
    /**
     * @Route("/articles/view/{id}", name="article_id", requirements = {"id"="\d+"})
     */
    public function showId(Article $article)
    {
        $data = $this->get('jms_serializer')->serialize($article, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}