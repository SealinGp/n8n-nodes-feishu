import { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';
import { BaseUrl, Credentials } from '../nodes/help/type/enums';
import { WORDING } from '../nodes/help/wording';
import { getDocumentationUrl } from '../nodes/help/utils/urls';

export class LarkOAuth2Api implements ICredentialType {
	name = Credentials.UserToken;
	displayName = WORDING.LarkOAuth2Api;
	extends = ['oAuth2Api'];
	icon: Icon = 'file:lark_icon.svg';
	documentationUrl = getDocumentationUrl(
		'/document/authentication-management/access-token/obtain-oauth-code',
	);
	properties: INodeProperties[] = [
		{
			displayName: WORDING.GrantType,
			name: 'grantType',
			type: 'hidden',
			default: 'pkce',
		},
		{
			displayName: WORDING.BaseUrl,
			name: 'url',
			type: 'options',
			options: [
				{
					name: `${BaseUrl.China}`,
					value: `${BaseUrl.China}`,
					description: WORDING.ChinaBaseUrlDescription,
				},
				{
					name: `${BaseUrl.Global}`,
					value: `${BaseUrl.Global}`,
					description: WORDING.GlobalBaseUrlDescription,
				},
				{
					name: WORDING.CustomUrl,
					value: 'custom',
					description: WORDING.CustomUrlDescription,
				},
			],
			default: [],
			required: true,
		},
		{
			displayName: WORDING.CustomUrl,
			name: 'customUrl',
			type: 'string',
			default: '',
			placeholder: 'https://custom.domain',
			hint: WORDING.CustomUrlHint,
			displayOptions: {
				show: {
					url: ['custom'],
				},
			},
		},
		{
			displayName: WORDING.CustomAccessTokenUrl,
			name: 'customAccessTokenUrl',
			type: 'string',
			default: '',
			placeholder: 'https://custom.domain/open-apis/authen/v2/oauth/token',
			displayOptions: {
				show: {
					url: ['custom'],
				},
			},
		},
		{
			displayName: WORDING.CustomAuthorizationUrl,
			name: 'customAuthorizationUrl',
			type: 'string',
			default: '',
			placeholder: 'https://custom.domain/open-apis/authen/v1/authorize',
			displayOptions: {
				show: {
					url: ['custom'],
				},
			},
		},
		{
			displayName: WORDING.Url,
			name: 'baseUrl',
			type: 'hidden',
			default: '={{$self["url"] === "custom" ? $self["customUrl"] : $self["url"]}}',
		},
		{
			displayName: `${WORDING.OAuthScopeSuggestion}<a target="_blank" href="https://open.feishu.cn/document/authentication-management/access-token/obtain-oauth-code?#bc6d1214">${WORDING.MoreDetails}</a>`,
			name: 'suggestion',
			type: 'notice',
			default: '',
		},
		{
			displayName: WORDING.Scope,
			name: 'authScope',
			type: 'string',
			hint: `${WORDING.OAuthScopeHint} <a target="_blank" href="https://open.feishu.cn/document/authentication-management/access-token/obtain-oauth-code#bc6d1214">${WORDING.MoreDetails}</a>`,
			default: 'offline_access',
			required: true,
		},
		{
			displayName: WORDING.AuthorizationUrl,
			name: 'authUrl',
			type: 'hidden',
			default:
				'={{$self["url"] === "custom" ? $self["customAuthorizationUrl"] : $self["url"] === "https://open.feishu.cn" ? "https://accounts.feishu.cn/open-apis/authen/v1/authorize" : "https://accounts.larksuite.com/open-apis/authen/v1/authorize"}}',
			required: true,
		},
		{
			displayName: WORDING.AccessTokenUrl,
			name: 'accessTokenUrl',
			type: 'hidden',
			default:
				'={{$self["url"] === "custom" ? $self["customAccessTokenUrl"] : $self["url"] === "https://open.feishu.cn" ? "https://open.feishu.cn/open-apis/authen/v2/oauth/token" : "https://open.larksuite.com/open-apis/authen/v2/oauth/token"}}',
			required: true,
		},
		{
			displayName: WORDING.Scope,
			name: 'scope',
			type: 'hidden',
			default: '={{$self["authScope"].replace(/,/g, " ").trim()}}',
		},
		{
			displayName: WORDING.AuthUriQueryParameters,
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: WORDING.Authentication,
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
	];
}
