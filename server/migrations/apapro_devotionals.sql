-- Migration: Create apapro_devotionals table
-- Run this in your MySQL database: mysql -u root -p cfwm_db < server/migrations/apapro_devotionals.sql

CREATE TABLE IF NOT EXISTS `apapro_devotionals` (
  `id` varchar(36) NOT NULL,
  `date` date NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `quote` text NOT NULL,
  `scripture` text NOT NULL,
  `scripture_ref` varchar(255) NOT NULL,
  `content` json NOT NULL COMMENT 'Array of paragraph strings',
  `prophetic` text NOT NULL,
  `confession` text NOT NULL,
  `further_study` json NOT NULL COMMENT 'Array of Bible reference strings',
  `bible_plan` varchar(255) DEFAULT NULL,
  `declaration` varchar(500) DEFAULT NULL,
  `declaration_ref` varchar(255) DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_apapro_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
