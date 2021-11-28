USE maindb;
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '流水號',
  `username` VARCHAR(50) NOT NULL COMMENT '用戶名稱',
  `hasSubscription` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '用戶是否已經訂閱',
  `token` BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '用戶持有代幣',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE UNIQUE INDEX idx_user_username ON user (`username`);