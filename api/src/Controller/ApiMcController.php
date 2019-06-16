<?php
namespace App\Controller;

use App\Entity\Article;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use FOS\RestBundle\Controller\Annotations\View;

Class ApiMcController extends Controller
{
    private $apiUrl = "https://minecraft-api.com/api/query/";
    private $ip = "mc70.boxtoplay.com";
    private $port = "27511";

    /**
     * @Route("/apimc/status", name="status")
     * @View
     */
    public function getStatus()
    {
        $status = file_get_contents($this->apiUrl.'statut.php?ip='.$this->ip.'&port='.$this->port);

        return $status;
    }

    /**
     * @Route("/apimc/version", name="version")
     * @View
     */
    public function getVersion()
    {
        $version = file_get_contents($this->apiUrl.'version.php?ip='.$this->ip.'&port='.$this->port);

        return $version;
    }

    /**
     * @Route("/apimc/total", name="total")
     * @View
     */
    public function getTotal()
    {
        $total = file_get_contents($this->apiUrl.'maxplayer.php?ip='.$this->ip.'&port='.$this->port);

        return $total;
    }

    /**
     * @Route("/apimc/playerlist", name="playerlist")
     * @View
     */
    public function getOnlineMembers()
    {
        $members = [];
        $separator = "#<br \/>#";
        $data = file_get_contents($this->apiUrl.'playerlist.php?ip='.$this->ip.'&port='.$this->port);

        if ($data != '') {
            $matches = preg_split($separator, $data);
            unset($matches[count($matches)-1]);
            
            foreach ($matches as $value) {
                $re = "#(<.*'>)(.*)#";
                $member = [
                    'picture'=>preg_replace($re, "$1", $value),
                    'name'=>preg_replace($re, "$2", $value),
                ];
                array_push($members, $member);
            }
            $membersList = json_encode($members);

            return $membersList;
        }

        return $data;
    }
}