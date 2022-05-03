<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\NoteRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: NoteRepository::class)]
#[ApiResource(
    itemOperations: ['get', 'patch', 'delete'],
    normalizationContext: ['groups' => ['read']]
)]
class Note
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read'])]
    #[Assert\NotBlank(message: 'name should not to be blank')]
    private $name;

    #[ORM\Column(type: 'float')]
    #[Groups(['read'])]
    #[Assert\NotBlank(message: 'coefficient should not to be null')]
    private $coefficient;

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

    public function getCoefficient(): ?float
    {
        return $this->coefficient;
    }

    public function setCoefficient(float $coefficient): self
    {
        $this->coefficient = $coefficient;

        return $this;
    }
}
