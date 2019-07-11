<?php
namespace App\Method;

use Symfony\Component\Validator\Constraints\DateTime;

Class Archive
{
    public function byExpiredDate($date)
    {
        $re = '#^([0-9]{4})-([0-9]{2})-([0-9]{2})([0-9]{2}):([0-9]{2})$#';

        $year = preg_replace($re, '$1', $date);
        $month = preg_replace($re, '$2', $date);
        $day = preg_replace($re, '$3', $date);
        $hour = preg_replace($re, '$4', $date);
        $min = preg_replace($re, '$5', $date);

        $isExpired = time() > mktime($hour, $min, 0, $month, $day, $year);

        return $isExpired;
    }
}