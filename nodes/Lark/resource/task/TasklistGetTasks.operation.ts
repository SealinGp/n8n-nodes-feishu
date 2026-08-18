import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import RequestUtils from '../../../help/utils/RequestUtils';

export default {
	name: WORDING.GetTasklistTasks,
	value: 'getTasklistTasks',
	order: 94,
	options: [
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/task-v2/tasklist/tasks')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
		{
			displayName: WORDING.LabelTasklistGUID,
			name: 'tasklist_guid',
			type: 'string',
			required: true,
			default: '',
			description: 'GUID of the tasklist to query tasks from',
		},
		{
			displayName: WORDING.LabelUserIDType,
			name: 'user_id_type',
			type: 'options',
			options: [
				{ name: 'Open ID', value: 'open_id' },
				{ name: 'Union ID', value: 'union_id' },
				{ name: 'User ID', value: 'user_id' },
			],
			default: 'open_id',
		},
		{
			displayName: WORDING.LabelReturnAll,
			name: 'return_all',
			type: 'boolean',
			default: true,
			description:
				'Whether to auto-paginate and return all tasks in the tasklist. When disabled, only one page is returned.',
		},
		{
			displayName: WORDING.LabelPageSize,
			name: 'page_size',
			type: 'number',
			typeOptions: {
				minValue: 1,
				maxValue: 100,
				numberPrecision: 0,
			},
			default: 50,
			description: 'Number of tasks per page (max 100)',
		},
		{
			displayName: WORDING.LabelPageToken,
			name: 'page_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Token for the next page. Only used when Return All is disabled.',
			displayOptions: {
				show: {
					return_all: [false],
				},
			},
		},
		{
			displayName: WORDING.LabelOptions,
			name: 'options',
			type: 'collection',
			placeholder: 'Add Field',
			default: {},
			options: [
				{
					displayName: WORDING.LabelCompleted,
					name: 'completed',
					type: 'options',
					options: [
						{ name: 'All', value: '' },
						{ name: 'Completed', value: 'true' },
						{ name: 'Uncompleted', value: 'false' },
					],
					default: '',
					description: 'Filter by completion status',
				},
				{
					displayName: WORDING.LabelCreatedFrom,
					name: 'created_from',
					type: 'string',
					default: '',
					description:
						'Filter tasks created at or after this timestamp (millisecond, e.g. 1675844827000)',
				},
				{
					displayName: WORDING.LabelCreatedTo,
					name: 'created_to',
					type: 'string',
					default: '',
					description:
						'Filter tasks created at or before this timestamp (millisecond, e.g. 1675844827000)',
				},
			],
		},
		{
			displayName:
				`<a target="_blank" href="${getDocumentationUrl('/document/task-v2/tasklist/tasks')}">Open Document</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const tasklist_guid = this.getNodeParameter('tasklist_guid', index) as string;
		const user_id_type = this.getNodeParameter('user_id_type', index) as string;
		const return_all = this.getNodeParameter('return_all', index, true) as boolean;
		const page_size = this.getNodeParameter('page_size', index, 50) as number;
		const options = this.getNodeParameter('options', index, {}) as IDataObject;
		const completed = (options.completed as string) || '';
		const created_from = (options.created_from as string) || '';
		const created_to = (options.created_to as string) || '';

		let pageToken = return_all ? '' : (this.getNodeParameter('page_token', index, '') as string);
		const allItems: IDataObject[] = [];
		let hasMore = false;
		let lastPageToken = '';

		do {
			const { code, msg, data } = await RequestUtils.request.call(this, {
				method: 'GET',
				url: `/open-apis/task/v2/tasklists/${tasklist_guid}/tasks`,
				qs: {
					user_id_type,
					page_size,
					...(pageToken && { page_token: pageToken }),
					...(completed !== '' && { completed }),
					...(created_from && { created_from }),
					...(created_to && { created_to }),
				},
			});

			if (code !== 0) {
				throw new Error(`Get tasks in tasklist failed, code: ${code}, message: ${msg}`);
			}

			const { has_more, page_token, items } = data as {
				has_more: boolean;
				page_token: string;
				items: IDataObject[];
			};

			hasMore = has_more;
			lastPageToken = page_token;
			pageToken = page_token;
			if (items) {
				allItems.push(...items);
			}
		} while (return_all && hasMore);

		return {
			has_more: hasMore,
			page_token: lastPageToken,
			items: allItems,
		};
	},
} as ResourceOperation;
