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
     * @ORM\Column(type="array")
     * @Serializer\Expose
     */
    private $roles = array();

    /**
     * @ORM\Column(name="password", type="string", length=255)
     * @Serializer\Expose
     * @Assert\NotBlank
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
    private $create_date;

    public function getId(): ?int { return $this->id; }
    public function getUsername(): string { return (string) $this->username; }
    public function getPassword(): string { return (string) $this->password; }
    public function getEmail(): string { return (string) $this->email; }
    public function getPicture(): string { return (string) $this->picture; }
    public function getDiscord(): string { return (string) $this->discord; }
    public function getCreateDate() { return $this->create_date; }
    public function getSalt() { }
    public function getRoles(): array
    {
        $roles = $this->roles;
        return array_unique($roles);
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }
    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }
    public function setPicture(string $picture): self
    {
        $this->picture = $picture;
        return $this;
    }
    public function setDiscord(string $discord): self
    {
        $this->discord = $discord;
        return $this;
    }
    public function setCreateDate($create_date)
    {
        $this->create_date = $create_date;
        return $this;
    }
    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }
    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    public function eraseCredentials() {}
}
