import { prisma } from '../db/index.js';
import asyncHandler from 'express-async-handler';

export const marketingsCommisions = asyncHandler(async (req, res) => {
	const sales = await prisma.penjualan.findMany({
		include: { marketing: true },
	});

	const result = sales.reduce((acc, sale) => {
		const month = sale.date.toISOString().slice(0, 7);
		const key = `${sale.marketing.name}-${month}`;

		if (!acc[key]) {
			acc[key] = {
				id_marketing: sale.marketing.id,
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

	const sortedResult = Object.values(result).sort((a, b) => {
		// Pertama, sory berdasarkan bulan
		const monthCompare = a.bulan.localeCompare(b.bulan);
		if (monthCompare !== 0) return monthCompare;

		// Lalu, sort berdasarkan id: Alfandy (1), Mery (2), Danang (3)
		const marketingOrder = [1, 2, 3];
		return (
			marketingOrder.indexOf(a.id_marketing) -
			marketingOrder.indexOf(b.id_marketing)
		);
	});

	res.json(sortedResult);
});
