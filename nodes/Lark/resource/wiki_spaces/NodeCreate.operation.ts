import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';

export default {
	name: WORDING.CreateWikiNode,
	value: 'createSpaceNode',
	order: 90,
	options: [
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/wiki-v2/space-node/create')}">${WORDING.OpenDocument}</a>`,
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
			displayName: WORDING.WikiDocumentType,
			name: 'obj_type',
			type: 'options',
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{ name: WORDING.WikiDocument, value: 'docx' },
				{ name: WORDING.WikiSheet, value: 'sheet' },
				{ name: WORDING.WikiMindnote, value: 'mindnote' },
				{ name: WORDING.WikiBitable, value: 'bitable' },
				{ name: WORDING.WikiFile, value: 'file' },
			],
			default: 'docx',
		},
		{
			displayName: WORDING.WikiParentNodeToken,
			name: 'parent_node_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: WORDING.WikiParentNodeTokenDescription,
		},
		{
			displayName: WORDING.WikiNodeType,
			name: 'node_type',
			type: 'options',
			required: true,
			options: [
				{ name: WORDING.WikiOriginNode, value: 'origin' },
				{ name: WORDING.WikiShortcut, value: 'shortcut' },
			],
			default: 'origin',
		},
		{
			displayName: WORDING.WikiOriginNodeToken,
			name: 'origin_node_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: WORDING.WikiShortcutOriginTokenDescription,
		},
		{
			displayName: WORDING.WikiDocumentTitle,
			name: 'title',
			type: 'string',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const objType = this.getNodeParameter('obj_type', index) as string;
		const nodeType = this.getNodeParameter('node_type', index) as string;
		const parentNodeToken = this.getNodeParameter('parent_node_token', index) as string;
		const originNodeToken = this.getNodeParameter('origin_node_token', index) as string;
		const title = this.getNodeParameter('title', index) as string;

		const body: IDataObject = {
			obj_type: objType,
			node_type: nodeType,
		};

		if (parentNodeToken) body.parent_node_token = parentNodeToken;
		if (originNodeToken) body.origin_node_token = originNodeToken;
		if (title) body.title = title;

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/nodes`,
			body,
		});
	},
} as ResourceOperation;
