<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

#[AsController]
class CurrentUserController extends AbstractController
{
    public function __construct(private Security $security) {}
    public function __invoke(): UserInterface
    {
        return $this->security->getUser();
    }
}

