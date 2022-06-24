<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220624113226 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contract (id INT AUTO_INCREMENT NOT NULL, parent_id INT DEFAULT NULL, child_id INT DEFAULT NULL, status_id INT DEFAULT NULL, content LONGTEXT NOT NULL, child_signature TINYINT(1) DEFAULT NULL, parent_signature TINYINT(1) NOT NULL, weekly_point INT NOT NULL, dollar_per_point INT NOT NULL, INDEX IDX_E98F2859727ACA70 (parent_id), INDEX IDX_E98F2859DD62C21B (child_id), INDEX IDX_E98F28596BF700BD (status_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contract_status (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mission (id INT AUTO_INCREMENT NOT NULL, category_id INT DEFAULT NULL, child_id INT NOT NULL, parent_id INT NOT NULL, child_note_id INT DEFAULT NULL, parent_note_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, points INT NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, INDEX IDX_9067F23C12469DE2 (category_id), INDEX IDX_9067F23CDD62C21B (child_id), INDEX IDX_9067F23C727ACA70 (parent_id), INDEX IDX_9067F23C4459404E (child_note_id), INDEX IDX_9067F23C54A57C13 (parent_note_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE note (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, coefficient DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reward (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, points INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, parent_id INT DEFAULT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, points INT DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), INDEX IDX_8D93D649727ACA70 (parent_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_reward (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, reward_id INT NOT NULL, validate TINYINT(1) DEFAULT NULL, INDEX IDX_2B83696EA76ED395 (user_id), INDEX IDX_2B83696EE466ACA1 (reward_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE contract ADD CONSTRAINT FK_E98F2859727ACA70 FOREIGN KEY (parent_id) REFERENCES user (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE contract ADD CONSTRAINT FK_E98F2859DD62C21B FOREIGN KEY (child_id) REFERENCES user (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE contract ADD CONSTRAINT FK_E98F28596BF700BD FOREIGN KEY (status_id) REFERENCES contract_status (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23C12469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23CDD62C21BDD62C21B FOREIGN KEY (child_id) REFERENCES user (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23C727ACA70727ACA70 FOREIGN KEY (parent_id) REFERENCES user (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23C4459404E FOREIGN KEY (child_note_id) REFERENCES note (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23C54A57C13 FOREIGN KEY (parent_note_id) REFERENCES note (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649727ACA70 FOREIGN KEY (parent_id) REFERENCES user (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE user_reward ADD CONSTRAINT FK_2B83696EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_reward ADD CONSTRAINT FK_2B83696EE466ACA1 FOREIGN KEY (reward_id) REFERENCES reward (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mission DROP FOREIGN KEY FK_9067F23C12469DE2');
        $this->addSql('ALTER TABLE contract DROP FOREIGN KEY FK_E98F28596BF700BD');
        $this->addSql('ALTER TABLE mission DROP FOREIGN KEY FK_9067F23C4459404E');
        $this->addSql('ALTER TABLE mission DROP FOREIGN KEY FK_9067F23C54A57C13');
        $this->addSql('ALTER TABLE user_reward DROP FOREIGN KEY FK_2B83696EE466ACA1');
        $this->addSql('ALTER TABLE contract DROP FOREIGN KEY FK_E98F2859727ACA70');
        $this->addSql('ALTER TABLE contract DROP FOREIGN KEY FK_E98F2859DD62C21B');
        $this->addSql('ALTER TABLE mission DROP FOREIGN KEY FK_9067F23CDD62C21BDD62C21B');
        $this->addSql('ALTER TABLE mission DROP FOREIGN KEY FK_9067F23C727ACA70727ACA70');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649727ACA70');
        $this->addSql('ALTER TABLE user_reward DROP FOREIGN KEY FK_2B83696EA76ED395');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE contract');
        $this->addSql('DROP TABLE contract_status');
        $this->addSql('DROP TABLE mission');
        $this->addSql('DROP TABLE note');
        $this->addSql('DROP TABLE reward');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_reward');
    }
}
