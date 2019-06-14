<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM\Entity
 * @ORM\Table()
 */
class Member
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    /**
     * @ORM\Column(type="string")
     */
    private $name;
    /**
     * @ORM\Column(type="text")
     */
    private $password;
    /**
     * @ORM\Column(type="string")
     */
    private $email;
    /**
     * @ORM\Column(type="string")
     */
    private $picture;
    /**
     * @ORM\Column(type="string")
     */
    private $role;
    /**
     * @ORM\Column(type="integer")
     */
    private $discord;
    /**
     * @ORM\Column(type="string")
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