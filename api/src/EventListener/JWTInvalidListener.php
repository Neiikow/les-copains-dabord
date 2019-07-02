<?php
namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler;

class JWTInvalidListener extends AuthenticationSuccessHandler
{
    /**
 * @param JWTNotFoundEvent $event
 */
public function onJWTNotFound(JWTNotFoundEvent $event)
{
    $msg = 'Token invalide';

    $response = new JsonResponse($data, 403);

    $event->setResponse($response);
}
}
