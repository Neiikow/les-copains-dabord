<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity
 * @ORM\Table()
 * @Serializer\ExclusionPolicy("ALL")
 */
class Member
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Expose
     */
    private $id;
    /**
     * @ORM\Column(type="string")
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $name;
    /**
     * @ORM\Column(type="text")
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $password;
    /**
     * @ORM\Column(type="string")
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $email;
    /**
     * @ORM\Column(type="string")
     * @Serializer\Expose
     */
    private $picture;
    /**
     * @ORM\Column(type="string")
     * @Serializer\Expose
     */
    private $role;
    /**
     * @ORM\Column(type="string")
     * @Serializer\Expose
     */
    private $discord;
    /**
     * @ORM\Column(type="string")
     * @Serializer\Expose
     */
    private $create_date;

    public function getId() { return $this->id; }
    public function getName() { return $this->name; }
    public function getPassword() { return $this->password; }
    public function getEmail() { return $this->email; }
    public function getPicture() { return $this->picture; }
    public function getRole() { return $this->role; }
    public function getDiscord() { return $this->discord; }
    public function getCreateDate() { return $this->createDate; }

    public function setName($name)
    {
        $this->name = $name;
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
    public function setRole($role)
    {
        $this->role = $role;
    }
    public function setDiscord($discord)
    {
        $this->discord = $discord;
    }
    public function setCreateDate($createDate)
    {
        $this->createDate = $createDate;
    }
}