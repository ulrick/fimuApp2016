<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Scene;
use FOS\RestBundle\Controller\Annotations\View;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class SceneController extends BaseController
{
    /**
     * @View()
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @ApiDoc(
     *     section="Scene",
     *     resource=true,
     *     description="Get scene list",
     *     statusCodes={
     *          200="Returned when successful",
     *          403="Returned when client is not allowed to request scene's list",
     *     }
     * )
     */
    public function getScenesAction()
    {
        $data = $this->getRepository("AppBundle:Scene")->findAll();
        return $data;
    }

    /**
     * @param Scene $scene
     * @return Scene
     * @View()
     * @ParamConverter("scene",class="AppBundle:Scene")
     *
     * @ApiDoc(
     *     section="Scene",
     *     resource=true,
     *     description="Get a specific scene",
     *     statusCodes={
     *          200="Returned when successful",
     *          403="Returned when client is not allowed to request scene",
     *          404="Returned when scene is not found"
     *     },
     *     requirements={
     *        {"name"="scene", "dataType"="integer", "required"=true, "requirement"="\d+", "description"="Scene id"}
     *     }
     * )
     */
    public function getSceneAction(Scene $scene) {
        return $scene;
    }

    /**
     * @param Scene $scene
     * @return array
     * @View()
     * @ParamConverter("scene",class="AppBundle:Scene")
     *
     * @ApiDoc(
     *     section="Scene",
     *     resource=true,
     *     description="Get a scene events list",
     *     statusCodes={
     *          200="Returned when successful",
     *          403="Returned when client is not allowed to request scene",
     *          404="Returned when scene is not found"
     *     },
     *     requirements={
     *        {"name"="scene", "dataType"="integer", "required"=true, "requirement"="\d+", "description"="Scene id"}
     *     }
     * )
     */
    public function getSceneEventsAction(Scene $scene){
        return $scene->getEvents();
    }
}