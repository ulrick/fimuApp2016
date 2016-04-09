<?php

namespace AppBundle\Entity;

use AppBundle\Model\Imageable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use JMS\Serializer\Annotation as Serializer;


/**
 * Artiste
 *
 * @ORM\Table(name="artiste")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ArtisteRepository")
 * @Vich\Uploadable
 * @Serializer\ExclusionPolicy("all")
 */
class Artiste implements Imageable
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, unique=true)
     * @Serializer\Expose()
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     * @Serializer\Expose()
     */
    private $description;

    /**
     * @var ArrayCollection | Event[]
     *
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Event", mappedBy="artiste")
     * @Serializer\Type("ArrayCollection<AppBundle\Entity\Event>")
     */
    private $events;

    /**
     * @var string
     *
     * @ORM\Column(name="style", type="string", length=255, nullable=true)
     * @Serializer\Expose()
     */
    private $style;

    /**
     * @var string
     *
     * @ORM\Column(name="country", type="string", length=255)
     * @Serializer\Expose()
     */
    private $country;

    /**
     * This is not a mapped field of entity metadata, just a simple property.
     *
     * @Vich\UploadableField(mapping="artiste_image", fileNameProperty="image")
     *
     * @var File
     */
    private $imageFile;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", length=255, nullable=true)
     */
    private $image;

    /**
     * @ORM\Column(type="datetime")
     *
     * @var \DateTime
     */
    private $updatedAt;

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
     * If manually uploading a file (i.e. not using Symfony Form) ensure an instance
     * of 'UploadedFile' is injected into this setter to trigger the  update. If this
     * bundle's configuration parameter 'inject_on_load' is set to 'true' this setter
     * must be able to accept an instance of 'File' as the bundle will inject one here
     * during Doctrine hydration.
     *
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile $image
     *
     * @return Artiste
     */
    public function setImageFile(File $image = null)
    {
        $this->imageFile = $image;

        if ($image) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTime('now');
        }

        return $this;
    }

    /**
     * @return File
     */
    public function getImageFile()
    {
        return $this->imageFile;
    }


    /**
     * Set name
     *
     * @param string $name
     *
     * @return Artiste
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Artiste
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set style
     *
     * @param string $style
     *
     * @return Artiste
     */
    public function setStyle($style)
    {
        $this->style = $style;

        return $this;
    }

    /**
     * Get style
     *
     * @return string
     */
    public function getStyle()
    {
        return $this->style;
    }

    /**
     * Set country
     *
     * @param string $country
     *
     * @return Artiste
     */
    public function setCountry($country)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country
     *
     * @return string
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set image
     *
     * @param string $image
     *
     * @return Artiste
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->events = new ArrayCollection();
    }

    /**
     * Add event
     *
     * @param Event $event
     *
     * @return Artiste
     */
    public function addEvent(Event $event)
    {
        $this->events[] = $event;

        return $this;
    }

    /**
     * Remove event
     *
     * @param Event $event
     */
    public function removeEvent(Event $event)
    {
        $this->events->removeElement($event);
    }

    /**
     * Get events
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEvents()
    {
        return $this->events;
    }

    /**
     * @inheritDoc
     */
    public function __toString()
    {
        return $this->getName();
    }
}
