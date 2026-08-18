import { getDocumentationUrl } from '../../../help/utils/urls';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';

export default {
	name: WORDING.GetWikiSpaceInfo,
	value: 'getSpaceInfo',
	order: 100,
	options: [
		{
			displayName: `<a target="_blank" href="${getDocumentationUrl('/document/server-docs/docs/wiki-v2/space/get')}">${WORDING.OpenDocument}</a>`,
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
			description: WORDING.WikiSpaceIdDescription,
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
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const lang = this.getNodeParameter('lang', index) as string;

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open-apis/wiki/v2/spaces/${spaceId}`,
			qs: { lang },
		});
	},
} as ResourceOperation;
