CREATE TABLE IF NOT EXISTS "gametypes" (
  "id" INTEGER NOT NULL PRIMARY KEY UNIQUE,
  "type" TEXT NOT NULL
);

INSERT INTO "gametypes" VALUES (1, 'Cricket');
INSERT INTO "gametypes" VALUES (2, '301');
INSERT INTO "gametypes" VALUES (3, '501');

CREATE TABLE IF NOT EXISTS "settings" (
  "ai_enabled" INTEGER NOT NULL,
  "ai_level" INTEGER NOT NULL
);

INSERT INTO "settings" VALUES (1, 40);

CREATE TABLE IF NOT EXISTS "3outs" (
	`id`	INTEGER NOT NULL,
	`d1`	TEXT,
	`d2`	TEXT,
	`d3`	TEXT
);

INSERT INTO `3outs` VALUES (164,'t20','t18','Bull');
INSERT INTO `3outs` VALUES (164,'t19','t19','Bull');
INSERT INTO `3outs` VALUES (170,'t20','t20','Bull');
INSERT INTO `3outs` VALUES (167,'t20','t19','Bull');
INSERT INTO `3outs` VALUES (161,'t20','t17','Bull');
INSERT INTO `3outs` VALUES (160,'t20','t20','d20');
INSERT INTO `3outs` VALUES (158,'t20','t20','d19');
INSERT INTO `3outs` VALUES (157,'t20','t19','d20');
INSERT INTO `3outs` VALUES (156,'t20','t20','d18');
INSERT INTO `3outs` VALUES (155,'t20','t19','d19');
INSERT INTO `3outs` VALUES (154,'t20','t18','d20');
INSERT INTO `3outs` VALUES (154,'t19','t19','d20');
INSERT INTO `3outs` VALUES (153,'t20','t19','d18');
INSERT INTO `3outs` VALUES (152,'t20','t20','d16');
INSERT INTO `3outs` VALUES (151,'t20','t17','d20');
INSERT INTO `3outs` VALUES (150,'t20','t18','d18');
INSERT INTO `3outs` VALUES (149,'t20','t19','d16');
INSERT INTO `3outs` VALUES (148,'t20','t20','d14');
INSERT INTO `3outs` VALUES (148,'t20','t16','d20');
INSERT INTO `3outs` VALUES (147,'t20','t17','d18');
INSERT INTO `3outs` VALUES (146,'t20','t18','d16');
INSERT INTO `3outs` VALUES (146,'t19','t19','d16');
INSERT INTO `3outs` VALUES (145,'t20','t19','d14');
INSERT INTO `3outs` VALUES (145,'t20','t15','d20');
INSERT INTO `3outs` VALUES (144,'t20','t20','d12');
INSERT INTO `3outs` VALUES (144,'t18','t18','d18');
INSERT INTO `3outs` VALUES (144,'t20','t16','d18');
INSERT INTO `3outs` VALUES (143,'t20','t17','d16');
INSERT INTO `3outs` VALUES (142,'t20','t14','d20');
INSERT INTO `3outs` VALUES (142,'t20','t18','d14');
INSERT INTO `3outs` VALUES (141,'t20','t19','d12');
INSERT INTO `3outs` VALUES (141,'t17','t18','d18');
INSERT INTO `3outs` VALUES (140,'t20','t20','d10');
INSERT INTO `3outs` VALUES (139,'t19','t14','d20');
INSERT INTO `3outs` VALUES (139,'t19','t18','d14');
INSERT INTO `3outs` VALUES (139,'t20','t19','d11');
INSERT INTO `3outs` VALUES (138,'t20','t18','d12');
INSERT INTO `3outs` VALUES (137,'t20','t19','d10');
INSERT INTO `3outs` VALUES (136,'t20','t20','d8');
INSERT INTO `3outs` VALUES (135,'Bull','t19','d14');
INSERT INTO `3outs` VALUES (135,'Bull ','t15','d20');
INSERT INTO `3outs` VALUES (134,'t20','t14','d16');
INSERT INTO `3outs` VALUES (133,'t20','t19','d8');
INSERT INTO `3outs` VALUES (132,'Bull','t14','d20');
INSERT INTO `3outs` VALUES (132,'Bull','Bull','d16');
INSERT INTO `3outs` VALUES (131,'t20','t13','d16');
INSERT INTO `3outs` VALUES (131,'t19','t14','d16');
INSERT INTO `3outs` VALUES (130,'t20','t20','d5');
INSERT INTO `3outs` VALUES (129,'t19','t20','d6');
INSERT INTO `3outs` VALUES (128,'t18','t14','d16');
INSERT INTO `3outs` VALUES (128,'t18','t18','d10');
INSERT INTO `3outs` VALUES (127,'t20','t17','d8');
INSERT INTO `3outs` VALUES (126,'t19','t19','d6');
INSERT INTO `3outs` VALUES (125,'Outer','t20','d20');
INSERT INTO `3outs` VALUES (124,'t20','t14','d11');
INSERT INTO `3outs` VALUES (123,'t19','t16','d9');
INSERT INTO `3outs` VALUES (122,'t18','t18','d7');
INSERT INTO `3outs` VALUES (121,'t20','t11','d14');
INSERT INTO `3outs` VALUES (120,'t20','os20','d20');
INSERT INTO `3outs` VALUES (119,'t19','t12','d13');
INSERT INTO `3outs` VALUES (118,'t20','os18','d20');
INSERT INTO `3outs` VALUES (117,'t20','os17','d20');
INSERT INTO `3outs` VALUES (116,'t20','os16','d20');
INSERT INTO `3outs` VALUES (116,'t19','os19','d20');
INSERT INTO `3outs` VALUES (115,'t19','os18','d20');
INSERT INTO `3outs` VALUES (114,'t20','os14','d20');
INSERT INTO `3outs` VALUES (114,'t18','os20','d20');
INSERT INTO `3outs` VALUES (113,'t20','os13','d20');
INSERT INTO `3outs` VALUES (113,'t19','os16','d20');
INSERT INTO `3outs` VALUES (112,'t20','os20','d16');
INSERT INTO `3outs` VALUES (112,'t18','os18','d20');
INSERT INTO `3outs` VALUES (112,'t19','os19','d18');
INSERT INTO `3outs` VALUES (111,'t19','os14','d20');
INSERT INTO `3outs` VALUES (111,'t20','os19','d16');
INSERT INTO `3outs` VALUES (111,'t17','os20','d20');
INSERT INTO `3outs` VALUES (110,'t20','os18','d16');