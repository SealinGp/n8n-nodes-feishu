import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import NodeUtils from '../../../help/utils/node';
import RequestUtils from '../../../help/utils/RequestUtils';

const REQUEST_BODY = [
	{
		id: '',
		role: 'assignee',
		type: 'user',
		name: '',
	},
];

export default {
	name: WORDING.LabelAddMembers,
	value: 'addMembers',
	order: 90,
	options: [
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/task-v2/task/add_members')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
		{
			displayName: WORDING.LabelTaskID,
			name: 'task_guid',
			type: 'string',
			required: true,
			default: '',
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
			displayName: WORDING.LabelClientToken,
			name: 'client_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Idempotent token',
		},
		{
			displayName: WORDING.LabelMembers,
			name: 'members',
			type: 'json',
			required: true,
			default: JSON.stringify(REQUEST_BODY),
			description: 'Https://open.feishu.cn/document/task-v2/task/add_members#requestBody',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const task_guid = this.getNodeParameter('task_guid', index) as string;
		const user_id_type = this.getNodeParameter('user_id_type', index) as string;
		const members = NodeUtils.getNodeJsonData(this, 'members', index) as IDataObject[];
		const client_token = this.getNodeParameter('client_token', index, '') as string;

		const {
			code,
			msg,
			data: { task },
		} = await RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/task/v2/tasks/${task_guid}/add_members`,
			qs: {
				user_id_type: user_id_type,
			},
			body: {
				members,
				...(client_token && { client_token }),
			},
		});
		if (code !== 0) {
			throw new Error(`Add task members failed, code: ${code}, message: ${msg}`);
		}
		return task as IDataObject;
	},
} as ResourceOperation;
