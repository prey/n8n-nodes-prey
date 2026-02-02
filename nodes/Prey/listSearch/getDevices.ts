import type {
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { preyApiRequest } from '../shared/transport';

type Device = {
	id?: string;
	name?: string;
};

type DevicesResponse = {
	devices?: Device[];
};

export async function getDevices(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const page = paginationToken ? Number(paginationToken) : 1;
	const page_size = 100;
	const response: DevicesResponse = await preyApiRequest.call(this, 'GET', '/devices', {
		page,
		page_size,
	});

	const devices = response.devices ?? [];
	const normalizedFilter = filter?.toLowerCase();
	const results: INodeListSearchItems[] = devices
		.filter((device) => {
			if (!normalizedFilter) return true;
			return (
				device.name?.toLowerCase().includes(normalizedFilter) ||
				device.id?.toLowerCase().includes(normalizedFilter)
			);
		})
		.map((device) => ({
			name: device.name ? `${device.name} (${device.id ?? 'unknown'})` : device.id ?? 'Unknown Device',
			value: device.id ?? '',
		}));

	const nextPaginationToken = devices.length === page_size ? page + 1 : undefined;
	return { results, paginationToken: nextPaginationToken };
}
