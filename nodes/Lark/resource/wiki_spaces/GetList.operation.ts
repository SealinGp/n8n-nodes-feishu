import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';

export default {
	name: WORDING.GetWikiSpaceList,
	value: 'getWikiSpaceList',
	order: 100,
	options: [
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/wiki-v2/space/list')}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
		{
			displayName: WORDING.WikiPageSize,
			name: 'page_size',
			type: 'number',
			default: 20,
			description: WORDING.WikiPageSizeMaxDescription,
		},
		{
			displayName: WORDING.WikiPageToken,
			name: 'page_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: WORDING.WikiPageTokenDescription,
		},
		{
			displayName: WORDING.WikiLanguage,
			name: 'lang',
			type: 'options',
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{ name: WORDING.WikiSimplifiedChinese, value: 'zh' },
				{ name: WORDING.WikiIndonesian, value: 'id' },
				{ name: WORDING.WikiGerman, value: 'de' },
				{ name: WORDING.WikiEnglish, value: 'en' },
				{ name: WORDING.WikiSpanish, value: 'es' },
				{ name: WORDING.WikiFrench, value: 'fr' },
				{ name: WORDING.WikiItalian, value: 'it' },
				{ name: WORDING.WikiPortuguese, value: 'pt' },
				{ name: WORDING.WikiVietnamese, value: 'vi' },
				{ name: WORDING.WikiRussian, value: 'ru' },
				{ name: WORDING.WikiHindi, value: 'hi' },
				{ name: WORDING.WikiThai, value: 'th' },
				{ name: WORDING.WikiKorean, value: 'ko' },
				{ name: WORDING.WikiJapanese, value: 'ja' },
				{ name: WORDING.WikiTraditionalChineseHongKong, value: 'zh-HK' },
				{ name: WORDING.WikiTraditionalChineseTaiwan, value: 'zh-TW' },
			],
			default: 'zh',
			description: WORDING.WikiReturnedNameLanguageDescription,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const pageSize = this.getNodeParameter('page_size', index) as number;
		const pageToken = this.getNodeParameter('page_token', index, '') as string;
		const lang = this.getNodeParameter('lang', index) as string;

		const qs: IDataObject = {
			page_size: pageSize,
			lang,
		};

		if (pageToken) {
			qs.page_token = pageToken;
		}

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: '/open-apis/wiki/v2/spaces',
			qs,
		});
	},
} as ResourceOperation;
