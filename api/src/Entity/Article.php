<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM\Entity
 * @ORM\Table()
 */
class Article
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
    private $title;
    /**
     * @ORM\Column(type="text")
     */
    private $content;
    /**
     * @ORM\Column(type="string")
     */
    private $author;
    /**
     * @ORM\Column(type="string")
     */
    private $picture;
    /**
     * @ORM\Column(type="string")
     */
    private $type;
    /**
     * @ORM\Column(type="string")
     */
    private $status;
    /**
     * @ORM\Column(type="integer")
     */
    private $locationX;
    /**
     * @ORM\Column(type="integer")
     */
    private $locationY;
    /**
     * @ORM\Column(type="text")
     */
    private $link;
    /**
     * @ORM\Column(type="string")
     */
    private $version;
    /**
     * @ORM\Column(type="string")
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