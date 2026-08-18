import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperation } from '../../../help/type/IResource';
import RequestUtils from '../../../help/utils/RequestUtils';
import { WORDING } from '../../../help/wording';
import { OperationType } from '../../../help/type/enums';
import { DESCRIPTIONS } from '../../../help/description';

export default {
	name: WORDING.SearchCalendar,
	value: OperationType.SearchCalendar,
	order: 194,
	options: [
		DESCRIPTIONS.SEARCH_KEY,
		DESCRIPTIONS.WHETHER_PAGING,
		{
			...DESCRIPTIONS.PAGE_SIZE,
			typeOptions: {
				minValue: 1,
				maxValue: 50,
				numberPrecision: 0,
			},
		},
		DESCRIPTIONS.PAGE_TOKEN,
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/calendar-v4/calendar/search')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const searchKey = this.getNodeParameter('search_key', index) as string;
		const whetherPaging = this.getNodeParameter('whether_paging', index, false) as boolean;
		let pageToken = this.getNodeParameter('page_token', index, '') as string;
		const pageSize = this.getNodeParameter('page_size', index, 50) as number;

		const allCalendars: IDataObject[] = [];
		let hasMore = false;
		do {
			const {
				data: { page_token, items },
			} = await RequestUtils.request.call(this, {
				method: 'POST',
				url: `/open-apis/calendar/v4/calendars/search`,
				qs: {
					page_token: pageToken,
					page_size: pageSize,
				},
				body: {
					query: searchKey,
				},
			});

			hasMore = page_token ? true : false;
			pageToken = page_token;
			if (items) {
				allCalendars.push(...items);
			}
		} while (!whetherPaging && hasMore);

		return {
			has_more: hasMore,
			...(pageToken && { page_token: pageToken }),
			items: allCalendars,
		};
	},
} as ResourceOperation;
