<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190715163645 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE EventSubscriber');
        $this->addSql('ALTER TABLE article CHANGE picture picture VARCHAR(1000) NOT NULL, CHANGE status status VARCHAR(255) NOT NULL, CHANGE locationx locationx INT NOT NULL, CHANGE locationY locationY INT NOT NULL, CHANGE link link VARCHAR(1000) NOT NULL, CHANGE version version VARCHAR(50) NOT NULL, CHANGE createDate createDate VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', CHANGE picture picture VARCHAR(255) NOT NULL, CHANGE discord discord VARCHAR(255) NOT NULL, CHANGE createDate createDate VARCHAR(255) NOT NULL, CHANGE token token VARCHAR(5000) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE EventSubscriber (id INT AUTO_INCREMENT NOT NULL, eventId INT NOT NULL, userId INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE article CHANGE picture picture VARCHAR(1000) DEFAULT NULL COLLATE utf8mb4_unicode_ci, CHANGE status status VARCHAR(255) DEFAULT \'online\' NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE locationx locationx INT DEFAULT NULL, CHANGE locationY locationY INT DEFAULT NULL, CHANGE link link VARCHAR(1000) DEFAULT NULL COLLATE utf8mb4_unicode_ci, CHANGE version version VARCHAR(50) DEFAULT NULL COLLATE utf8mb4_unicode_ci, CHANGE createDate createDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles VARCHAR(255) NOT NULL COLLATE utf8_general_ci, CHANGE picture picture VARCHAR(255) DEFAULT NULL COLLATE utf8_general_ci, CHANGE discord discord VARCHAR(255) DEFAULT NULL COLLATE utf8_general_ci, CHANGE createDate createDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, CHANGE token token VARCHAR(5000) DEFAULT NULL COLLATE utf8_general_ci');
    }
}
