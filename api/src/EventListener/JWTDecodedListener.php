<?php
namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTDecodedEvent;
use Symfony\Component\HttpFoundation\RequestStack;

class JWTDecodedListener
{
    /**
     * @var RequestStack
     */
    private $requestStack;

    /**
     * @param RequestStack $requestStack
     */
    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }
    /**
     * @param JWTDecodedEvent $event
     *
     * @return void
     */
    public function onJWTDecoded(JWTDecodedEvent $event)
    {
        //dump('Decoded');
        $request = $this->requestStack->getCurrentRequest();
        $payload = $event->getPayload();

        //$event->markAsInvalid();
        //$event->isValid();
        // if (!isset($payload['ip']) || $payload['ip'] !== $request->getClientIp()) {
        //     $event->markAsInvalid();
        // }
    }
}
