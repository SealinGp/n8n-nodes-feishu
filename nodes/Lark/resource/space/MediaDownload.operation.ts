import { IDataObject, IExecuteFunctions, IBinaryData } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import { OperationType, OutputType } from '../../../help/type/enums';
import { DESCRIPTIONS } from '../../../help/description';

export default {
	name: WORDING.DownloadMedia,
	value: OperationType.DownloadMediaToSpace,
	order: 150,
	options: [
		DESCRIPTIONS.MEDIA_FILE_TOKEN,
		DESCRIPTIONS.OUTPUT_AS_BINARY,
		{
			displayName: WORDING.Options,
			name: 'options',
			type: 'collection',
			placeholder: WORDING.AddField,
			default: {},
			options: [
				{
					...DESCRIPTIONS.REQUEST_BODY,
					name: 'media_download_extra',
				},
			],
		},
		{
			displayName: `<a target="_blank" href="https://open.feishu.cn/document/server-docs/docs/drive-v1/media/download">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const fileToken = this.getNodeParameter('media_file_token', index) as string;
		const outputAsBinary = this.getNodeParameter('outputAsBinary', index, true) as boolean;
		const options = this.getNodeParameter('options', index, {});
		const extra = (options.media_download_extra as IDataObject) || undefined;

		const buffer = await RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open-apis/drive/v1/medias/${fileToken}/download`,
			encoding: 'arraybuffer',
			json: false,
			qs: {
				...(extra && { extra: JSON.stringify(extra) }),
			},
		});

		const binaryData = await this.helpers.prepareBinaryData(buffer);

		if (outputAsBinary) {
			return {
				outputType: OutputType.Binary,
				binaryData,
				binaryPropertyName: 'data',
			};
		}

		// Return as JSON with base64-encoded data
		const base64Data = Buffer.from(buffer).toString('base64');
		return {
			data: base64Data,
			mimeType: binaryData.mimeType,
			fileName: binaryData.fileName,
			fileExtension: binaryData.fileExtension,
			fileSize: binaryData.fileSize,
		} as IBinaryData;
	},
} as ResourceOperation;
