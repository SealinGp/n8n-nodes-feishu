import { IDataObject, IExecuteFunctions, IBinaryData } from 'n8n-workflow';
import { ResourceOperation } from '../../../help/type/IResource';
import { OperationType, OutputType } from '../../../help/type/enums';
import { WORDING } from '../../../help/wording';
import { DESCRIPTIONS } from '../../../help/description';
import RequestUtils from '../../../help/utils/RequestUtils';

export default {
	name: WORDING.GetMessageContentResource,
	value: OperationType.GetMessageContentResource,
	order: 195,
	options: [
		DESCRIPTIONS.MESSAGE_ID,
		DESCRIPTIONS.RESOURCE_TYPE,
		DESCRIPTIONS.RESOURCE_KEY,
		DESCRIPTIONS.OUTPUT_AS_BINARY,
		{
			displayName: `<a target="_blank" href="https://open.feishu.cn/document/server-docs/im-v1/message/get-2">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const message_id = this.getNodeParameter('message_id', index) as string;
		const file_key = this.getNodeParameter('file_key', index) as string;
		const type = this.getNodeParameter('type', index, 'image') as string;
		const outputAsBinary = this.getNodeParameter('outputAsBinary', index, true) as boolean;

		const buffer = await RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open-apis/im/v1/messages/${message_id}/resources/${file_key}`,
			qs: {
				type,
			},
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
