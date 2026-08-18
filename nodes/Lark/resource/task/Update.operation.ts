import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import NodeUtils from '../../../help/utils/node';
import RequestUtils from '../../../help/utils/RequestUtils';

export default {
	name: WORDING.UpdateTask,
	value: 'update',
	order: 100,
	options: [
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/task-v2/task/patch')}">${WORDING.OpenDocument}</a>`,
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
			displayName: WORDING.LabelRequestBody,
			name: 'body',
			type: 'json',
			required: true,
			default: '{"update_fields": []}',
			description: 'Https://open.feishu.cn/document/task-v2/task/patch#requestBody',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const task_guid = this.getNodeParameter('task_guid', index) as string;
		const user_id_type = this.getNodeParameter('user_id_type', index) as string;
		const body = NodeUtils.getNodeJsonData(this, 'body', index) as IDataObject;

		const {
			code,
			msg,
			data: { task },
		} = await RequestUtils.request.call(this, {
			method: 'PATCH',
			url: `/open-apis/task/v2/tasks/${task_guid}`,
			qs: {
				user_id_type: user_id_type,
			},
			body: body,
		});
		if (code !== 0) {
			throw new Error(`Update task failed, code: ${code}, message: ${msg}`);
		}
		return task as IDataObject;
	},
} as ResourceOperation;
