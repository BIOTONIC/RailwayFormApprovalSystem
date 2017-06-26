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
  `workshop` varchar(40) NOT NULL,
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger trigger_add_apply_count_when_app1
	after insert on application1
	for each row
	begin 
	update conf set applycount = applycount + 1 where id = 0;
	end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger trigger_add_approve_count_when_app1
	after update on application1
	for each row
	begin
	if old.approveid  IS NULL then
	update conf set approvecount = approvecount + 1 where id = 0;
	end if;
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
  `workshop` varchar(40) NOT NULL,
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger trigger_add_apply_count_when_app2
	after insert on application2
	for each row
	begin 
	update conf set applycount = applycount + 1 where id = 0;
	end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger trigger_add_approve_count_when_app2
	after update on application2
	for each row
	begin
	if old.approveid IS NULL then
	update conf set approvecount = approvecount + 1 where id = 0;
	end if;
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
  `workshop` varchar(40) NOT NULL,
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger trigger_add_apply_count_when_app3
	after insert on application3
	for each row
	begin 
	update conf set applycount = applycount + 1 where id = 0;
	end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger trigger_add_approve_count_when_app3
	after update on application3
	for each row
	begin
	if old.approveid IS NULL then
	update conf set approvecount = approvecount + 1 where id = 0;
	end if;
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
  `id` int(11) NOT NULL,
  `applycount` int(11) DEFAULT NULL,
  `approvecount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conf`
--

LOCK TABLES `conf` WRITE;
/*!40000 ALTER TABLE `conf` DISABLE KEYS */;
INSERT INTO `conf` VALUES (0,0,0);
/*!40000 ALTER TABLE `conf` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-14 20:17:07
