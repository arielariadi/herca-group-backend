import { prisma } from '../db/index.js';
import asyncHandler from 'express-async-handler';

export const creditPayments = asyncHandler(async (req, res) => {
	const { penjualan_id, jumlah_pembayaran, tanggal_pembayaran } = req.body;

	// Validasi data
	if (!penjualan_id || !jumlah_pembayaran || !tanggal_pembayaran) {
		res.status(400);
		throw new Error(
			'Semua field harus diisi: penjualan_id, jumlah_pembayaran, tanggal_pembayaran'
		);
	}

	// Cek apakah transaksi penjualan ada
	const penjualan = await prisma.penjualan.findUnique({
		where: { id: penjualan_id },
	});

	if (!penjualan) {
		res.status(404).json({ message: 'Penjualan tidak ditemukan!' });
	}

	const pembayaran = await prisma.pembayaran.create({
		data: {
			penjualan_id,
			jumlah_pembayaran,
			tanggal_pembayaran: new Date(tanggal_pembayaran),
		},
	});

	// Update grand_total pada penjualan
	const updatedPenjualan = await prisma.penjualan.update({
		where: { id: penjualan_id },
		data: {
			grand_total: penjualan.grand_total - jumlah_pembayaran,
		},
	});

	res
		.status(201)
		.json({ success: true, data: { pembayaran, updatedPenjualan } });
});

export const paymentsHistory = asyncHandler(async (req, res) => {
	const payments = await prisma.pembayaran.findMany({
		include: {
			penjualan: {
				include: {
					marketing: true, // Ambil informasi marketing dari penjualan
				},
			},
		},
		orderBy: {
			tanggal_pembayaran: 'desc',
		},
	});

	const result = payments.map(payment => ({
		id: payment.id,
		marketing: payment.penjualan.marketing.name,
		transaction_number: payment.penjualan.transaction_number,
		jumlah_pembayaran: payment.jumlah_pembayaran,
		tanggal_pembayaran: payment.tanggal_pembayaran,
	}));

	res.status(200).json({ success: 200, paymentsHistory: result });
});
