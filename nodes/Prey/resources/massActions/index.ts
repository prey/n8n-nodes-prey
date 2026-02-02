import type { INodeProperties } from 'n8n-workflow';

const showRead = {
	resource: ['massAction'],
	permissionLevel: ['read'],
};

const showWrite = {
	resource: ['massAction'],
	permissionLevel: ['write'],
};

export const massActionOperationsRead: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: showRead },
	options: [
		{
			name: 'List Mass Actions',
			value: 'listMassActions',
			action: 'List mass actions',
			description: 'List mass actions in the account',
			routing: {
				request: {
					method: 'GET',
					url: '/mass_actions',
					qs: {
						page: 1,
					},
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: { property: 'mass_actions' },
						},
					],
				},
			},
		},
		{
			name: 'Get Mass Action',
			value: 'getMassAction',
			action: 'Get a mass action',
			description: 'Get a mass action by ID',
			routing: {
				request: {
					method: 'GET',
					url: '=/mass_actions/{{$parameter.massActionId}}',
				},
			},
		},
	],
	default: 'listMassActions',
};

export const massActionOperationsWrite: INodeProperties = {
	...massActionOperationsRead,
	displayOptions: { show: showWrite },
};
