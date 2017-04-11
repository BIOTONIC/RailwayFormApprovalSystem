-- MySQL dump 10.13  Distrib 5.7.16, for osx10.11 (x86_64)
--
-- Host: localhost    Database: railway
-- ------------------------------------------------------
-- Server version	5.7.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `application1`
--

DROP TABLE IF EXISTS `application1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application1` (
  `id` varchar(13) NOT NULL,
  `workshop` char(2) NOT NULL,
  `telephone` varchar(11) NOT NULL,
  `fax` varchar(11) NOT NULL,
  `applyid` varchar(13) NOT NULL,
  `approveid` varchar(13) DEFAULT NULL,
  `section` varchar(50) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `sqstarttime` varchar(14) NOT NULL,
  `sqendtime` varchar(14) NOT NULL,
  `noticedepart` varchar(100) DEFAULT NULL,
  `shigongfang` varchar(200) NOT NULL,
  `plan` varchar(100) NOT NULL,
  `techplan` varchar(500) NOT NULL,
  `secureplan` varchar(500) NOT NULL,
  `applytime` varchar(14) NOT NULL,
  `workshopmgr` varchar(50) DEFAULT NULL,
  `workshopmgrtime` varchar(14) DEFAULT NULL,
  `techdepart` varchar(50) DEFAULT NULL,
  `techtime` varchar(14) DEFAULT NULL,
  `pfstarttime` varchar(14) DEFAULT NULL,
  `pfendtime` varchar(14) DEFAULT NULL,
  `securedepart` varchar(50) DEFAULT NULL,
  `securetime` varchar(14) DEFAULT NULL,
  `manager` varchar(50) DEFAULT NULL,
  `managertime` varchar(14) DEFAULT NULL,
  `result` varchar(100) DEFAULT NULL,
  `nextperson` char(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application1`
--

LOCK TABLES `application1` WRITE;
/*!40000 ALTER TABLE `application1` DISABLE KEYS */;
/*!40000 ALTER TABLE `application1` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger trigger_add_app_count_when_app1
	after insert on application1
	for each row
	begin 
	update conf set count = count + 1;
	end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `application2`
--

DROP TABLE IF EXISTS `application2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application2` (
  `id` varchar(13) NOT NULL,
  `workshop` char(2) NOT NULL,
  `telephone` varchar(11) NOT NULL,
  `fax` varchar(11) NOT NULL,
  `applyid` varchar(13) NOT NULL,
  `approveid` varchar(13) DEFAULT NULL,
  `section` varchar(50) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `sqstarttime` varchar(14) NOT NULL,
  `sqendtime` varchar(14) NOT NULL,
  `noticedepart` varchar(100) DEFAULT NULL,
  `shigongfang` varchar(200) NOT NULL,
  `plan` varchar(100) NOT NULL,
  `techplan` varchar(500) NOT NULL,
  `secureplan` varchar(500) NOT NULL,
  `applytime` varchar(14) NOT NULL,
  `workshopmgr` varchar(50) DEFAULT NULL,
  `workshopmgrtime` varchar(14) DEFAULT NULL,
  `result` varchar(100) DEFAULT NULL,
  `nextperson` char(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application2`
--

LOCK TABLES `application2` WRITE;
/*!40000 ALTER TABLE `application2` DISABLE KEYS */;
/*!40000 ALTER TABLE `application2` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger trigger_add_app_count_when_app2
	after insert on application2
	for each row
	begin 
	update conf set count = count + 1;
	end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `application3`
--

DROP TABLE IF EXISTS `application3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application3` (
  `id` varchar(13) NOT NULL,
  `workshop` char(2) NOT NULL,
  `telephone` varchar(11) NOT NULL,
  `fax` varchar(11) NOT NULL,
  `applyid` varchar(13) NOT NULL,
  `approveid` varchar(13) DEFAULT NULL,
  `section` varchar(50) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `sqstarttime` varchar(14) NOT NULL,
  `sqendtime` varchar(14) NOT NULL,
  `noticedepart` varchar(100) DEFAULT NULL,
  `shigongfang` varchar(200) NOT NULL,
  `plan` varchar(100) NOT NULL,
  `techplan` varchar(500) NOT NULL,
  `secureplan` varchar(500) NOT NULL,
  `applytime` varchar(14) NOT NULL,
  `workshopmgr` varchar(50) DEFAULT NULL,
  `workshopmgrtime` varchar(14) DEFAULT NULL,
  `result` varchar(100) DEFAULT NULL,
  `nextperson` char(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application3`
--

LOCK TABLES `application3` WRITE;
/*!40000 ALTER TABLE `application3` DISABLE KEYS */;
/*!40000 ALTER TABLE `application3` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger trigger_add_app_count_when_app3
	after insert on application3
	for each row
	begin 
	update conf set count = count + 1;
	end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `conf`
--

DROP TABLE IF EXISTS `conf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conf` (
  `count` int(11) NOT NULL,
  PRIMARY KEY (`count`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conf`
--

LOCK TABLES `conf` WRITE;
/*!40000 ALTER TABLE `conf` DISABLE KEYS */;
INSERT INTO `conf` VALUES (0);
/*!40000 ALTER TABLE `conf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` char(3) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('101','101101','101101'),('102','102102','102102'),('103','103103','103103'),('104','104104','104104'),('105','105105','105105'),('106','106106','106106'),('107','107107','107107'),('108','108108','108108'),('109','109109','109109'),('110','110110','110110'),('111','111111','111111'),('112','112112','112112'),('113','113113','113113'),('114','114114','114114'),('115','115115','115115'),('116','116116','116116'),('117','117117','117117'),('118','118118','118118'),('119','119119','119119'),('120','120120','120120'),('121','121121','121121'),('122','122122','122122'),('123','123123','123123'),('124','124124','124124'),('201','201201','201201'),('202','202202','202202'),('203','203203','203203'),('204','204204','204204'),('205','205205','205205'),('206','206206','206206'),('207','207207','207207'),('208','208208','208208'),('209','209209','209209'),('210','210210','210210'),('211','211211','211211'),('212','212212','212212'),('213','213213','213213'),('214','214214','214214'),('215','215215','215215'),('216','216216','216216'),('217','217217','217217'),('218','218218','218218'),('219','219219','219219'),('220','220220','220220'),('221','221221','221221'),('222','222222','222222'),('223','223223','223223'),('224','224224','224224'),('301','301301','301301'),('302','302302','302302'),('303','303303','303303'),('401','401401','401401'),('501','501501','501501');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workshop`
--

DROP TABLE IF EXISTS `workshop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workshop` (
  `id` char(2) NOT NULL,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workshop`
--

LOCK TABLES `workshop` WRITE;
/*!40000 ALTER TABLE `workshop` DISABLE KEYS */;
INSERT INTO `workshop` VALUES ('01','车间1');
/*!40000 ALTER TABLE `workshop` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-11 15:09:11
