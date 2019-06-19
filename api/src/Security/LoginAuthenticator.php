<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class LoginAuthenticator extends AbstractGuardAuthenticator
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    // Vérifie, via la route, si LoginAuth' doit être utilisé
    public function supports(Request $request)
    {
        return $request->get("_route") === "users_login" && $request->isMethod("POST");
    }

    // renvoie des informations qui nous permettront d’identifier l’utilisateur qui tente de se connecter
    public function getCredentials(Request $request)
    {
        return [
            'username' => $request->request->get("username"),
            'password' => $request->request->get("password")
        ];
    }

    // renvoie l'utilisateur qui tente de se connecter
    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        return $userProvider->loadUserByUsername($credentials['username']);
    }

    // vérifie les informations d'identification de l'utilisateur en comparant le mdp reçu et le mdp encodé
    public function checkCredentials($credentials, UserInterface $user)
    {
        return $this->passwordEncoder->isPasswordValid($user, $credentials['password']);
    }

    // appelée s'il y a une erreur n'importe ou dans cette class
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        // pas d'accès à $this->json hors des controller, on utilise donc JsonResponse
        return new JsonResponse([
            'error' => $exception->getMessageKey()
        ], 400);
    }

    // appelée lorsque la fonction checkCredentials renvoie true
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return new JsonResponse([
            'result' => true
        ]);
    }

    // appelée chaque fois qu'un noeud final nécessite une authentification
    public function start(Request $request, AuthenticationException $authException = null)
    {
        return new JsonResponse([
            'error' => 'Access refusé'
        ]);
    }

    public function supportsRememberMe()
    {
        return false;
    }
}
