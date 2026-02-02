import {
	NodeConnectionTypes,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { getAutomations } from './listSearch/getAutomations';
import { getDevices } from './listSearch/getDevices';
import { getLabels } from './listSearch/getLabels';
import { getMassActions } from './listSearch/getMassActions';
import { getReports } from './listSearch/getReports';
import { getUsers } from './listSearch/getUsers';
import { getZones } from './listSearch/getZones';
import { getDevices as getDevicesLoadOptions } from './loadOptions/getDevices';
import { accountOperationsRead, accountOperationsWrite } from './resources/account';
import { automationOperationsRead, automationOperationsWrite } from './resources/automations';
import { deviceOperationsRead, deviceOperationsWrite } from './resources/devices';
import { labelOperationsRead, labelOperationsWrite } from './resources/labels';
import { massActionOperationsRead, massActionOperationsWrite } from './resources/massActions';
import { userOperationsRead, userOperationsWrite } from './resources/users';
import { zoneOperationsRead, zoneOperationsWrite } from './resources/zones';
import {
	limitAutomations,
	limitDevices,
	limitLabels,
	limitMassActions,
	limitUsers,
	limitZones,
	permissionLevelParam,
	resourceParam,
	returnAllAutomations,
	returnAllDevices,
	returnAllLabels,
	returnAllMassActions,
	returnAllUsers,
	returnAllZones,
} from './shared/fields';
import {
	automationIdFieldForGet,
	deviceIdFieldForOps,
	labelIdFieldForGet,
	massActionIdFieldForGet,
	reportIdFieldForGet,
	userIdFieldForGet,
	zoneIdFieldForGetUpdate,
} from './shared/fieldOverrides';
import {
	deleteDeviceFields,
	deviceActionFields,
	deviceLocationFields,
	deviceStatusFields,
	labelFields,
	zoneFields,
} from './shared/uiFields';

export class Prey implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Prey',
		name: 'prey',
		icon: { light: 'file:../../icons/prey.svg', dark: 'file:../../icons/prey.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Manage devices and account data in Prey',
		defaults: {
			name: 'Prey',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'preyApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.preyproject.com/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			permissionLevelParam,
			resourceParam,
			accountOperationsRead,
			accountOperationsWrite,
			userOperationsRead,
			userOperationsWrite,
			deviceOperationsRead,
			deviceOperationsWrite,
			labelOperationsRead,
			labelOperationsWrite,
			zoneOperationsRead,
			zoneOperationsWrite,
			automationOperationsRead,
			automationOperationsWrite,
			massActionOperationsRead,
			massActionOperationsWrite,
			returnAllUsers,
			limitUsers,
			returnAllDevices,
			limitDevices,
			returnAllLabels,
			limitLabels,
			returnAllZones,
			limitZones,
			returnAllAutomations,
			limitAutomations,
			returnAllMassActions,
			limitMassActions,
			userIdFieldForGet,
			deviceIdFieldForOps,
			...deviceLocationFields,
			reportIdFieldForGet,
			...deviceActionFields,
			...deviceStatusFields,
			...deleteDeviceFields,
			labelIdFieldForGet,
			...labelFields,
			zoneIdFieldForGetUpdate,
			...zoneFields,
			automationIdFieldForGet,
			massActionIdFieldForGet,
		],
	};

	methods = {
		listSearch: {
			getUsers,
			getDevices,
			getLabels,
			getZones,
			getAutomations,
			getMassActions,
			getReports,
		},
		loadOptions: {
			getDevices: getDevicesLoadOptions,
		},
	};
}
