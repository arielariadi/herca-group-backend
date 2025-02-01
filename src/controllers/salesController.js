import { prisma } from '../db/index.js';
import asyncHandler from 'express-async-handler';

export const allSales = asyncHandler(async (req, res) => {
	const sales = await prisma.penjualan.findMany({
		include: { marketing: true },
		orderBy: { id: 'asc' },
	});

	const result = sales.map(sale => ({
		id: sale.id,
		transaction_number: sale.transaction_number,
		marketing_id: sale.marketing_id,
		marketing: sale.marketing.name,
		date: sale.date,
		cargo_fee: sale.cargo_fee,
		total_balance: sale.total_balance,
		grand_total: sale.grand_total,
	}));

	res.status(200).json({ sales: result });
});
