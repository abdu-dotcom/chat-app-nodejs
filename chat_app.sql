-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Jan 2023 pada 06.29
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat_app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `message`
--

CREATE TABLE `message` (
  `message_id` int(13) NOT NULL,
  `id_pengirim` int(13) NOT NULL,
  `id_penerima` int(13) NOT NULL,
  `message` text NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `message`
--

INSERT INTO `message` (`message_id`, `id_pengirim`, `id_penerima`, `message`, `createdAt`) VALUES
(4, 771105, 343275, 'kadoakkerqjweoqwjeq', '2022-12-16'),
(5, 771105, 343275, 'Selamat pagi Ryan!', '2022-12-16'),
(6, 343275, 771105, 'Selamat pagi Abduh!', '2022-12-16'),
(8, 520208, 771105, 'Selamat pagi abduhbatubara!', '2022-12-16'),
(10, 771105, 0, 'sdasdsd', '2022-12-17'),
(11, 771105, 0, 'adjsadadsadad', '2022-12-17'),
(12, 771105, 343275, 'adasdasd', '2022-12-17'),
(13, 771105, 343275, 'Halllloo ryan!!', '2022-12-17'),
(14, 771105, 0, 'heyyoo', '2022-12-17'),
(16, 771105, 0, 'heyyo', '2022-12-17'),
(17, 771105, 0, 'heyyo', '2022-12-17'),
(18, 771105, 343275, 'heyyoo', '2022-12-17'),
(19, 771105, 343275, 'heyyoo', '2022-12-17'),
(20, 771105, 343275, 'whatsappp', '2022-12-17'),
(21, 771105, 343275, 'whatsappp', '2022-12-17'),
(22, 343275, 771105, 'hello', '2022-12-17'),
(23, 343275, 771105, 'yooo', '2022-12-17'),
(24, 771105, 0, '', '2022-12-17'),
(25, 771105, 343275, 'asdd', '2022-12-17'),
(26, 771105, 343275, 'asdsad', '2022-12-17'),
(27, 771105, 343275, 'Hello ryan', '2022-12-17'),
(28, 771105, 0, '', '2022-12-17'),
(29, 771105, 0, 'asdd', '2022-12-17'),
(30, 771105, 0, 'dqwe', '2022-12-17'),
(31, 771105, 343275, 'Hello ryan 2', '2023-01-02'),
(32, 771105, 520208, 'Selamat pagi Budiman!', '2023-01-02'),
(33, 520208, 771105, 'Apakabar abduhbatubara?', '2023-01-02'),
(34, 771105, 520208, 'iam good', '2023-01-02'),
(35, 520208, 771105, 'me too', '2023-01-02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` int(13) NOT NULL,
  `unique_id` int(13) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `img` text NOT NULL,
  `status` varchar(50) NOT NULL,
  `refresh_token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `unique_id`, `username`, `password`, `img`, `status`, `refresh_token`) VALUES
(6, 771105, 'abduhbatubara', '123456', '', 'Online', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc3MTEwNSwidXNlclVzZXJuYW1lIjoiYWJkdWhiYXR1YmFyYSIsImlhdCI6MTY3MjY2NzYzNywiZXhwIjoxNjcyNzU0MDM3fQ.lgKQpDsn_gEvCMSz8iHomToqLHzqysrPb9QNbONWDRc'),
(7, 343275, 'ryan batubara', '123456', '', 'Online', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM0MzI3NSwidXNlclVzZXJuYW1lIjoicnlhbiBiYXR1YmFyYSIsImlhdCI6MTY3MjY2NzYzMCwiZXhwIjoxNjcyNzU0MDMwfQ.J8QX_LOlnYhKimWSNfRge3dSB0QtWzg9ESypMuAnV3I'),
(8, 520208, 'Budiman', '123456', '', 'Online', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUyMDIwOCwidXNlclVzZXJuYW1lIjoiQnVkaW1hbiIsImlhdCI6MTY3MjY2NzczMSwiZXhwIjoxNjcyNzU0MTMxfQ.K2zo2gS_nqQfMCEKvVpvcR9bl-6tRTVilJW4Yioe-2M');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(13) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(13) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
