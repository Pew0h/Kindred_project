<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ContractStatusRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ContractStatusRepository::class)]
#[ApiResource(
    collectionOperations: [
        'post' => [
            'path' => '/contract_status',
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can create a contract status"
        ],
        'get' => ['path' => '/contract_status']
    ],
    itemOperations: [
        'get' => ['path' => '/contract_status/{id}'],
        'patch' => [
            'path' => '/contract_status/{id}',
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can modify a contract status"
        ],
        'delete' => [
            'path' => '/contract_status/{id}',
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can delete a contract status"
        ]
    ],
    normalizationContext: ['groups' => ['read']]
)]
class ContractStatus
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read'])]
    #[Assert\NotBlank(message: 'name should be not blank')]
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
