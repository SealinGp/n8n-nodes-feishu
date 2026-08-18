import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';

export default {
	name: WORDING.UpdateWikiSpaceSettings,
	value: 'updateSpaceSettings',
	order: 98,
	options: [
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/wiki-v2/space-setting/update')}">${WORDING.OpenDocument}</a>`,
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
			displayName: WORDING.WikiRootPageCreatePermission,
			name: 'create_setting',
			type: 'options',
			options: [
				{ name: WORDING.WikiAdminAndMember, value: 'admin_and_member' },
				{ name: WORDING.WikiAdminOnly, value: 'admin' },
			],
			default: 'admin_and_member',
			description: WORDING.WikiRootPagePermissionDescription,
		},
		{
			displayName: WORDING.WikiDocumentOperationPermission,
			name: 'security_setting',
			type: 'options',
			options: [
				{ name: WORDING.WikiAllowed, value: 'allow' },
				{ name: WORDING.WikiNotAllowed, value: 'not_allow' },
			],
			default: 'allow',
			description: WORDING.WikiDocumentOperationDescription,
		},
		{
			displayName: WORDING.WikiCommentPermission,
			name: 'comment_setting',
			type: 'options',
			options: [
				{ name: WORDING.WikiAllowed, value: 'allow' },
				{ name: WORDING.WikiNotAllowed, value: 'not_allow' },
			],
			default: 'allow',
			description: WORDING.WikiCommentPermissionDescription,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const createSetting = this.getNodeParameter('create_setting', index) as string;
		const securitySetting = this.getNodeParameter('security_setting', index) as string;
		const commentSetting = this.getNodeParameter('comment_setting', index) as string;

		const body: IDataObject = {};

		if (createSetting) {
			body.create_setting = createSetting;
		}
		if (securitySetting) {
			body.security_setting = securitySetting;
		}
		if (commentSetting) {
			body.comment_setting = commentSetting;
		}

		return RequestUtils.request.call(this, {
			method: 'PUT',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/setting`,
			body,
		});
	},
} as ResourceOperation;
