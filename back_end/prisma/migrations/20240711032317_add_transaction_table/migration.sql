-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "when" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
