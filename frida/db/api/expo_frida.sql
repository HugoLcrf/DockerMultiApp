-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 22 mars 2024 à 11:28
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `expo_frida`
--

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` text NOT NULL,
  `prenom` text NOT NULL,
  `mail` text NOT NULL,
  `date` date NOT NULL,
  `heure` time NOT NULL,
  `adulte` int NOT NULL,
  `enfant` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `nom`, `prenom`, `mail`, `date`, `heure`, `adulte`, `enfant`) VALUES
(1, 'Lynn', 'Sarah', 'sarah@gmail.com', '2024-03-15', '13:00:00', 1, 0),
(2, 'Love', 'Lynda', 'Lyndalove@gmail.com', '2024-03-16', '15:00:00', 2, 1),
(3, 'Pink', 'Jane', 'pinkgirl@gmail.com', '2024-03-16', '13:00:00', 1, 3),
(4, 'Queen', 'Brenda', 'Brendoline@gmail.com', '2024-03-15', '15:00:00', 4, 2),
(5, 'chien', 'sup', 'bu', '0000-00-00', '00:00:00', 0, 0),
(6, 'iench', 'supp', 'ceihefv', '0000-00-00', '00:00:00', 0, 0),
(21, 'dzkj', 'ojcfs', 'kfz@cbsh', '2024-03-14', '09:06:00', 1, 0),
(22, 'dzkj', 'ojcfs', 'kfz@cbsh', '2024-03-14', '09:06:00', 1, 0),
(23, 'dzkj', 'ojcfs', 'kfz@cbsh', '2024-03-14', '09:06:00', 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `mdp` varchar(300) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `login`, `mdp`) VALUES
(1, 'admin', '$2y$10$ze8QOZ2li74sYrFi1UT8auJH/U.T4YpO.gHxF5jmFZb0KqKAow9oO');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
