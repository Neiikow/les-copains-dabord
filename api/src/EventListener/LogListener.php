<?php

namespace App\EventListener;

use Gesdinet\JWTRefreshTokenBundle\Event\RefreshEvent;
use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class LogListener implements EventSubscriberInterface
{
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function log(RefreshEvent $event)
    {
        $refreshToken = $event->getRefreshToken()->getRefreshToken();
        $user = $event->getPreAuthenticatedToken()->getUser()->getUsername();
        
        $this->logger->debug(sprintf('User "%s" has refreshed it\'s JWT token with refresh token "%s".', $user, $refreshToken));
    }
    
    public static function getSubscribedEvents()
    {
        return array(
            'gesdinet.refresh_token' => 'log',
        );
    }
}