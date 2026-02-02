import type { INodeProperties } from 'n8n-workflow';

const showRead = {
	resource: ['account'],
	permissionLevel: ['read'],
};

const showWrite = {
	resource: ['account'],
	permissionLevel: ['write'],
};

export const accountOperationsRead: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: showRead },
	options: [
		{
			name: 'Get Account Summary',
			value: 'getAccountSummary',
			action: 'Get account summary',
			description: 'Get account information',
			routing: {
				request: {
					method: 'GET',
					url: '/account',
				},
			},
		},
	],
	default: 'getAccountSummary',
};

export const accountOperationsWrite: INodeProperties = {
	...accountOperationsRead,
	displayOptions: { show: showWrite },
};
