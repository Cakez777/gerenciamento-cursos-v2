-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22/08/2025 às 19:06
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ranhentos_db`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `courses`
--

INSERT INTO `courses` (`id`, `name`, `description`, `price`, `created_at`, `updated_at`) VALUES
(2, 'Engenharia da madeira', 'madera', 400.00, '2025-08-21 21:19:28', '2025-08-21 21:19:32');

-- --------------------------------------------------------

--
-- Estrutura para tabela `enrollments`
--

CREATE TABLE `enrollments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `price_paid` decimal(8,2) NOT NULL,
  `status` enum('active','cancelled','completed') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `enrollments`
--

INSERT INTO `enrollments` (`id`, `student_id`, `course_id`, `start_date`, `price_paid`, `status`, `created_at`, `updated_at`) VALUES
(2, 15, 2, '2025-07-29', 400.00, 'active', '2025-08-21 22:56:57', '2025-08-21 22:56:57'),
(3, 3, 2, '2025-08-21', 599.99, 'active', '2025-08-22 01:38:16', '2025-08-22 01:38:16'),
(4, 16, 2, '2025-08-22', 800.00, 'active', '2025-08-22 18:55:06', '2025-08-22 18:55:06');

-- --------------------------------------------------------

--
-- Estrutura para tabela `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_08_14_231556_create_students_table', 1),
(2, '2025_08_14_231557_create_courses_table', 1),
(3, '2025_08_14_231615_create_enrollments_table', 1),
(4, '2025_08_15_040447_create_sessions_table', 2),
(5, '2025_08_15_040728_add_deleted_at_to_students_table', 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('3HUQkhrswJP4F6WlrjBfK9pKyemfBnpUckkCdEWh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 OPR/120.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRk1JM2x2eEJBVnFUb2ZPdGY1S3BXamhuOXBiWU9CMDFnUmU3eEpuSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1755475596),
('kRWkopgSpERrujqnDslQ9olhZQnefFrAGZTOsICn', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 OPR/120.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNjNSRk1jUmk3WXNjRmhIUkc3aDB3QXhERVI2WVRERXBqNXBkZzNSUiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fX0=', 1755796696);

-- --------------------------------------------------------

--
-- Estrutura para tabela `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `cpf`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Lucas', 'lucas@gmail.com', '14395831966', '2025-08-15 07:08:27', '2025-08-22 18:50:45', '2025-08-22 18:50:45'),
(2, 'Scotty Howell', 'jarret17@example.net', '71555451323', '2025-08-17 00:49:21', '2025-08-17 00:49:21', NULL),
(3, 'Serena Batz', 'schmidt.cale@example.net', '99018599241', '2025-08-17 00:49:21', '2025-08-17 00:49:21', NULL),
(4, 'Prof. Hope Jerde', 'haley.bridie@example.com', '37485522873', '2025-08-17 00:49:21', '2025-08-17 00:49:21', NULL),
(5, 'Cary Zieme', 'ledner.heber@example.net', '98439139441', '2025-08-17 00:49:21', '2025-08-17 00:49:21', NULL),
(6, 'Vernice Hill MD', 'emmitt68@example.net', '94444965749', '2025-08-17 00:49:21', '2025-08-17 00:49:21', NULL),
(7, 'Clemmie Rutherford Jr.', 'eda.boyer@example.net', '92650425563', '2025-08-17 00:49:21', '2025-08-17 00:49:21', NULL),
(8, 'Chaz Reynolds', 'travis.hamill@example.net', '72828085546', '2025-08-17 00:49:21', '2025-08-17 00:49:21', NULL),
(9, 'Ms. Janiya Huel Sr.', 'stokes.myrtle@example.org', '81498468865', '2025-08-17 00:49:21', '2025-08-17 00:49:21', NULL),
(10, 'Deron Renner', 'yoshiko.sawayn@example.com', '77552053649', '2025-08-17 00:49:21', '2025-08-17 00:49:21', NULL),
(11, 'Jess Kutch', 'rogers.fahey@example.net', '49221877782', '2025-08-17 00:49:21', '2025-08-17 00:49:21', NULL),
(12, 'ribas', 'ribas@gmail.com', '41995347172', '2025-08-21 20:49:55', '2025-08-21 22:24:03', '2025-08-21 22:24:03'),
(13, 'pedro', 'pedro@gmail.com', '145934823', '2025-08-21 21:59:01', '2025-08-21 21:59:01', NULL),
(14, 'mogger', 'megaloucobrgamer@gmail.com', '14340343', '2025-08-21 22:01:25', '2025-08-21 22:01:25', NULL),
(15, 'PEDRO RIBAS', 'pedroribas@gmail.com', '389012332', '2025-08-21 22:56:26', '2025-08-21 22:56:26', NULL),
(16, 'maftheus', 'maftheus@gmail.com', '1234567896', '2025-08-22 18:51:52', '2025-08-22 18:51:52', NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `enrollments_student_id_foreign` (`student_id`),
  ADD KEY `enrollments_course_id_foreign` (`course_id`);

--
-- Índices de tabela `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Índices de tabela `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `students_email_unique` (`email`),
  ADD UNIQUE KEY `students_cpf_unique` (`cpf`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `enrollments_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
