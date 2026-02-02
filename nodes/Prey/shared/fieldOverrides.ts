import type { INodeProperties } from 'n8n-workflow';
import {
	automationIdParam,
	deviceIdParam,
	labelIdParam,
	massActionIdParam,
	reportIdParam,
	userIdParam,
	zoneIdParam,
} from './fields';

export const userIdFieldForGet: INodeProperties = {
	...userIdParam,
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['getUser'],
		},
	},
};

export const deviceIdFieldForOps: INodeProperties = {
	...deviceIdParam,
	displayOptions: {
		show: {
			resource: ['device'],
			operation: [
				'getDevice',
				'getDeviceLocationHistory',
				'getDeviceReports',
				'getDeviceReport',
				'triggerDeviceAction',
				'setDeviceStatus',
				'deleteDevice',
			],
		},
	},
};

export const reportIdFieldForGet: INodeProperties = {
	...reportIdParam,
	displayOptions: {
		show: {
			resource: ['device'],
			operation: ['getDeviceReport'],
		},
	},
};

export const labelIdFieldForGet: INodeProperties = {
	...labelIdParam,
	displayOptions: {
		show: {
			resource: ['label'],
			operation: ['getLabel'],
		},
	},
};

export const zoneIdFieldForGetUpdate: INodeProperties = {
	...zoneIdParam,
	displayOptions: {
		show: {
			resource: ['zone'],
			operation: ['getZone', 'updateZone'],
		},
	},
};

export const automationIdFieldForGet: INodeProperties = {
	...automationIdParam,
	displayOptions: {
		show: {
			resource: ['automation'],
			operation: ['getAutomation'],
		},
	},
};

export const massActionIdFieldForGet: INodeProperties = {
	...massActionIdParam,
	displayOptions: {
		show: {
			resource: ['massAction'],
			operation: ['getMassAction'],
		},
	},
};
