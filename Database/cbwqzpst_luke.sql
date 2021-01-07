-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2021 at 01:38 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cbwqzpst_luke`
--

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('GIhpVlQOdD7-u7jTWy45NhiYnhTKJDwI', 1610108646, '{\"cookie\":{\"originalMaxAge\":86399990,\"expires\":\"2021-01-08T12:24:05.749Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":\"mdadilehsan77@gmail.com\"}'),
('lb83BceUJB0mdYlO3ViUNsYpe6b8s3J-', 1610085146, '{\"cookie\":{\"originalMaxAge\":86399992,\"expires\":\"2021-01-08T05:52:26.176Z\",\"httpOnly\":true,\"path\":\"/\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` int(50) NOT NULL,
  `admin_name` varchar(255) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` int(50) NOT NULL,
  `created_date` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `last_updated` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `admin_name`, `email_id`, `password`, `phone`, `status`, `created_date`, `last_updated`) VALUES
(1, 'Adil', 'mdadilehsan77@gmail.com', '123', '8904685570', 1, '0000-00-00 00:00:00.000000', '2020-12-21 08:51:01.470511'),
(2, 'Shadow', 'shadowtitan77@gmail.com', '123', '1234567890', 1, '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_alerts`
--

CREATE TABLE `tbl_alerts` (
  `id` int(50) NOT NULL,
  `alert_title` varchar(255) NOT NULL,
  `alert_Date` varchar(255) NOT NULL,
  `alert_file_path` varchar(255) NOT NULL,
  `alert_original_file_name` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_alerts`
--

INSERT INTO `tbl_alerts` (`id`, `alert_title`, `alert_Date`, `alert_file_path`, `alert_original_file_name`, `created_date`, `last_updated`) VALUES
(51, 'Selection based on highest wages may be replaced to H-1B lottery', '2020-10-29', 'http://localhost:5000/1d2eccf50262d1401a516fa159f8d2fa.txt', 'alert1.txt', '2021-01-07 11:46:52', '2021-01-07 11:46:52');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contact_details`
--

CREATE TABLE `tbl_contact_details` (
  `id` int(50) NOT NULL,
  `addressLine_one` varchar(255) NOT NULL,
  `addressLine_Two` varchar(255) NOT NULL,
  `addressLocation` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `contact_description` varchar(500) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` int(50) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_contact_details`
--

INSERT INTO `tbl_contact_details` (`id`, `addressLine_one`, `addressLine_Two`, `addressLocation`, `contact`, `contact_description`, `email`, `status`, `created_date`, `last_updated`) VALUES
(1, 'Test adr 1', 'test adr 2', 'test location', '+91 8905684403', 'test description', 'mdadil@mail.com', 1, '2021-01-05 08:48:45', '2021-01-05 12:21:01');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_enquiries`
--

CREATE TABLE `tbl_enquiries` (
  `id` int(50) NOT NULL,
  `enq_date` date NOT NULL DEFAULT current_timestamp(),
  `name` varchar(40) CHARACTER SET latin1 NOT NULL,
  `email` varchar(50) CHARACTER SET latin1 NOT NULL,
  `subject` varchar(100) CHARACTER SET latin1 NOT NULL,
  `message` varchar(200) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_usefullinks`
--

CREATE TABLE `tbl_usefullinks` (
  `id` int(50) NOT NULL,
  `tag_name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `status` int(50) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_usefullinks`
--

INSERT INTO `tbl_usefullinks` (`id`, `tag_name`, `title`, `link`, `status`, `created_date`, `last_updated`) VALUES
(1, 'VISAS related', 'DS-160 Visa Application Form', 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/forms/ds-160-online-nonimmigrant-visa-application/ds-160-faqs.html', 0, '2021-01-06 11:26:52', '2021-01-06 11:26:52'),
(2, 'Compliance', 'AILA Summary of Legal Workforce Act H.R. 2164', 'https://www.aila.org/infonet/section-by-section-legal-workforce-act-hr-2164', 0, '2021-01-06 11:26:52', '2021-01-06 11:26:52'),
(3, 'USCIS', 'Online Case Status', 'https://egov.uscis.gov/casestatus/landing.do', 0, '2021-01-06 11:26:52', '2021-01-06 11:26:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_alerts`
--
ALTER TABLE `tbl_alerts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_contact_details`
--
ALTER TABLE `tbl_contact_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_enquiries`
--
ALTER TABLE `tbl_enquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_usefullinks`
--
ALTER TABLE `tbl_usefullinks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_alerts`
--
ALTER TABLE `tbl_alerts`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `tbl_contact_details`
--
ALTER TABLE `tbl_contact_details`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_enquiries`
--
ALTER TABLE `tbl_enquiries`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tbl_usefullinks`
--
ALTER TABLE `tbl_usefullinks`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
