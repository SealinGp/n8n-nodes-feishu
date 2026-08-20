import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import { OperationType } from '../../../help/type/enums';
import { DESCRIPTIONS } from '../../../help/description';

export default {
	name: WORDING.CreateDocument,
	value: OperationType.CreateDocument,
	order: 200,
	options: [
		DESCRIPTIONS.TITLE,
		DESCRIPTIONS.FOLDER_TOKEN,
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/docs/docx-v1/document/create')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const title = this.getNodeParameter('title', index) as string;
		const folder_token = this.getNodeParameter('folder_token', index, undefined, {
			extractValue: true,
		}) as string;

		const {
			data: { document },
		} = await RequestUtils.request.call(this, {
			method: 'POST',
			url: '/open-apis/docx/v1/documents',
			body: {
				...(title && { title }),
				...(folder_token && { folder_token }),
			},
		});

		return document;
	},
} as ResourceOperation;
