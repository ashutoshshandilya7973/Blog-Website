-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TECHNOLOGY', 'BUSINESS', 'HEALTH', 'EDUCATION', 'ENTERTAINMENT', 'SPORTS', 'LIFESTYLE', 'SCIENCE', 'TRAVEL', 'FOOD');

-- CreateTable
CREATE TABLE "blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'TECHNOLOGY',
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
