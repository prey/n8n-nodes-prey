import type {
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { preyApiRequest } from '../shared/transport';

type Zone = {
	id?: string;
	name?: string;
};

type ZonesResponse = {
	zones?: Zone[];
};

export async function getZones(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const page = paginationToken ? Number(paginationToken) : 1;
	const page_size = 100;
	const response: ZonesResponse = await preyApiRequest.call(this, 'GET', '/zones', {
		page,
		page_size,
	});

	const zones = response.zones ?? [];
	const normalizedFilter = filter?.toLowerCase();
	const results: INodeListSearchItems[] = zones
		.filter((zone) => {
			if (!normalizedFilter) return true;
			return (
				zone.name?.toLowerCase().includes(normalizedFilter) ||
				zone.id?.toLowerCase().includes(normalizedFilter)
			);
		})
		.map((zone) => ({
			name: zone.name ? `${zone.name} (${zone.id ?? 'unknown'})` : zone.id ?? 'Unknown Zone',
			value: zone.id ?? '',
		}));

	const nextPaginationToken = zones.length === page_size ? page + 1 : undefined;
	return { results, paginationToken: nextPaginationToken };
}
