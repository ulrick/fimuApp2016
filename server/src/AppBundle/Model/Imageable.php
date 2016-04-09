<?php
/**
 * Created by PhpStorm.
 * User: sky
 * Date: 08/04/2016
 * Time: 19:39
 */

namespace AppBundle\Model;


interface Imageable
{
    /**
     * @return string
     */
    public function getImage();

    /**
     * @param $image
     * @return string
     */
    public function setImage($image);
}