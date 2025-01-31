-- CreateTable
CREATE TABLE "Marketing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Marketing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penjualan" (
    "id" SERIAL NOT NULL,
    "transaction_number" TEXT NOT NULL,
    "marketing_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cargo_fee" INTEGER NOT NULL,
    "total_balance" INTEGER NOT NULL,
    "grand_total" INTEGER NOT NULL,

    CONSTRAINT "Penjualan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembayaran" (
    "id" SERIAL NOT NULL,
    "penjualan_id" INTEGER NOT NULL,
    "jumlah_pembayaran" INTEGER NOT NULL,
    "tanggal_pembayaran" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pembayaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Penjualan" ADD CONSTRAINT "Penjualan_marketing_id_fkey" FOREIGN KEY ("marketing_id") REFERENCES "Marketing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_penjualan_id_fkey" FOREIGN KEY ("penjualan_id") REFERENCES "Penjualan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
