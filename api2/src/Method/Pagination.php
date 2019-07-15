<?php
namespace App\Method;

Class Pagination
{
    public function getPager($totalItems, $currentPage, $pageSize)
    {
        $totalPages = ceil($totalItems / $pageSize);
        $startPage;
        $endPage;
    
        if ($currentPage < 1) {
            $currentPage = 1;
        } else if ($currentPage > $totalPages) {
            $currentPage = $totalPages;
        }
    
        if ($totalPages <= 3) {
            $startPage = 1;
            $endPage = $totalPages;
        } else {
            if ($currentPage <= 2) {
                $startPage = 1;
                $endPage = 3;
            } else if ($currentPage + 1 >= $totalPages) {
                $startPage = $totalPages - 2;
                $endPage = $totalPages;
            } else {
                $startPage = $currentPage - 1;
                $endPage = $currentPage + 1;
            }
        }
    
        $startIndex = ($currentPage - 1) * $pageSize;
        $endIndex = min($startIndex + $pageSize - 1, $totalItems - 1);
        
        //$pages = Array.from(Array(($endPage + 1) - $startPage).keys()).map($i => $startPage + $i);

        $options = [
            'totalItems' => $totalItems,
            'currentPage' => $currentPage,
            'pageSize' => $pageSize,
            'totalPages' => $totalPages,
            'startPage' => $startPage,
            'endPage' => $endPage,
            'startIndex' => $startIndex,
            'endIndex' => $endIndex
        ];
        return $options;
    }
}