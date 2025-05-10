/*
  Warnings:

  - You are about to alter the column `endDate` on the `WorkExperience` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `VerificationToken` ADD PRIMARY KEY (`identifier`, `token`);

-- DropIndex
DROP INDEX `VerificationToken_identifier_token_key` ON `VerificationToken`;

-- AlterTable
ALTER TABLE `WorkExperience` MODIFY `endDate` DATETIME(3) NULL;
