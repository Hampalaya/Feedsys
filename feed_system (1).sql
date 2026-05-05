-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2026 at 01:26 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `feed_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(10) UNSIGNED NOT NULL,
  `student_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `present` tinyint(1) DEFAULT 0,
  `meal_received` tinyint(1) DEFAULT 0,
  `remarks` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `student_id`, `date`, `present`, `meal_received`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-11-15', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(2, 1, '2024-11-14', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(3, 1, '2024-11-13', 0, 0, 'Sick', '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(4, 2, '2024-11-15', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(5, 2, '2024-11-14', 1, 0, 'Allergy reaction', '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(6, 2, '2024-11-13', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(7, 3, '2024-11-15', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(8, 3, '2024-11-14', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(9, 3, '2024-11-13', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(10, 4, '2024-11-15', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(11, 5, '2024-11-15', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(12, 6, '2024-11-15', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(13, 7, '2024-11-15', 1, 0, 'Allergy', '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(14, 8, '2024-11-15', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(15, 9, '2024-11-15', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(16, 10, '2024-11-15', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(17, 1, '2024-11-12', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(18, 2, '2024-11-12', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(19, 3, '2024-11-12', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(20, 4, '2024-11-12', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(21, 5, '2024-11-12', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(22, 6, '2024-11-12', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(23, 7, '2024-11-12', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(24, 8, '2024-11-12', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(25, 9, '2024-11-12', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02'),
(26, 10, '2024-11-12', 1, 1, NULL, '2026-05-05 06:04:02', '2026-05-05 06:04:02');

-- --------------------------------------------------------

--
-- Table structure for table `measurements`
--

CREATE TABLE `measurements` (
  `id` int(10) UNSIGNED NOT NULL,
  `student_id` int(10) UNSIGNED NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `measurement_type` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `height` decimal(5,2) NOT NULL,
  `bmi` decimal(5,2) NOT NULL,
  `nutritional_status` varchar(25) NOT NULL,
  `measured_by` varchar(100) NOT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `measurements`
--

INSERT INTO `measurements` (`id`, `student_id`, `student_name`, `measurement_type`, `date`, `weight`, `height`, `bmi`, `nutritional_status`, `measured_by`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 1, 'Juan Dela Cruz', 'Initial', '2024-10-01', 18.50, 110.50, 15.15, 'Normal', 'Nurse A', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(2, 1, 'Juan Dela Cruz', 'Monthly', '2024-11-01', 19.20, 112.00, 15.29, 'Normal', 'Nurse A', 'Good gain', '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(3, 2, 'Maria Santos', 'Initial', '2024-10-01', 16.80, 108.00, 14.40, 'Underweight', 'Nurse B', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(4, 2, 'Maria Santos', 'Monthly', '2024-11-01', 17.50, 109.50, 14.60, 'Underweight', 'Nurse B', 'Supplement recommended', '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(5, 3, 'Pedro Garcia', 'Initial', '2024-10-01', 22.00, 118.00, 15.77, 'Normal', 'Nurse A', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(6, 3, 'Pedro Garcia', 'Monthly', '2024-11-01', 22.80, 119.50, 15.99, 'Normal', 'Nurse A', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(7, 4, 'Ana Reyes', 'Initial', '2024-10-01', 20.50, 115.00, 15.48, 'Normal', 'Nurse B', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(8, 4, 'Ana Reyes', 'Monthly', '2024-11-01', 21.20, 116.50, 15.64, 'Normal', 'Nurse B', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(9, 5, 'Luis Mendoza', 'Initial', '2024-10-01', 25.00, 125.00, 16.00, 'Normal', 'Nurse A', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(10, 5, 'Luis Mendoza', 'Monthly', '2024-11-01', 25.80, 126.50, 16.13, 'Normal', 'Nurse A', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(11, 6, 'Sofia Lopez', 'Initial', '2024-10-01', 23.50, 122.00, 15.79, 'Normal', 'Nurse B', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(12, 6, 'Sofia Lopez', 'Monthly', '2024-11-01', 24.30, 123.50, 15.94, 'Normal', 'Nurse B', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(13, 7, 'Carlo Villanueva', 'Initial', '2024-10-01', 28.00, 130.00, 16.55, 'Normal', 'Nurse A', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(14, 7, 'Carlo Villanueva', 'Monthly', '2024-11-01', 29.00, 131.50, 16.79, 'Normal', 'Nurse A', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(15, 8, 'Julia Tan', 'Initial', '2024-10-01', 26.50, 128.00, 16.18, 'Normal', 'Nurse B', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(16, 8, 'Julia Tan', 'Monthly', '2024-11-01', 27.40, 129.50, 16.35, 'Normal', 'Nurse B', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(17, 9, 'Mark Ramos', 'Initial', '2024-10-01', 32.00, 138.00, 16.81, 'Normal', 'Nurse A', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(18, 9, 'Mark Ramos', 'Monthly', '2024-11-01', 33.20, 139.50, 17.05, 'Normal', 'Nurse A', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(19, 10, 'Lara Cruz', 'Initial', '2024-10-01', 30.50, 135.00, 16.76, 'Normal', 'Nurse B', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51'),
(20, 10, 'Lara Cruz', 'Monthly', '2024-11-01', 31.50, 136.50, 16.90, 'Normal', 'Nurse B', NULL, '2026-05-05 06:03:51', '2026-05-05 06:03:51');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(10) UNSIGNED NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `lrn` varchar(12) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `grade` varchar(20) NOT NULL,
  `section` varchar(20) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `date_of_birth` date NOT NULL,
  `guardian` varchar(100) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `beneficiary` tinyint(1) DEFAULT 0,
  `has_allergy` tinyint(1) DEFAULT 0,
  `allergy_notes` text DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `student_id`, `lrn`, `full_name`, `grade`, `section`, `sex`, `date_of_birth`, `guardian`, `contact_number`, `beneficiary`, `has_allergy`, `allergy_notes`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 'S001', '123456789012', 'Juan Dela Cruz', 'Grade 1', 'Star', 'Male', '2019-05-15', 'Maria Dela Cruz', '09171234567', 1, 0, NULL, NULL, '2026-05-05 06:03:35', '2026-05-05 06:03:35'),
(2, 'S002', '123456789013', 'Maria Santos', 'Grade 1', 'Moon', 'Female', '2019-06-20', 'Pedro Santos', '09172345678', 1, 1, 'Peanut allergy', NULL, '2026-05-05 06:03:35', '2026-05-05 06:03:35'),
(3, 'S003', '123456789014', 'Pedro Garcia', 'Grade 2', 'Sun', 'Male', '2018-08-10', 'Ana Garcia', '09173456789', 1, 0, NULL, 'Active', '2026-05-05 06:03:35', '2026-05-05 06:03:35'),
(4, 'S004', '123456789015', 'Ana Reyes', 'Grade 2', 'Cloud', 'Female', '2018-04-25', 'Jose Reyes', '09174567890', 0, 0, NULL, NULL, '2026-05-05 06:03:35', '2026-05-05 06:03:35'),
(5, 'S005', '123456789016', 'Luis Mendoza', 'Grade 3', 'Star', 'Male', '2017-11-30', 'Carmen Mendoza', '09175678901', 1, 0, NULL, NULL, '2026-05-05 06:03:35', '2026-05-05 06:03:35'),
(6, 'S006', '123456789017', 'Sofia Lopez', 'Grade 3', 'Moon', 'Female', '2017-09-12', 'Miguel Lopez', '09176789012', 1, 0, NULL, NULL, '2026-05-05 06:03:35', '2026-05-05 06:03:35'),
(7, 'S007', '123456789018', 'Carlo Villanueva', 'Grade 4', 'Sun', 'Male', '2016-03-05', 'Luz Villanueva', '09177890123', 1, 1, 'Dairy allergy', NULL, '2026-05-05 06:03:35', '2026-05-05 06:03:35'),
(8, 'S008', '123456789019', 'Julia Tan', 'Grade 4', 'Cloud', 'Female', '2016-07-18', 'Henry Tan', '09178901234', 0, 0, NULL, NULL, '2026-05-05 06:03:35', '2026-05-05 06:03:35'),
(9, 'S009', '123456789020', 'Mark Ramos', 'Grade 5', 'Star', 'Male', '2015-12-22', 'Rosa Ramos', '09179012345', 1, 0, NULL, NULL, '2026-05-05 06:03:35', '2026-05-05 06:03:35'),
(10, 'S010', '123456789021', 'Lara Cruz', 'Grade 6', 'Moon', 'Female', '2015-02-14', 'Victor Cruz', '09180123456', 1, 0, NULL, 'Good attendance', '2026-05-05 06:03:35', '2026-05-05 06:03:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `full_name`, `role`, `email`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$4IwVX0zViG0eaKxfYHPXde/hp4L0UPXokHPrDEfdI48vKoZr4Wqfm', 'System Administrator', 'Administrator', 'admin@feedsystem.com', 1, '2026-05-02 03:56:44', '2026-05-02 03:56:44'),
(2, 'encoder', '$2y$10$dsLnj0Z/3a2j/dgf2oRaa.3JdSKVYuVrhhzNTceXJP/mMimABQAH6', 'Data Encoder', 'Encoder', 'encoder@feedsystem.com', 1, '2026-05-02 03:56:44', '2026-05-02 03:56:44'),
(3, 'viewer', '$2y$10$/V..AeYNz8GyTJs6AqJfBuMrHEO.slI4G3rS45DVd1fmq39hOpn3.', 'Data Viewer', 'Viewer', 'viewer@feedsystem.com', 1, '2026-05-02 03:56:44', '2026-05-02 03:56:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_date` (`student_id`,`date`);

--
-- Indexes for table `measurements`
--
ALTER TABLE `measurements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD UNIQUE KEY `lrn` (`lrn`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `measurements`
--
ALTER TABLE `measurements`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `measurements`
--
ALTER TABLE `measurements`
  ADD CONSTRAINT `measurements_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
