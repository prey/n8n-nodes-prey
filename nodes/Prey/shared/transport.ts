import type { IDataObject, ILoadOptionsFunctions, IHttpRequestOptions } from 'n8n-workflow';

export async function preyApiRequest(
	this: ILoadOptionsFunctions,
	method: IHttpRequestOptions['method'],
	endpoint: string,
	qs: IHttpRequestOptions['qs'] = {},
): Promise<IDataObject> {
	const options: IHttpRequestOptions = {
		method,
		url: `https://api.preyproject.com/v1${endpoint}`,
		qs,
		json: true,
	};

	return this.helpers.httpRequestWithAuthentication.call(this, 'preyApi', options);
}
