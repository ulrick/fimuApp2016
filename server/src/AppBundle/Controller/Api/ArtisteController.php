<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Artiste;
use FOS\RestBundle\Controller\Annotations\View;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * Class ArtisteController
 * @package AppBundle\Controller\Api
 */
class ArtisteController extends BaseController
{
    /**
     * @return array
     *
     * @View()
     *
     * @ApiDoc(
     *     section="Artist",
     *     resource=true,
     *     description="Get All artist list",
     *     statusCodes={
     *          200="Returned when successful",
     *          403="Returned when client is not allowed to request artists list",
     *     }
     * )
     */
    public function getArtistsAction(){
        $artists = $this->getRepository("AppBundle:Artiste")->findAll();
        return array('artists' => $artists);
    }

    /**
     * @param Artiste $artiste
     * @ParamConverter("artiste",class="AppBundle:Artiste")
     * @return Artiste
     *
     * @ApiDoc(
     *     section="Artist",
     *     resource=true,
     *     description="Get an artist knowing his id",
     *     statusCodes={
     *          200="Returned when successful",
     *          403="Returned when client is not allowed to request artists list",
     *          404="Returned when artist is not found"
     *     },
     *     requirements={
     *        {"name"="artiste", "dataType"="integer", "required"=true, "requirement"="\d+", "description"="Artist id"}
     *     }
     * )
     * @View()
     */
    public function getArtistAction(Artiste $artiste){
        return $artiste;
    }

    /**
     * @param Artiste $artiste
     * @ParamConverter("artiste",class="AppBundle:Artiste")
     *
     * @return array
     *
     * @View()
     *
     * @ApiDoc(
     *     section="Artist",
     *     resource=true,
     *     description="Get an artist events list",
     *     statusCodes={
     *          200="Returned when successful",
     *          403="Returned when client is not allowed to request artists list",
     *          404="Returned when artist is not found"
     *     },
     *     requirements={
     *        {"name"="artiste", "dataType"="integer", "required"=true, "requirement"="\d+", "description"="Artist id"}
     *     }
     * )
     */
    public function getArtistEventsAction(Artiste $artiste){
        return array('events' => $artiste->getEvents());
    }
}