import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';

export default {
	name: WORDING.CopyWikiNode,
	value: 'copySpaceNode',
	order: 90,
	options: [
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/wiki-v2/space-node/copy')}">${WORDING.OpenDocument}</a>`,
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
			displayName: WORDING.WikiNodeToken,
			name: 'node_token',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
		{
			displayName: WORDING.WikiTargetParentToken,
			name: 'target_parent_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: WORDING.WikiCopyTargetParentDescription,
		},
		{
			displayName: WORDING.WikiTargetSpaceId,
			name: 'target_space_id',
			type: 'string',
			default: '',
			description: WORDING.WikiCopyTargetSpaceDescription,
		},
		{
			displayName: WORDING.WikiNewTitle,
			name: 'title',
			type: 'string',
			default: '',
			description: WORDING.WikiCopyTitleDescription,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const nodeToken = this.getNodeParameter('node_token', index) as string;
		const targetParentToken = this.getNodeParameter('target_parent_token', index) as string;
		const targetSpaceId = this.getNodeParameter('target_space_id', index) as string;
		const title = this.getNodeParameter('title', index) as string;

		const body: IDataObject = {};

		if (targetParentToken) {
			body.target_parent_token = targetParentToken;
		}
		if (targetSpaceId) {
			body.target_space_id = targetSpaceId;
		}
		if (title !== undefined) {
			body.title = title;
		}

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/nodes/${nodeToken}/copy`,
			body,
		});
	},
} as ResourceOperation;
