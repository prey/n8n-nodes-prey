import type { INodeProperties } from 'n8n-workflow';

const showRead = {
	resource: ['automation'],
	permissionLevel: ['read'],
};

const showWrite = {
	resource: ['automation'],
	permissionLevel: ['write'],
};

export const automationOperationsRead: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: showRead },
	options: [
		{
			name: 'List Automations',
			value: 'listAutomations',
			action: 'List automations',
			description: 'List automations in the account',
			routing: {
				request: {
					method: 'GET',
					url: '/automations',
					qs: {
						page: 1,
					},
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: { property: 'automations' },
						},
					],
				},
			},
		},
		{
			name: 'Get Automation',
			value: 'getAutomation',
			action: 'Get an automation',
			description: 'Get an automation by ID',
			routing: {
				request: {
					method: 'GET',
					url: '=/automations/{{$parameter.automationId}}',
				},
			},
		},
	],
	default: 'listAutomations',
};

export const automationOperationsWrite: INodeProperties = {
	...automationOperationsRead,
	displayOptions: { show: showWrite },
};
