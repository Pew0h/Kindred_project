<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CategoryRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get',
        'post' => [
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can create a category"
        ]
    ],
    itemOperations: [
        'get',
        'patch' => [
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can modify a category"
        ],
        'delete' => [
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can delete a category"
        ],
    ],
    normalizationContext: ['groups' => ['read']]
)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: 'name should be not blank')]
    #[Groups(['read'])]
    private $name;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
