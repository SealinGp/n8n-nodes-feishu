import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { OperationType } from '../../../help/type/enums';
import { WORDING } from '../../../help/wording';
import { DESCRIPTIONS } from '../../../help/description';

export default {
	name: WORDING.UpdateSheet,
	value: OperationType.UpdateSheet,
	order: 184,
	options: [
		DESCRIPTIONS.SPREADSHEET_ID,
		DESCRIPTIONS.SHEET_ID,
		DESCRIPTIONS.TITLE,
		{
			displayName: WORDING.UiLockSheet,
			name: 'lock',
			description: 'Whether to lock the sheet',
			type: 'boolean',
			required: true,
			default: false,
		},
		{
			displayName: WORDING.UiLockInfo,
			name: 'lockInfo',
			description: 'Lock info',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					lock: [true],
				},
			},
		},
		{
			displayName: WORDING.Options,
			name: 'options',
			type: 'collection',
			placeholder: WORDING.AddField,
			default: {},
			options: [
				DESCRIPTIONS.SHEET_INDEX,
				{
					displayName: WORDING.UiFrozenColumnCount,
					name: 'frozenColumnCount',
					description: 'Column index to freeze up to. 0 means no columns are frozen.',
					type: 'number',
					default: 0,
					typeOptions: {
						minValue: 0,
						numberPrecision: 0,
					},
				},
				{
					displayName: WORDING.UiFrozenRowCount,
					name: 'frozenRowCount',
					description: 'Row index to freeze up to. 0 means no rows are frozen.',
					type: 'number',
					default: 0,
					typeOptions: {
						minValue: 0,
						numberPrecision: 0,
					},
				},
				{
					displayName: WORDING.UiHiddenSheet,
					name: 'hidden',
					description: 'Whether to hide the sheet',
					default: false,
					type: 'boolean',
				},
				{
					displayName: WORDING.UiUserIds944168,
					name: 'userIds',
					description: 'User IDs',
					type: 'json',
					default: '[]',
					displayOptions: {
						show: {
							user_id_type: ['open_id', 'union_id'],
						},
					},
				},
				DESCRIPTIONS.USER_ID_TYPE,
			],
		},
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/sheets-v3/spreadsheet-sheet/update-sheet-properties')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spreadsheetId = this.getNodeParameter('spreadsheet_id', index, undefined, {
			extractValue: true,
		}) as string;
		const sheetId = this.getNodeParameter('sheet_id', index, undefined, {
			extractValue: true,
		}) as string;
		const title = this.getNodeParameter('title', index, '') as IDataObject;
		const lock = this.getNodeParameter('lock', index, false) as boolean;
		const lockInfo = this.getNodeParameter('lockInfo', index, '') as string;

		const options = this.getNodeParameter('options', index, {}) as IDataObject;
		const sheetIndex = (options.sheet_index as number) || 0;
		const hidden = (options.hidden as boolean) || false;
		const frozenRowCount = (options.frozenRowCount as number) || undefined;
		const frozenColumnCount = (options.frozenColumnCount as number) || undefined;
		const userIds = (options.userIds as string[]) || undefined;
		const userIdType = (options.user_id_type as string) || undefined;

		const body: IDataObject = {
			requests: [
				{
					updateSheet: {
						properties: {
							sheetId: sheetId,
							...(title && { title }),
							index: sheetIndex,
							hidden: hidden,
							...(frozenRowCount && { frozenRowCount }),
							...(frozenColumnCount && { frozenColCount: frozenColumnCount }),
							protect: {
								lock: lock ? 'LOCK' : 'UNLOCK',
								...(lockInfo && { lockInfo }),
								...(userIds && { userIDs: userIds }),
							},
						},
					},
				},
			],
		};

		const {
			data: { replies },
		} = await RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/sheets/v2/spreadsheets/${spreadsheetId}/sheets_batch_update`,
			qs: {
				...(userIdType && { user_id_type: userIdType }),
			},
			body,
		});

		const {
			updateSheet: { properties },
		} = replies[0];

		return properties;
	},
} as ResourceOperation;
