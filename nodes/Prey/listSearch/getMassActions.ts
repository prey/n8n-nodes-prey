import type {
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { preyApiRequest } from '../shared/transport';

type MassAction = {
	id?: string;
	name?: string;
};

type MassActionsResponse = {
	mass_actions?: MassAction[];
};

export async function getMassActions(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const page = paginationToken ? Number(paginationToken) : 1;
	const page_size = 100;
	const response: MassActionsResponse = await preyApiRequest.call(this, 'GET', '/mass_actions', {
		page,
		page_size,
	});

	const massActions = response.mass_actions ?? [];
	const normalizedFilter = filter?.toLowerCase();
	const results: INodeListSearchItems[] = massActions
		.filter((massAction) => {
			if (!normalizedFilter) return true;
			return (
				massAction.name?.toLowerCase().includes(normalizedFilter) ||
				massAction.id?.toLowerCase().includes(normalizedFilter)
			);
		})
		.map((massAction) => ({
			name: massAction.name
				? `${massAction.name} (${massAction.id ?? 'unknown'})`
				: massAction.id ?? 'Unknown Mass Action',
			value: massAction.id ?? '',
		}));

	const nextPaginationToken = massActions.length === page_size ? page + 1 : undefined;
	return { results, paginationToken: nextPaginationToken };
}
