<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

#[AsController]
class GetParentList extends AbstractController
{
    private const ROLE_PARENT = "ROLE_PARENT";
    public function __construct(private UserRepository $userRepository) {}
    public function __invoke(): array
    {
        return $this->userRepository->findByRoles([self::ROLE_PARENT]);
    }
}

