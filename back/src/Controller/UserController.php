<?php

namespace App\Controller;

use App\Entity\Users;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    /**
     * @Route("/api/user/create", name="add_user", methods={"POST"})
     */
    public function add(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = $data["email"];
        $mdp = $data["mdp"];
        $civilite = $data["civilite"];
        $prenom = $data["prenom"];
        $nom = $data["nom"];

        if(empty($email) || empty($mdp) || empty($civilite) || empty($prenom) || empty($nom)) {
            throw new NotFoundHttpException("Tous les champs obligatoires doivent être remplis.");
        }

        $user = new Users();

        $mdp2 = password_hash($mdp, PASSWORD_DEFAULT);

        $user
            ->setEmail($email)
            ->setRoles(["ROLE_USER"])
            ->setMdp($mdp2)
            ->setCivilite($civilite)
            ->setPrenom($prenom)
            ->setNom($nom)
            ->setAdresse($data["adresse"])
            ->setCodePostal($data["code_postal"])
            ->setVille($data["ville"])
            ->setPays($data["pays"])
            ->setDateNaissance($data["date_naissance"])
            ->setTelephone($data["telephone"]);

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        return new JsonResponse(['status' => 'Utilisateur enregistré'], Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/users/", name="get_all_users", methods={"GET"})
     */
    public function getAll(): JsonResponse
    {
        $users = $this->getDoctrine()->getManager()->getRepository(Users::class)->findAll();
        $data = [];

        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
                'pseudo' => $user->getUsername(),
                'mdp' => $user->getMdp(),
                'civilite' => $user->getCivilite(),
                'prenom' => $user->getPrenom(),
                'nom' => $user->getNom(),
                'adresse' => $user->getAdresse(),
                'code_postal' => $user->getCodePostal(),
                'ville' => $user->getVille(),
                'pays' => $user->getPays(),
                'date_naissance' => $user->getDateNaissance(),
                'telephone' => $user->getTelephone()
            ];
        }

        return new JsonResponse($data, Response::HTTP_OK);
    }

    /**
     * @Route("/api/user/id={id}", name="get_one_user", methods={"GET"})
     */
    public function get($id): JsonResponse
    {
        $user = $this->getDoctrine()->getManager()->getRepository(Users::class)->find($id);
        $data = [];

        $data[] = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            'pseudo' => $user->getUsername(),
            'mdp' => $user->getMdp(),
            'civilite' => $user->getCivilite(),
            'prenom' => $user->getPrenom(),
            'nom' => $user->getNom(),
            'adresse' => $user->getAdresse(),
            'code_postal' => $user->getCodePostal(),
            'ville' => $user->getVille(),
            'pays' => $user->getPays(),
            'date_naissance' => $user->getDateNaissance(),
            'telephone' => $user->getTelephone()
        ];

        return new JsonResponse($data, Response::HTTP_OK);
    }

    /**
     * @Route("/api/user/update/{id}", name="update_user", methods={"PUT"})
     */
    public function update($id, Request $request): JsonResponse
    {
        $user = $this->getDoctrine()->getManager()->getRepository(Users::class)->findOneBy(['id' => $id]);
        $data = json_decode($request->getContent(), true);

        empty($data["email"]) ? true : $user->setEmail($data["email"]);
        empty($data["roles"]) ? true : $user->setRoles($data["roles"]);
        empty($data["mdp"]) ? true : $user->setMdp($data["mdp"]);
        empty($data["civilite"]) ? true : $user->setCivilite($data["civilite"]);
        empty($data["prenom"]) ? true : $user->setPrenom($data["prenom"]);
        empty($data["nom"]) ? true : $user->setNom($data["nom"]);
        empty($data["adresse"]) ? true : $user->setAdresse($data["adresse"]);
        empty($data["code_postal"]) ? true : $user->setCodePostal($data["code_postal"]);
        empty($data["ville"]) ? true : $user->setVille($data["ville"]);
        empty($data["pays"]) ? true : $user->setPays($data["pays"]);
        empty($data["date_naissance"]) ? true : $user->setDateNaissance($data["date_naissance"]);
        empty($data["telephone"]) ? true : $user->setTelephone($data["telephone"]);

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        return new JsonResponse($user->toArray(), Response::HTTP_OK);
    }

    /**
     * @Route("/api/user/delete/{id}", name="delete_user", methods={"DELETE"})
     */
    public function delete($id): JsonResponse
    {
        $user = $this->getDoctrine()->getManager()->getRepository(Users::class)->findOneBy(['id' => $id]);

        $em = $this->getDoctrine()->getManager();
        $em->remove($user);
        $em->flush();

        return new JsonResponse(["status" => "Utilisateur supprimé"], Response::HTTP_NO_CONTENT);
    }

    /**
     * @Route("/api/user/email={email}&mdp={mdp}", name="connect_user", methods={"GET"})
     */
    public function auth($email, $mdp): JsonResponse
    {
        $user = $this->getDoctrine()->getManager()->getRepository(Users::class)->findBy(['email' => $email]);

        if(count($user) < 1) {
            return new JsonResponse(["status" => "Email incorrect ou inexistant"], Response::HTTP_OK);
        } else {
            if(password_verify($mdp, $user[0]->getMdp())) {
                $data = [];

                foreach ($user as $you) {
                    $data[] = [
                        'id' => $you->getId(),
                        'email' => $you->getEmail(),
                        'roles' => $you->getRoles(),
                        'pseudo' => $you->getUsername(),
                        'civilite' => $you->getCivilite(),
                        'prenom' => $you->getPrenom(),
                        'nom' => $you->getNom()
                    ];
                }

                return new JsonResponse($data, Response::HTTP_OK);
            } else {
                return new JsonResponse(["status" => "Mot de passe incorrect"], Response::HTTP_OK);
            }
        }
    }
}
