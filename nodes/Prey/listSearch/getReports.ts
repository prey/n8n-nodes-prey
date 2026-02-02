import type {
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { preyApiRequest } from '../shared/transport';

type Report = {
	id?: string | number;
	key?: string | number;
};

type ReportsResponse = {
	reports?: Report[];
};

export async function getReports(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const deviceId = this.getCurrentNodeParameter('deviceId', { extractValue: true }) as string;
	if (!deviceId) {
		return { results: [] };
	}

	const page = paginationToken ? Number(paginationToken) : 1;
	const page_size = 100;
	const response: ReportsResponse = await preyApiRequest.call(
		this,
		'GET',
		`/devices/${deviceId}/reports`,
		{
			page,
			page_size,
		},
	);

	const reports = response.reports ?? [];
	const normalizedFilter = filter?.toLowerCase();
	const results: INodeListSearchItems[] = reports
		.filter((report) => {
			if (!normalizedFilter) return true;
			const reportId = String(report.id ?? report.key ?? '');
			return reportId.toLowerCase().includes(normalizedFilter);
		})
		.map((report) => {
			const reportId = String(report.id ?? report.key ?? '');
			return {
				name: reportId ? `Report ${reportId}` : 'Report',
				value: reportId,
			};
		});

	const nextPaginationToken = reports.length === page_size ? page + 1 : undefined;
	return { results, paginationToken: nextPaginationToken };
}
