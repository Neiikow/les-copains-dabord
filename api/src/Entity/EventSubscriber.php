<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity()
 * @ORM\Table()
 * @Serializer\ExclusionPolicy("ALL")
 */
class EventSubscriber
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Expose
     */
    private $id;
    /**
    * @ORM\Column(name="eventId", type="integer", length=11)
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $eventId;
    /**
     * @ORM\Column(name="userId", type="integer", length=11)
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $userId;

    public function getId() { return $this->id; }
    public function getEventId() { return $this->eventId; }
    public function getUserId() { return $this->userId; }

    public function setEventId($eventId)
    {
        $this->eventId = $eventId;
    }
    public function setUserId($userId)
    {
        $this->userId = $userId;
    }
}