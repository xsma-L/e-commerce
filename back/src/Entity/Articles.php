<?php

namespace App\Entity;

use App\Repository\ArticlesRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ArticlesRepository::class)
 */
class Articles
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $id_modele;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $sexe;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $categorie;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $marque;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $couleur;

    /**
     * @ORM\Column(type="decimal", precision=10, scale=2)
     */
    private $prix;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $image;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $image_deux;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $image_trois;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $image_quatre;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdModele(): ?int
    {
        return $this->id_modele;
    }

    public function setIdModele(int $id_modele): self
    {
        $this->id_modele = $id_modele;

        return $this;
    }

    public function getSexe(): ?string
    {
        return $this->sexe;
    }

    public function setSexe(string $sexe): self
    {
        $this->sexe = $sexe;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getCategorie(): ?string
    {
        return $this->categorie;
    }

    public function setCategorie(string $categorie): self
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getMarque(): ?string
    {
        return $this->marque;
    }

    public function setMarque(string $marque): self
    {
        $this->marque = $marque;

        return $this;
    }

    public function getCouleur(): ?string
    {
        return $this->couleur;
    }

    public function setCouleur(string $couleur): self
    {
        $this->couleur = $couleur;

        return $this;
    }

    public function getPrix(): ?string
    {
        return $this->prix;
    }

    public function setPrix(string $prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getImageDeux(): ?string
    {
        return $this->image_deux;
    }

    public function setImageDeux(string $image_deux): self
    {
        $this->image_deux = $image_deux;

        return $this;
    }

    public function getImageTrois(): ?string
    {
        return $this->image_trois;
    }

    public function setImageTrois(string $image_trois): self
    {
        $this->image_trois = $image_trois;

        return $this;
    }

    public function getImageQuatre(): ?string
    {
        return $this->image_quatre;
    }

    public function setImageQuatre(string $image_quatre): self
    {
        $this->image_quatre = $image_quatre;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function toArray()
    {
        return [
            'id' => $this->getId(),
            'id_modele' => $this->getIdModele(),
            'sexe' => $this->getSexe(),
            'type' => $this->getType(),
            'categorie' => $this->getCategorie(),
            'marque' => $this->getMarque(),
            'couleur' => $this->getCouleur(),
            'prix' => $this->getPrix(),
            'nom' => $this->getNom(),
            'image' => $this->getImage(),
            'image2' => $this->getImageDeux(),
            'image3' => $this->getImageTrois(),
            'image4' => $this->getImageQuatre()
        ];
    }
}
