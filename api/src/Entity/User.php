<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @Serializer\ExclusionPolicy("ALL")
 */
class User implements UserInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Expose
     */
    private $id;

    /**
     * @ORM\Column(name="username", type="string", length=255, unique=true)
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $username;

    /**
     * @ORM\Column(name="roles", type="array")
     * @Serializer\Expose
     */
    private $roles = array();

    /**
     * @ORM\Column(name="password", type="string", length=255)
     * @Serializer\Expose
     */
    private $password;

    /**
     * @ORM\Column(name="email", type="string", length=255, unique=true)
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $email;

    /**
     * @ORM\Column(name="picture", type="string", length=255)
     * @Serializer\Expose
     */
    private $picture;

    /**
     * @ORM\Column(name="discord", type="string", length=255)
     * @Serializer\Expose
     */
    private $discord;

    /**
     * @ORM\Column(name="createDate", type="string", length=255)
     * @Serializer\Expose
     */
    private $createDate;

    /**
     * @ORM\Column(name="token", type="string", length=5000)
     * @Serializer\Expose
     */
    private $token;

    public function getId() { return $this->id; }
    public function getUsername() { return $this->username; }
    public function getPassword() { return $this->password; }
    public function getEmail() { return $this->email; }
    public function getPicture() { return $this->picture; }
    public function getDiscord() { return $this->discord; }
    public function getCreateDate() { return $this->createDate; }
    public function getToken() { return $this->token; }  
    public function getSalt() { }
    public function getRoles()
    {
        $roles = $this->roles;
        if ($this->roles[0] === 'ROLE_ADMIN') {
            array_push($roles, 'ROLE_MEMBER', 'ROLE_USER');
        } elseif ($this->roles[0] === 'ROLE_MEMBER') {
            array_push($roles, 'ROLE_USER');
        }
        return array_unique($roles);
    }

    public function setUsername($username)
    {
        $this->username = $username;
        return $this;
    }
    public function setEmail(string $email)
    {
        $this->email = $email;
        return $this;
    }
    public function setPicture(string $picture)
    {
        $this->picture = $picture;
        return $this;
    }
    public function setDiscord(string $discord)
    {
        $this->discord = $discord;
        return $this;
    }
    public function setCreateDate($createDate)
    {
        $this->createDate = $createDate;
        return $this;
    }
    public function setRoles(array $roles)
    {
        $this->roles = $roles;
        return $this;
    }
    public function setPassword(string $password)
    {
        $this->password = $password;
        return $this;
    }
    public function setToken(string $token)
    {
        $this->token = $token;
        return $this;
    }
    
    public function eraseCredentials() {}
}
