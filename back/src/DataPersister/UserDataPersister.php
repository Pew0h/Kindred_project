<?php
// src/DataPersister/UserDataPersister.php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserDataPersister implements ContextAwareDataPersisterInterface
{
    private EntityManagerInterface $em;
    private UserPasswordHasherInterface $passwordEncoder;

    public function __construct(
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordEncoder
    ) {
        $this->em = $em;
        $this->passwordEncoder = $passwordEncoder;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof User;
    }

    /**
     * persist
     *
     * @param mixed $data
     * @param array $context
     * @return object
     */
    public function persist($data, array $context = [])
    {
        if(!$data->getParent()){
            $data->setRoles(["ROLE_PARENT"]);
        }
        if ($data->getPlainPassword()) {
            $data->setPassword(
                $this->passwordEncoder->hashPassword(
                    $data,
                    $data->getPlainPassword()
                )
            );
            $data->eraseCredentials();
        }

        $this->em->persist($data);
        $this->em->flush();
        return $data;
    }

    /**
     * remove
     *
     * @param mixed $data
     * @param array $context
     * @return void
     */
    public function remove($data, array $context = [])
    {
        $this->em->remove($data);
        $this->em->flush();
    }

}
