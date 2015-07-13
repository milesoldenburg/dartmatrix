CREATE TABLE IF NOT EXISTS "gametypes" (
  "id" INTEGER NOT NULL PRIMARY KEY UNIQUE,
  "type" TEXT NOT NULL
);

INSERT INTO "gametypes" VALUES (1, 'Cricket');
INSERT INTO "gametypes" VALUES (2, '301');
INSERT INTO "gametypes" VALUES (3, '501');
