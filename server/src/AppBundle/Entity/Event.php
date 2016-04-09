<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * Event
 *
 * @ORM\Table(name="event")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EventRepository")
 * @Serializer\ExclusionPolicy("all")
 */
class Event
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Expose()
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateStart", type="datetime")
     * @Serializer\Expose()
     */
    private $dateStart;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateEnd", type="datetime")
     * @Serializer\Expose()
     */
    private $dateEnd;

    /**
     * @var Scene
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Scene", inversedBy="events")
     * @Serializer\Type("AppBundle\Entity\Scene")
     * @Serializer\Expose()
     */
    private $scene;

    /**
     * @var Artiste
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Artiste", inversedBy="events")
     * @Serializer\Type("AppBundle\Entity\Artiste")
     * @Serializer\Expose()
     */
    private $artiste;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set dateStart
     *
     * @param \DateTime $dateStart
     *
     * @return Event
     */
    public function setDateStart($dateStart)
    {
        $this->dateStart = $dateStart;

        return $this;
    }

    /**
     * Get dateStart
     *
     * @return \DateTime
     */
    public function getDateStart()
    {
        return $this->dateStart;
    }

    /**
     * Set dateEnd
     *
     * @param \DateTime $dateEnd
     *
     * @return Event
     */
    public function setDateEnd($dateEnd)
    {
        $this->dateEnd = $dateEnd;

        return $this;
    }

    /**
     * Get dateEnd
     *
     * @return \DateTime
     */
    public function getDateEnd()
    {
        return $this->dateEnd;
    }

    /**
     * Set scene
     *
     * @param Scene $scene
     *
     * @return Event
     */
    public function setScene(Scene $scene = null)
    {
        $this->scene = $scene;

        return $this;
    }

    /**
     * Get scene
     *
     * @return Scene
     */
    public function getScene()
    {
        return $this->scene;
    }

    /**
     * Set artiste
     *
     * @param Artiste $artiste
     *
     * @return Event
     */
    public function setArtiste(Artiste $artiste = null)
    {
        $this->artiste = $artiste;

        return $this;
    }

    /**
     * Get artiste
     *
     * @return Artiste
     */
    public function getArtiste()
    {
        return $this->artiste;
    }
}
