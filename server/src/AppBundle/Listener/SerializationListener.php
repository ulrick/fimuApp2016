<?php

namespace AppBundle\Listener;


use AppBundle\Model\Imageable;
use JMS\DiExtraBundle\Annotation\Inject;
use JMS\DiExtraBundle\Annotation\InjectParams;
use JMS\DiExtraBundle\Annotation\Service;
use JMS\DiExtraBundle\Annotation\Tag;
use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use JMS\Serializer\EventDispatcher\ObjectEvent;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Class SerializationListener
 * @package AppBundle\Listener
 * @Service("app.listener.serializationlistener")
 * @Tag("jms_serializer.event_subscriber")
 */
class SerializationListener implements EventSubscriberInterface
{

    /**
     * @var RequestStack
     */
    protected $request;

    /**
     * @var \Vich\UploaderBundle\Templating\Helper\UploaderHelper
     */
    protected $imageUrlGenerator;



    /**
     * SerializationListener constructor.
     * @param ContainerInterface $container
     *
     * @InjectParams({
     *     "container" = @Inject("service_container")
     * })
     *
     */
    public function __construct(ContainerInterface $container)
    {
        $this->request = $container->get('request_stack')->getCurrentRequest();
        $this->imageUrlGenerator = $container->get('vich_uploader.templating.helper.uploader_helper');
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return array(
            array('event' => 'serializer.post_serialize', 'class' => 'AppBundle\Entity\Artiste', 'method' => 'onPostSerialize'),
            array('event' => 'serializer.post_serialize', 'class' => 'AppBundle\Entity\Scene', 'method' => 'onPostSerialize'),
        );
    }

    /**
     * @param ObjectEvent $event
     */
    public function onPostSerialize(ObjectEvent $event)
    {
        $object = $event->getObject();
        if($object instanceof Imageable && $object->getImage() != null && !empty(trim($object->getImage())))
            $event->getVisitor()->addData('image_url',$this->request->getUriForPath($this->imageUrlGenerator->asset($object,'imageFile')));
    }
}