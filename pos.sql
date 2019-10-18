-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 18 Okt 2019 pada 19.24
-- Versi server: 10.1.38-MariaDB
-- Versi PHP: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(10) NOT NULL,
  `category` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `category`) VALUES
(1, 'Makanan'),
(2, 'minuman'),
(5, 'kecantikan'),
(6, 'Alat Tulis');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_transaction`
--

CREATE TABLE `detail_transaction` (
  `transaction_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `detail_transaction`
--

INSERT INTO `detail_transaction` (`transaction_id`, `product_id`, `quantity`, `date_added`) VALUES
(1, 1, 5, '2019-10-18 04:32:01'),
(1, 2, 3, '2019-10-18 13:10:44'),
(2, 2, 5, '2019-10-18 13:34:51'),
(0, 1, 14, '2019-10-18 14:33:33');

--
-- Trigger `detail_transaction`
--
DELIMITER $$
CREATE TRIGGER `Check Id Product And Quantity` BEFORE INSERT ON `detail_transaction` FOR EACH ROW BEGIN
	IF NOT EXISTS(SELECT * FROM products WHERE id=NEW.product_id) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID Product Not Found!';
    ELSEIF EXISTS (SELECT quantity FROM products WHERE id = NEW.product_id AND ( quantity = 0 OR quantity - NEW.quantity < 0)) THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT ="Can't Order Below 0!";
	END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Update Quantity in Products table` AFTER INSERT ON `detail_transaction` FOR EACH ROW BEGIN
	UPDATE products SET quantity=quantity-NEW.quantity WHERE id=NEW.product_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `order`
--

CREATE TABLE `order` (
  `order_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `quantity` int(20) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `order`
--

INSERT INTO `order` (`order_id`, `product_id`, `quantity`, `time`) VALUES
(1, 1, 20, '2019-10-17 11:23:31'),
(2, 1, 10, '2019-10-17 11:25:48'),
(3, 4, 50, '2019-10-18 14:30:11');

--
-- Trigger `order`
--
DELIMITER $$
CREATE TRIGGER `Check product id And Check Quantity` BEFORE INSERT ON `order` FOR EACH ROW BEGIN
	IF NOT EXISTS(SELECT * FROM products WHERE id=NEW.product_id) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID Product Not Found!';
    ELSEIF EXISTS (SELECT quantity FROM products WHERE id = NEW.product_id AND ( quantity = 0 OR quantity - NEW.quantity < 0)) THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT ="Can't Order Below 0!";
	END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Update Quantity After Insert` AFTER INSERT ON `order` FOR EACH ROW BEGIN
	UPDATE products SET quantity=quantity-NEW.quantity WHERE id=NEW.product_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `discription` text NOT NULL,
  `image` varchar(100) NOT NULL,
  `category_id` int(10) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(30) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `discription`, `image`, `category_id`, `price`, `quantity`, `date_added`, `date_updated`) VALUES
(1, 'sprite', 'minuman segar rasa lemon', 'sprite.jpg', 2, 7000, 60, '2019-10-14 23:02:04', '2019-10-18 16:32:02'),
(4, 'Clear', 'sampo ', 'clear.jpg', 5, 17000, 50, '2019-10-15 02:26:30', '2019-10-18 14:30:11'),
(5, 'coca cola', 'seger walau hitam', 'cola.jpg', 2, 10000, 50, '2019-10-15 05:45:20', '2019-10-18 16:59:22'),
(6, 'fanta', 'Minuman bersoda warna Pink', 'fanta.jpg', 2, 4500, 2, '2019-10-16 01:52:54', '2019-10-16 01:52:54'),
(7, 'davos', 'permen semriwing', 'davos.jpg', 1, 2000, 4, '2019-10-16 05:29:17', '2019-10-17 05:31:38'),
(9, 'godday', 'kopi terbaik', 'godday.jpg', 2, 100000, 2, '2019-10-18 05:42:16', '2019-10-18 16:31:37'),
(10, 'cimory', 'yoghurt', 'cimory.jpg', 2, 10000, 100, '2019-10-18 16:45:16', '2019-10-18 16:45:16'),
(11, 'susu putih', 'susu sapi', 'susu.jpg', 2, 20000, 100, '2019-10-18 16:49:08', '2019-10-18 16:49:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(10) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `date_added`) VALUES
(1, '2019-10-18 04:20:33'),
(2, '2019-10-18 13:22:17'),
(3, '2019-10-18 13:23:35'),
(4, '2019-10-18 13:31:14'),
(5, '2019-10-18 13:33:52');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
