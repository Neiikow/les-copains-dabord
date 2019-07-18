<?php
namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTAuthenticatedEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\InvalidTokenException;

class JWTAuthenticatedListener
{
    /**
     * @param JWTAuthenticatedEvent $event
     *
     * @return void
     */
    public function onJWTAuthenticated(JWTAuthenticatedEvent $event)
    {
        //dump('Authenticated');
        $token = $event->getToken();
        $userToken = $token->getUser()->getToken();
        $requestToken = $token->getCredentials();

        if ($userToken !== $requestToken) {
            throw new InvalidTokenException();
        }
    }
}
