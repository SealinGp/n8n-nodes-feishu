import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';

export default {
	name: WORDING.AddWikiSpaceMember,
	value: 'addSpaceMember',
	order: 95,
	options: [
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/wiki-v2/space-member/create')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
		{
			displayName: WORDING.WikiSpaceId,
			name: 'space_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: WORDING.WikiMemberType,
			name: 'member_type',
			type: 'options',
			required: true,
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{ name: WORDING.WikiGroupId, value: 'openchat' },
				{ name: WORDING.WikiUserId, value: 'userid' },
				{ name: WORDING.WikiEmail, value: 'email' },
				{ name: WORDING.WikiDepartmentId, value: 'opendepartmentid' },
				{ name: 'Open ID', value: 'openid' },
				{ name: 'Union ID', value: 'unionid' },
			],
			default: 'openid',
			description: WORDING.WikiAddMemberTypeDescription,
		},
		{
			displayName: WORDING.WikiMemberId,
			name: 'member_id',
			type: 'string',
			required: true,
			default: '',
			description: WORDING.WikiAddMemberIdDescription,
		},
		{
			displayName: WORDING.WikiRole,
			name: 'member_role',
			type: 'options',
			required: true,
			options: [
				{ name: WORDING.WikiAdmin, value: 'admin' },
				{ name: WORDING.WikiMember, value: 'member' },
			],
			default: 'member',
			description: WORDING.WikiMemberRoleDescription,
		},
		{
			displayName: WORDING.WikiNotify,
			name: 'need_notification',
			type: 'boolean',
			default: false,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const memberType = this.getNodeParameter('member_type', index) as string;
		const memberId = this.getNodeParameter('member_id', index) as string;
		const memberRole = this.getNodeParameter('member_role', index) as string;
		const needNotification = this.getNodeParameter('need_notification', index) as boolean;

		const body: IDataObject = {
			member_type: memberType,
			member_id: memberId,
			member_role: memberRole,
		};

		const qs: IDataObject = {};
		if (needNotification !== undefined) {
			qs.need_notification = needNotification;
		}

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/members`,
			body,
			qs,
		});
	},
} as ResourceOperation;
