<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Event;
use FOS\RestBundle\Controller\Annotations\View;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class EventController extends BaseController
{

    /**
     * @View
     *
     * @return array
     *
     * @ApiDoc(
     *     section="Event",
     *     resource=true,
     *     description="Get event list",
     *     statusCodes={
     *          200="Returned when successful",
     *          403="Returned when client is not allowed to request event list",
     *     }
     * )
     */
    public function getEventsAction()
    {
        $events = $this->getRepository('AppBundle:Event')->findAll();
        return $events;
    }


    /**
     * @View()
     * @param Event $event
     * @ParamConverter("event",class="AppBundle:Event")
     * @return Event
     *
     * @ApiDoc(
     *     section="Event",
     *     resource=true,
     *     description="Get a specific event",
     *     statusCodes = {
     *          200="Returned when successful",
     *          403="Returned when client is not allowed to request event",
     *          404="Returned when event is not found"
     *     }
     * )
     */
    public function getEventAction(Event $event)
    {
        return $event;
    }

}