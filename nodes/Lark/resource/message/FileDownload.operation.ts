import { IDataObject, IExecuteFunctions, IBinaryData } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import { OperationType, OutputType } from '../../../help/type/enums';
import { DESCRIPTIONS } from '../../../help/description';

export default {
	name: WORDING.DownloadFile,
	value: OperationType.DownloadFile,
	order: 190,
	options: [
		DESCRIPTIONS.RESOURCE_KEY,
		DESCRIPTIONS.OUTPUT_AS_BINARY,
		{
			displayName: `<a target="_blank" href="https://open.feishu.cn/document/server-docs/im-v1/file/get">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const resourceKey = this.getNodeParameter('file_key', index);
		const outputAsBinary = this.getNodeParameter('outputAsBinary', index, true) as boolean;

		const buffer = await RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open-apis/im/v1/files/${resourceKey}`,
			encoding: 'arraybuffer',
			json: false,
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
