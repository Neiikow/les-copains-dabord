<?php
namespace App\Controller;

use App\Entity\Article;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

Class ApiMcController extends Controller
{
    private $apiUrl = "https://minecraft-api.com/api/query/";
    private $ip = "mc70.boxtoplay.com";
    private $port = "27511";

    /**
     * @Route("/apimc/status", name="status")
     */
    public function getStatus()
    {
        $status = file_get_contents($this->apiUrl.'statut.php?ip='.$this->ip.'&port='.$this->port);
        $response = new Response($status);
        $response->headers->set('Content-Type', 'text');

        return $response;
    }

    /**
     * @Route("/apimc/version", name="version")
     */
    public function getVersion()
    {
        $version = file_get_contents($this->apiUrl.'version.php?ip='.$this->ip.'&port='.$this->port);
        $response = new Response($version);
        $response->headers->set('Content-Type', 'text');

        return $response;
    }

    /**
     * @Route("/apimc/total", name="total")
     */
    public function getTotal()
    {
        $total = file_get_contents($this->apiUrl.'maxplayer.php?ip='.$this->ip.'&port='.$this->port);
        $response = new Response($total);
        $response->headers->set('Content-Type', 'text');

        return $response;
    }

    /**
     * @Route("/apimc/playerlist", name="playerlist")
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

            $response = new Response($membersList);
        } else {
            $response = new Response();
        }
        
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:4200');

        return $response;
    }
}