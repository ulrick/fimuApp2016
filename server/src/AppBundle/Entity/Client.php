<?php
/**
 * User: sky
 * Date: 10/04/2016
 */

namespace AppBundle\Entity;

use FOS\OAuthServerBundle\Entity\Client as BaseClient;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class Client
 * @package AppBundle\Entity
 *
 * @ORM\Entity()
 */
class Client extends BaseClient
{
    /**
     * @var
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * Client constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }
}