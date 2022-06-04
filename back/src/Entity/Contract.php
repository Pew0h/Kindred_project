<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ContractRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ContractRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get' => [
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can view all contracts"
        ],
        'post' => [
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can create a contract"
        ]
    ],
    itemOperations: [
        'get' => [
            "security" => "is_granted('ROLE_PARENT') or object.child == user",
            "security_message" => "Only parent can view this contract or the child assigned to the contract"
        ],
        'patch' => [
            "security" => "is_granted('ROLE_PARENT') or object.child == user",
            "security_message" => "Only parent can modify a contract or the child assigned to the contract"
        ],
        'delete' => [
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can delete a contract"
        ]
    ],
    normalizationContext: ['groups' => ['read']]
)]
class Contract
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read'])]
    private $id;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: 'Content cannot be blank')]
    #[Groups(['read'])]
    private $content;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: 'parent_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[Assert\NotNull(message: 'A parent id should be not null')]
    #[Groups(['read'])]
    #[ApiProperty(attributes: ["openapi_context" => ["type" => "integer"]])]
    private $parent;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: 'child_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[Assert\NotNull(message: 'A parent id should be not null')]
    #[Groups(['read'])]
    #[ApiProperty(attributes: ["openapi_context" => ["type" => "integer"]])]
    public $child;

    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Assert\NotNull(message: 'childSignature should be not null')]
    #[Groups(['read'])]
    private $childSignature;

    #[ORM\Column(type: 'boolean')]
    #[Assert\NotNull(message: 'parentSignature should be not null')]
    #[Groups(['read'])]
    private $parentSignature;

    #[ORM\Column(type: 'integer')]
    #[Groups(['read'])]
    private $weeklyPoint;

    #[ORM\Column(type: 'integer')]
    #[Groups(['read'])]
    private $dollarPerPoint;

    #[ORM\ManyToOne(targetEntity: ContractStatus::class)]
    #[ORM\JoinColumn(name: 'status_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[Assert\NotBlank(message: 'status id should be not null')]
    #[Groups(['read'])]
    #[ApiProperty(attributes: ["openapi_context" => ["type" => "integer"]])]
    private $status;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getParent(): ?User
    {
        return $this->parent;
    }

    public function setParent(?User $parent): self
    {
        $this->parent = $parent;

        return $this;
    }

    public function getChild(): ?User
    {
        return $this->child;
    }

    public function setChild(?User $child): self
    {
        $this->child = $child;

        return $this;
    }

    public function getChildSignature(): ?bool
    {
        return $this->childSignature;
    }

    public function setChildSignature(?bool $childSignature): self
    {
        $this->childSignature = $childSignature;

        return $this;
    }

    public function getParentSignature(): ?bool
    {
        return $this->parentSignature;
    }

    public function setParentSignature(bool $parentSignature): self
    {
        $this->parentSignature = $parentSignature;

        return $this;
    }

    public function getWeeklyPoint(): ?int
    {
        return $this->weeklyPoint;
    }

    public function setWeeklyPoint(int $weeklyPoint): self
    {
        $this->weeklyPoint = $weeklyPoint;

        return $this;
    }

    public function getDollarPerPoint(): ?int
    {
        return $this->dollarPerPoint;
    }

    public function setDollarPerPoint(int $dollarPerPoint): self
    {
        $this->dollarPerPoint = $dollarPerPoint;

        return $this;
    }

    public function getStatus(): ?ContractStatus
    {
        return $this->status;
    }

    public function setStatus(?ContractStatus $status): self
    {
        $this->status = $status;

        return $this;
    }
}
