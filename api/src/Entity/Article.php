<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity
 * @ORM\Table(name="article")
 * @Serializer\ExclusionPolicy("ALL")
 */
class Article
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Expose
     */
    private $id;
    /**
     * @ORM\Column(name="title", type="string", length=255)
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $title;
    /**
     * @ORM\Column(name="content", type="string", length=10000)
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $content;
    /**
     * @ORM\Column(name="author", type="string", length=255)
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $author;
    /**
     * @ORM\Column(name="picture", type="string", length=1000)
     * @Serializer\Expose
     */
    private $picture;
    /**
     * @ORM\Column(name="type", type="string", length=255)
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $type;
    /**
     * @ORM\Column(name="status", type="string", length=255)
     * @Serializer\Expose
     */
    private $status;
    /**
     * @ORM\Column(name="locationx", type="integer", length=11)
     * @Serializer\Expose
     */
    private $locationX;
    /**
     * @ORM\Column(name="locationY", type="integer", length=11)
     * @Serializer\Expose
     */
    private $locationY;
    /**
     * @ORM\Column(name="link", type="string", length=1000)
     * @Serializer\Expose
     */
    private $link;
    /**
     * @ORM\Column(name="version", type="string", length=50)
     * @Serializer\Expose
     */
    private $version;
    /**
     * @ORM\Column(name="createDate", type="string")
     * @Serializer\Expose
     */
    private $createDate;

    public function getId() { return $this->id; }
    public function getTitle() { return $this->title; }
    public function getContent() { return $this->content; }
    public function getAuthor() { return $this->author; }
    public function getPicture() { return $this->picture; }
    public function getType() { return $this->type; }
    public function getStatus() { return $this->status; }
    public function getLocationX() { return $this->locationX; }
    public function getLocationY() { return $this->locationY; }
    public function getLink() { return $this->link; }
    public function getVersion() { return $this->version; }
    public function getCreateDate() { return $this->createDate; }

    public function setTitle($title)
    {
        $this->title = $title;
    }
    public function setContent($content)
    {
        $this->content = $content;
    }
    public function setAuthor($author)
    {
        $this->author = $author;
    }
    public function setPicture($picture)
    {
        $this->picture = $picture;
    }
    public function setType($type)
    {
        $this->type = $type;
    }
    public function setStatus($status)
    {
        $this->status = $status;
    }
    public function setLocationX($locationX)
    {
        $this->locationX = $locationX;
    }
    public function setLocationY($locationY)
    {
        $this->locationY = $locationY;
    }
    public function setLink($link)
    {
        $this->link = $link;
    }
    public function setVersion($version)
    {
        $this->version = $version;
    }
    public function setCreateDate($createDate)
    {
        $this->createDate = $createDate;
    }
}