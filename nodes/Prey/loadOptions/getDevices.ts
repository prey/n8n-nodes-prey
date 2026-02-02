import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { preyApiRequest } from '../shared/transport';

type Device = {
	id?: string;
	name?: string;
};

type DevicesResponse = {
	devices?: Device[];
};

export async function getDevices(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const response: DevicesResponse = await preyApiRequest.call(this, 'GET', '/devices', {
		page: 1,
		page_size: 100,
	});

	return (response.devices ?? []).map((device) => ({
		name: device.name ? `${device.name} (${device.id ?? 'unknown'})` : device.id ?? 'Unknown Device',
		value: device.id ?? '',
	}));
}
