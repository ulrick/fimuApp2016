<?php

namespace AppBundle\Controller\Api;

use FOS\RestBundle\Controller\FOSRestController;

class BaseController extends FOSRestController
{
    /**
     * @param string $entityName The name of the entity.
     * @return \Doctrine\ORM\EntityRepository
     */
    protected function getRepository($entityName)
    {
        return $this->get('doctrine.orm.entity_manager')->getRepository($entityName);
    }

    /**
     * @return null|\Symfony\Component\HttpFoundation\Request
     */
    protected function getCurrentRequest()
    {
        return $this->get('request_stack')->getCurrentRequest();
    }
}