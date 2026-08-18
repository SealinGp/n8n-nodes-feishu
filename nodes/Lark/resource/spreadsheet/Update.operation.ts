import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import { OperationType } from '../../../help/type/enums';
import { DESCRIPTIONS } from '../../../help/description';

export default {
	name: WORDING.UpdateSpreadsheet,
	value: OperationType.UpdateSpreadsheet,
	order: 199,
	options: [
		DESCRIPTIONS.SPREADSHEET_ID,
		DESCRIPTIONS.TITLE,
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/sheets-v3/spreadsheet/patch')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spreadsheet_id = this.getNodeParameter('spreadsheet_id', index, undefined, {
			extractValue: true,
		}) as string;
		const title = this.getNodeParameter('title', index) as string;

		const body: IDataObject = {};
		if (title) {
			body.title = title;
		}

		await RequestUtils.request.call(this, {
			method: 'PATCH',
			url: `/open-apis/sheets/v3/spreadsheets/${spreadsheet_id}`,
			body: {
				...(title && { title }),
			},
		});

		return {
			updated: true,
			spreadsheet_id,
		};
	},
} as ResourceOperation;
