import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import { OperationType } from '../../../help/type/enums';
import NodeUtils from '../../../help/utils/node';

export default {
	name: WORDING.BatchSendMessage,
	value: OperationType.BatchSendMessage,
	order: 198,
	options: [
		{
			displayName: WORDING.UiMessageType,
			name: 'msg_type',
			type: 'options',
			required: true,
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{ name: 'Text(文本)', value: 'text' },
				{ name: 'Image(图片)', value: 'image' },
				{ name: 'RichText/Post(富文本)', value: 'post' },
				{ name: 'ShareChat(分享群名片)', value: 'share_chat' },
				{ name: 'Interactive Card(消息卡片)', value: 'interactive' },
			],
			default: 'text',
		},
		{
			displayName: WORDING.UiContent,
			name: 'content',
			type: 'json',
			required: true,
			default: '{}',
			description:
				'Message content JSON. For interactive type, this field is used as card content.',
			displayOptions: {
				hide: {
					msg_type: ['interactive'],
				},
			},
		},
		{
			displayName: WORDING.UiCardContent,
			name: 'card',
			type: 'json',
			required: true,
			default: '{}',
			description: 'Card content JSON. Only used when msg_type is interactive.',
			displayOptions: {
				show: {
					msg_type: ['interactive'],
				},
			},
		},
		{
			displayName: WORDING.UiOpenIds,
			name: 'open_ids',
			type: 'string',
			default: '',
			description: 'Comma-separated open_id list, max 200. At least one ID field is required.',
		},
		{
			displayName: WORDING.UiUserIds,
			name: 'user_ids',
			type: 'string',
			default: '',
			description: 'Comma-separated user_id list, max 200',
		},
		{
			displayName: WORDING.UiUnionIds,
			name: 'union_ids',
			type: 'string',
			default: '',
			description: 'Comma-separated union_id list, max 200',
		},
		{
			displayName: WORDING.UiDepartmentIds,
			name: 'department_ids',
			type: 'string',
			default: '',
			description:
				'Comma-separated department_id list, max 200. Root department (ID 0) is not allowed.',
		},
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/im-v1/batch_message/send-messages-in-batches')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const msg_type = this.getNodeParameter('msg_type', index) as string;

		const splitIds = (value: string): string[] =>
			value
				.split(',')
				.map((s) => s.trim())
				.filter(Boolean);

		const open_ids = splitIds(this.getNodeParameter('open_ids', index, '') as string);
		const user_ids = splitIds(this.getNodeParameter('user_ids', index, '') as string);
		const union_ids = splitIds(this.getNodeParameter('union_ids', index, '') as string);
		const department_ids = splitIds(this.getNodeParameter('department_ids', index, '') as string);

		if (!open_ids.length && !user_ids.length && !union_ids.length && !department_ids.length) {
			throw new Error(
				'At least one of open_ids, user_ids, union_ids, or department_ids must be provided.',
			);
		}

		// im/v1/batch_messages requires `content` as a JSON-stringified string
		// for ALL msg_types, including interactive (no separate `card` field).
		const rawContent =
			msg_type === 'interactive'
				? (NodeUtils.getNodeJsonData(this, 'card', index) as IDataObject)
				: (NodeUtils.getNodeJsonData(this, 'content', index) as IDataObject);

		const body: IDataObject = {
			msg_type,
			content: JSON.stringify(rawContent),
		};

		if (open_ids.length) body.open_ids = open_ids;
		if (user_ids.length) body.user_ids = user_ids;
		if (union_ids.length) body.union_ids = union_ids;
		if (department_ids.length) body.department_ids = department_ids;

		const { code, msg, data } = await RequestUtils.request.call(this, {
			method: 'POST',
			url: '/open-apis/im/v1/batch_messages',
			body,
		});

		if (code !== 0) {
			throw new Error(`Batch send message failed, code: ${code}, message: ${msg}`);
		}

		// v1 returns only { message_id } synchronously. For invalid recipient lists,
		// call GET /open-apis/im/v1/batch_messages/:batch_message_id/get_progress.
		return data as IDataObject;
	},
} as ResourceOperation;
