import type { INodeProperties } from 'n8n-workflow';

export const deviceActionFields: INodeProperties[] = [
	{
		displayName: 'Device Action',
		name: 'deviceAction',
		type: 'options',
		default: 'alert',
		options: [
			{ name: 'Alarm', value: 'alarm' },
			{ name: 'Alert', value: 'alert' },
			{ name: 'Lock', value: 'lock' },
		],
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['triggerDeviceAction'],
			},
		},
	},
	{
		displayName: 'Command',
		name: 'actionCommand',
		type: 'options',
		default: 'start',
		options: [
			{ name: 'Start', value: 'start' },
			{ name: 'Stop', value: 'stop' },
		],
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['triggerDeviceAction'],
			},
		},
	},
	{
		displayName: 'Action Options',
		name: 'actionOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Sound',
				name: 'sound',
				type: 'options',
				default: 'alarm',
				options: [
					{ name: 'Alarm', value: 'alarm' },
					{ name: 'Modem', value: 'modem' },
					{ name: 'Ring', value: 'ring' },
					{ name: 'Siren', value: 'siren' },
				],
			},
			{
				displayName: 'Alert Message',
				name: 'alert_message',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Unlock Password',
				name: 'unlock_pass',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Close Apps',
				name: 'close_apps',
				type: 'boolean',
				default: false,
			},
		],
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['triggerDeviceAction'],
			},
		},
	},
];

export const deviceStatusFields: INodeProperties[] = [
	{
		displayName: 'Status',
		name: 'missingStatus',
		type: 'options',
		default: 'missing',
		options: [
			{ name: 'Missing', value: 'missing' },
			{ name: 'Recovered', value: 'recovered' },
		],
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['setDeviceStatus'],
			},
		},
	},
];

export const deviceLocationFields: INodeProperties[] = [
	{
		displayName: 'Location History Format',
		name: 'locationFormat',
		type: 'options',
		default: 'json',
		options: [
			{ name: 'JSON', value: 'json' },
			{ name: 'CSV', value: 'csv' },
		],
		description: 'Choose JSON for structured data or CSV for binary output',
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['getDeviceLocationHistory'],
			},
		},
	},
];

export const deleteDeviceFields: INodeProperties[] = [
	{
		displayName: 'Confirm Delete',
		name: 'confirmDelete',
		type: 'boolean',
		default: false,
		description: 'Whether to permanently delete the device',
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['deleteDevice'],
			},
		},
	},
];

export const labelFields: INodeProperties[] = [
	{
		displayName: 'Label Name',
		name: 'labelName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['createLabel'],
			},
		},
	},
	{
		displayName: 'Device Names or IDs',
		name: 'labelDevices',
		type: 'multiOptions',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getDevices',
		},
		description: 'Select devices to assign to the label. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['createLabel'],
			},
		},
	},
];

export const zoneFields: INodeProperties[] = [
	{
		displayName: 'Zone Name',
		name: 'zoneName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zone'],
				operation: ['createZone', 'updateZone'],
			},
		},
	},
	{
		displayName: 'Latitude',
		name: 'zoneLatitude',
		type: 'number',
		default: 0,
		typeOptions: { minValue: -90, maxValue: 90 },
		displayOptions: {
			show: {
				resource: ['zone'],
				operation: ['createZone', 'updateZone'],
			},
		},
	},
	{
		displayName: 'Longitude',
		name: 'zoneLongitude',
		type: 'number',
		default: 0,
		typeOptions: { minValue: -180, maxValue: 180 },
		displayOptions: {
			show: {
				resource: ['zone'],
				operation: ['createZone', 'updateZone'],
			},
		},
	},
	{
		displayName: 'Radius (Meters)',
		name: 'zoneRadius',
		type: 'number',
		default: 100,
		typeOptions: { minValue: 1 },
		displayOptions: {
			show: {
				resource: ['zone'],
				operation: ['createZone', 'updateZone'],
			},
		},
	},
	{
		displayName: 'Color (Hex)',
		name: 'zoneColor',
		type: 'color',
		default: '#00AEEF',
		displayOptions: {
			show: {
				resource: ['zone'],
				operation: ['createZone', 'updateZone'],
			},
		},
	},
	{
		displayName: 'Device Names or IDs',
		name: 'zoneDevices',
		type: 'multiOptions',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getDevices',
		},
		description: 'Select devices to assign to the zone. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['zone'],
				operation: ['createZone'],
			},
		},
	},
	{
		displayName: 'Add Device Names or IDs',
		name: 'zoneAddDevices',
		type: 'multiOptions',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getDevices',
		},
		description: 'Devices to add to the zone. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['zone'],
				operation: ['updateZone'],
			},
		},
	},
	{
		displayName: 'Remove Device Names or IDs',
		name: 'zoneRemoveDevices',
		type: 'multiOptions',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getDevices',
		},
		description: 'Devices to remove from the zone. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['zone'],
				operation: ['updateZone'],
			},
		},
	},
	{
		displayName: 'Removed Actions',
		name: 'zoneRemovedActions',
		type: 'options',
		default: 'when_in',
		options: [
			{ name: 'When In', value: 'when_in' },
			{ name: 'When Out', value: 'when_out' },
		],
		description: 'Remove an action trigger from the zone',
		displayOptions: {
			show: {
				resource: ['zone'],
				operation: ['updateZone'],
			},
		},
	},
];
