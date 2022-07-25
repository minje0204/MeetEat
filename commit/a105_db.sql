CREATE DATABASE a105;
USE 'a105';

CREATE TABLE `user` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  `bio` varchar(200) DEFAULT NULL,
  `provider` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`)
);

CREATE TABLE `conference` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `host_idx` int NOT NULL,
  `call_start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `call_end_time` timestamp NULL DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `status` int DEFAULT '0',
  `max_user_num` int NOT NULL DEFAULT '6',
  `food_tag` varchar(50) DEFAULT NULL,
  `restaurant` int NOT NULL,
  PRIMARY KEY (`idx`)
);

CREATE TABLE `user_conference` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `user_idx` int NOT NULL,
  `conference_idx` int NOT NULL,
  `action` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idx`),
  KEY `user_idx` (`user_idx`),
  KEY `conference_idx` (`conference_idx`),
  CONSTRAINT `user_conference_ibfk_1` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`),
  CONSTRAINT `user_conference_ibfk_2` FOREIGN KEY (`conference_idx`) REFERENCES `conference` (`idx`)
);

CREATE TABLE `tray` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `user_idx` int NOT NULL,
  `conference_idx` int NOT NULL,
  `images` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `tray_ibfk_1` (`user_idx`),
  KEY `tray_ibfk_2` (`conference_idx`),
  CONSTRAINT `tray_ibfk_1` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`),
  CONSTRAINT `tray_ibfk_2` FOREIGN KEY (`conference_idx`) REFERENCES `conference` (`idx`)
);


CREATE TABLE `friend` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `user_idx` int NOT NULL,
  `friend_idx` int NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `is_read`int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idx`),
  KEY `user_idx` (`user_idx`),
  CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`)
);

