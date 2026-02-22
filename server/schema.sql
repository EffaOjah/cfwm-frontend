-- MySQL dump 10.13  Distrib 9.6.0, for macos26.2 (arm64)
--
-- Host: localhost    Database: cfwm_db
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '083938d6-06b6-11f1-8b0c-6334dbadd41d:1-160';

--
-- Table structure for table `apapro_devotionals`
--

DROP TABLE IF EXISTS `apapro_devotionals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apapro_devotionals` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apapro_devotionals`
--

LOCK TABLES `apapro_devotionals` WRITE;
/*!40000 ALTER TABLE `apapro_devotionals` DISABLE KEYS */;
INSERT INTO `apapro_devotionals` VALUES ('26666ab0-845a-41a2-b396-b77cb12ccfa6','2026-02-21','FOLLOW THE PATTERN',NULL,'Success leaves patterns, and patterns can be learned and reproduced.','“That ye be not slothful, but followers of them who through faith and patience inherit the promises.”','Hebrews 6:12 (KJV)','[\"One of the greatest truths you must embrace is that success can be duplicated. Those who are excelling in any field are not necessarily better than you, they are simply applying principles consistently. God has wired humanity with similar faculties and capacities. What one person has learned to do, another can learn within reason. The difference is often knowledge, discipline, faith, and patience. Scripture warns against slothfulness and commands us to follow those who inherit promises through faith and endurance. Patterns matter.\", \"Jesus reinforced this principle when He declared that whoever believes in Him would do the works He did and even greater works. That statement eliminates excuses. Kingdom exploits are not exclusive privileges reserved for a select few. They are accessible realities for those who align with divine principles. Paul understood this when he said, “Be ye followers of me, even as I also am of Christ.” He did not position himself as an exception but as an example. Excellence in the Kingdom is reproducible when the pattern is embraced.\", \"The Bible confirms this pattern repeatedly. Joshua followed Moses and stepped into leadership with the same divine backing (Joshua 1:5–7). Elisha followed Elijah and received a double portion of his spirit (2 Kings 2:9–15). Timothy followed Paul and became a faithful steward of the gospel (2 Timothy 2:2). The early church followed Christ’s instruction and walked in signs and wonders (Acts 2:42–43). Scripture consistently shows that when divine patterns are followed, divine results are produced.\", \"Anything good you see in another life is proof of possibility. Anything destructive you observe is instruction on what to avoid. There are things to learn and things to unlearn. God is no respecter of persons. If He manifested Himself through someone else, it is an invitation for you to seek Him with expectation. Study excellence. Practice discipline. Imitate faith. Success in the Kingdom is not accidental, it is patterned. Learn the pattern and execute it.\"]','I declare that you receive the capacity, discipline, and grace to reproduce every good pattern you have observed.','Success can be duplicated. Excellence can be learned. I follow godly patterns, and I inherit promises through faith and patience.','[\"Acts 10:34–35\", \"1 Corinthians 11:1\", \"John 14:12\", \"Hebrews 6:12\"]','Jeremiah 37–39','LOVE SHOULD NOT LEAD YOU INTO A LOSS','1 Corinthians 16:14','published','2026-02-22 17:12:50','2026-02-22 17:12:50'),('45a1ee3c-e703-4469-9ecc-4ee6146f047a','2026-02-20','BE STILL',NULL,'Stillness is not weakness, it is controlled strength under pressure.','“Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.”','Psalm 46:10 (KJV)','[\"To be still is not to be passive. It is to remain calm in the face of negative outcomes and unsettling experiences. It is to refuse to be reactive when circumstances attempt to provoke you. Many people react emotionally, but strength is found in response. You may not control what happens, but you always control how you respond. Stillness is the discipline of choosing strength over panic.\", \"To respond from a place of confidence that says I am untouchable, I am unstoppable, I am invincible in Christ, is true stillness. It is knowing that outcomes do not define you and chaos does not intimidate you. Stillness is anchored in identity. It is resting in the awareness that God is sovereign and actively involved in your affairs.\", \"Scripture supports this posture. Psalm 46:10 commands stillness rooted in divine supremacy. God has not given us the spirit of fear but of power, love, and a sound mind (2 Timothy 1:7). Perfect love casts out fear (1 John 4:18). The Lord fights for you, and you shall hold your peace (Exodus 14:14). Stillness is sustained by love, empowered by strength, and protected by a sound mind.\", \"God will be exalted in the heavens and manifested in the earth. Spiritual victories will translate into physical realities. Refuse to panic. Refuse to surrender to fear. You are not at the mercy of your circumstances. You are governed by divine authority. Choose your response. Let it be calm. Let it be confident. Let it be stillness.\"]','I declare that peace governs your heart and calmness defines your response. Every storm loses its power over you.','I choose to be still. I respond with strength and clarity. God is exalted in my life, and I walk in peace and victory.','[\"Psalm 46\", \"2 Timothy 1:7\", \"1 John 4:18\", \"Exodus 14:14\"]','Jeremiah 37–39','LET YOUR CORRECTION NEVER TURN TO DESTRUCTION','2 Timothy 2:24–25','published','2026-02-22 18:11:05','2026-02-22 18:11:05'),('98ae3ec1-8541-4792-8eb9-d4ad21e1e12f','2026-02-19','EMPOWERED BY THE SPIRIT',NULL,'When the Spirit is poured out, limitation expires and revelation begins.','“And it shall come to pass afterward, that I will pour out my spirit upon all flesh…”','Joel 2:28 (KJV)','[\"The outpouring of His Spirit is God’s declaration that you are not meant to live an ordinary life. When the Spirit is poured out, prophecy, dreams, and visions follow. Prophecy is heaven speaking through human vessels. Dreams are divine strategy revealed in the place of rest. Visions are glimpses into God’s intended future. These are not mystical extras, they are signs that the Spirit is active and that you are connected to divine intelligence.\", \"The relevance is profound. Without revelation, people drift. Without divine insight, purpose is blurred. But when the Spirit rests upon you, clarity replaces confusion. Direction replaces wandering. Confidence replaces fear. You are no longer guessing your way through life. You are moving with insight. The Spirit elevates perception and empowers execution. What you could not see before becomes clear. What once intimidated you becomes manageable because heaven is backing you.\", \"Scripture confirms this pattern. Joel prophesied the outpouring and its results (Joel 2:28–29). Peter declared its fulfilment at Pentecost when boldness replaced fear (Acts 2:16–18). Joseph dreamed and rose from prison to palace (Genesis 37:5–10; 41:39–41). Daniel saw visions that influenced kingdoms (Daniel 7:1). Paul received a vision that redirected his mission and opened new territories (Acts 16:9). Revelation consistently precedes elevation.\", \"The implication is simple and powerful. You are not meant to operate blindly. The Spirit of God in you is your advantage. Expect inspired ideas. Expect strategic insight. Expect divine alignment. The outpouring is not history, it is present reality. You carry the Spirit. Therefore you carry clarity. Walk boldly. Speak confidently. See beyond the obvious. The Spirit has been poured out, and you are empowered.\"]','I declare that your spiritual perception is sharpened and divine revelation will guide every step you take.','The Spirit of God empowers me. I walk in clarity, direction, and boldness. I receive divine insight for every season of my life.','[\"Joel 2:28–29\", \"Acts 2:16–18\", \"Daniel 7:1\", \"Acts 16:9\"]','Jeremiah 34–36','LOVE SHOULD NOT LEAD YOU INTO A LOSS','1 Corinthians 16:14','published','2026-02-22 18:29:00','2026-02-22 18:29:00'),('c5454a36-75ef-49d0-942a-990da9309986','2026-02-22','THUS SAITH THE LORD',NULL,'When God speaks, everything listens.','“God hath spoken once; twice have I heard this; that power belongeth unto God.”','Psalm 62:11 (KJV)','[\"The most powerful statement on earth is “Thus saith the Lord.” When God speaks, authority is released. In Genesis, God spoke to the earth, the sea, the plants, and the animals, and everything responded accordingly. Creation was structured to obey His voice. When God speaks concerning your finances, your health, your destiny, or your challenges, that word carries final authority because power belongs to Him. Nothing is beyond the jurisdiction of His voice.\", \"When God speaks, faith is born. Faith is not emotional optimism; it is confidence rooted in divine utterance. The Bible declares that whatsoever is born of God overcomes the world, and this victory is our faith. The voice of God produces faith, and within every God-breathed word is the inherent power to manifest what it declares. When you receive a word from God and hold it in trust, you are carrying the seed of manifestation.\", \"Scripture confirms the potency of God’s word. Balaam declared that God is not a man that He should lie (Numbers 23:19). Isaiah affirmed that His word will not return void but will accomplish its purpose (Isaiah 55:11). Creation itself came into existence by His command (Genesis 1:3). The centurion understood authority when he said, “Speak the word only,” and healing occurred instantly (Matthew 8:8–13). God’s word consistently produces results when believed and applied.\", \"If you are facing difficulty, seek a word from God. It may come through Scripture, through prayer, through a message, or through a Spirit-inspired insight. How it comes is secondary. What matters is that you discern it, receive it, and act on it. Faith responds by speaking what God has spoken. As Paul wrote, “We believe, and therefore speak.” When God’s promise becomes your confession, it carries the same authority. Take His word, meditate on it, declare it, and watch circumstances align. Thus saith the Lord settles the matter.\"]','I declare that you hear clearly and receive accurately every word God speaks concerning your life. Divine instruction will guide your steps.','I am sensitive to the voice of God. I receive His word, I believe it, and I speak it in faith. What God has spoken over my life shall manifest.','[\"Numbers 23:19\", \"Isaiah 55:11\", \"1 John 5:4 2\", \"Corinthians 4:13\"]','Jeremiah 43–45','LET YOUR CORRECTION NEVER TURN TO DESTRUCTION','2 Timothy 2:24–25','published','2026-02-22 17:36:34','2026-02-22 18:53:01');
/*!40000 ALTER TABLE `apapro_devotionals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branches` (
  `id` varchar(36) NOT NULL,
  `district_id` varchar(36) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `address` text,
  `map_url` text,
  `pastor` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_headquarters` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `district_id` (`district_id`),
  CONSTRAINT `branches_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES ('19404237-13de-43b2-a713-279617e7d100',NULL,'Test Branch Updated Fixed','Test Address Updated Fixed',NULL,'Test Branch Pastor Updated Fixed','',NULL,0,'2026-02-18 17:14:32','2026-02-22 10:46:58'),('5dfb2906-8eb4-4a37-83d3-84c218164c9b',NULL,'Headquarters','Jesus Power House, Headquarters',NULL,'Rev. Dr. Nick Ezeh',NULL,NULL,1,'2026-02-15 09:37:09','2026-02-15 09:37:09'),('5efda1ef-a63b-4ccc-a071-75fd294a757d',NULL,'Akwa 1','New Estate',NULL,'Pst. Charles Ofor','9429882822','https://res.cloudinary.com/ds8zajdfm/image/upload/v1771757551/cfwm/nkonjk82lwu9aje0jcfj.jpg',0,'2026-02-18 17:20:20','2026-02-22 10:52:31'),('8e3f41c4-9a13-4e2e-b84c-53c8b9a24814',NULL,'Ikeja Branch','45 Allen Avenue, Ikeja, Lagos',NULL,'Pst. Michael Smith','+234 801 111 1111',NULL,0,'2026-02-15 09:37:09','2026-02-15 09:37:09'),('a72e5b79-7955-4f19-afe2-70e7bed4f475',NULL,'Auka 1','11 Agba road',NULL,'Pst. Blessed Okafor','082939393939','',0,'2026-02-18 17:14:38','2026-02-18 17:14:38'),('ec46d58e-39b6-47b8-a495-84dc5f0488f4',NULL,'Map Test Branch','123 Map St','https://maps.google.com/?q=test',NULL,NULL,NULL,0,'2026-02-15 09:49:03','2026-02-15 09:49:03');
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts`
--

DROP TABLE IF EXISTS `districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `districts` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `head_pastor` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts`
--

LOCK TABLES `districts` WRITE;
/*!40000 ALTER TABLE `districts` DISABLE KEYS */;
/*!40000 ALTER TABLE `districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `event_date` date NOT NULL,
  `event_time` time DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category` varchar(100) DEFAULT 'Church Event',
  `subtitle` varchar(255) DEFAULT NULL,
  `highlights` text,
  `organizer` varchar(255) DEFAULT 'CFWM',
  `status` enum('draft','published') DEFAULT 'published',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_event_title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES ('b1728a11-4e49-43c3-978d-d40d2a8bc40b','Rock Revival','Morning Session:\r\n9am >> 12noon\r\nEvening Session:\r\n5pm>\r\nHoly Ghost Time\r\nSunday Session:\r\n8am Prompt\r\n\r\nVenue: CHRIST FOR THE WORLD MISSION INC. WORLD HQTRS.\r\n#5 Asim Oko Street, off Parliamentary Extension.Calabar, Cross River State, Nigeria\r\n\r\nCheck the flier for more details','2026-03-17','17:00:00','Christ for the world mission int\'l world headquaters','https://res.cloudinary.com/ds8zajdfm/image/upload/v1771760521/cfwm/um1wdgy3qayybr3dcets.jpg','2026-02-22 11:42:02','2026-02-22 16:17:44','Special Program','Rock Revival Stage 16','* Lilian Nneji - Lagos * Pastor Kingley Ike - Abuja * Rev. Dr.Yinka Yusuf - Abuja * Bishop Miracle Willams - Enugu * Rock Singers * New Era Praise Team * Queen\'s Voice of MuchRoom Partners','CFWM','published');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `first_timers`
--

DROP TABLE IF EXISTS `first_timers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `first_timers` (
  `id` varchar(36) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text,
  `how_heard` varchar(255) DEFAULT NULL,
  `wants_visit` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(50) DEFAULT 'Pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `first_timers`
--

LOCK TABLES `first_timers` WRITE;
/*!40000 ALTER TABLE `first_timers` DISABLE KEYS */;
INSERT INTO `first_timers` VALUES ('0248ca1d-1012-4147-a5d9-567cdfe333bf','John Doe','123456','john@example.com','123 Street','Friend',1,'2026-02-15 10:00:17','Pending'),('ab4245d3-3d36-43a7-bdae-b0eecf943017','Dickson Owe Edor','+2349169120670','edordickson18@gmail.com','112 Satellite Town\nAtamunu lane','Passing By',1,'2026-02-18 18:54:16','Pending');
/*!40000 ALTER TABLE `first_timers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prayer_requests`
--

DROP TABLE IF EXISTS `prayer_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prayer_requests` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `request_details` text NOT NULL,
  `is_confidential` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(50) DEFAULT 'Pending',
  `topic` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prayer_requests`
--

LOCK TABLES `prayer_requests` WRITE;
/*!40000 ALTER TABLE `prayer_requests` DISABLE KEYS */;
INSERT INTO `prayer_requests` VALUES ('07eb5289-99d2-48f4-a7de-be7174dcfff2','Jane Smith','654321','Please pray for my health.',1,'2026-02-15 10:00:17','Pending',NULL),('32c70894-592f-4fae-b2ec-f295057657e6','Omama','82829292','I need God to make a way for me',1,'2026-02-22 16:19:38','Pending','General Prayer'),('c3bde602-af2c-4d6e-bb50-b580813c06fe','Ojah Effa','9797979797','This is a test prayer',0,'2026-02-20 17:16:06','Prayed Over','Financial Breakthrough');
/*!40000 ALTER TABLE `prayer_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `category` enum('book','audiobook','other') NOT NULL,
  `status` varchar(20) DEFAULT 'published',
  `image_url` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `stock_quantity` int DEFAULT '0',
  `is_digital` tinyint(1) DEFAULT '1',
  `rating` decimal(3,2) DEFAULT '5.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_product_title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sermons`
--

DROP TABLE IF EXISTS `sermons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sermons` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `speaker` varchar(255) NOT NULL,
  `series` varchar(255) DEFAULT NULL,
  `description` text,
  `sermon_date` date NOT NULL,
  `duration` varchar(20) DEFAULT NULL,
  `type` enum('video','audio') NOT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `audio_url` varchar(255) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_sermon_title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sermons`
--

LOCK TABLES `sermons` WRITE;
/*!40000 ALTER TABLE `sermons` DISABLE KEYS */;
/*!40000 ALTER TABLE `sermons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribers`
--

DROP TABLE IF EXISTS `subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribers` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` enum('active','unsubscribed') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribers`
--

LOCK TABLES `subscribers` WRITE;
/*!40000 ALTER TABLE `subscribers` DISABLE KEYS */;
INSERT INTO `subscribers` VALUES ('261076fb-a0a0-4738-8950-d909935246b4','dicksonedor20@gmail.com','active','2026-02-22 11:14:17'),('84777719-1a5f-4a65-93e4-56a50f05e312','effaojah@gmail.com','active','2026-02-22 16:18:09');
/*!40000 ALTER TABLE `subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonies`
--

DROP TABLE IF EXISTS `testimonies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonies` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonies`
--

LOCK TABLES `testimonies` WRITE;
/*!40000 ALTER TABLE `testimonies` DISABLE KEYS */;
/*!40000 ALTER TABLE `testimonies` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-22 19:55:52
