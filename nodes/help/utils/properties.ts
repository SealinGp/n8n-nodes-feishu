import { WORDING } from '../wording';
import { INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { DESCRIPTIONS } from '../description';
import { TriggerEventType } from '../type/enums';
import { ANY_EVENT } from '../../lark-sdk/consts';

const placeholder: string = `
<!-- Your custom HTML here --->


`.trimStart();

const cssVariables = `
:root {
	--font-family: 'Open Sans', sans-serif;
	--font-weight-normal: 400;
	--font-weight-bold: 600;
	--font-size-body: 12px;
	--font-size-label: 14px;
	--font-size-test-notice: 12px;
	--font-size-input: 14px;
	--font-size-header: 20px;
	--font-size-paragraph: 14px;
	--font-size-link: 12px;
	--font-size-error: 12px;
	--font-size-html-h1: 28px;
	--font-size-html-h2: 20px;
	--font-size-html-h3: 16px;
	--font-size-html-h4: 14px;
	--font-size-html-h5: 12px;
	--font-size-html-h6: 10px;
	--font-size-subheader: 14px;

	/* Colors */
	--color-background: #fbfcfe;
	--color-test-notice-text: #e6a23d;
	--color-test-notice-bg: #fefaf6;
	--color-test-notice-border: #f6dcb7;
	--color-card-bg: #ffffff;
	--color-card-border: #dbdfe7;
	--color-card-shadow: rgba(99, 77, 255, 0.06);
	--color-link: #7e8186;
	--color-header: #525356;
	--color-label: #555555;
	--color-input-border: #dbdfe7;
	--color-input-text: #71747A;
	--color-focus-border: rgb(90, 76, 194);
	--color-submit-btn-bg: #ff6d5a;
	--color-submit-btn-text: #ffffff;
	--color-error: #ea1f30;
	--color-required: #ff6d5a;
	--color-clear-button-bg: #7e8186;
	--color-html-text: #555;
	--color-html-link: #ff6d5a;
	--color-header-subtext: #7e8186;

	/* Border Radii */
	--border-radius-card: 8px;
	--border-radius-input: 6px;
	--border-radius-clear-btn: 50%;
	--card-border-radius: 8px;

	/* Spacing */
	--padding-container-top: 24px;
	--padding-card: 24px;
	--padding-test-notice-vertical: 12px;
	--padding-test-notice-horizontal: 24px;
	--margin-bottom-card: 16px;
	--padding-form-input: 12px;
	--card-padding: 24px;
	--card-margin-bottom: 16px;

	/* Dimensions */
	--container-width: 448px;
	--submit-btn-height: 48px;
	--checkbox-size: 18px;

	/* Others */
	--box-shadow-card: 0px 4px 16px 0px var(--color-card-shadow);
	--opacity-placeholder: 0.5;
}
`;

const formFields: INodeProperties = {
	displayName: WORDING.UiFormElements,
	name: 'formFields',
	placeholder: 'Add Form Element',
	type: 'fixedCollection',
	default: {},
	typeOptions: {
		multipleValues: true,
		sortable: true,
	},
	options: [
		{
			displayName: WORDING.UiValues,
			name: 'values',
			values: [
				{
					displayName: WORDING.UiAcceptedFileTypes,
					name: 'acceptFileTypes',
					type: 'string',
					default: '',
					description: 'Comma-separated list of allowed file extensions',
					hint: 'Leave empty to allow all file types',
					placeholder: 'e.g. .jpg, .png',
					displayOptions: {
						show: {
							fieldType: ['file'],
						},
					},
				},
				{
					displayName: WORDING.UiElementName,
					name: 'elementName',
					type: 'string',
					default: '',
					placeholder: 'e.g. content-section',
					description: 'Optional field. It can be used to include the html in the output.',
					displayOptions: {
						show: {
							fieldType: ['html'],
						},
					},
				},
				{
					displayName: WORDING.UiElementType,
					name: 'fieldType',
					type: 'options',
					default: 'text',
					description: 'The type of field to add to the form',
					options: [
						{
							name: 'Custom HTML',
							value: 'html',
						},
						{
							name: 'Date',
							value: 'date',
						},
						{
							name: 'Dropdown List',
							value: 'dropdown',
						},
						{
							name: 'Email',
							value: 'email',
						},
						{
							name: 'File',
							value: 'file',
						},
						{
							name: 'Hidden Field',
							value: 'hiddenField',
						},
						{
							name: 'Number',
							value: 'number',
						},
						{
							name: 'Password',
							value: 'password',
						},
						{
							name: 'Text',
							value: 'text',
						},
						{
							name: 'Textarea',
							value: 'textarea',
						},
					],
					required: true,
				},
				{
					displayName: WORDING.UiFieldLabel,
					name: 'fieldLabel',
					type: 'string',
					default: '',
					placeholder: 'e.g. What is your name?',
					description: 'Label that appears above the input field',
					required: true,
					displayOptions: {
						hide: {
							fieldType: ['hiddenField', 'html'],
						},
					},
				},
				{
					displayName: WORDING.UiFieldName,
					name: 'fieldName',
					description:
						'The name of the field, used in input attributes and referenced by the workflow',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							fieldType: ['hiddenField'],
						},
					},
				},
				{
					displayName: WORDING.UiFieldOptions,
					name: 'fieldOptions',
					placeholder: 'Add Field Option',
					description: 'List of options that can be selected from the dropdown',
					type: 'fixedCollection',
					default: { values: [{ option: '' }] },
					required: true,
					displayOptions: {
						show: {
							fieldType: ['dropdown'],
						},
					},
					typeOptions: {
						multipleValues: true,
						sortable: true,
					},
					options: [
						{
							displayName: WORDING.UiValues,
							name: 'values',
							values: [
								{
									displayName: WORDING.UiOption,
									name: 'option',
									type: 'string',
									default: '',
								},
							],
						},
					],
				},
				{
					displayName: WORDING.UiFieldValue,
					name: 'fieldValue',
					description:
						'Input value can be set here or will be passed as a query parameter via Field Name if no value is set',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							fieldType: ['hiddenField'],
						},
					},
				},
				{
					displayName: WORDING.UiHtml,
					name: 'html',
					typeOptions: {
						editor: 'htmlEditor',
					},
					type: 'string',
					noDataExpression: true,
					default: placeholder,
					description: 'HTML elements to display on the form page',
					hint: 'Does not accept <code>&lt;script&gt;</code>, <code>&lt;style&gt;</code> or <code>&lt;input&gt;</code> tags',
					displayOptions: {
						show: {
							fieldType: ['html'],
						},
					},
				},
				{
					displayName: WORDING.UiMultipleChoice,
					name: 'multiselect',
					type: 'boolean',
					default: false,
					description:
						'Whether to allow the user to select multiple options from the dropdown list',
					displayOptions: {
						show: {
							fieldType: ['dropdown'],
						},
					},
				},
				{
					displayName: WORDING.UiMultipleFiles,
					name: 'multipleFiles',
					type: 'boolean',
					default: true,
					description:
						'Whether to allow the user to select multiple files from the file input or just one',
					displayOptions: {
						show: {
							fieldType: ['file'],
						},
					},
				},
				{
					displayName: WORDING.UiPlaceholder,
					name: 'placeholder',
					description: 'Sample text to display inside the field',
					type: 'string',
					default: '',
					displayOptions: {
						hide: {
							fieldType: ['dropdown', 'date', 'file', 'html', 'hiddenField'],
						},
					},
				},
				{
					displayName: WORDING.UiRequiredField,
					name: 'requiredField',
					type: 'boolean',
					default: false,
					description:
						'Whether to require the user to enter a value for this field before submitting the form',
					displayOptions: {
						hide: {
							fieldType: ['html', 'hiddenField'],
						},
					},
				},
				{
					displayName: "The displayed date is formatted based on the locale of the user's browser",
					name: 'formatDate',
					type: 'notice',
					default: '',
					displayOptions: {
						show: {
							fieldType: ['date'],
						},
					},
				},
			],
		},
	],
};

const formFieldsProperties: INodeProperties[] = [
	{
		displayName: WORDING.UiDefineForm,
		name: 'defineForm',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Using Fields Below',
				value: 'fields',
			},
			{
				name: 'Using JSON',
				value: 'json',
			},
		],
		default: 'fields',
	},
	{
		displayName: WORDING.UiFormFields,
		name: 'jsonOutput',
		type: 'json',
		typeOptions: {
			rows: 5,
		},
		default:
			'[\n   {\n      "fieldLabel":"Name",\n      "placeholder":"enter you name",\n      "requiredField":true\n   },\n   {\n      "fieldLabel":"Age",\n      "fieldType":"number",\n      "placeholder":"enter your age"\n   },\n   {\n      "fieldLabel":"Email",\n      "fieldType":"email",\n      "requiredField":true\n   }\n]',
		validateType: 'form-fields',
		ignoreValidationDuringExecution: true,
		hint: '<a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.form/" target="_blank">See docs</a> for field syntax',
		displayOptions: {
			show: {
				defineForm: ['json'],
			},
		},
	},
	{ ...formFields, displayOptions: { show: { defineForm: ['fields'] } } },
];

const limitWaitTimeProperties: INodeProperties[] = [
	{
		displayName: WORDING.UiLimitType,
		name: 'limitType',
		type: 'options',
		default: 'afterTimeInterval',
		description:
			'Sets the condition for the execution to resume. Can be a specified date or after some time.',
		options: [
			{
				name: 'After Time Interval',
				description: 'Waits for a certain amount of time',
				value: 'afterTimeInterval',
			},
			{
				name: 'At Specified Time',
				description: 'Waits until the set date and time to continue',
				value: 'atSpecifiedTime',
			},
		],
	},
	{
		displayName: WORDING.UiAmount,
		name: 'resumeAmount',
		type: 'number',
		displayOptions: {
			show: {
				limitType: ['afterTimeInterval'],
			},
		},
		typeOptions: {
			minValue: 0,
			numberPrecision: 2,
		},
		default: 1,
		description: 'The time to wait',
	},
	{
		displayName: WORDING.UiUnit,
		name: 'resumeUnit',
		type: 'options',
		displayOptions: {
			show: {
				limitType: ['afterTimeInterval'],
			},
		},
		options: [
			{
				name: 'Minutes',
				value: 'minutes',
			},
			{
				name: 'Hours',
				value: 'hours',
			},
			{
				name: 'Days',
				value: 'days',
			},
		],
		default: 'hours',
		description: 'Unit of the interval value',
	},
	{
		displayName: WORDING.UiMaxDateAndTime,
		name: 'maxDateAndTime',
		type: 'dateTime',
		displayOptions: {
			show: {
				limitType: ['atSpecifiedTime'],
			},
		},
		default: '',
		description: 'Continue execution after the specified date and time',
	},
];

const limitWaitTimeOption: INodeProperties = {
	displayName: WORDING.UiLimitWaitTime,
	name: 'limitWaitTime',
	type: 'fixedCollection',
	description:
		'Whether the workflow will automatically resume execution after the specified limit type',
	default: { values: { limitType: 'afterTimeInterval', resumeAmount: 45, resumeUnit: 'minutes' } },
	options: [
		{
			displayName: WORDING.UiValues,
			name: 'values',
			values: limitWaitTimeProperties,
		},
	],
};

const approvalOptionsValues = [
	{
		displayName: WORDING.UiTypeOfApproval,
		name: 'approvalType',
		type: 'options',
		placeholder: 'Add option',
		default: 'single',
		options: [
			{
				name: 'Approve Only',
				value: 'single',
			},
			{
				name: 'Approve and Disapprove',
				value: 'double',
			},
		],
	},
	{
		displayName: WORDING.UiApproveButtonLabel,
		name: 'approveLabel',
		type: 'string',
		default: 'Approve',
		displayOptions: {
			show: {
				approvalType: ['single', 'double'],
			},
		},
	},
	{
		displayName: WORDING.UiDisapproveButtonLabel,
		name: 'disapproveLabel',
		type: 'string',
		default: 'Decline',
		displayOptions: {
			show: {
				approvalType: ['double'],
			},
		},
	},
].filter((p) => Object.keys(p).length) as INodeProperties[];

export const sendAndWaitProperties: INodeProperties[] = [
	{
		displayName: WORDING.UiSubject,
		name: 'subject',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. Approval required',
	},
	{
		displayName: WORDING.UiMessage,
		name: 'message',
		type: 'string',
		default: '',
		typeOptions: {
			rows: 3,
		},
	},
	{
		displayName: WORDING.UiResponseType,
		name: 'responseType',
		type: 'options',
		default: 'approval',
		options: [
			{
				name: 'Approval',
				value: 'approval',
				description: 'User can approve/disapprove from within the message',
			},
			{
				name: 'Free Text',
				value: 'freeText',
				description: 'User can submit a response via a form',
			},
			{
				name: 'Custom Form',
				value: 'customForm',
				description: 'User can submit a response via a custom form',
			},
		],
	},
	{
		displayName: WORDING.UiDisableButtonAfterSubmission,
		name: 'disableButton',
		type: 'boolean',
		default: false,
		description: 'Whether to disable the buttons after submission to prevent multiple submissions',
	},
	{
		displayName: WORDING.UiDisableTips,
		name: 'disableTips',
		type: 'string',
		default: '',
		description: 'Show tips when buttons are disabled after being submitted',
		displayOptions: {
			show: {
				disableButton: [true],
			},
		},
	},
	...updateDisplayOptions(
		{
			show: {
				responseType: ['customForm'],
			},
		},
		formFieldsProperties,
	),

	{
		displayName: WORDING.UiApprovalOptions,
		name: 'approvalOptions',
		type: 'fixedCollection',
		placeholder: 'Add option',
		default: {},
		options: [
			{
				displayName: WORDING.UiValues,
				name: 'values',
				values: approvalOptionsValues,
			},
		],
		displayOptions: {
			show: {
				responseType: ['approval'],
			},
		},
	},
	{
		displayName: WORDING.UiOptions,
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		options: [limitWaitTimeOption, DESCRIPTIONS.REQUEST_ID as INodeProperties],
		displayOptions: {
			show: {
				responseType: ['approval'],
			},
		},
	},
	{
		displayName: WORDING.UiOptions,
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		options: [
			{
				displayName: WORDING.UiMessageButtonLabel,
				name: 'messageButtonLabel',
				type: 'string',
				default: 'Respond',
			},
			{
				displayName: WORDING.UiResponseFormButtonLabel,
				name: 'responseFormButtonLabel',
				type: 'string',
				default: 'Submit',
			},
			{
				displayName: WORDING.UiResponseFormCustomStyling,
				name: 'responseFormCustomCss',
				type: 'string',
				typeOptions: {
					rows: 10,
					editor: 'cssEditor',
				},
				default: cssVariables.trim(),
				description: 'Override default styling of the response form with CSS',
			},
			{
				displayName: WORDING.UiResponseFormDescription,
				name: 'responseFormDescription',
				description: 'Description of the form that the user can access to provide their response',
				type: 'string',
				default: '',
			},
			{
				displayName: WORDING.UiResponseFormTitle,
				name: 'responseFormTitle',
				description: 'Title of the form that the user can access to provide their response',
				type: 'string',
				default: '',
			},
			limitWaitTimeOption,
			DESCRIPTIONS.REQUEST_ID as INodeProperties,
		],
		displayOptions: {
			show: {
				responseType: ['freeText', 'customForm'],
			},
		},
	},
];

export const triggerEventProperty = {
	displayName: WORDING.UiTriggerOn,
	name: 'events',
	type: 'multiOptions',
	required: true,
	options: [
		{
			name: WORDING.UiEventAddReaction,
			value: 'im.message.reaction.created_v1',
			description: 'This event will be triggered when a reaction is added to a message',
			displayOptions: {
				show: {
					'@version': [1],
				},
			},
		},
		{
			name: WORDING.UiEventAny,
			value: ANY_EVENT,
			description: 'Triggers on any event',
		},
		{
			name: WORDING.UiEventBotMenu,
			value: 'application.bot.menu_v6',
			description: 'This event is triggered when the user clicks bot menu',
			displayOptions: {
				show: {
					'@version': [{ _cnd: { gte: 2 } }],
				},
			},
		},
		{
			name: WORDING.UiEventBaseAppFieldChanged,
			value: 'drive.file.bitable_field_changed_v1',
			description: 'This event is triggered when a subscribed Base app field changes',
		},
		{
			name: WORDING.UiEventBaseAppRecordChanged,
			value: 'drive.file.bitable_record_changed_v1',
			description:
				'This event is triggered when a subscribed multi-dimensional table record changes',
		},
		{
			name: WORDING.UiEventCardPostback,
			value: 'card.action.trigger',
			description:
				'This callback is triggered when the user clicks on the component configured with postback interaction on the card',
		},
		{
			name: WORDING.UiEventDeleteReaction,
			value: 'im.message.reaction.deleted_v1',
			description: 'This event will be triggered when the message reaction is deleted',
			displayOptions: {
				show: {
					'@version': [1],
				},
			},
		},
		{
			name: WORDING.UiEventReceiveMessage,
			value: TriggerEventType.ReceiveMessage,
			description: 'This event is triggered when the bot receives a message sent by a user',
		},
	],
	default: [],
} as INodeProperties;
