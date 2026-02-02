import type { INodeProperties } from 'n8n-workflow';

const showRead = {
	resource: ['device'],
	permissionLevel: ['read'],
};

const showWrite = {
	resource: ['device'],
	permissionLevel: ['write'],
};

export const deviceOperationsRead: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: showRead },
	options: [
		{
			name: 'Get Device',
			value: 'getDevice',
			action: 'Get a device',
			description: 'Get a device by ID',
			routing: {
				request: {
					method: 'GET',
					url: '=/devices/{{$parameter.deviceId}}',
				},
			},
		},
		{
			name: 'Get Device Location History',
			value: 'getDeviceLocationHistory',
			action: 'Get device location history',
			description: 'Get device location history (JSON or CSV)',
			routing: {
				request: {
					method: 'GET',
					url: '=/devices/{{$parameter.deviceId}}/location_activity{{$parameter.locationFormat === "csv" ? ".csv" : ""}}',
				},
				output: {
					postReceive: [
						{
							type: 'binaryData',
							enabled: '={{$parameter.locationFormat === "csv"}}',
							properties: { destinationProperty: 'data' },
						},
						{
							type: 'rootProperty',
							enabled: '={{$parameter.locationFormat !== "csv"}}',
							properties: { property: 'latest_locations' },
						},
					],
				},
			},
		},
		{
			name: 'Get Device Report',
			value: 'getDeviceReport',
			action: 'Get a device report',
			description: 'Get a single report for a device',
			routing: {
				request: {
					method: 'GET',
					url: '=/devices/{{$parameter.deviceId}}/reports/{{$parameter.reportId}}',
				},
			},
		},
		{
			name: 'Get Device Reports',
			value: 'getDeviceReports',
			action: 'Get device reports',
			description: 'List reports for a device',
			routing: {
				request: {
					method: 'GET',
					url: '=/devices/{{$parameter.deviceId}}/reports',
					qs: {
						page: 1,
					},
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: { property: 'reports' },
						},
					],
				},
			},
		},
		{
			name: 'List Devices',
			value: 'listDevices',
			action: 'List devices',
			description: 'List devices in the account',
			routing: {
				request: {
					method: 'GET',
					url: '/devices',
					qs: {
						page: 1,
					},
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: { property: 'devices' },
						},
					],
				},
			},
		},
	],
	default: 'listDevices',
};

export const deviceOperationsWrite: INodeProperties = {
	...deviceOperationsRead,
	displayOptions: { show: showWrite },
	options: [
		...deviceOperationsRead.options!,
		{
			name: 'Trigger Device Action',
			value: 'triggerDeviceAction',
			action: 'Trigger a device action',
			description: 'Trigger alarm, alert, or lock on a device',
			routing: {
				request: {
					method: 'PUT',
					url: '=/devices/{{$parameter.deviceId}}/action',
					json: true,
					body: {
						command: '={{$parameter.actionCommand}}',
						action_name: '={{$parameter.deviceAction}}',
						options: '={{$parameter.actionOptions}}',
					},
				},
			},
		},
		{
			name: 'Set Device Status (Missing/Recovered)',
			value: 'setDeviceStatus',
			action: 'Set device status',
			description: 'Mark a device as missing or recovered',
			routing: {
				request: {
					method: 'PUT',
					url: '=/devices/{{$parameter.deviceId}}/missing',
					json: true,
					body: {
						missing: '={{$parameter.missingStatus === "missing"}}',
					},
				},
			},
		},
		{
			name: 'Delete Device',
			value: 'deleteDevice',
			action: 'Delete a device',
			description: 'Delete a device from the fleet',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/devices/{{$parameter.deviceId}}',
				},
			},
		},
	],
};
