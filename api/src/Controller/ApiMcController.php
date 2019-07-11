<?php
namespace App\Controller;

use App\Entity\Article;
use App\Method\Pagination;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;

Class ApiMcController extends FOSRestController
{
    private $apiUrl = "https://minecraft-api.com/api/query/";
    //private $ip = "mc70.boxtoplay.com";
    //private $port = "27511";
    private $ip = 'play.politicraft.fr';
    private $port = '25565';

    /**
     * @Rest\Get(
     *    path = "/apimc/status",
     *    name = "status"
     * )
     * @Rest\View
     */
    public function getStatus()
    {
        $status = file_get_contents($this->apiUrl.'statut.php?ip='.$this->ip.'&port='.$this->port);

        return $status;
    }

    /**
     * @Rest\Get(
     *    path = "/apimc/version",
     *    name = "version"
     * )
     * @Rest\View
     */
    public function getVersion()
    {
        $version = file_get_contents($this->apiUrl.'version.php?ip='.$this->ip.'&port='.$this->port);

        return $version;
    }

    /**
     * @Rest\Get(
     *    path = "/apimc/total",
     *    name = "total"
     * )
     * @Rest\View
     */
    public function getTotal()
    {
        $total = file_get_contents($this->apiUrl.'maxplayer.php?ip='.$this->ip.'&port='.$this->port);

        return $total;
    }

    /**
     * @Rest\POST(
     *    path = "/apimc/playerlist",
     *    name = "playerlist"
     * )
     * @Rest\View
     */
    public function getOnlineMembers(Pagination $pagin, Request $request)
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
                    'name'=>preg_replace($re, "$2", $value),
                ];
                array_push($members, $member);
            }

            $content = json_decode($request->getContent());
            
            $options = $pagin->getPager(
                count($members),
                $content->currentPage,
                $content->pageSize
            );
            
            $members = array_slice($members, $options['startIndex'], $options['pageSize']);
            return [
                'options' => $options,
                'members' => $members,
            ];
        }

        return $data;
    }
}