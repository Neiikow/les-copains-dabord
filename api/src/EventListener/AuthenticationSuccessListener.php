<?php
namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
    /**
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        //dump('AuthSuccess');
        $data = $event->getData();
        $user = $event->getUser();
        $user->setToken($data['token']);

        $response = $event->getResponse();
        $response->headers->set('Authorization', 'Bearer '.$data['token']);

        if (!$user instanceof UserInterface) {
            return;
        }
        
        $data['data'] = array(
            'roles' => $user->getRoles(),
        );
        $event->setData($data);
    }
}
