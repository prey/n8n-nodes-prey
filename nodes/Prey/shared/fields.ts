import type { INodeProperties } from 'n8n-workflow';

export const permissionLevelParam: INodeProperties = {
	displayName: 'API Key Permission',
	name: 'permissionLevel',
	type: 'options',
	default: 'read',
	options: [
		{ name: 'Read-Only', value: 'read' },
		{ name: 'Read & Write', value: 'write' },
	],
	description:
		'Must match the permission level of the API key in credentials. Used to show write operations.',
};

export const resourceParam: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{ name: 'Account', value: 'account' },
		{ name: 'Automation', value: 'automation' },
		{ name: 'Device', value: 'device' },
		{ name: 'Label', value: 'label' },
		{ name: 'Mass Action', value: 'massAction' },
		{ name: 'User', value: 'user' },
		{ name: 'Zone', value: 'zone' },
	],
	default: 'device',
};

export const userIdParam: INodeProperties = {
	displayName: 'User',
	name: 'userId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'User',
			name: 'list',
			type: 'list',
			placeholder: 'Select a user...',
			typeOptions: {
				searchListMethod: 'getUsers',
				searchable: true,
				searchFilterRequired: false,
			},
		},
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. userId',
		},
	],
};

export const deviceIdParam: INodeProperties = {
	displayName: 'Device',
	name: 'deviceId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'Device',
			name: 'list',
			type: 'list',
			placeholder: 'Select a device...',
			typeOptions: {
				searchListMethod: 'getDevices',
				searchable: true,
				searchFilterRequired: false,
			},
		},
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. deviceId',
		},
	],
};

export const labelIdParam: INodeProperties = {
	displayName: 'Label',
	name: 'labelId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'Label',
			name: 'list',
			type: 'list',
			placeholder: 'Select a label...',
			typeOptions: {
				searchListMethod: 'getLabels',
				searchable: true,
				searchFilterRequired: false,
			},
		},
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. labelId',
		},
	],
};

export const zoneIdParam: INodeProperties = {
	displayName: 'Zone',
	name: 'zoneId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'Zone',
			name: 'list',
			type: 'list',
			placeholder: 'Select a zone...',
			typeOptions: {
				searchListMethod: 'getZones',
				searchable: true,
				searchFilterRequired: false,
			},
		},
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. zoneId',
		},
	],
};

export const automationIdParam: INodeProperties = {
	displayName: 'Automation',
	name: 'automationId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'Automation',
			name: 'list',
			type: 'list',
			placeholder: 'Select an automation...',
			typeOptions: {
				searchListMethod: 'getAutomations',
				searchable: true,
				searchFilterRequired: false,
			},
		},
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. automationId',
		},
	],
};

export const massActionIdParam: INodeProperties = {
	displayName: 'Mass Action',
	name: 'massActionId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'Mass Action',
			name: 'list',
			type: 'list',
			placeholder: 'Select a mass action...',
			typeOptions: {
				searchListMethod: 'getMassActions',
				searchable: true,
				searchFilterRequired: false,
			},
		},
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. massActionId',
		},
	],
};

export const reportIdParam: INodeProperties = {
	displayName: 'Report',
	name: 'reportId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'Report',
			name: 'list',
			type: 'list',
			placeholder: 'Select a report...',
			typeOptions: {
				searchListMethod: 'getReports',
				searchable: true,
				searchFilterRequired: false,
			},
		},
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. reportId',
		},
	],
};

export const returnAllUsers: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: true,
	description: 'Whether to return all results or only up to a given limit',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['listUsers'],
		},
	},
	routing: {
		send: {
			paginate: '={{$value}}',
			type: 'query',
			property: 'page_size',
			value: '100',
		},
		operations: {
			pagination: {
				type: 'generic',
				properties: {
					continue:
						'={{($response.body?.links ?? []).some(link => link.rel === "next_page")}}',
					request: {
						url:
							'={{($response.body?.links ?? []).find(link => link.rel === "next_page")?.href ?? $request.url}}',
					},
				},
			},
		},
	},
};

export const limitUsers: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 50,
	typeOptions: { minValue: 1, maxValue: 100 },
	description: 'Max number of results to return',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['listUsers'],
			returnAll: [false],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'page_size',
		},
		output: {
			maxResults: '={{$value}}',
		},
	},
};

export const returnAllDevices: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: true,
	description: 'Whether to return all results or only up to a given limit',
	displayOptions: {
		show: {
			resource: ['device'],
			operation: ['listDevices', 'getDeviceReports'],
		},
	},
	routing: {
		send: {
			paginate: '={{$value}}',
			type: 'query',
			property: 'page_size',
			value: '100',
		},
		operations: {
			pagination: {
				type: 'generic',
				properties: {
					continue:
						'={{($response.body?.links ?? []).some(link => link.rel === "next_page")}}',
					request: {
						url:
							'={{($response.body?.links ?? []).find(link => link.rel === "next_page")?.href ?? $request.url}}',
					},
				},
			},
		},
	},
};

export const limitDevices: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 50,
	typeOptions: { minValue: 1, maxValue: 100 },
	description: 'Max number of results to return',
	displayOptions: {
		show: {
			resource: ['device'],
			operation: ['listDevices', 'getDeviceReports'],
			returnAll: [false],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'page_size',
		},
		output: {
			maxResults: '={{$value}}',
		},
	},
};

export const returnAllLabels: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: true,
	description: 'Whether to return all results or only up to a given limit',
	displayOptions: {
		show: {
			resource: ['label'],
			operation: ['listLabels'],
		},
	},
	routing: {
		send: {
			paginate: '={{$value}}',
			type: 'query',
			property: 'page_size',
			value: '100',
		},
		operations: {
			pagination: {
				type: 'generic',
				properties: {
					continue:
						'={{($response.body?.links ?? []).some(link => link.rel === "next_page")}}',
					request: {
						url:
							'={{($response.body?.links ?? []).find(link => link.rel === "next_page")?.href ?? $request.url}}',
					},
				},
			},
		},
	},
};

export const limitLabels: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 50,
	typeOptions: { minValue: 1, maxValue: 100 },
	description: 'Max number of results to return',
	displayOptions: {
		show: {
			resource: ['label'],
			operation: ['listLabels'],
			returnAll: [false],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'page_size',
		},
		output: {
			maxResults: '={{$value}}',
		},
	},
};

export const returnAllZones: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: true,
	description: 'Whether to return all results or only up to a given limit',
	displayOptions: {
		show: {
			resource: ['zone'],
			operation: ['listZones'],
		},
	},
	routing: {
		send: {
			paginate: '={{$value}}',
			type: 'query',
			property: 'page_size',
			value: '100',
		},
		operations: {
			pagination: {
				type: 'generic',
				properties: {
					continue:
						'={{($response.body?.links ?? []).some(link => link.rel === "next_page")}}',
					request: {
						url:
							'={{($response.body?.links ?? []).find(link => link.rel === "next_page")?.href ?? $request.url}}',
					},
				},
			},
		},
	},
};

export const limitZones: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 50,
	typeOptions: { minValue: 1, maxValue: 100 },
	description: 'Max number of results to return',
	displayOptions: {
		show: {
			resource: ['zone'],
			operation: ['listZones'],
			returnAll: [false],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'page_size',
		},
		output: {
			maxResults: '={{$value}}',
		},
	},
};

export const returnAllAutomations: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: true,
	description: 'Whether to return all results or only up to a given limit',
	displayOptions: {
		show: {
			resource: ['automation'],
			operation: ['listAutomations'],
		},
	},
	routing: {
		send: {
			paginate: '={{$value}}',
			type: 'query',
			property: 'page_size',
			value: '100',
		},
		operations: {
			pagination: {
				type: 'generic',
				properties: {
					continue:
						'={{($response.body?.links ?? []).some(link => link.rel === "next_page")}}',
					request: {
						url:
							'={{($response.body?.links ?? []).find(link => link.rel === "next_page")?.href ?? $request.url}}',
					},
				},
			},
		},
	},
};

export const limitAutomations: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 50,
	typeOptions: { minValue: 1, maxValue: 100 },
	description: 'Max number of results to return',
	displayOptions: {
		show: {
			resource: ['automation'],
			operation: ['listAutomations'],
			returnAll: [false],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'page_size',
		},
		output: {
			maxResults: '={{$value}}',
		},
	},
};

export const returnAllMassActions: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: true,
	description: 'Whether to return all results or only up to a given limit',
	displayOptions: {
		show: {
			resource: ['massAction'],
			operation: ['listMassActions'],
		},
	},
	routing: {
		send: {
			paginate: '={{$value}}',
			type: 'query',
			property: 'page_size',
			value: '100',
		},
		operations: {
			pagination: {
				type: 'generic',
				properties: {
					continue:
						'={{($response.body?.links ?? []).some(link => link.rel === "next_page")}}',
					request: {
						url:
							'={{($response.body?.links ?? []).find(link => link.rel === "next_page")?.href ?? $request.url}}',
					},
				},
			},
		},
	},
};

export const limitMassActions: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 50,
	typeOptions: { minValue: 1, maxValue: 100 },
	description: 'Max number of results to return',
	displayOptions: {
		show: {
			resource: ['massAction'],
			operation: ['listMassActions'],
			returnAll: [false],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'page_size',
		},
		output: {
			maxResults: '={{$value}}',
		},
	},
};
