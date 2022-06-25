<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RewardRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RewardRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get',
        'post'  => [
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can view all users"
        ],
    ],
    itemOperations: [
        'get',
        'patch' => [
            "security" => "is_granted('ROLE_PARENT') or object.id == user",
            "security_message" => "Only parent can modify this user or the current user"
        ],
        'delete' => [
            "security" => "is_granted('ROLE_PARENT') or object.id == user.id",
            "security_message" => "Only parent can delete this user or current user"
        ]],
    normalizationContext: ['groups' => ['read']]
)]
class Reward
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read'])]
    public $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: 'Should not to be empty')]
    #[Groups(['read'])]
    private $name;

    #[ORM\Column(type: 'integer')]
    #[Assert\NotBlank(message: 'Should not to be empty')]
    #[Groups(['read'])]
    private $points;

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

    public function getPoints(): ?int
    {
        return $this->points;
    }

    public function setPoints(int $points): self
    {
        $this->points = $points;

        return $this;
    }
}
