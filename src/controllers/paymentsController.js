import { prisma } from '../db/index.js';
import asyncHandler from 'express-async-handler';
import Joi from 'joi';

const paymentSchema = Joi.object({
	penjualan_id: Joi.number().integer().positive().required().messages({
		'number.base': 'Penjulan ID harus berupa angka',
		'number.integer': 'Penjualan ID harus berupa angka bulat.',
		'number.positive': 'Penjualan ID harus lebih besar dari 0.',
		'any.required': 'Penjualan ID harus diisi.',
	}),
	jumlah_pembayaran: Joi.number().integer().positive().required().messages({
		'number.base': 'Jumlah pembayaran harus berupa angka.',
		'number.integer': 'Jumlah pembayaran harus berupa angka bulat.',
		'number.positive': 'Jumlah pembayaran harus lebih besar dari 0.',
		'any.required': 'Jumlah pembayaran harus diisi.',
	}),
	tanggal_pembayaran: Joi.date().iso().required().messages({
		'date.base': 'Tanggal pembayaran tidak valid.',
		'any.required': 'Tanggal pembayaran harus diisi.',
	}),
});

export const creditPayments = asyncHandler(async (req, res) => {
	const { error } = paymentSchema.validate(req.body, { abortEarly: false });
	if (error) {
		const errorMessages = error.details.map(err => err.message);
		return res.status(400).json({ errors: errorMessages });
	}

	const { penjualan_id, jumlah_pembayaran, tanggal_pembayaran } = req.body;

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

	res.status(200).json({ success: true, paymentsHistory: result });
});
