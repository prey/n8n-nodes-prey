import type {
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { preyApiRequest } from '../shared/transport';

type Label = {
	id?: string;
	name?: string;
};

type LabelsResponse = {
	labels?: Label[];
};

export async function getLabels(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const page = paginationToken ? Number(paginationToken) : 1;
	const page_size = 100;
	const response: LabelsResponse = await preyApiRequest.call(this, 'GET', '/labels', {
		page,
		page_size,
	});

	const labels = response.labels ?? [];
	const normalizedFilter = filter?.toLowerCase();
	const results: INodeListSearchItems[] = labels
		.filter((label) => {
			if (!normalizedFilter) return true;
			return (
				label.name?.toLowerCase().includes(normalizedFilter) ||
				label.id?.toLowerCase().includes(normalizedFilter)
			);
		})
		.map((label) => ({
			name: label.name ? `${label.name} (${label.id ?? 'unknown'})` : label.id ?? 'Unknown Label',
			value: label.id ?? '',
		}));

	const nextPaginationToken = labels.length === page_size ? page + 1 : undefined;
	return { results, paginationToken: nextPaginationToken };
}
