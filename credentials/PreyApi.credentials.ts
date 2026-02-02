import type { ICredentialType, IconFile, INodeProperties } from 'n8n-workflow';

export class PreyApi implements ICredentialType {
	name = 'preyApi';
	displayName = 'Prey API';
	icon: IconFile = 'file:prey.svg';
	documentationUrl = 'https://panel.preyproject.com/settings/developers';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			required: true,
			typeOptions: {
				password: true,
			},
			description:
				'Create this key in Prey Control Panel → Settings → Developer API (requires Personal, Business, or Education plan).',
		},
		{
			displayName: 'Permission Level',
			name: 'permissionLevel',
			type: 'options',
			default: 'read',
			options: [
				{
					name: 'Read-only',
					value: 'read',
				},
				{
					name: 'Read & Write',
					value: 'write',
				},
			],
			description:
				'Select the permission level of your API key to control which operations are available.',
		},
	];

	authenticate = {
		type: 'generic',
		properties: {
			headers: {
				apikey: '={{$credentials.apiKey}}',
			},
		},
	} as const;

	test = {
		request: {
			baseURL: 'https://api.preyproject.com/v1',
			url: '/account',
		},
	};
}
