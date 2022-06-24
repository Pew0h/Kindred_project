<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CurrentUserController;
use App\Controller\GetParentList;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get' => [
            "security" => "is_granted('ROLE_PARENT')",
            "security_message" => "Only parent can view all users"
        ],
        'post',
        'current_user' => [
            'path' => '/current_user',
            'method' => 'get',
            'controller' => CurrentUserController::class,
            'pagination_enabled' => false,
        ],
        'parent_list' => [
            'path' => '/parent_list',
            'method' => 'get',
            'controller' => GetParentList::class,
            'pagination_enabled' => false,
        ]
    ],
    itemOperations: [
        'get' => [
            "security" => "is_granted('ROLE_PARENT') or object.id == user.id",
            "security_message" => "Only parent can view this user or the current user"
        ],
        'patch' => [
            "security" => "is_granted('ROLE_PARENT') or object == user",
            "security_message" => "Only parent can modify this user or the current user"
        ],
        'delete' => [
            "security" => "is_granted('ROLE_PARENT') or object.id == user.id",
            "security_message" => "Only parent can delete this user or current user"
        ]
    ],
    normalizationContext: ['groups' => ['read']]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read'])]
    public $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(['read'])]
    #[Assert\NotBlank(message: 'Should not to be empty')]
    #[Assert\Email(message: 'Should be a valid email syntax')]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(['read'])]
    private $roles = ["ROLE_CHILD"];

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: 'Should not to be empty')]
    #[Groups(['read'])]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: 'Should not to be empty')]
    #[Groups(['read'])]
    private $lastname;

    #[ORM\ManyToOne(targetEntity: self::class)]
    #[ORM\JoinColumn(name: 'parent_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[Groups(['read'])]
    #[ApiProperty(attributes: ["openapi_context" => ["type" => "integer"]])]
    private $parent;

    #[SerializedName("password")]
    private $plainPassword;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups(['read'])]
    private $points;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    public function setPlainPassword($plainPassword)
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }


    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getParent(): ?self
    {
        return $this->parent;
    }

    public function setParent(?self $parent): self
    {
        $this->parent = $parent;

        return $this;
    }

    public function getPoints(): ?int
    {
        return $this->points;
    }

    public function setPoints(?int $points): self
    {
        $this->points = $points;

        return $this;
    }
}
