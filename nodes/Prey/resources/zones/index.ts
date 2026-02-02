import type { INodeProperties } from 'n8n-workflow';

const showRead = {
	resource: ['zone'],
	permissionLevel: ['read'],
};

const showWrite = {
	resource: ['zone'],
	permissionLevel: ['write'],
};

export const zoneOperationsRead: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: showRead },
	options: [
		{
			name: 'List Zones',
			value: 'listZones',
			action: 'List zones',
			description: 'List zones in the account',
			routing: {
				request: {
					method: 'GET',
					url: '/zones',
					qs: {
						page: 1,
					},
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: { property: 'zones' },
						},
					],
				},
			},
		},
		{
			name: 'Get Zone',
			value: 'getZone',
			action: 'Get a zone',
			description: 'Get a zone by ID',
			routing: {
				request: {
					method: 'GET',
					url: '=/zones/{{$parameter.zoneId}}',
				},
			},
		},
	],
	default: 'listZones',
};

export const zoneOperationsWrite: INodeProperties = {
	...zoneOperationsRead,
	displayOptions: { show: showWrite },
	options: [
		...zoneOperationsRead.options!,
		{
			name: 'Create Zone',
			value: 'createZone',
			action: 'Create a zone',
			description: 'Create a control zone',
			routing: {
				request: {
					method: 'POST',
					url: '/zones',
					json: true,
					body: {
						name: '={{$parameter.zoneName}}',
						latitude: '={{$parameter.zoneLatitude}}',
						longitude: '={{$parameter.zoneLongitude}}',
						radius: '={{$parameter.zoneRadius}}',
						color: '={{$parameter.zoneColor}}',
						devices: '={{$parameter.zoneDevices}}',
					},
				},
			},
		},
		{
			name: 'Update Zone',
			value: 'updateZone',
			action: 'Update a zone',
			description: 'Update a control zone',
			routing: {
				request: {
					method: 'PUT',
					url: '=/zones/{{$parameter.zoneId}}',
					json: true,
					body: {
						name: '={{$parameter.zoneName}}',
						latitude: '={{$parameter.zoneLatitude}}',
						longitude: '={{$parameter.zoneLongitude}}',
						radius: '={{$parameter.zoneRadius}}',
						color: '={{$parameter.zoneColor}}',
						add_devices: '={{$parameter.zoneAddDevices}}',
						remove_devices: '={{$parameter.zoneRemoveDevices}}',
						removed_actions: '={{$parameter.zoneRemovedActions}}',
					},
				},
			},
		},
	],
};
