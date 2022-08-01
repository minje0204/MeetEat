CREATE DATABASE a105;
USE 'a105';

CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  `bio` varchar(200) DEFAULT NULL,
  `provider` varchar(50) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`)
);

CREATE TABLE `conference` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `host_id` bigint NOT NULL,
  `call_start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `call_end_time` timestamp NULL DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `max_user_num` int NOT NULL DEFAULT '6',
  `food_tag` varchar(50) DEFAULT NULL,
  `restaurant` int NOT NULL,
  `position` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_conference` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `conference_id` bigint NOT NULL,
  `action` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `conference_id` (`conference_id`),
  CONSTRAINT `user_conference_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_conference_ibfk_2` FOREIGN KEY (`conference_id`) REFERENCES `conference` (`id`)
);

CREATE TABLE `tray` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `conference_id` bigint NOT NULL,
  `images` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tray_ibfk_1` (`user_id`),
  KEY `tray_ibfk_2` (`conference_id`),
  CONSTRAINT `tray_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `tray_ibfk_2` FOREIGN KEY (`conference_id`) REFERENCES `conference` (`id`)
);


CREATE TABLE `friend` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `friend_id` bigint NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

