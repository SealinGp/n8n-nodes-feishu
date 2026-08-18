import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';

export default {
	name: WORDING.GetWikiNodeChildren,
	value: 'getSpaceNodeChildren',
	order: 90,
	options: [
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/wiki-v2/space-node/list')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
		{
			displayName: WORDING.WikiSpaceId,
			name: 'space_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: WORDING.WikiParentNodeToken,
			name: 'parent_node_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: WORDING.WikiPageSize,
			name: 'page_size',
			type: 'number',
			default: 20,
			description: WORDING.WikiPageSizeMaxDescription,
		},
		{
			displayName: WORDING.WikiPageToken,
			name: 'page_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: WORDING.WikiPageTokenDescriptionShort,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const parentNodeToken = this.getNodeParameter('parent_node_token', index) as string;
		const pageSize = this.getNodeParameter('page_size', index) as number;
		const pageToken = this.getNodeParameter('page_token', index, '') as string;

		const qs: IDataObject = {
			page_size: pageSize,
		};

		if (parentNodeToken) {
			qs.parent_node_token = parentNodeToken;
		}

		if (pageToken) {
			qs.page_token = pageToken;
		}

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/nodes`,
			qs,
		});
	},
} as ResourceOperation;
