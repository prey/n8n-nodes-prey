import type {
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { preyApiRequest } from '../shared/transport';

type Automation = {
	id?: string;
	name?: string;
};

type AutomationsResponse = {
	automations?: Automation[];
};

export async function getAutomations(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const page = paginationToken ? Number(paginationToken) : 1;
	const page_size = 100;
	const response: AutomationsResponse = await preyApiRequest.call(this, 'GET', '/automations', {
		page,
		page_size,
	});

	const automations = response.automations ?? [];
	const normalizedFilter = filter?.toLowerCase();
	const results: INodeListSearchItems[] = automations
		.filter((automation) => {
			if (!normalizedFilter) return true;
			return (
				automation.name?.toLowerCase().includes(normalizedFilter) ||
				automation.id?.toLowerCase().includes(normalizedFilter)
			);
		})
		.map((automation) => ({
			name: automation.name
				? `${automation.name} (${automation.id ?? 'unknown'})`
				: automation.id ?? 'Unknown Automation',
			value: automation.id ?? '',
		}));

	const nextPaginationToken = automations.length === page_size ? page + 1 : undefined;
	return { results, paginationToken: nextPaginationToken };
}
