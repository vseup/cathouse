-- CreateEnum
CREATE TYPE "CatType" AS ENUM ('CAT01', 'CAT02', 'CAT03', 'CAT04', 'CAT05', 'CAT06', 'CAT07', 'CAT08', 'CAT09', 'CAT10');

-- CreateTable
CREATE TABLE "cat" (
    "id" UUID NOT NULL,
    "type" "CatType" NOT NULL,
    "name" TEXT NOT NULL,
    "donor" TEXT,
    "donation" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cat_pkey" PRIMARY KEY ("id")
);
