<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="user")
 * @ORM\Entity()
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

    /**
     * @ORM\Column(name="salt", type="string", length=255)
     * @Serializer\Expose
     */
    private $salt;

    /**
     * @ORM\Column(name="roles", type="string", length=255)
     * @Serializer\Expose
     */
    private $roles;

    public function getId() { return $this->id; }
    public function getUsername() { return $this->username; }
    public function getPassword() { return $this->password; }
    public function getEmail() { return $this->email; }
    public function getPicture() { return $this->picture; }
    public function getDiscord() { return $this->discord; }
    public function getCreateDate() { return $this->createDate; }
    public function getSalt() { return $this->salt; }
    public function getRoles() { return $this->roles; }

    public function setId($id)
    {
        $this->id = $id;
    }
    public function setUsername($username)
    {
        $this->username = $username;
    }
    public function setPassword($password)
    {
        $this->password = $password;
    }
    public function setEmail($email)
    {
        $this->email = $email;
    }
    public function setPicture($picture)
    {
        $this->picture = $picture;
    }
    public function setDiscord($discord)
    {
        $this->discord = $discord;
    }
    public function setCreateDate($createDate)
    {
        $this->createDate = $createDate;
    }
    public function setSalt($salt)
    {
        $this->salt = $salt;
    }
    public function setRoles($roles)
    {
        $this->roles = $roles;
    }

    public function eraseCredentials() {}
}