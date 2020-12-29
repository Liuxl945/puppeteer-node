/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : ly_website

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 21/12/2020 23:49:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ly_carousel
-- ----------------------------
DROP TABLE IF EXISTS `ly_carousel`;
CREATE TABLE `ly_carousel`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '轮播图ID',
  `ly_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图片路径',
  `ly_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '轮播图内容',
  `is_show` int NULL DEFAULT 1 COMMENT '是否显示 1 是 0 否',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '发表时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ly_carousel
-- ----------------------------
INSERT INTO `ly_carousel` VALUES (5, '/ly_website/carousel/2020-12-17/1608217506673.png', '<p>3123131</p>', 1, '2020-12-17 15:54:14');
INSERT INTO `ly_carousel` VALUES (6, '/ly_website/carousel/2020-12-17/1608217513348.png', '<p>213213</p>', 1, '2020-12-17 15:54:19');

-- ----------------------------
-- Table structure for ly_file
-- ----------------------------
DROP TABLE IF EXISTS `ly_file`;
CREATE TABLE `ly_file`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '文件ID',
  `ly_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件标题',
  `ly_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件路径',
  `ly_type_id` int NULL DEFAULT NULL COMMENT '类型ID, 没有ID则为附件',
  `tem_id` int NULL DEFAULT NULL COMMENT '临时表ID',
  `is_show` int NULL DEFAULT 1 COMMENT '是否显示 1 是 0 否',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ly_file
-- ----------------------------
INSERT INTO `ly_file` VALUES (23, '文件类型1', '/ly_website/files/2020-12-02/431781606915754400.jpg', 1, 6, 1, '2020-12-02 21:01:40');
INSERT INTO `ly_file` VALUES (24, '快点快点快点', '/ly_website/files/2020-12-15/1608003770(1)160803686460.jpg', 1, 10, 1, '2020-12-15 20:54:28');
INSERT INTO `ly_file` VALUES (25, '快点快点快点', '/ly_website/files/2020-12-15/1608003770(1)160803686460.jpg', 1, 10, 1, '2020-12-15 20:54:28');

-- ----------------------------
-- Table structure for ly_file_type
-- ----------------------------
DROP TABLE IF EXISTS `ly_file_type`;
CREATE TABLE `ly_file_type`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '类型ID',
  `ly_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ly_file_type
-- ----------------------------
INSERT INTO `ly_file_type` VALUES (1, '文件一', 66, '2020-12-02 14:39:55');
INSERT INTO `ly_file_type` VALUES (2, '文件二', 111, '2020-12-15 20:54:06');
INSERT INTO `ly_file_type` VALUES (3, '文件三', 99, '2020-12-18 11:57:28');

-- ----------------------------
-- Table structure for ly_legal
-- ----------------------------
DROP TABLE IF EXISTS `ly_legal`;
CREATE TABLE `ly_legal`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ly_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `ly_caption` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '简介',
  `ly_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图片路径',
  `ly_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  `ly_file` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '附件列表',
  `is_show` int NULL DEFAULT 1 COMMENT '是否显示 1 是 0 否',
  `ly_views` int NULL DEFAULT 0 COMMENT '查看量',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ly_legal
-- ----------------------------
INSERT INTO `ly_legal` VALUES (1, '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。\n\n', '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大发生深刻的肯定酷酷的；d大叔大婶多所as大蒜撒as行数。\n\n', '/ly_website/legal/2020-12-17/1608217456760.jpeg', '<p><img src=\"http://localhost:8089/ly_website/legal/2020-12-16/1608083664686.png\"></p><p>豪大酒店加大加肥省事是是是是</p>', '9', 1, 4, '2020-12-15 21:03:42');
INSERT INTO `ly_legal` VALUES (2, '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。\n\n', '发生深刻的肯定酷酷的；d大叔大婶多所as大蒜发生深刻的肯定酷酷的；d大叔大婶多所as大蒜撒as撒as', '/ly_website/legal/2020-12-17/1608218217683.png', '<p>111<img src=\"http://localhost:8089/ly_website/legal/2020-12-19/1608381302484.png\"></p><h2>发生深刻的肯定酷酷的；d大叔大婶多所as大蒜发生深刻的肯定酷酷的；d大叔大婶多所as大蒜撒as撒as</h2><p><img src=\"http://localhost:8089/ly_website/legal/2020-12-19/1608381318039.png\"></p><p><br></p><h1>dsdsdsadasd</h1>', '11,12,20', 1, 51, '2020-12-16 09:41:50');
INSERT INTO `ly_legal` VALUES (3, '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。\n\n', '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大发生深刻的肯定酷酷的；d大叔大婶多所as大蒜撒as行数。\n\n', '/ly_website/legal/2020-12-17/1608217456760.jpeg', '<p><img src=\"http://localhost:8089/ly_website/legal/2020-12-16/1608083664686.png\"></p><p>豪大酒店加大加肥省事是是是是</p>', '9', 1, 2, '2020-12-15 21:03:42');
INSERT INTO `ly_legal` VALUES (4, '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。\n\n', '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大发生深刻的肯定酷酷的；d大叔大婶多所as大蒜撒as行数。\n\n', '/ly_website/legal/2020-12-17/1608217456760.jpeg', '<p><img src=\"http://localhost:8089/ly_website/legal/2020-12-16/1608083664686.png\"></p><p>豪大酒店加大加肥省事是是是是</p>', '9', 1, 0, '2020-12-15 21:03:42');
INSERT INTO `ly_legal` VALUES (5, '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。\n\n', '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大发生深刻的肯定酷酷的；d大叔大婶多所as大蒜撒as行数。\n\n', '/ly_website/legal/2020-12-17/1608217456760.jpeg', '<p><img src=\"http://localhost:8089/ly_website/legal/2020-12-16/1608083664686.png\"></p><p>豪大酒店加大加肥省事是是是是</p>', '9', 1, 2, '2020-12-15 21:03:42');
INSERT INTO `ly_legal` VALUES (6, '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。\n\n', '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大发生深刻的肯定酷酷的；d大叔大婶多所as大蒜撒as行数。\n\n', '/ly_website/legal/2020-12-17/1608217456760.jpeg', '<p><img src=\"http://localhost:8089/ly_website/legal/2020-12-16/1608083664686.png\"></p><p>豪大酒店加大加肥省事是是是是</p>', '9', 1, 0, '2020-12-15 21:03:42');
INSERT INTO `ly_legal` VALUES (7, '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。\n\n', '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大发生深刻的肯定酷酷的；d大叔大婶多所as大蒜撒as行数。\n\n', '/ly_website/legal/2020-12-17/1608217456760.jpeg', '<p><img src=\"http://localhost:8089/ly_website/legal/2020-12-16/1608083664686.png\"></p><p>豪大酒店加大加肥省事是是是是</p>', '9', 1, 0, '2020-12-15 21:03:42');
INSERT INTO `ly_legal` VALUES (8, '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。\n\n', '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大发生深刻的肯定酷酷的；d大叔大婶多所as大蒜撒as行数。\n\n', '/ly_website/legal/2020-12-17/1608217456760.jpeg', '<p><img src=\"http://localhost:8089/ly_website/legal/2020-12-16/1608083664686.png\"></p><p>豪大酒店加大加肥省事是是是是</p>', '9', 1, 0, '2020-12-15 21:03:42');
INSERT INTO `ly_legal` VALUES (9, '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。\n\n', '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大发生深刻的肯定酷酷的；d大叔大婶多所as大蒜撒as行数。\n\n', '/ly_website/legal/2020-12-17/1608217456760.jpeg', '<p><img src=\"http://localhost:8089/ly_website/legal/2020-12-16/1608083664686.png\"></p><p>豪大酒店加大加肥省事是是是是</p>', '9', 1, 0, '2020-12-15 21:03:42');
INSERT INTO `ly_legal` VALUES (10, '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。\n\n', '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大发生深刻的肯定酷酷的；d大叔大婶多所as大蒜撒as行数。\n\n', '/ly_website/legal/2020-12-17/1608217456760.jpeg', '<p><img src=\"http://localhost:8089/ly_website/legal/2020-12-16/1608083664686.png\"></p><p>豪大酒店加大加肥省事是是是是</p>', '9', 1, 2, '2020-12-15 21:03:42');
INSERT INTO `ly_legal` VALUES (11, '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。\n\n', '通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大发生深刻的肯定酷酷的；d大叔大婶多所as大蒜撒as行数。\n\n', '/ly_website/legal/2020-12-17/1608217456760.jpeg', '<p><img src=\"http://localhost:8089/ly_website/legal/2020-12-16/1608083664686.png\"></p><p>豪大酒店加大加肥省事是是是是</p>', '9', 1, 0, '2020-12-15 21:03:42');

-- ----------------------------
-- Table structure for ly_log
-- ----------------------------
DROP TABLE IF EXISTS `ly_log`;
CREATE TABLE `ly_log`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '错误信息ID',
  `ly_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '错误内容',
  `ly_date` datetime(0) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ly_log
-- ----------------------------

-- ----------------------------
-- Table structure for ly_notice
-- ----------------------------
DROP TABLE IF EXISTS `ly_notice`;
CREATE TABLE `ly_notice`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `ly_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `ly_type_id` int NOT NULL COMMENT '类型ID',
  `ly_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  `ly_file` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '附件列表',
  `is_show` int NULL DEFAULT 1 COMMENT '是否显示 1 是 0 否',
  `ly_views` int NULL DEFAULT 0 COMMENT '查看量',
  `ly_date` datetime(0) NOT NULL COMMENT '发表时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ly_notice
-- ----------------------------
INSERT INTO `ly_notice` VALUES (5, '发反馈反馈反馈', 4, '<p>大声道撒多撒阿萨德撒的撒</p><p>撒的撒大所按时按时</p>', '9', 1, 2, '2020-12-15 20:46:24');
INSERT INTO `ly_notice` VALUES (6, '多久到家的角度看', 5, '<p>多大点事是收到设备</p><p>打卡打卡打卡打卡速度达到了了</p><p>是，打算睡了</p>', '13', 1, 10, '2020-12-17 15:53:05');
INSERT INTO `ly_notice` VALUES (7, '低利率的', 4, '<p>1231231231</p>', '21,22', 1, 13, '2020-12-17 15:53:12');
INSERT INTO `ly_notice` VALUES (8, '的开发开放基金法', 6, '<p>阿萨德深思熟虑1</p>', '14,15,16', 1, 52, '2020-12-17 15:53:18');

-- ----------------------------
-- Table structure for ly_notice_type
-- ----------------------------
DROP TABLE IF EXISTS `ly_notice_type`;
CREATE TABLE `ly_notice_type`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '类型ID',
  `ly_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ly_notice_type
-- ----------------------------
INSERT INTO `ly_notice_type` VALUES (4, '公告一', 1, '2020-12-02 21:32:39');
INSERT INTO `ly_notice_type` VALUES (5, '公告二', 2, '2020-12-17 15:52:05');
INSERT INTO `ly_notice_type` VALUES (6, '公告三', 3, '2020-12-17 15:52:10');
INSERT INTO `ly_notice_type` VALUES (7, '公告四', 4, '2020-12-17 15:52:14');
INSERT INTO `ly_notice_type` VALUES (8, '公告五', 6, '2020-12-17 15:52:20');
INSERT INTO `ly_notice_type` VALUES (9, '公告6', 0, '2020-12-18 11:57:16');

-- ----------------------------
-- Table structure for ly_tem_file
-- ----------------------------
DROP TABLE IF EXISTS `ly_tem_file`;
CREATE TABLE `ly_tem_file`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '文件ID',
  `ly_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件标题',
  `ly_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件路径',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ly_tem_file
-- ----------------------------
INSERT INTO `ly_tem_file` VALUES (6, '431781606915754400.jpg', '/ly_website/files/2020-12-02/431781606915754400.jpg', '2020-12-02 21:29:14');
INSERT INTO `ly_tem_file` VALUES (7, '1608003770(1)160803639216.jpg', '/ly_website/files/2020-12-15/1608003770(1)160803639216.jpg', '2020-12-15 20:46:32');
INSERT INTO `ly_tem_file` VALUES (8, '1608003770(1)160803640680.jpg', '/ly_website/files/2020-12-15/1608003770(1)160803640680.jpg', '2020-12-15 20:46:46');
INSERT INTO `ly_tem_file` VALUES (9, '1608003770(1)160803655339.jpg', '/ly_website/files/2020-12-15/1608003770(1)160803655339.jpg', '2020-12-15 20:49:13');
INSERT INTO `ly_tem_file` VALUES (11, '1608003770(1)160808275004.jpg', '/ly_website/files/2020-12-16/1608003770(1)160808275004.jpg', '2020-12-16 09:39:10');
INSERT INTO `ly_tem_file` VALUES (12, '使用说明1608082757625.txt', '/ly_website/files/2020-12-16/使用说明1608082757625.txt', '2020-12-16 09:39:17');
INSERT INTO `ly_tem_file` VALUES (13, '1608003770(1)160819158450.jpg', '/ly_website/files/2020-12-17/1608003770(1)160819158450.jpg', '2020-12-17 15:53:04');
INSERT INTO `ly_tem_file` VALUES (14, 'pexels11608369783183.png', '/ly_website/files/2020-12-19/pexels11608369783183.png', '2020-12-19 17:23:03');
INSERT INTO `ly_tem_file` VALUES (15, 'pexels91608369785475.png', '/ly_website/files/2020-12-19/pexels91608369785475.png', '2020-12-19 17:23:05');
INSERT INTO `ly_tem_file` VALUES (16, 'pexels51608369787758.png', '/ly_website/files/2020-12-19/pexels51608369787758.png', '2020-12-19 17:23:07');
INSERT INTO `ly_tem_file` VALUES (17, 'logo1608369823268.png', '/ly_website/files/2020-12-19/logo1608369823268.png', '2020-12-19 17:23:43');
INSERT INTO `ly_tem_file` VALUES (18, 'logo1608369830906.png', '/ly_website/files/2020-12-19/logo1608369830906.png', '2020-12-19 17:23:50');
INSERT INTO `ly_tem_file` VALUES (19, 'about-logo1608369847780.png', '/ly_website/files/2020-12-19/about-logo1608369847780.png', '2020-12-19 17:24:07');
INSERT INTO `ly_tem_file` VALUES (20, 'banner1608370156494.png', '/ly_website/files/2020-12-19/banner1608370156494.png', '2020-12-19 17:29:16');
INSERT INTO `ly_tem_file` VALUES (21, 'pexels71608370465093.png', '/ly_website/files/2020-12-19/pexels71608370465093.png', '2020-12-19 17:34:25');
INSERT INTO `ly_tem_file` VALUES (22, 'logo1608370466832.png', '/ly_website/files/2020-12-19/logo1608370466832.png', '2020-12-19 17:34:26');

-- ----------------------------
-- Table structure for ly_user
-- ----------------------------
DROP TABLE IF EXISTS `ly_user`;
CREATE TABLE `ly_user`  (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `user_password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `user_email` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户邮箱',
  `user_type` int NOT NULL DEFAULT 2 COMMENT '用户类别 默认2 普通用户  1 超级管理员',
  `user_ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '注册时间',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ly_user
-- ----------------------------
INSERT INTO `ly_user` VALUES (1, 'admin', '0192023a7bbd73250516f069df18b500', '290698200@qq.com', 1, NULL, '2020-11-27 21:28:42');

SET FOREIGN_KEY_CHECKS = 1;
