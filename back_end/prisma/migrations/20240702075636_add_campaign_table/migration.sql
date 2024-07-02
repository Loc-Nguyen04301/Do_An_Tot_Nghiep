-- CreateTable
CREATE TABLE "SaleCampaign" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "from_date" TEXT NOT NULL,
    "to_date" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "SaleCampaign_pkey" PRIMARY KEY ("id")
);
