/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : ly_website

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 23/12/2020 11:49:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ly_carousel
-- ----------------------------
DROP TABLE IF EXISTS `ly_carousel`;
CREATE TABLE `ly_carousel`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '轮播图ID',
  `ly_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图片路径',
  `ly_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '轮播图内容',
  `is_show` int(0) NULL DEFAULT 1 COMMENT '是否显示 1 是 0 否',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '发表时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ly_file
-- ----------------------------
DROP TABLE IF EXISTS `ly_file`;
CREATE TABLE `ly_file`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '文件ID',
  `ly_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件标题',
  `ly_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件路径',
  `ly_type_id` int(0) NULL DEFAULT NULL COMMENT '类型ID, 没有ID则为附件',
  `tem_id` int(0) NULL DEFAULT NULL COMMENT '临时表ID',
  `is_show` int(0) NULL DEFAULT 1 COMMENT '是否显示 1 是 0 否',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ly_file_type
-- ----------------------------
DROP TABLE IF EXISTS `ly_file_type`;
CREATE TABLE `ly_file_type`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '类型ID',
  `ly_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
  `sort` int(0) NOT NULL DEFAULT 0 COMMENT '排序',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ly_legal
-- ----------------------------
DROP TABLE IF EXISTS `ly_legal`;
CREATE TABLE `ly_legal`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `ly_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `ly_caption` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '简介',
  `ly_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图片路径',
  `ly_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  `ly_file` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '附件列表',
  `is_show` int(0) NULL DEFAULT 1 COMMENT '是否显示 1 是 0 否',
  `ly_views` int(0) NULL DEFAULT 0 COMMENT '查看量',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ly_log
-- ----------------------------
DROP TABLE IF EXISTS `ly_log`;
CREATE TABLE `ly_log`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '错误信息ID',
  `ly_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '错误内容',
  `ly_date` datetime(0) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ly_notice
-- ----------------------------
DROP TABLE IF EXISTS `ly_notice`;
CREATE TABLE `ly_notice`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `ly_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `ly_type_id` int(0) NOT NULL COMMENT '类型ID',
  `ly_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  `ly_file` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '附件列表',
  `is_show` int(0) NULL DEFAULT 1 COMMENT '是否显示 1 是 0 否',
  `ly_views` int(0) NULL DEFAULT 0 COMMENT '查看量',
  `ly_date` datetime(0) NOT NULL COMMENT '发表时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ly_notice_type
-- ----------------------------
DROP TABLE IF EXISTS `ly_notice_type`;
CREATE TABLE `ly_notice_type`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '类型ID',
  `ly_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
  `sort` int(0) NOT NULL DEFAULT 0 COMMENT '排序',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ly_tem_file
-- ----------------------------
DROP TABLE IF EXISTS `ly_tem_file`;
CREATE TABLE `ly_tem_file`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '文件ID',
  `ly_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件标题',
  `ly_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件路径',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ly_user
-- ----------------------------
DROP TABLE IF EXISTS `ly_user`;
CREATE TABLE `ly_user`  (
  `user_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `user_password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `user_email` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户邮箱',
  `user_type` int(0) NOT NULL DEFAULT 2 COMMENT '用户类别 默认2 普通用户  1 超级管理员',
  `user_ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip',
  `ly_date` datetime(0) NULL DEFAULT NULL COMMENT '注册时间',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
