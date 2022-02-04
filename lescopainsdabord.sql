-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 04 fév. 2022 à 09:40
-- Version du serveur :  5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `lescopainsdabord`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `picture` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `locationx` int(11) DEFAULT NULL,
  `locationY` int(11) DEFAULT NULL,
  `link` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `version` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`id`, `title`, `content`, `author`, `picture`, `type`, `status`, `locationx`, `locationY`, `link`, `version`, `createDate`) VALUES
(46, 'Les copains d\'abord', 'Ce serveur, c\'est une histoire de Copains (oui, avec un grand C). Jouant ensemble sur un ancien serveur, les Copains ne voulaient pas se quitter, et continuer à cuber en groupe ! C\'est ainsi que Les Copains d\'abord vit le jour. Nous jouons en toute liberté ! L\'humour est maître ici. La famille s\'aggrandira grâce à l\'adage \"Les Copains de mes Copains sont mes Copains\".\r\n\r\nComme nous sommes très joueurs, on ne s\'arrête pas là et on s\'amuse aussi sur discord : mini-jeux à l\'écrit, blindtest ou encore jeu de rôles sont au menu.\r\n\r\nLes Copains transforment les lignes de code en histoires, en blagues, en aventures. Alors entrez dans la danse, bienvenue chez nous !', 'Admin', NULL, 'presentation', 'online', NULL, NULL, NULL, NULL, '2019-07-09 09:47:05'),
(99, 'L\'île des Loisirs', '<p>La maison de vacances des Copains d&eacute;m&eacute;nage ! Elle se trouve &agrave; pr&eacute;sent sur l\'&icirc;le des Loisirs.&nbsp;</p>\r\n<p>Sur ce petit bout de terre au milieu d\'un oc&eacute;an chaud et plein de coraux color&eacute;s, vous trouverez la maisonde vacances que vous connaissez d&eacute;j&agrave;, ainsi qu\'une petite cabane de p&ecirc;che toute &eacute;quip&eacute;e. Mais il nous reste encore pas mal d\'espace pour y construire les infrastructures pour d\'autres activit&eacute;s/jeux.</p>', 'admin', 'https://cdn.discordapp.com/attachments/595534722483093504/604247119183740949/2019-07-17_21.33.39.png', 'ground', 'online', 100, 100, NULL, NULL, '2019-07-11 02:13:58'),
(100, 'Toutankharré', '<p style=\"text-align: center;\"><span style=\"color: #e67e23;\"><strong>Toutankharr&eacute;</strong></span></p>\r\n<p style=\"text-align: center;\"><span style=\"color: #e67e23;\"><strong>La Cit&eacute; des Dieux</strong></span></p>\r\n<p>&nbsp;</p>\r\n<p>Au milieu du d&eacute;sert, ses remparts se dressent, encerclant les merveilles de cette cit&eacute;. Si vous n\'avez pas peur d\'avoir un peu de sable dans vos chaussures, alors prenez la route et venez rendre visite &agrave; Anubis. Prenez garde, dans cette &eacute;tendu de sable, parfois les silhouettes vertes sont des cactus...parfois ce sont des creepers (:&nbsp;</p>', 'admin', 'https://cdn.discordapp.com/attachments/595534722483093504/604248396823527443/2019-07-17_20.56.59.png', 'ground', 'online', 100, 100, NULL, NULL, '2019-07-11 02:13:58'),
(101, 'Minamium', '<p style=\"text-align: center;\"><span style=\"color: #34495e;\"><strong>M<span style=\"color: #95a5a6;\">i</span><span style=\"color: #000000;\">n</span>a<span style=\"color: #7e8c8d;\">m</span>i<span style=\"background-color: #ffffff; color: #2b3e50;\">u</span><span style=\"color: #7e8c8d;\">m</span></strong></span></p>\r\n<p>C\'&eacute;tait une cit&eacute; souterraine, il y a bien longtemps, maintenant elle s\'affiche au grand air. Ses &eacute;choppes, son port, et toutes les cr&eacute;ations de Pocry vous feront tomber sous son charme. Toute proche du premier spawn,vous n\'avez aucune excuse pour ne pas visiter cette ville incontournable !&nbsp;&nbsp;</p>', 'admin', 'https://cdn.discordapp.com/attachments/595534722483093504/604250369643642890/2019-07-17_21.23.00.png', 'ground', 'online', 100, 100, NULL, NULL, '2019-07-11 02:13:58'),
(102, 'Tanak', '<p style=\"text-align: center;\"><strong><span style=\"color: #27ae60;\">T</span><span style=\"color: #8a4e12;\">ana</span><span style=\"color: #27ae60;\">K</span></strong></p>\r\n<p>Ah, c\'est s&ucirc;r, il y en a des arbres dans notre monde de copains : des ch&ecirc;nes robustes, des sapins colossaux, des acajous qui donnent le vertige...mais ces gardiens de la for&ecirc;t passent pour des brins d\'herbe &agrave; c&ocirc;t&eacute; de Tanak. Tanak est l\'arbre le plus grand et le mieux &eacute;quip&eacute; que le bois n\'ait jamais connu. Vous y trouverez m&ecirc;me un creux dans les branchages assez grand pour p&ecirc;cher entre amis.&nbsp;</p>', 'admin', 'https://cdn.discordapp.com/attachments/595534722483093504/604252361736585237/2019-07-17_21.29.22.png', 'ground', 'online', 100, 100, NULL, NULL, '2019-07-11 02:13:58'),
(103, 'Le Temple de Thot', '<p>La Grande Biblioth&egrave;que</p>\r\n<p>Situ&eacute;e dans l\'enceinte de Toutankharr&eacute;, le temple de Thot est le centre de tous les savoirs. Tous les ouvrages n&eacute;cessaires &agrave; l\'apprentissage de l\'Histoire, de nouvelles comp&eacute;tences, pour en apprendre davantage sur le faune et la flore se trouvent sur les &eacute;tag&egrave;res vertigineuses de ce temple. C\'est une biblioth&egrave;que, mais aussi un lieu d\'&eacute;change pour les plus sages, qui pourront s\'y r&eacute;unir dans les meilleures conditions afin de discuter, d&eacute;battre ou apprendre.</p>', 'admin', 'https://cdn.discordapp.com/attachments/595534722483093504/604252662334226442/2019-07-17_20.52.06.png', 'ground', 'online', 100, 100, NULL, NULL, '2019-07-11 02:13:58'),
(139, 'Home', '<p style=\"text-align: center;\">Home est plugin Minecraft qui permet de d&eacute;finir des endroits sp&eacute;cifiques (Maisons, spawns, warps) et de s\'y t&eacute;l&eacute;porter en une commande.</p>\r\n<p style=\"text-align: left;\">&nbsp;</p>\r\n<p style=\"text-align: left; padding-left: 40px;\"><span style=\"text-decoration: underline; font-size: 18pt; color: #2880b9;\"><strong>Commandes :</strong></span></p>\r\n<ul>\r\n<li style=\"list-style-type: none;\">\r\n<ul>\r\n<li style=\"box-sizing: border-box;\"><strong>/sethome &lt;<span style=\"font-size: 10pt;\">NomDuHome</span>&gt;</strong> <span style=\"color: #c0392b;\">(<span style=\"font-size: 10pt;\">permet de d&eacute;finir la maison du joueur sur le block o&ugrave; il se trouve</span>)</span></li>\r\n<li style=\"box-sizing: border-box;\"><strong>/home &lt;<span style=\"font-size: 10pt;\">NomDuHome</span>&gt;</strong>&nbsp;<span style=\"color: #c0392b;\">(<span style=\"font-size: 10pt;\">permet au joueur de se t&eacute;l&eacute;porter &agrave; sa maison &agrave; condition que celle-si soit d&eacute;finie</span>)</span></li>\r\n<li style=\"box-sizing: border-box;\"><strong>/setwarp &lt;<span style=\"font-size: 10pt;\">NomDuWarp</span>&gt;</strong>&nbsp;<span style=\"color: #c0392b;\">(<span style=\"font-size: 10pt;\">permet au joueur de d&eacute;finir un warp commun &agrave; tout les joueurs</span>)</span></li>\r\n<li style=\"box-sizing: border-box;\"><strong>/warp &lt;<span style=\"font-size: 10pt;\">NomDuWarp</span>&gt;</strong>&nbsp;<span style=\"color: #c0392b;\">(<span style=\"font-size: 10pt;\">permet au joueur de se t&eacute;l&eacute;porter au warp pr&eacute;cis&eacute; en param&egrave;tre</span>)</span></li>\r\n<li style=\"box-sizing: border-box;\"><strong>/setspawn &lt;<span style=\"font-size: 10pt;\">NomDuSpawn</span>&gt;</strong>&nbsp;<span style=\"color: #c0392b;\">(<span style=\"font-size: 10pt;\">permet de d&eacute;finir un spawn publique &agrave; tout les joueurs</span>)</span></li>\r\n<li style=\"box-sizing: border-box;\"><strong>/spawn &lt;<span style=\"font-size: 10pt;\">NomDuSpawn</span>&gt;</strong>&nbsp;<span style=\"color: #c0392b;\">(<span style=\"font-size: 10pt;\">permet de se t&eacute;l&eacute;porter au spawn</span>)</span></li>\r\n</ul>\r\n</li>\r\n</ul>', 'admin', 'http://guejarsierra.es/fotos/2014032113164949584e862905f47c5ece810e81179828.jpg', 'plugin', 'online', NULL, NULL, 'http://localhost:4200', '1.14', '2019-07-11 02:29:12'),
(140, 'MC Mmo', '<p style=\"text-align: center;\">Mc Mmo introduit dans Minecraft des comp&eacute;tences et des comp&eacute;tences am&eacute;liorant les m&eacute;canismes natifs tout en prolongeant le gameplay de mani&egrave;re naturelle et ne n&eacute;cessitant aucun mods client.&nbsp;Mc Mmo offre des exp&eacute;riences RPG, des classements et des events enti&egrave;rement&nbsp;configurables.</p>\r\n<p style=\"text-align: left;\">&nbsp;</p>\r\n<p style=\"text-align: left; padding-left: 40px;\"><strong style=\"color: #2880b9;\"><span style=\"text-decoration: underline;\"><span style=\"font-size: 18pt;\">Commandes g&eacute;n&eacute;rales :&nbsp;</span></span></strong></p>\r\n<ul>\r\n<li style=\"list-style-type: none;\">\r\n<ul>\r\n<li><strong>/mcmmo</strong> <span style=\"color: #c0392b;\">(<span style=\"font-size: 10pt;\">Affiche une br&egrave;ve description du mod et les commandes disponibles</span>)</span></li>\r\n<li><strong>/mcstats</strong>&nbsp;<span style=\"color: #c0392b;\">(<span style=\"font-size: 10pt;\">Affiche vos statistiques et xp Mc Mmo</span>)</span></li>\r\n<li><strong>/mctop</strong>&nbsp;<span style=\"color: #c0392b;\">(<span style=\"font-size: 10pt;\">Affiche le classement des joueurs</span>)</span></li>\r\n<li><strong>/mcrank</strong>&nbsp;<span style=\"color: #c0392b;\">(<span style=\"font-size: 10pt;\">V&eacute;rifie votre position dans le classement du serveur</span>)</span></li>\r\n</ul>\r\n</li>\r\n</ul>\r\n<p style=\"text-align: left; padding-left: 40px;\"><span style=\"color: #2880b9;\"><strong><span style=\"text-decoration: underline;\"><span style=\"font-size: 18pt;\">Commandes des skills :&nbsp;</span></span></strong></span></p>\r\n<ul>\r\n<li style=\"list-style-type: none;\">\r\n<ul>\r\n<li><strong>/acrobatics</strong></li>\r\n<li><strong>/archery</strong></li>\r\n<li><strong>/axes</strong></li>\r\n<li><strong>/excavation</strong></li>\r\n<li><strong>/fishing</strong></li>\r\n<li><strong>/herbalism</strong></li>\r\n<li><strong>/mining</strong></li>\r\n<li><strong>/repair</strong></li>\r\n<li><strong>/swords</strong></li>\r\n<li><strong>/taming</strong></li>\r\n<li><strong>/unarmed</strong></li>\r\n<li><strong>/woodcutting</strong></li>\r\n</ul>\r\n</li>\r\n</ul>', 'admin', 'https://media.forgecdn.net/avatars/66/240/636163055781370526.png', 'plugin', 'online', NULL, NULL, 'http://localhost:4200', '1.14', '2019-07-11 02:29:12'),
(141, 'Test', '<p>Test</p>', 'member', 'https://banner2.kisspng.com/20180404/krq/kisspng-youtube-google-play-cumbia-sunglasses-emoji-5ac518fed6d799.20851679152286643088.jpg', 'ground', 'online', 1, 1, NULL, NULL, '2019-08-03 10:04:23');

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(10000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `support` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `event`
--

INSERT INTO `event` (`id`, `title`, `content`, `support`, `author`, `status`, `date`, `time`, `createDate`) VALUES
(39, 'Blindtest d\'Orphee', '<p>La revanche ! Orphee va monter le niveau et nous a pr&eacute;par&eacute; une playlist d\'enfer !</p>', 'Blind Test', 'admin', 'active', '2019-08-20', '19:30', '2019-07-26 07:16:39'),
(40, 'Démarrage du Jeu de Rôle d\'Esao', '<p>C\'est le d&eacute;but de l\'aventure pour les 4 Copains qui vont d&eacute;couvrir la province de Maltol et d&eacute;couvrir les personnages de leur camarade de jeu !</p>', 'Jeux de rôles', 'admin', 'active', '2019-08-15', '20:30', '2019-07-26 07:19:52'),
(41, 'Chapitre 2', '<p>Suite de l\'aventure</p>', 'Jeux de rôles', 'admin', 'active', '2019-08-23', '20:30', '2019-07-26 07:20:31'),
(42, 'Chapitre 3 ', '<p>Suite de l\'aventure. Combien de Copains seront encore en vie pour r&eacute;soudre l\'&eacute;nigme ?</p>', 'Jeux de rôles', 'admin', 'active', '2019-09-02', '20:30', '2019-07-26 07:22:02'),
(43, 'A vos crayons ! ', '<p>Et on s\'applique !!! (:</p>', 'Scriblio', 'admin', 'archive', '2019-07-29', '16:30', '2019-07-26 07:23:28'),
(44, 'Blindtest d\'Esbroufe', '<p>Victoire &eacute;crasante d\'Orphee !</p>', 'Blind Test', 'admin', 'archive', '2019-04-04', '17:30', '2019-07-26 07:34:40'),
(45, 'Dessinez c\'est gagné ! ', '<p>Ah, les artistes...</p>', 'Scriblio', 'admin', 'archive', '2019-06-13', '21:30', '2019-07-26 07:35:51'),
(46, 'Cache-cache', '<p>S\'amuser &agrave; se cacher comme des gamins !! (:</p>', 'Minecraft', 'admin', 'archive', '2019-06-28', '16:00', '2019-07-26 07:36:45'),
(47, 'Trouve Esbroufe dans Minamium !', '<p>Aujourd\'hui d&eacute;couvre le village de Pocry autrement : Il faudra tout regarder car Esbroufe se cache probablement dans un buisson !</p>\n<p><strong><span style=\"color: #c0392b;\">ET ON NE TRICHE PAS ! ! !</span></strong></p>\n<p>F&eacute;licitations &agrave; Neiikow qui remporte une pioche \"Oeil de Lynx\" ! Orph&eacute;e repart quand m&ecirc;me avec un beau rosier (:</p>', 'Minecraft', 'admin', 'archive', '2019-07-26', '18:30', '2019-07-26 07:41:53'),
(48, 'Spliff', '<p>Un classique</p>', 'Minecraft', 'admin', 'archive', '2019-04-20', '19:00', '2019-07-26 07:49:55'),
(49, 'Test', '<p>Test</p>', 'Autre', 'member', 'archive', '2019-07-19', '01:01', '2019-07-31 14:22:21');

-- --------------------------------------------------------

--
-- Structure de la table `event_subscriber`
--

DROP TABLE IF EXISTS `event_subscriber`;
CREATE TABLE IF NOT EXISTS `event_subscriber` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `event_subscriber`
--

INSERT INTO `event_subscriber` (`id`, `eventId`, `userId`) VALUES
(7, 40, 18);

-- --------------------------------------------------------

--
-- Structure de la table `migration_versions`
--

DROP TABLE IF EXISTS `migration_versions`;
CREATE TABLE IF NOT EXISTS `migration_versions` (
  `version` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `executed_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valid` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_9BACE7E1C74F2195` (`refresh_token`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`id`, `refresh_token`, `username`, `valid`) VALUES
(1, '6c5f3dff3c1d76fc8e998902ec0f231acb426cf991733c84b323f4496aee860eba88aae60fe78fb0ac17fc630eef8e7d3b4cd6d839cf55beee26fdcf72043700', 'admin', '2019-08-17 11:03:28'),
(2, '79f1a1216e3f7bfcaf1f6f157fe9f08ab010fc1fed449ad9cd0a242d870ce055eed5b0d8b390aa19c1c84d1be43bf07b63c6a6be736bf96116fcbb89d9f2cbcc', 'user', '2019-08-17 12:00:01'),
(3, 'd95a59cb2a06cc5dd44ad6ec2bd0d04498853c082edc3a986e2a4d3990c77c3177d0e8c722462145c4f479d9fe013aee569b5822e11add7ecac60d791ee9674d', 'member', '2019-08-17 12:00:48'),
(4, '860a286515e80ea5e522d26323858986e8f3d92224ce15e991e438e0806148a56fba197d46d05985e7c59ce718adde960d17439f4c07cccd1fb26be144925d9b', 'admin', '2019-08-17 12:04:57');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `discord` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `token` varchar(5000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `roles`, `password`, `email`, `picture`, `discord`, `token`, `createDate`) VALUES
(18, 'admin', 'a:3:{i:0;s:10:\"ROLE_ADMIN\";i:1;s:11:\"ROLE_MEMBER\";i:2;s:9:\"ROLE_USER\";}', 'KmzYzbZZnVvBkSOu9NcUO+TLWq46Qd7LE5teWtBIDFPXq+KTK8M9DKQpCGXukY4tCvuvl2d4/7eJ2mkb4SrUfg==', 'admin@email.com', 'https://banner2.kisspng.com/20180404/krq/kisspng-youtube-google-play-cumbia-sunglasses-emoji-5ac518fed6d799.20851679152286643088.jpg', '7429', NULL, '2019-07-09 11:00:43'),
(20, 'member', 'a:2:{i:0;s:11:\"ROLE_MEMBER\";i:1;s:9:\"ROLE_USER\";}', 'KmzYzbZZnVvBkSOu9NcUO+TLWq46Qd7LE5teWtBIDFPXq+KTK8M9DKQpCGXukY4tCvuvl2d4/7eJ2mkb4SrUfg==', 'member@email.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdT-Bm3-C28_87-EZCAq1UPZpK0peqVPPManDO4dlk-BBNjOLB', NULL, NULL, '2019-07-09 11:00:43'),
(27, 'user', 'a:1:{i:0;s:9:\"ROLE_USER\";}', 'KmzYzbZZnVvBkSOu9NcUO+TLWq46Qd7LE5teWtBIDFPXq+KTK8M9DKQpCGXukY4tCvuvl2d4/7eJ2mkb4SrUfg==', 'user@email.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdT-Bm3-C28_87-EZCAq1UPZpK0peqVPPManDO4dlk-BBNjOLB', NULL, NULL, '2019-07-10 12:58:37');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
