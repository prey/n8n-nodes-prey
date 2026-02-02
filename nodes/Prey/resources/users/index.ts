import type { INodeProperties } from 'n8n-workflow';

const showRead = {
	resource: ['user'],
	permissionLevel: ['read'],
};

const showWrite = {
	resource: ['user'],
	permissionLevel: ['write'],
};

export const userOperationsRead: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: showRead },
	options: [
		{
			name: 'List Users',
			value: 'listUsers',
			action: 'List users',
			description: 'List users in the account',
			routing: {
				request: {
					method: 'GET',
					url: '/users',
					qs: {
						page: 1,
					},
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: { property: 'users' },
						},
					],
				},
			},
		},
		{
			name: 'Get User',
			value: 'getUser',
			action: 'Get a user',
			description: 'Get a user by ID',
			routing: {
				request: {
					method: 'GET',
					url: '=/users/{{$parameter.userId}}',
				},
			},
		},
	],
	default: 'listUsers',
};

export const userOperationsWrite: INodeProperties = {
	...userOperationsRead,
	displayOptions: { show: showWrite },
};
