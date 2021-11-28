USE maindb;
CREATE TABLE IF NOT EXISTS `productList` (
  `productId` VARCHAR(64) NOT NULL COMMENT '商品ID',
  `productName` VARCHAR(40) NULL COMMENT '商品參照名稱',
  `productType` VARCHAR(20) NOT NULL COMMENT '商品類型 token:代幣 sub:訂閱',
  `priceType` VARCHAR(20) NOT NULL COMMENT '購買商品花費類型, token:代幣 cash:現金',
  `price` INT NOT NULL DEFAULT 0 COMMENT '購買商品花費數量',
  `token` INT NOT NULL DEFAULT 0 COMMENT '購買商品獲得的代幣數量',
  `sub` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '購買商品是否獲得訂閱',
  PRIMARY KEY (`productId`, `productType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `productList` (`productId`, `productName`, `productType`, `priceType`, `token`) VALUES ('token001', '代幣商品A', 'token', 'token', 100);
INSERT INTO `productList` (`productId`, `productName`, `productType`, `priceType`, `token`) VALUES ('token002', '代幣商品B', 'token', 'token', 1000);
INSERT INTO `productList` (`productId`, `productName`, `productType`, `priceType`, `token`) VALUES ('token003', '代幣商品C', 'token', 'token', 10000);

INSERT INTO `productList` (`productId`, `productName`, `productType`, `priceType`, `sub`) VALUES ('sub001', '訂閱A', 'sub', 'token', 1);