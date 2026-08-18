import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import { OperationType } from '../../../help/type/enums';
import { DESCRIPTIONS } from '../../../help/description';

export default {
	name: WORDING.DeleteDimension,
	value: OperationType.DeleteDimension,
	order: 167,
	options: [
		DESCRIPTIONS.SPREADSHEET_ID,
		DESCRIPTIONS.SHEET_ID,
		DESCRIPTIONS.MAJOR_DIMENSION,
		{
			...DESCRIPTIONS.START_INDEX,
			default: 1,
			typeOptions: {
				minValue: 1,
				numberPrecision: 0,
			},
		},
		{
			...DESCRIPTIONS.END_INDEX,
			default: 1,
			typeOptions: {
				minValue: 1,
				numberPrecision: 0,
			},
		},
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/sheets-v3/sheet-rowcol/-delete-rows-or-columns')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spreadsheet_id = this.getNodeParameter('spreadsheet_id', index, undefined, {
			extractValue: true,
		}) as string;
		const sheetId = this.getNodeParameter('sheet_id', index, undefined, {
			extractValue: true,
		}) as string;
		const majorDimension = this.getNodeParameter('majorDimension', index) as string;
		const startIndex = this.getNodeParameter('startIndex', index) as number;
		const endIndex = this.getNodeParameter('endIndex', index) as number;

		const body: IDataObject = {
			dimension: {
				sheetId,
				majorDimension,
				startIndex,
				endIndex,
			},
		};

		const { data } = await RequestUtils.request.call(this, {
			method: 'DELETE',
			url: `/open-apis/sheets/v2/spreadsheets/${spreadsheet_id}/dimension_range`,
			body,
		});

		return data;
	},
} as ResourceOperation;
