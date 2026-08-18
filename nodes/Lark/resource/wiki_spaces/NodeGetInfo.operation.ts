import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';

export default {
	name: WORDING.GetWikiNodeInfo,
	value: 'getSpaceNodeInfo',
	order: 90,
	options: [
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/wiki-v2/space-node/get_node')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
		{
			displayName: WORDING.WikiNodeToken,
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: WORDING.WikiNodeTokenDescription,
		},
		{
			displayName: WORDING.WikiDocumentType,
			name: 'obj_type',
			type: 'options',
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{ name: WORDING.WikiNode, value: 'wiki' },
				{ name: WORDING.WikiLegacyDocument, value: 'doc' },
				{ name: WORDING.WikiNewDocument, value: 'docx' },
				{ name: WORDING.WikiSheet, value: 'sheet' },
				{ name: WORDING.WikiMindnote, value: 'mindnote' },
				{ name: WORDING.WikiBitable, value: 'bitable' },
				{ name: WORDING.WikiFile, value: 'file' },
				{ name: WORDING.WikiSlides, value: 'slides' },
			],
			default: 'wiki',
			description: WORDING.WikiDocumentTypeDescription,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const token = this.getNodeParameter('token', index) as string;
		const objType = this.getNodeParameter('obj_type', index) as string;

		const qs: IDataObject = {
			token,
		};

		if (objType !== 'wiki') {
			qs.obj_type = objType;
		}

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: '/open-apis/wiki/v2/spaces/get_node',
			qs,
		});
	},
} as ResourceOperation;
