<?php

namespace App\Controller;

use App\Entity\Articles;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ArticleController extends AbstractController
{
    /**
     * @Route("/api/articles/", name="get_all_articles", methods={"GET"})
     */
    public function getAllArticles(): JsonResponse
    {
        $articles = $this->getDoctrine()->getManager()->getRepository(Articles::class)->findAll();
        $data = [];

        foreach ($articles as $article) {
            $data[] = [
                'id' => $article->getId(),
                'id_modele' => $article->getIdModele(),
                'sexe' => $article->getSexe(),
                'type' => $article->getType(),
                'categorie' => $article->getCategorie(),
                'marque' => $article->getMarque(),
                'couleur' => $article->getCouleur(),
                'prix' => $article->getPrix(),
                'nom' => $article->getNom(),
                'image' => $article->getImage(),
                'image2' => $article->getImageDeux(),
                'image3' => $article->getImageTrois(),
                'image4' => $article->getImageQuatre()
            ];
        }

        return new JsonResponse($data, Response::HTTP_OK);
    }
}
