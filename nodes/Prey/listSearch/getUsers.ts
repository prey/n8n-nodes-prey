import type {
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { preyApiRequest } from '../shared/transport';

type User = {
	id?: string;
	name?: string;
};

type UsersResponse = {
	users?: User[];
};

export async function getUsers(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const page = paginationToken ? Number(paginationToken) : 1;
	const page_size = 100;
	const response: UsersResponse = await preyApiRequest.call(this, 'GET', '/users', {
		page,
		page_size,
	});

	const users = response.users ?? [];
	const normalizedFilter = filter?.toLowerCase();
	const results: INodeListSearchItems[] = users
		.filter((user) => {
			if (!normalizedFilter) return true;
			return (
				user.name?.toLowerCase().includes(normalizedFilter) ||
				user.id?.toLowerCase().includes(normalizedFilter)
			);
		})
		.map((user) => ({
			name: user.name ? `${user.name} (${user.id ?? 'unknown'})` : user.id ?? 'Unknown User',
			value: user.id ?? '',
		}));

	const nextPaginationToken = users.length === page_size ? page + 1 : undefined;
	return { results, paginationToken: nextPaginationToken };
}
