import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';

export default {
	name: WORDING.MoveWikiNode,
	value: 'moveSpaceNode',
	order: 90,
	options: [
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/wiki-v2/space-node/move')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
		{
			displayName: WORDING.WikiSourceSpaceId,
			name: 'space_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: WORDING.WikiNodeToMove,
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
			description: WORDING.WikiMoveParentDescription,
		},
		{
			displayName: WORDING.WikiTargetSpaceId,
			name: 'target_space_id',
			type: 'string',
			default: '',
			description: WORDING.WikiMoveSpaceDescription,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const nodeToken = this.getNodeParameter('node_token', index) as string;
		const targetParentToken = this.getNodeParameter('target_parent_token', index) as string;
		const targetSpaceId = this.getNodeParameter('target_space_id', index) as string;

		const body: IDataObject = {};

		if (targetParentToken) {
			body.target_parent_token = targetParentToken;
		}
		if (targetSpaceId) {
			body.target_space_id = targetSpaceId;
		}

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/nodes/${nodeToken}/move`,
			body,
		});
	},
} as ResourceOperation;
