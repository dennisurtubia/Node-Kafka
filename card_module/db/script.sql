  -- CREATE SCHEMA IF NOT EXISTS backend_test DEFAULT CHARACTER SET utf8;
--   USE backend_test;

  -- -----------------------------------------------------
  -- Tabela produtos
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    unitary_value DECIMAL(10,2) NOT NULL,
    qtd_stock INT NOT NULL,
    creation_date DATETIME NOT NULL,
    update_date DATETIME NOT NULL,
    exclusion_date DATETIME NULL,
    PRIMARY KEY (id))
  ENGINE = InnoDB;


  -- -----------------------------------------------------
  -- Tabela transacoes
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS transactions (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    sale_value DECIMAL(10,2) NOT NULL,
    date_sale DATETIME NULL,
    status ENUM('APPROVED', 'REJECTED') NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_transactions_products
      FOREIGN KEY (product_id)
      REFERENCES products (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;

INSERT INTO products (name, unitary_value, qtd_stock, creation_date, update_date, exclusion_date)
VALUES
	('Macbook 13\" 8GB|128SSD|2.7Ghz', 8450.00, 5, '2018-09-20 16:13:44', '2018-09-20 16:13:44', NULL),
	('Macbook 13\" 16GB|128SSD|2.7Ghz', 8740.00, 3, '2018-09-20 16:14:34', '2018-09-20 16:14:34', NULL),
	('Macbook 13\" 16GB|256SSD|2.7Ghz', 9230.00, 8, '2018-09-20 16:15:19', '2018-09-20 16:15:19', NULL),
	('Macbook 13\" 16GB|512SSD|2.7Ghz', 1125.00, 2, '2018-09-20 16:16:43', '2018-09-20 16:16:43', NULL),
	('iPhone X 64GB', 4500.00, 10, '2018-09-20 16:18:07', '2018-09-20 16:18:07', NULL),
	('iPhone X 128GB', 5800.00, 5, '2018-09-20 16:18:28', '2018-09-20 16:18:28', NULL),
	('iPhone X 256GB', 6400.00, 3, '2018-09-20 16:18:49', '2018-09-20 16:18:49', NULL),
	('iPad Pro 64GB', 3500.00, 10, '2018-09-20 16:25:18', '2018-09-20 16:25:18', NULL),
	('iPad Pro 128GB', 4200.00, 5, '2018-09-20 16:25:52', '2018-09-20 16:25:52', NULL),
	( 'iMac Pro 27', 750000.00, 2, '2018-09-20 16:27:22', '2018-09-20 16:27:22', NULL);

INSERT INTO transactions (id, product_id, sale_value, date_sale, status)
VALUES
	(1, 1, 8450.00, '2018-09-20 16:31:01', 'APPROVED'),
	(2, 3, 9230.00, '2018-09-20 16:32:26', 'APPROVED'),
	(3, 10, 750000.00, '2018-09-20 16:32:47', 'REJECTED'),
	(4, 8, 3450.00, '2018-09-20 16:33:25', 'APPROVED'),
	(5, 5, 4400.00, '2018-09-20 16:33:56', 'REJECTED');