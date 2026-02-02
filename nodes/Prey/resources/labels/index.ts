import type { INodeProperties } from 'n8n-workflow';

const showRead = {
	resource: ['label'],
	permissionLevel: ['read'],
};

const showWrite = {
	resource: ['label'],
	permissionLevel: ['write'],
};

export const labelOperationsRead: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: showRead },
	options: [
		{
			name: 'List Labels',
			value: 'listLabels',
			action: 'List labels',
			description: 'List labels in the account',
			routing: {
				request: {
					method: 'GET',
					url: '/labels',
					qs: {
						page: 1,
					},
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: { property: 'labels' },
						},
					],
				},
			},
		},
		{
			name: 'Get Label',
			value: 'getLabel',
			action: 'Get a label',
			description: 'Get a label by ID',
			routing: {
				request: {
					method: 'GET',
					url: '=/labels/{{$parameter.labelId}}',
				},
			},
		},
	],
	default: 'listLabels',
};

export const labelOperationsWrite: INodeProperties = {
	...labelOperationsRead,
	displayOptions: { show: showWrite },
	options: [
		...labelOperationsRead.options!,
		{
			name: 'Create Label',
			value: 'createLabel',
			action: 'Create a label',
			description: 'Create a new label',
			routing: {
				request: {
					method: 'POST',
					url: '/labels',
					json: true,
					body: {
						name: '={{$parameter.labelName}}',
						devices: '={{$parameter.labelDevices}}',
					},
				},
			},
		},
	],
};
