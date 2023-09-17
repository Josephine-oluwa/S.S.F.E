/*
  Warnings:

  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "authModel" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT,
    "avatar" TEXT,
    "avatarID" TEXT,
    "role" TEXT NOT NULL,
    "roleID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authModel_email_key" ON "authModel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "authModel_roleID_key" ON "authModel"("roleID");
