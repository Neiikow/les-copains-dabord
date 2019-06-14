<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM\Entity
 * @ORM\Table()
 */
class Event
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
    private $support;
    /**
     * @ORM\Column(type="string")
     */
    private $author;
    /**
     * @ORM\Column(type="string")
     */
    private $status;
    /**
     * @ORM\Column(type="string")
     */
    private $date;
    /**
     * @ORM\Column(type="string")
     */
    private $time;
    /**
     * @ORM\Column(type="string")
     */
    private $createDate;

    public function getId() { return $this->id; }
    public function getTitle() { return $this->title; }
    public function getContent() { return $this->content; }
    public function getSupport() { return $this->support; }
    public function getAuthor() { return $this->author; }
    public function getStatus() { return $this->status; }
    public function getDate() { return $this->date; }
    public function getTime() { return $this->time; }
    public function getCreateDate() { return $this->createDate; }

    public function setTitle($title)
    {
        $this->title = $title;
    }
    public function setContent($content)
    {
        $this->content = $content;
    }
    public function setSupport($support)
    {
        $this->support = $support;
    }
    public function setAuthor($author)
    {
        $this->author = $author;
    }
    public function setStatus($status)
    {
        $this->status = $status;
    }
    public function setDate($date)
    {
        $this->date = $date;
    }
    public function setTime($time)
    {
        $this->time = $time;
    }
}