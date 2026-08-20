/**
 * Supported locales for the application
 */
export type Locale = 'en' | 'zh';

/**
 * Default locale when N8N_DEFAULT_LOCALE is not set or invalid
 */
export const DEFAULT_LOCALE: Locale = 'zh';

/**
 * Type definition for WORDING translations
 */
export interface IWording {
	// Base App
	CreateBaseApp: string;
	CopyBaseApp: string;
	GetBaseAppInfo: string;
	UpdateBaseApp: string;

	// Base Table
	CreateBaseTable: string;
	BatchCreateBaseTables: string;
	UpdateBaseTable: string;
	GetBaseTableList: string;
	DeleteBaseTable: string;
	BatchDeleteBaseTables: string;

	// Base Table View
	CreateTableView: string;
	UpdateTableView: string;
	GetTableViewList: string;
	GetTableViewInfo: string;
	DeleteTableView: string;

	// Base Table Record
	CreateTableRecord: string;
	UpdateTableRecord: string;
	SearchTableRecords: string;
	DeleteTableRecord: string;
	BatchCreateTableRecords: string;
	BatchUpdateTableRecords: string;
	GetTableRecordList: string;
	BatchDeleteTableRecords: string;

	// Base Table Field
	CreateTableField: string;
	UpdateTableField: string;
	GetTableFieldList: string;
	DeleteTableField: string;

	// Base Role
	CreateBaseRole: string;
	UpdateBaseRole: string;
	GetBaseRoleList: string;
	DeleteBaseRole: string;

	// Base Role Member
	CreateBaseRoleMember: string;
	BatchCreateBaseRoleMembers: string;
	GetBaseRoleMemberList: string;
	DeleteBaseRoleMember: string;
	BatchDeleteBaseRoleMembers: string;

	// Message
	SendMessage: string;
	BatchSendMessage: string;
	ReplyMessage: string;
	EditMessage: string;
	ForwardMessage: string;
	RecallMessage: string;
	GetMessageContentResource: string;
	GetMessageContentInfo: string;
	ParseMessageContent: string;
	UploadImage: string;
	DownloadImage: string;
	UploadFile: string;
	DownloadFile: string;
	SendLimitedCard: string;
	UpdateMessageCard: string;
	DeleteLimitedCard: string;
	SendAndWaitMessage: string;
	ParseWebhookMessage: string;
	SendStreamMessage: string;
	UpdateInteractiveCard: string;

	// Document
	CreateDocument: string;
	GetDocumentInfo: string;
	GetRawContent: string;
	GetBlockList: string;

	// Document Block
	CreateDocumentBlock: string;
	CreateNestedDocumentBlock: string;
	UpdateDocumentBlock: string;
	GetDocumentBlock: string;
	DeleteDocumentBlock: string;
	ConvertDocumentBlock: string;

	// Space
	CreateFolder: string;
	DeleteFileOrFolder: string;
	GetFileList: string;
	SearchFiles: string;
	UploadFileAll: string;
	UploadMedia: string;
	DownloadMedia: string;
	GetMediaTempDownloadLink: string;

	// Contact
	BatchGetUserInfo: string;
	Emails: string;
	PhoneNumbers: string;
	GetUserInfo: string;
	UserId: string;

	// Spreadsheet
	CreateSpreadsheet: string;
	UpdateSpreadsheet: string;
	GetSpreadsheetInfo: string;
	CreateSheet: string;
	CopySheet: string;
	DeleteSheet: string;
	UpdateSheet: string;
	GetSheetList: string;
	GetSheetInfo: string;
	CreateDimension: string;
	InsertDimension: string;
	UpdateDimension: string;
	MoveDimension: string;
	DeleteDimension: string;
	MergeCells: string;
	SplitCells: string;
	FindCells: string;
	ReplaceCells: string;
	SetCellStyle: string;
	ValuesInsert: string;
	ValuesAppend: string;
	ValuesImageInsert: string;
	ValuesRead: string;
	ValuesWrite: string;

	// Calendar
	CreateCalendar: string;
	DeleteCalendar: string;
	GetPrimaryCalendarInfo: string;
	GetCalendarInfo: string;
	GetCalendarList: string;
	UpdateCalendar: string;
	SearchCalendar: string;
	CalendarAvailability: string;
	CalendarEventCreate: string;
	CalendarEventDelete: string;
	CalendarEventSearch: string;
	CalendarEventGet: string;
	CalendarEventGetList: string;
	CalendarEventUpdate: string;
	CalendarEventAttendeeCreate: string;
	CalendarEventAttendeeDelete: string;
	CalendarEventAttendeeGetList: string;
	CalendarMeetingChatCreate: string;
	CalendarMeetingChatUnbind: string;

	// Approval
	CreateApprovalInstance: string;
	GetApprovalInstance: string;

	// MCP
	GetToolList: string;
	ExecuteTool: string;

	// Wiki
	GetWikiSpaceList: string;
	GetWikiSpaceInfo: string;
	UpdateWikiSpaceSettings: string;
	DeleteWikiSpaceMember: string;
	GetWikiSpaceMembers: string;
	AddWikiSpaceMember: string;
	UpdateWikiNodeTitle: string;
	MoveWikiNode: string;
	GetWikiNodeInfo: string;
	GetWikiNodeChildren: string;
	CreateWikiNode: string;
	CopyWikiNode: string;

	// Task
	UpdateTask: string;
	GetTaskInfo: string;
	DeleteTask: string;
	CreateTask: string;
	GetTaskList: string;
	GetTasklistTasks: string;

	// Task and Wiki field labels
	LabelTaskTitle: string;
	LabelTaskDescription: string;
	LabelUserIDType: string;
	LabelRequestBody: string;
	LabelTaskID: string;
	LabelReturnAll: string;
	LabelPageSize: string;
	LabelPageToken: string;
	LabelOptions: string;
	LabelCompleted: string;
	LabelType: string;
	LabelStartCreateTime: string;
	LabelEndCreateTime: string;
	LabelAddMembers: string;
	LabelClientToken: string;
	LabelMembers: string;
	LabelRemoveMembers: string;
	LabelTasklistGUID: string;
	LabelCreatedFrom: string;
	LabelCreatedTo: string;

	// Wiki field labels
	WikiSpaceId: string;
	WikiMemberType: string;
	WikiGroupId: string;
	WikiUserId: string;
	WikiEmail: string;
	WikiDepartmentId: string;
	WikiAdmin: string;
	WikiMember: string;
	WikiNotify: string;
	WikiSpaceList: string;
	WikiRootPageCreatePermission: string;
	WikiAdminAndMember: string;
	WikiAdminOnly: string;
	WikiDocumentOperationPermission: string;
	WikiAllowed: string;
	WikiNotAllowed: string;
	WikiCommentPermission: string;
	WikiPageSize: string;
	WikiPageSizeDescription: string;
	WikiPageToken: string;
	WikiLanguage: string;
	WikiSimplifiedChinese: string;
	WikiIndonesian: string;
	WikiGerman: string;
	WikiEnglish: string;
	WikiSpanish: string;
	WikiFrench: string;
	WikiItalian: string;
	WikiPortuguese: string;
	WikiVietnamese: string;
	WikiRussian: string;
	WikiHindi: string;
	WikiThai: string;
	WikiKorean: string;
	WikiJapanese: string;
	WikiTraditionalChineseHongKong: string;
	WikiTraditionalChineseTaiwan: string;
	WikiDocumentType: string;
	WikiDocument: string;
	WikiSheet: string;
	WikiMindnote: string;
	WikiBitable: string;
	WikiFile: string;
	WikiParentNodeToken: string;
	WikiNodeType: string;
	WikiOriginNode: string;
	WikiShortcut: string;
	WikiOriginNodeToken: string;
	WikiDocumentTitle: string;
	WikiNodeToken: string;
	WikiNewTitle: string;
	WikiSourceSpaceId: string;
	WikiNodeToMove: string;
	WikiTargetParentToken: string;
	WikiTargetSpaceId: string;
	WikiMemberId: string;
	WikiRole: string;
	WikiCollaboratorType: string;
	WikiUser: string;
	WikiGroup: string;
	WikiDepartment: string;
	WikiNode: string;
	WikiLegacyDocument: string;
	WikiNewDocument: string;
	WikiSlides: string;

	// Wiki descriptions
	WikiPageSizeMaxDescription: string;
	WikiPageTokenDescription: string;
	WikiReturnedNameLanguageDescription: string;
	WikiSpaceIdDescription: string;
	WikiParentNodeTokenDescription: string;
	WikiShortcutOriginTokenDescription: string;
	WikiRootPagePermissionDescription: string;
	WikiDocumentOperationDescription: string;
	WikiCommentPermissionDescription: string;
	WikiAddMemberIdDescription: string;
	WikiDeleteMemberTypeDescription: string;
	WikiMemberRoleDescription: string;
	WikiCollaboratorTypeDescription: string;
	WikiCopyTargetParentDescription: string;
	WikiCopyTargetSpaceDescription: string;
	WikiCopyTitleDescription: string;
	WikiNodeTitleDescription: string;
	WikiAddMemberTypeDescription: string;
	WikiNodeTokenDescription: string;
	WikiDocumentTypeDescription: string;
	WikiMoveParentDescription: string;
	WikiMoveSpaceDescription: string;
	WikiPageSizeDescriptionShort: string;
	WikiPageTokenDescriptionShort: string;
	WikiGroupIdShort: string;

	// Credentials
	LarkTenantTokenApi: string;
	LarkOAuth2Api: string;
	GrantType: string;
	BaseUrl: string;
	CustomUrl: string;
	CustomAccessTokenUrl: string;
	CustomAuthorizationUrl: string;
	Url: string;
	AppId: string;
	AppSecret: string;
	AccessToken: string;
	Scope: string;
	AuthorizationUrl: string;
	AccessTokenUrl: string;
	AuthUriQueryParameters: string;
	Authentication: string;
	ChinaBaseUrlDescription: string;
	GlobalBaseUrlDescription: string;
	CustomUrlDescription: string;
	CustomUrlHint: string;
	AppIdDescription: string;
	AppSecretDescription: string;
	OAuthScopeSuggestion: string;
	OAuthScopeHint: string;
	MoreDetails: string;

	// UI labels
	UiAuthentication: string;
	UiResource: string;
	UiOperation: string;
	UiFromList: string;
	UiId: string;
	UiFormElements: string;
	UiValues: string;
	UiAcceptedFileTypes: string;
	UiElementName: string;
	UiElementType: string;
	UiFieldLabel: string;
	UiFieldName: string;
	UiFieldOptions: string;
	UiOption: string;
	UiFieldValue: string;
	UiHtml: string;
	UiMultipleChoice: string;
	UiMultipleFiles: string;
	UiPlaceholder: string;
	UiRequiredField: string;
	UiDefineForm: string;
	UiFormFields: string;
	UiLimitType: string;
	UiAmount: string;
	UiUnit: string;
	UiMaxDateAndTime: string;
	UiLimitWaitTime: string;
	UiTypeOfApproval: string;
	UiApproveButtonLabel: string;
	UiDisapproveButtonLabel: string;
	UiSubject: string;
	UiMessage: string;
	UiResponseType: string;
	UiDisableButtonAfterSubmission: string;
	UiDisableTips: string;
	UiApprovalOptions: string;
	UiOptions: string;
	UiMessageButtonLabel: string;
	UiResponseFormButtonLabel: string;
	UiResponseFormCustomStyling: string;
	UiResponseFormDescription: string;
	UiResponseFormTitle: string;
	UiTriggerOn: string;
	UiEventAddReaction: string;
	UiEventAny: string;
	UiEventBotMenu: string;
	UiEventBaseAppFieldChanged: string;
	UiEventBaseAppRecordChanged: string;
	UiEventCardPostback: string;
	UiEventDeleteReaction: string;
	UiEventReceiveMessage: string;
	UiLark: string;
	UiLarkTrigger: string;
	UiThisTriggerOnlySupportsFeishuChinaAndDueToLarkApiLimitationsYouCanUseJustOneLarkTriggerForEachLarkBotAtATime: string;
	UiSubscriptionDocsEvent: string;
	UiNewSubscription: string;
	UiFileType: string;
	UiFileToken: string;
	UiUnsubscribeOnDeactivate: string;
	UiCallbackToast: string;
	UiBeforeAddingThisEventPleaseEnsureThatYouHaveAddTheSubscriptionInTheOptionsFieldATargetBlankHrefHttpsOpenFeishuCnDocumentServerDocsDocsDriveV1EventSubscribeOpenDocumentationA: string;
	UiApprovalCode: string;
	UiUserIdType: string;
	UiApplicantUserId: string;
	UiTitleWidgetId: string;
	UiTitle: string;
	UiDescriptionWidgetId: string;
	UiDescription: string;
	UiApproverNodeId: string;
	UiApproverUserIds: string;
	UiRequestBodyExtra: string;
	UiInstanceCode: string;
	UiUserId: string;
	UiFilter: string;
	UiMessageType: string;
	UiContent: string;
	UiCardContent: string;
	UiOpenIds: string;
	UiUserIds: string;
	UiUnionIds: string;
	UiDepartmentIds: string;
	UiCard: string;
	UiMessageCard: string;
	UiReceiveId: string;
	UiWebhookUrl: string;
	UiBearerToken: string;
	UiInitialMessage: string;
	UiTimeout: string;
	UiEncryptKey: string;
	UiVerificationToken: string;
	UiOwnerIds: string;
	UiChatGroupIds: string;
	UiMergeType: string;
	UiReplacement: string;
	UiStyle: string;
	UiBackgroundColor: string;
	UiBorderColor: string;
	UiBorderType: string;
	UiFontColor: string;
	UiFontStyle: string;
	UiFontSize: string;
	UiBold: string;
	UiItalic: string;
	UiClean: string;
	UiHorizontalAlignment: string;
	UiNumberFormat: string;
	UiTextDecoration: string;
	UiVerticalAlignment: string;
	UiLength: string;
	UiInheritStyle: string;
	UiDestinationIndex: string;
	UiVisible: string;
	UiFixedSize: string;
	UiLockSheet: string;
	UiLockInfo: string;
	UiFrozenColumnCount: string;
	UiFrozenRowCount: string;
	UiHiddenSheet: string;
	UiUserIds944168: string;
	UiInsertDataOption: string;
	UiImageName: string;
	UiImageBinaryField: string;
	UiValueRenderOption: string;
	UiDateTimeRenderOption: string;

	// Common
	Options: string;
	AddField: string;
	OpenDocument: string;

	// Resource Names
	ResourceApproval: string;
	ResourceBase: string;
	ResourceMessage: string;
	ResourceDocument: string;
	ResourceSpace: string;
	ResourceContacts: string;
	ResourceSpreadsheet: string;
	ResourceCalendar: string;
	ResourceWiki: string;
	ResourceTask: string;
}

/**
 * Get the current locale from environment variable
 */
export function getCurrentLocale(): Locale {
	const locale = process.env.N8N_DEFAULT_LOCALE?.trim().toLowerCase().replace(/_/g, '-');
	const languageCode = locale?.split('-')[0];

	if (languageCode === 'en' || languageCode === 'zh') {
		return languageCode;
	}

	return DEFAULT_LOCALE;
}
