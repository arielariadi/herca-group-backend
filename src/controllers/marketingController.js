import { prisma } from '../db/index.js';
import asyncHandler from 'express-async-handler';

export const marketingCommision = asyncHandler(async (req, res) => {
	const sales = await prisma.penjualan.findMany({
		include: { marketing: true },
	});

	const result = sales.reduce((acc, sale) => {
		const month = sale.date.toISOString().slice(0, 7);
		const key = `${sale.marketing.name}-${month}`;

		if (!acc[key]) {
			acc[key] = {
				marketing: sale.marketing.name,
				bulan: month,
				omzet: 0,
				komisiPersen: 0,
				komisiNominal: 0,
			};
		}
		acc[key].omzet += sale.grand_total;

		acc[key].omzet = Math.floor(acc[key].omzet / 1000) * 1000;

		// Hitung komisi berdasarkan omzet
		if (acc[key].omzet >= 500000000) {
			acc[key].komisiPersen = 10;
		} else if (acc[key].omzet >= 200000000) {
			acc[key].komisiPersen = 5;
		} else if (acc[key].omzet >= 100000000) {
			acc[key].komisiPersen = 2.5;
		} else {
			acc[key].komisiPersen = 0;
		}
		acc[key].komisiNominal = (acc[key].omzet * acc[key].komisiPersen) / 100;

		return acc;
	}, {});

	res.json(Object.values(result));
});
