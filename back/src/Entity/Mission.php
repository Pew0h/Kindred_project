<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MissionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: MissionRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get' => [
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can view all missions"
        ],
        'post' => [
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can create a mission"
        ]
    ],
    itemOperations: [
        'get' => [
            "security" => "is_granted('ROLE_PARENT') or object.child == user",
            "security_message" => "Only parent can view this mission or the child assigned to the mission"
        ],
        'patch' => [
            "security" => "is_granted('ROLE_PARENT') or object.child == user",
            "security_message" => "Only parent can modify this mission or the child assigned to the mission"
        ],
        'delete' => [
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can delete this mission"
        ]
    ],
    denormalizationContext: ['groups' => ['write']],
    normalizationContext: ['groups' => ['read']]
)]
class Mission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read', 'write'])]
    private $name;

    #[ORM\Column(type: 'integer')]
    #[Groups(['read', 'write'])]
    private $points;

    #[ORM\Column(type: 'date')]
    #[Groups(['read', 'write'])]
    #[ApiProperty(attributes: ["openapi_context" => ["type" => "string", "format" => "date"]])]
    private $startDate;

    #[ORM\Column(type: 'date')]
    #[Groups(['read', 'write'])]
    #[ApiProperty(attributes: ["openapi_context" => ["type" => "string", "format" => "date"]])]
    private $endDate;

    #[ORM\ManyToOne(targetEntity: Category::class)]
    #[ORM\JoinColumn(name: 'category_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[ApiProperty(attributes: ["openapi_context" => ["type" => "integer"], "json_schema_context" => ["type" => "integer"]])]
    #[Groups(['read', 'write'])]
    private $category;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[ORM\JoinColumn(name: 'child_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[ApiProperty(attributes: ["openapi_context" => ["type" => "integer"], "json_schema_context" => ["type" => "integer"]])]
    #[Groups(['read', 'write'])]
    private $child;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[ORM\JoinColumn(name: 'parent_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[ApiProperty(attributes: ["openapi_context" => ["type" => "integer"], "json_schema_context" => ["type" => "integer"]])]
    #[Groups(['read', 'write'])]
    private $parent;

    #[ORM\ManyToOne(targetEntity: Note::class)]
    #[ORM\JoinColumn(name: 'child_note_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[ApiProperty(attributes: ["openapi_context" => ["type" => "integer"], "json_schema_context" => ["type" => "integer"]])]
    #[Groups(['read', 'write'])]
    private $childNote;

    #[ORM\ManyToOne(targetEntity: Note::class)]
    #[ORM\JoinColumn(name: 'parent_note_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[ApiProperty(attributes: ["openapi_context" => ["type" => "integer"], "json_schema_context" => ["type" => "integer"]])]
    #[Groups(['read', 'write'])]
    private $parentNote;

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

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $start_date): self
    {
        $this->startDate = $start_date;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $end_date): self
    {
        $this->endDate = $end_date;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

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

    public function getParent(): ?User
    {
        return $this->parent;
    }

    public function setParent(?User $parent): self
    {
        $this->parent = $parent;

        return $this;
    }

    public function getChildNote(): ?Note
    {
        return $this->childNote;
    }

    public function setChildNote(?Note $child_note): self
    {
        $this->childNote = $child_note;

        return $this;
    }

    public function getParentNote(): ?Note
    {
        return $this->parentNote;
    }

    public function setParentNote(?Note $parent_note): self
    {
        $this->parentNote = $parent_note;

        return $this;
    }
}
