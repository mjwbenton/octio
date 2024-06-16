export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigInt: { input: any; output: any };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  Decimal: { input: any; output: any };
  Email: { input: any; output: any };
  FloatSafeDecimal: { input: any; output: any };
  GenericScalar: { input: any; output: any };
  JSONString: { input: any; output: any };
  NormalizedDecimal: { input: any; output: any };
  Time: { input: any; output: any };
  UUID: { input: any; output: any };
};

/** An enumeration. */
export enum ApiExceptionCategories {
  Account = "ACCOUNT",
  Unknown = "UNKNOWN",
}

/** An enumeration. */
export enum ApiExceptionPriority {
  High = "HIGH",
  Low = "LOW",
  Medium = "MEDIUM",
}

export type ApiExceptionQueryInput = {
  /** The account number to filter for. */
  readonly accountNumber: InputMaybe<Scalars["ID"]["input"]>;
  /** The category to filter for. */
  readonly category: InputMaybe<ApiExceptionCategories>;
  /** The channel to filter for. */
  readonly channel: InputMaybe<Scalars["String"]["input"]>;
  /** The customer contact to filter for. */
  readonly customerContact: InputMaybe<Scalars["String"]["input"]>;
  /** The external identifier to filter for. */
  readonly externalIdentifier: InputMaybe<Scalars["String"]["input"]>;
  /** The priority to filter for. */
  readonly priority: InputMaybe<ApiExceptionPriority>;
  /** The resolution status to filter for. */
  readonly resolutionStatus: InputMaybe<ApiExceptionResolutionStatus>;
  /** The resolution type to filter for. */
  readonly resolutionType: InputMaybe<ApiExceptionResolutionType>;
  /** The supply point identifier to filter for. */
  readonly supplyPointIdentifier: InputMaybe<Scalars["ID"]["input"]>;
  /** Tags to filter for. */
  readonly tags: InputMaybe<ReadonlyArray<InputMaybe<ApiExceptionTags>>>;
  /** The user ID to filter for. */
  readonly userId: InputMaybe<Scalars["ID"]["input"]>;
};

/** An enumeration. */
export enum ApiExceptionResolutionStatus {
  Assigned = "ASSIGNED",
  Cancelled = "CANCELLED",
  InProgress = "IN_PROGRESS",
  Resolved = "RESOLVED",
  Unassigned = "UNASSIGNED",
  Unsuccessful = "UNSUCCESSFUL",
  WaitingOnThirdParty = "WAITING_ON_THIRD_PARTY",
}

/** An enumeration. */
export enum ApiExceptionResolutionType {
  Automatic = "AUTOMATIC",
  Manual = "MANUAL",
  Unassigned = "UNASSIGNED",
}

/** An enumeration. */
export enum ApiExceptionTags {
  MoveIn = "MOVE_IN",
  MoveOut = "MOVE_OUT",
  ProductUpdate = "PRODUCT_UPDATE",
}

export type AcceptGoodsQuoteInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** A JSON object containing client parameters to store on the quote. */
  readonly clientParams: InputMaybe<Scalars["JSONString"]["input"]>;
  /** A JSON object containing market parameters to store on the purchase. */
  readonly marketParams: InputMaybe<Scalars["JSONString"]["input"]>;
  /** ID of the accepted quote. */
  readonly quoteId: Scalars["Int"]["input"];
};

export type AcceptTermsAndConditionsInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The ID of the Enrolment. */
  readonly enrolmentId: Scalars["ID"]["input"];
  /** The version of accepted terms and conditions. */
  readonly termsVersion: TermsVersionInput;
};

/** An enumeration. */
export enum AccountApplicationStatus {
  /** Current */
  Current = "CURRENT",
  /** Failed */
  Failed = "FAILED",
  /** Historic */
  Historic = "HISTORIC",
  /** Withdrawn */
  Withdrawn = "WITHDRAWN",
}

export type AccountBillingAddressInput = {
  /** The account number of the account to update. */
  readonly accountNumber: InputMaybe<Scalars["String"]["input"]>;
  /** Billing address details. */
  readonly billingAddress: InputMaybe<BillingAddressDetailsInput>;
};

/** An enumeration. */
export enum AccountBillingOptionsPeriodLength {
  /** Monthly */
  Monthly = "MONTHLY",
  /** Quarterly */
  Quarterly = "QUARTERLY",
}

/**
 *
 *     Please note: these labels are exposed in the API documentation.
 *
 */
export enum AccountCreditReasonType {
  /** External referral credit */
  ExternalReferralCredit = "EXTERNAL_REFERRAL_CREDIT",
}

/** An enumeration. */
export enum AccountEventType {
  /** The email messages that were received by the account. */
  EmailReceived = "EMAIL_RECEIVED",
  /** The email messages that were sent by the account. */
  EmailSent = "EMAIL_SENT",
  /** The marketing email messages that were sent by the account. */
  MarketingEmailSent = "MARKETING_EMAIL_SENT",
  /** The print messages that were cancelled. */
  PrintCancelled = "PRINT_CANCELLED",
  /** The print messages that failed to be delivered. */
  PrintFailed = "PRINT_FAILED",
  /** The print messages that were returned to sender. */
  PrintReturned = "PRINT_RETURNED",
  /** The print messages that were sent to the print partner by the account. */
  PrintSent = "PRINT_SENT",
  /** The print messages that were sent by the print partner. */
  PrintSucceeded = "PRINT_SUCCEEDED",
}

export type AccountLedgerInput = {
  /** The account number. */
  readonly accountNumber: Scalars["ID"]["input"];
  /** The ledger id for the account. */
  readonly ledgerId: Scalars["ID"]["input"];
};

export type AccountNumberInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
};

/** An enumeration. */
export enum AccountPaymentStatusOptions {
  /** The payment has been approved by the merchant and added to your Kraken account. */
  Cleared = "CLEARED",
  /** This payment was deleted. From this point it cannot be altered. */
  Deleted = "DELETED",
  /** The payment failed permanently. */
  Failed = "FAILED",
  /** The payment has been made successfully and applied to the Kraken balance. */
  Fulfilled = "FULFILLED",
  /** Payments made in a previous system and then imported into Kraken. */
  Historic = "HISTORIC",
  /** The payment has been submitted. From this point it cannot be altered. */
  Pending = "PENDING",
  /** A payment promise has been created, but it has not left the customers bank account. */
  Promised = "PROMISED",
  /** The payment promise has been broken. */
  PromiseBroken = "PROMISE_BROKEN",
  /** The initial state of a payment in Kraken. It should be scheduled with a payment vendor in the future. */
  Requested = "REQUESTED",
  /** The payment has been scheduled for collection and the customer has been notified. While a payment is scheduled, it can still be deleted. */
  Scheduled = "SCHEDULED",
  /** Third Party payments are those recorded for financial purposes in a different system but should be added to statements. */
  ThirdParty = "THIRD_PARTY",
}

/** An enumeration. */
export enum AccountPaymentTransactionTypeChoices {
  Agency = "AGENCY",
  AllpayCard = "ALLPAY_CARD",
  AllpayCash = "ALLPAY_CASH",
  AllpayCheque = "ALLPAY_CHEQUE",
  AustraliaPost = "AUSTRALIA_POST",
  BacsDeposit = "BACS_DEPOSIT",
  Bpay = "BPAY",
  Bpoint = "BPOINT",
  BristolPound = "BRISTOL_POUND",
  Btre = "BTRE",
  Cash = "CASH",
  Centrepay = "CENTREPAY",
  Cheque = "CHEQUE",
  CreditCard = "CREDIT_CARD",
  DcaCollection = "DCA_COLLECTION",
  DdFinalCollection = "DD_FINAL_COLLECTION",
  DdFirstCollection = "DD_FIRST_COLLECTION",
  DdRegularCollection = "DD_REGULAR_COLLECTION",
  DdRePresentation = "DD_RE_PRESENTATION",
  DebitCard = "DEBIT_CARD",
  Dwp = "DWP",
  EapaVoucher = "EAPA_VOUCHER",
  Eft = "EFT",
  ErroneousPayment = "ERRONEOUS_PAYMENT",
  FailedRepaymentReversal = "FAILED_REPAYMENT_REVERSAL",
  FuelDirect = "FUEL_DIRECT",
  Heeas = "HEEAS",
  Ivr = "IVR",
  Konbini = "KONBINI",
  PagopaNotice = "PAGOPA_NOTICE",
  PaymentFee = "PAYMENT_FEE",
  PaypointCard = "PAYPOINT_CARD",
  PaypointCash = "PAYPOINT_CASH",
  PaypointCheque = "PAYPOINT_CHEQUE",
  Payzone = "PAYZONE",
  PostOfficeCard = "POST_OFFICE_CARD",
  PostOfficeCash = "POST_OFFICE_CASH",
  PostOfficeCheque = "POST_OFFICE_CHEQUE",
  PostOfficeSavingsStamps = "POST_OFFICE_SAVINGS_STAMPS",
  PrepaidCard = "PREPAID_CARD",
  PrepayCard = "PREPAY_CARD",
  PrepayKey = "PREPAY_KEY",
  PrepaySmart = "PREPAY_SMART",
  PrepayToken = "PREPAY_TOKEN",
  TransferFromSap = "TRANSFER_FROM_SAP",
  Unknown = "UNKNOWN",
  Urgs = "URGS",
}

/** The input type for the account reference. */
export type AccountReferenceInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The namespace for the reference. */
  readonly namespace: Scalars["String"]["input"];
  /** The reference value. */
  readonly value: Scalars["String"]["input"];
};

/** Contains reminder type choices for all territories. */
export enum AccountReminderTypes {
  AccountCoolOff = "ACCOUNT_COOL_OFF",
  AccountMigrationSyncXoserveMeterMismatch = "ACCOUNT_MIGRATION_SYNC_XOSERVE_METER_MISMATCH",
  AdHoc = "AD_HOC",
  AgreementRevoked = "AGREEMENT_REVOKED",
  AmperageChange = "AMPERAGE_CHANGE",
  AssignedToCreditTeam = "ASSIGNED_TO_CREDIT_TEAM",
  AusEmbeddedWaterEstimationRequiredForSkippedReading = "AUS_EMBEDDED_WATER_ESTIMATION_REQUIRED_FOR_SKIPPED_READING",
  AusEmbeddedWaterReadingFailure = "AUS_EMBEDDED_WATER_READING_FAILURE",
  AusIndustryCustomerOwnReadingNotSent = "AUS_INDUSTRY_CUSTOMER_OWN_READING_NOT_SENT",
  AusVicSharedfuseNotification = "AUS_VIC_SHAREDFUSE_NOTIFICATION",
  AutomatedBillingDisabled = "AUTOMATED_BILLING_DISABLED",
  Billing = "BILLING",
  BillingAmendedIntervalDataReceivedCausingOvercharge = "BILLING_AMENDED_INTERVAL_DATA_RECEIVED_CAUSING_OVERCHARGE",
  BillingAmendedMeterReadBasic = "BILLING_AMENDED_METER_READ_BASIC",
  BillingAmendedMeterReadCesElecBasic = "BILLING_AMENDED_METER_READ_CES_ELEC_BASIC",
  BillingAmendedMeterReadCesElecInterval = "BILLING_AMENDED_METER_READ_CES_ELEC_INTERVAL",
  BillingAmendedMeterReadGas = "BILLING_AMENDED_METER_READ_GAS",
  BillingAmendedMeterReadInterval = "BILLING_AMENDED_METER_READ_INTERVAL",
  BillingAmendedMeterReadIntervalLegacy = "BILLING_AMENDED_METER_READ_INTERVAL_LEGACY",
  BillingAmendedMeterReadPreMigration = "BILLING_AMENDED_METER_READ_PRE_MIGRATION",
  BillingBackdatedConcessionReceived = "BILLING_BACKDATED_CONCESSION_RECEIVED",
  BillingBackdatedUmsRecordReceived = "BILLING_BACKDATED_UMS_RECORD_RECEIVED",
  BillingCustomerSelfReadReceived = "BILLING_CUSTOMER_SELF_READ_RECEIVED",
  BillingMissingRead = "BILLING_MISSING_READ",
  BillingQuotedNtcDoesNotAlign = "BILLING_QUOTED_NTC_DOES_NOT_ALIGN",
  BillingRegisterReplacedOrRemoved = "BILLING_REGISTER_REPLACED_OR_REMOVED",
  CancelMoveOutUnableToReinstateFutureAgreements = "CANCEL_MOVE_OUT_UNABLE_TO_REINSTATE_FUTURE_AGREEMENTS",
  ChurnPrevention = "CHURN_PREVENTION",
  CommsToBePrinted = "COMMS_TO_BE_PRINTED",
  ContractCommsNotDelivered = "CONTRACT_COMMS_NOT_DELIVERED",
  CosGain = "COS_GAIN",
  CosGainMigrationEcoesMeterMismatch = "COS_GAIN_MIGRATION_ECOES_METER_MISMATCH",
  CosGainRelRetrievalFailure = "COS_GAIN_REL_RETRIEVAL_FAILURE",
  CosLoss = "COS_LOSS",
  CustomerDetailsChange = "CUSTOMER_DETAILS_CHANGE",
  CustomerReportedSmartMeterIssues = "CUSTOMER_REPORTED_SMART_METER_ISSUES",
  D0010CreationFailure = "D0010_CREATION_FAILURE",
  D0052CreationFailure = "D0052_CREATION_FAILURE",
  D0205CreationFailure = "D0205_CREATION_FAILURE",
  DeuSwichtingProcessFailed = "DEU_SWICHTING_PROCESS_FAILED",
  DisconnectionMandatoryNoticeEmailFailure = "DISCONNECTION_MANDATORY_NOTICE_EMAIL_FAILURE",
  DisconnectionMandatoryNoticeSmsFailure = "DISCONNECTION_MANDATORY_NOTICE_SMS_FAILURE",
  DunningBestEndeavoursCall = "DUNNING_BEST_ENDEAVOURS_CALL",
  DunningDisconnectionDeEnergisationAssessment = "DUNNING_DISCONNECTION_DE_ENERGISATION_ASSESSMENT",
  DunningDisconnectionMandatoryNoticeEmailFailure = "DUNNING_DISCONNECTION_MANDATORY_NOTICE_EMAIL_FAILURE",
  DunningDisconnectionOutboundReminderCall = "DUNNING_DISCONNECTION_OUTBOUND_REMINDER_CALL",
  DunningMandatoryNoticeEmailFailure = "DUNNING_MANDATORY_NOTICE_EMAIL_FAILURE",
  DunningOutboundReminderCall = "DUNNING_OUTBOUND_REMINDER_CALL",
  DunningReminder = "DUNNING_REMINDER",
  DunningReminderCall = "DUNNING_REMINDER_CALL",
  DunningReminderDisconnectionApplication = "DUNNING_REMINDER_DISCONNECTION_APPLICATION",
  DunningReminderFuturePayment = "DUNNING_REMINDER_FUTURE_PAYMENT",
  DunningReminderPaymentMade = "DUNNING_REMINDER_PAYMENT_MADE",
  DunningVacantConsumptionDeEnergisationAssessment = "DUNNING_VACANT_CONSUMPTION_DE_ENERGISATION_ASSESSMENT",
  DuplicateCardFingerprinTs = "DUPLICATE_CARD_FINGERPRINTs",
  EmbeddedNetworkAllChildLifeSupportRecordsAreDeregistered = "EMBEDDED_NETWORK_ALL_CHILD_LIFE_SUPPORT_RECORDS_ARE_DEREGISTERED",
  EmbeddedNetworkExceptionDistributorOwnedParentLifeSupportRecord = "EMBEDDED_NETWORK_EXCEPTION_DISTRIBUTOR_OWNED_PARENT_LIFE_SUPPORT_RECORD",
  EmbeddedNetworkExceptionParentMeterPointLostOrLosing = "EMBEDDED_NETWORK_EXCEPTION_PARENT_METER_POINT_LOST_OR_LOSING",
  EmbeddedNetworkExceptionParentMeterPointReceivedDangerousLifeSupportNotification = "EMBEDDED_NETWORK_EXCEPTION_PARENT_METER_POINT_RECEIVED_DANGEROUS_LIFE_SUPPORT_NOTIFICATION",
  EmbeddedNetworkExceptionParentMeterPointReceivedLifeSupportNotification = "EMBEDDED_NETWORK_EXCEPTION_PARENT_METER_POINT_RECEIVED_LIFE_SUPPORT_NOTIFICATION",
  FieldworksAccountCreatedWithNoEmailAddress = "FIELDWORKS_ACCOUNT_CREATED_WITH_NO_EMAIL_ADDRESS",
  FieldworksAllocateNmiMarketParticipantsNotSet = "FIELDWORKS_ALLOCATE_NMI_MARKET_PARTICIPANTS_NOT_SET",
  FieldworksAssignMeteringCoordinatorStepFailed = "FIELDWORKS_ASSIGN_METERING_COORDINATOR_STEP_FAILED",
  FieldworksAssignMeteringProviderStepFailed = "FIELDWORKS_ASSIGN_METERING_PROVIDER_STEP_FAILED",
  FieldworksBulkDeploymentJourneyAutoCancelled = "FIELDWORKS_BULK_DEPLOYMENT_JOURNEY_AUTO_CANCELLED",
  FieldworksChangeRetailerFailed = "FIELDWORKS_CHANGE_RETAILER_FAILED",
  FieldworksContactSoRecipientToUpdateTheSoDetails = "FIELDWORKS_CONTACT_SO_RECIPIENT_TO_UPDATE_THE_SO_DETAILS",
  FieldworksExpectedMeterPointNotCreated = "FIELDWORKS_EXPECTED_METER_POINT_NOT_CREATED",
  FieldworksExpectedMeterReadNotReceived = "FIELDWORKS_EXPECTED_METER_READ_NOT_RECEIVED",
  FieldworksExpectedNtcsNotReceived = "FIELDWORKS_EXPECTED_NTCS_NOT_RECEIVED",
  FieldworksInvestigateWhetherJourneyNeedsContinuation = "FIELDWORKS_INVESTIGATE_WHETHER_JOURNEY_NEEDS_CONTINUATION",
  FieldworksJourneyAttachments = "FIELDWORKS_JOURNEY_ATTACHMENTS",
  FieldworksJourneyCancelledDueToLifeSupportRegistration = "FIELDWORKS_JOURNEY_CANCELLED_DUE_TO_LIFE_SUPPORT_REGISTRATION",
  FieldworksMaintainRegisterBillableOverrideForUnsolicitedMeterChanges = "FIELDWORKS_MAINTAIN_REGISTER_BILLABLE_OVERRIDE_FOR_UNSOLICITED_METER_CHANGES",
  FieldworksManuallyCompleteCustomerMoveIn = "FIELDWORKS_MANUALLY_COMPLETE_CUSTOMER_MOVE_IN",
  FieldworksMeterpointIsNotActive = "FIELDWORKS_METERPOINT_IS_NOT_ACTIVE",
  FieldworksMeterFaultJourneyAutoCancelled = "FIELDWORKS_METER_FAULT_JOURNEY_AUTO_CANCELLED",
  FieldworksMeterFaultNcomCommsFailed = "FIELDWORKS_METER_FAULT_NCOM_COMMS_FAILED",
  FieldworksMeterFaultReceived = "FIELDWORKS_METER_FAULT_RECEIVED",
  FieldworksMirnDiscoveryFailed = "FIELDWORKS_MIRN_DISCOVERY_FAILED",
  FieldworksMoveOutCancelledWhileSupplyAbolishmentInProgress = "FIELDWORKS_MOVE_OUT_CANCELLED_WHILE_SUPPLY_ABOLISHMENT_IN_PROGRESS",
  FieldworksMultipleOpenJourneysForMeterPoint = "FIELDWORKS_MULTIPLE_OPEN_JOURNEYS_FOR_METER_POINT",
  FieldworksNewConnectionCompletionReview = "FIELDWORKS_NEW_CONNECTION_COMPLETION_REVIEW",
  FieldworksNewConnectionDataNotValid = "FIELDWORKS_NEW_CONNECTION_DATA_NOT_VALID",
  FieldworksObtainCustomerApprovalBeforeProgressing = "FIELDWORKS_OBTAIN_CUSTOMER_APPROVAL_BEFORE_PROGRESSING",
  FieldworksObtainSupplyAbolishmentApproval = "FIELDWORKS_OBTAIN_SUPPLY_ABOLISHMENT_APPROVAL",
  FieldworksServiceOrderAttachments = "FIELDWORKS_SERVICE_ORDER_ATTACHMENTS",
  FieldworksServiceOrderFailed = "FIELDWORKS_SERVICE_ORDER_FAILED",
  FieldworksServiceOrderPartiallyCompleted = "FIELDWORKS_SERVICE_ORDER_PARTIALLY_COMPLETED",
  FieldworksServiceOrderStatusUpdated = "FIELDWORKS_SERVICE_ORDER_STATUS_UPDATED",
  FieldworksServiceOrderUnableToAccessWithCustomerConsultation = "FIELDWORKS_SERVICE_ORDER_UNABLE_TO_ACCESS_WITH_CUSTOMER_CONSULTATION",
  FieldworksSupplyPeriodDoesNotExistForMeterpoint = "FIELDWORKS_SUPPLY_PERIOD_DOES_NOT_EXIST_FOR_METERPOINT",
  FieldworksUploadAttachmentToJemenaPortal = "FIELDWORKS_UPLOAD_ATTACHMENT_TO_JEMENA_PORTAL",
  FinalBillingUnableToBill = "FINAL_BILLING_UNABLE_TO_BILL",
  FlowFileError = "FLOW_FILE_ERROR",
  FraActivationProcessAwaitingSwitchInConfirmation = "FRA_ACTIVATION_PROCESS_AWAITING_SWITCH_IN_CONFIRMATION",
  FraActivationProcessAwaitingSwitchReadings = "FRA_ACTIVATION_PROCESS_AWAITING_SWITCH_READINGS",
  FraActivationProcessCommanderSouscription = "FRA_ACTIVATION_PROCESS_COMMANDER_SOUSCRIPTION",
  FraActivationProcessGasProviderChangeRequest = "FRA_ACTIVATION_PROCESS_GAS_PROVIDER_CHANGE_REQUEST",
  FraActivationProcessInceptionChecks = "FRA_ACTIVATION_PROCESS_INCEPTION_CHECKS",
  FraActivationProcessPrmEligibility = "FRA_ACTIVATION_PROCESS_PRM_ELIGIBILITY",
  FraActivationProcessScheduleSiteworks = "FRA_ACTIVATION_PROCESS_SCHEDULE_SITEWORKS",
  FraElecActivationProcessWrongSwitchReadingsForProviderCalendarTemporalClasses = "FRA_ELEC_ACTIVATION_PROCESS_WRONG_SWITCH_READINGS_FOR_PROVIDER_CALENDAR_TEMPORAL_CLASSES",
  FraEnergyChequeUnknown = "FRA_ENERGY_CHEQUE_UNKNOWN",
  FraFsl = "FRA_FSL",
  FraTerminationRequestErrored = "FRA_TERMINATION_REQUEST_ERRORED",
  GasExceptionCustomerDetailsNotificationFailed = "GAS_EXCEPTION_CUSTOMER_DETAILS_NOTIFICATION_FAILED",
  GasExceptionCustomerTransferCancelled = "GAS_EXCEPTION_CUSTOMER_TRANSFER_CANCELLED",
  GasExceptionCustomerTransferRejected = "GAS_EXCEPTION_CUSTOMER_TRANSFER_REJECTED",
  GasExceptionLifeSupportNotificationFailed = "GAS_EXCEPTION_LIFE_SUPPORT_NOTIFICATION_FAILED",
  GasExceptionMeterDataVerifyRequestFailed = "GAS_EXCEPTION_METER_DATA_VERIFY_REQUEST_FAILED",
  GasExceptionMeterDataVerifyResponseNoChangeWithExplanation = "GAS_EXCEPTION_METER_DATA_VERIFY_RESPONSE_NO_CHANGE_WITH_EXPLANATION",
  GasExceptionMeterDataVerifyResponseOverdue = "GAS_EXCEPTION_METER_DATA_VERIFY_RESPONSE_OVERDUE",
  GasExceptionMeterDataVerifyResponseWithoutRevisedRead = "GAS_EXCEPTION_METER_DATA_VERIFY_RESPONSE_WITHOUT_REVISED_READ",
  GasExceptionSiteAccessDetailsNotificationFailed = "GAS_EXCEPTION_SITE_ACCESS_DETAILS_NOTIFICATION_FAILED",
  GasExceptionSiteAccessDetailsReceivedForNonExistentMeter = "GAS_EXCEPTION_SITE_ACCESS_DETAILS_RECEIVED_FOR_NON_EXISTENT_METER",
  GasExceptionSiteAddressDetailsNotificationFailed = "GAS_EXCEPTION_SITE_ADDRESS_DETAILS_NOTIFICATION_FAILED",
  GasManualServiceOrderRequiredForEnrolment = "GAS_MANUAL_SERVICE_ORDER_REQUIRED_FOR_ENROLMENT",
  GasNotificationChangeOfSiteAddress = "GAS_NOTIFICATION_CHANGE_OF_SITE_ADDRESS",
  GasReadingRemovedInstalledReceived = "GAS_READING_REMOVED_INSTALLED_RECEIVED",
  GasUnknownCustomerClassificationCodeReceived = "GAS_UNKNOWN_CUSTOMER_CLASSIFICATION_CODE_RECEIVED",
  HardshipGraduationAssessment = "HARDSHIP_GRADUATION_ASSESSMENT",
  HardshipNoPaymentPlan = "HARDSHIP_NO_PAYMENT_PLAN",
  HardshipRemovalAssessment = "HARDSHIP_REMOVAL_ASSESSMENT",
  HeldStatement = "HELD_STATEMENT",
  IndustryChangeOfSupplierDoubleGain = "INDUSTRY_CHANGE_OF_SUPPLIER_DOUBLE_GAIN",
  IndustryCustomerTransferDelayed = "INDUSTRY_CUSTOMER_TRANSFER_DELAYED",
  IndustryExceptionChangeOfSupplierCancelled = "INDUSTRY_EXCEPTION_CHANGE_OF_SUPPLIER_CANCELLED",
  IndustryExceptionChangeOfSupplierConflictingPeriod = "INDUSTRY_EXCEPTION_CHANGE_OF_SUPPLIER_CONFLICTING_PERIOD",
  IndustryExceptionChangeOfSupplierGainCompletionOverdue = "INDUSTRY_EXCEPTION_CHANGE_OF_SUPPLIER_GAIN_COMPLETION_OVERDUE",
  IndustryExceptionChangeOfSupplierObjected = "INDUSTRY_EXCEPTION_CHANGE_OF_SUPPLIER_OBJECTED",
  IndustryExceptionChangeOfSupplierRejected = "INDUSTRY_EXCEPTION_CHANGE_OF_SUPPLIER_REJECTED",
  IndustryExceptionChangeRequestCancellationFailed = "INDUSTRY_EXCEPTION_CHANGE_REQUEST_CANCELLATION_FAILED",
  IndustryExceptionChangeRequestCancelled = "INDUSTRY_EXCEPTION_CHANGE_REQUEST_CANCELLED",
  IndustryExceptionChangeRequestCompleted = "INDUSTRY_EXCEPTION_CHANGE_REQUEST_COMPLETED",
  IndustryExceptionChangeRequestObjected = "INDUSTRY_EXCEPTION_CHANGE_REQUEST_OBJECTED",
  IndustryExceptionChangeRequestObjectionMissingAck = "INDUSTRY_EXCEPTION_CHANGE_REQUEST_OBJECTION_MISSING_ACK",
  IndustryExceptionChangeRequestObjectionRejected = "INDUSTRY_EXCEPTION_CHANGE_REQUEST_OBJECTION_REJECTED",
  IndustryExceptionChangeRequestObjectionWithdrawalRejected = "INDUSTRY_EXCEPTION_CHANGE_REQUEST_OBJECTION_WITHDRAWAL_REJECTED",
  IndustryExceptionChangeRequestRejected = "INDUSTRY_EXCEPTION_CHANGE_REQUEST_REJECTED",
  IndustryExceptionChangeRequestWithdrawalRejected = "INDUSTRY_EXCEPTION_CHANGE_REQUEST_WITHDRAWAL_REJECTED",
  IndustryExceptionCustomerDetailsNotificationInvalidBillingAddress = "INDUSTRY_EXCEPTION_CUSTOMER_DETAILS_NOTIFICATION_INVALID_BILLING_ADDRESS",
  IndustryExceptionCustomerDetailsNotificationMissingBusinessAcceptance = "INDUSTRY_EXCEPTION_CUSTOMER_DETAILS_NOTIFICATION_MISSING_BUSINESS_ACCEPTANCE",
  IndustryExceptionCustomerDetailsNotificationMissingMandatoryFields = "INDUSTRY_EXCEPTION_CUSTOMER_DETAILS_NOTIFICATION_MISSING_MANDATORY_FIELDS",
  IndustryExceptionCustomerDetailsNotificationRejected = "INDUSTRY_EXCEPTION_CUSTOMER_DETAILS_NOTIFICATION_REJECTED",
  IndustryExceptionCustomerDetailsRequestSpecialReason = "INDUSTRY_EXCEPTION_CUSTOMER_DETAILS_REQUEST_SPECIAL_REASON",
  IndustryExceptionHouseMoveEnrolmentCannotCalculateMoveInReading = "INDUSTRY_EXCEPTION_HOUSE_MOVE_ENROLMENT_CANNOT_CALCULATE_MOVE_IN_READING",
  IndustryExceptionHouseMoveEnrolmentServiceOrderAlreadyInProgress = "INDUSTRY_EXCEPTION_HOUSE_MOVE_ENROLMENT_SERVICE_ORDER_ALREADY_IN_PROGRESS",
  IndustryExceptionHouseMoveEnrolmentUnableToCopyLastMeterReading = "INDUSTRY_EXCEPTION_HOUSE_MOVE_ENROLMENT_UNABLE_TO_COPY_LAST_METER_READING",
  IndustryExceptionLifeSupportContactUserRemovedFromAccount = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_CONTACT_USER_REMOVED_FROM_ACCOUNT",
  IndustryExceptionLifeSupportMultipleAccountsMatches = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_MULTIPLE_ACCOUNTS_MATCHES",
  IndustryExceptionLifeSupportMultipleLifeSupportContactMatches = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_MULTIPLE_LIFE_SUPPORT_CONTACT_MATCHES",
  IndustryExceptionLifeSupportNotificationContainsUnexpectedData = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_NOTIFICATION_CONTAINS_UNEXPECTED_DATA",
  IndustryExceptionLifeSupportNotificationFailedToSend = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_NOTIFICATION_FAILED_TO_SEND",
  IndustryExceptionLifeSupportNotificationInvalidContactMethod = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_NOTIFICATION_INVALID_CONTACT_METHOD",
  IndustryExceptionLifeSupportNotificationInvalidPhone = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_NOTIFICATION_INVALID_PHONE",
  IndustryExceptionLifeSupportNotificationMissingBusinessAcceptance = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_NOTIFICATION_MISSING_BUSINESS_ACCEPTANCE",
  IndustryExceptionLifeSupportNotificationReceivedFromNonRegistrationOwner = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_NOTIFICATION_RECEIVED_FROM_NON_REGISTRATION_OWNER",
  IndustryExceptionLifeSupportNotificationRejected = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_NOTIFICATION_REJECTED",
  IndustryExceptionLifeSupportNotificationUnknownContact = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_NOTIFICATION_UNKNOWN_CONTACT",
  IndustryExceptionLifeSupportRequestMissingBusinessAcceptance = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_REQUEST_MISSING_BUSINESS_ACCEPTANCE",
  IndustryExceptionLifeSupportRequestMissingLifeSupportNotification = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_REQUEST_MISSING_LIFE_SUPPORT_NOTIFICATION",
  IndustryExceptionLifeSupportRequestRejected = "INDUSTRY_EXCEPTION_LIFE_SUPPORT_REQUEST_REJECTED",
  IndustryExceptionMeterPointEnrolmentIncompleteCouldNotSendServiceOrder = "INDUSTRY_EXCEPTION_METER_POINT_ENROLMENT_INCOMPLETE_COULD_NOT_SEND_SERVICE_ORDER",
  IndustryExceptionNextScheduledReadDateTooFarInFuture = "INDUSTRY_EXCEPTION_NEXT_SCHEDULED_READ_DATE_TOO_FAR_IN_FUTURE",
  IndustryExceptionRelinkingOccurredDuringSdrSync = "INDUSTRY_EXCEPTION_RELINKING_OCCURRED_DURING_SDR_SYNC",
  IndustryExceptionSiteAccessDetailsNotificationMissingBusinessAcceptance = "INDUSTRY_EXCEPTION_SITE_ACCESS_DETAILS_NOTIFICATION_MISSING_BUSINESS_ACCEPTANCE",
  IndustryExceptionSiteAccessDetailsNotificationRejected = "INDUSTRY_EXCEPTION_SITE_ACCESS_DETAILS_NOTIFICATION_REJECTED",
  IndustryExceptionStandingDataPropertiesAddressFailedToUpdate = "INDUSTRY_EXCEPTION_STANDING_DATA_PROPERTIES_ADDRESS_FAILED_TO_UPDATE",
  IndustryExceptionUnableToEnrolMeterPointIncompleteCouldNotSendChangeRequest = "INDUSTRY_EXCEPTION_UNABLE_TO_ENROL_METER_POINT_INCOMPLETE_COULD_NOT_SEND_CHANGE_REQUEST",
  IndustryExceptionUnableToEnrolMeterPointInvalidNmiMeterStatus = "INDUSTRY_EXCEPTION_UNABLE_TO_ENROL_METER_POINT_INVALID_NMI_METER_STATUS",
  IndustryExceptionUnableToEnrolMeterPointNextScheduledReadDatePast = "INDUSTRY_EXCEPTION_UNABLE_TO_ENROL_METER_POINT_NEXT_SCHEDULED_READ_DATE_PAST",
  IndustryExceptionUnableToProcessRolr = "INDUSTRY_EXCEPTION_UNABLE_TO_PROCESS_ROLR",
  IndustryLifeSupportCancelDeregistrationFailed = "INDUSTRY_LIFE_SUPPORT_CANCEL_DEREGISTRATION_FAILED",
  IndustryLifeSupportManualBestEndeavourRequired = "INDUSTRY_LIFE_SUPPORT_MANUAL_BEST_ENDEAVOUR_REQUIRED",
  IndustryLifeSupportRegistrationFollowUpRequired = "INDUSTRY_LIFE_SUPPORT_REGISTRATION_FOLLOW_UP_REQUIRED",
  IndustryLifeSupportReviewAfterCancelledMoveOutForNextAccount = "INDUSTRY_LIFE_SUPPORT_REVIEW_AFTER_CANCELLED_MOVE_OUT_FOR_NEXT_ACCOUNT",
  IndustryLifeSupportReviewAttemptedCancelledMoveOutForNextAccount = "INDUSTRY_LIFE_SUPPORT_REVIEW_ATTEMPTED_CANCELLED_MOVE_OUT_FOR_NEXT_ACCOUNT",
  IndustryLifeSupportReviewDeregistration = "INDUSTRY_LIFE_SUPPORT_REVIEW_DEREGISTRATION",
  IndustryLifeSupportReviewPostDeregistration = "INDUSTRY_LIFE_SUPPORT_REVIEW_POST_DEREGISTRATION",
  IndustryLifeSupportReviewPostDeregistrationComms = "INDUSTRY_LIFE_SUPPORT_REVIEW_POST_DEREGISTRATION_COMMS",
  IndustryManualActionRequired = "INDUSTRY_MANUAL_ACTION_REQUIRED",
  IndustryManualCustomerDetailsNotificationRequired = "INDUSTRY_MANUAL_CUSTOMER_DETAILS_NOTIFICATION_REQUIRED",
  IndustryManualLifeSupportNotificationRequired = "INDUSTRY_MANUAL_LIFE_SUPPORT_NOTIFICATION_REQUIRED",
  IndustryMeterPointMissingCustomerClassification = "INDUSTRY_METER_POINT_MISSING_CUSTOMER_CLASSIFICATION",
  IndustryReadingsNotSent = "INDUSTRY_READINGS_NOT_SENT",
  IndustrySendLifeSupportDeRegistrationForm = "INDUSTRY_SEND_LIFE_SUPPORT_DE_REGISTRATION_FORM",
  IndustryUnableToCreateRecord = "INDUSTRY_UNABLE_TO_CREATE_RECORD",
  IndustryVicDroManualLifeSupportExtensionRequest = "INDUSTRY_VIC_DRO_MANUAL_LIFE_SUPPORT_EXTENSION_REQUEST",
  IndustryWarningMessageReceived = "INDUSTRY_WARNING_MESSAGE_RECEIVED",
  JpnCallForDunningCampaign = "JPN_CALL_FOR_DUNNING_CAMPAIGN",
  JpnConfirmationOfRelocation = "JPN_CONFIRMATION_OF_RELOCATION",
  JpnConfirmPaymentForDunningCampaign = "JPN_CONFIRM_PAYMENT_FOR_DUNNING_CAMPAIGN",
  JpnFinalReadingOutsideAgreement = "JPN_FINAL_READING_OUTSIDE_AGREEMENT",
  JpnReadingsNotReceived = "JPN_READINGS_NOT_RECEIVED",
  JpnShortTermMoveInRejection = "JPN_SHORT_TERM_MOVE_IN_REJECTION",
  JpnSupplyDetailsUpdateConfirmation = "JPN_SUPPLY_DETAILS_UPDATE_CONFIRMATION",
  JpnSupplyPointFailsCanSupplyCheck = "JPN_SUPPLY_POINT_FAILS_CAN_SUPPLY_CHECK",
  Kmt = "KMT",
  MailFailed = "MAIL_FAILED",
  MailReturned = "MAIL_RETURNED",
  MandatoryCommsNotDelivered = "MANDATORY_COMMS_NOT_DELIVERED",
  MarketSupplyExceptionAgreementFailedToCreate = "MARKET_SUPPLY_EXCEPTION_AGREEMENT_FAILED_TO_CREATE",
  MarketSupplyExceptionAgreementFailedToReverseTermination = "MARKET_SUPPLY_EXCEPTION_AGREEMENT_FAILED_TO_REVERSE_TERMINATION",
  MarketSupplyExceptionAgreementFailedToTerminate = "MARKET_SUPPLY_EXCEPTION_AGREEMENT_FAILED_TO_TERMINATE",
  MarketSupplyExceptionAgreementFailedToUpdate = "MARKET_SUPPLY_EXCEPTION_AGREEMENT_FAILED_TO_UPDATE",
  MarketSupplyExceptionMissingAccountQuotedProduct = "MARKET_SUPPLY_EXCEPTION_MISSING_ACCOUNT_QUOTED_PRODUCT",
  MeterExchangeOneWayNotification = "METER_EXCHANGE_ONE_WAY_NOTIFICATION",
  MeterFaultAndIssueOneWayNotificationAccepted = "METER_FAULT_AND_ISSUE_ONE_WAY_NOTIFICATION_ACCEPTED",
  MeterFaultAndIssueOneWayNotificationRejected = "METER_FAULT_AND_ISSUE_ONE_WAY_NOTIFICATION_REJECTED",
  MoveIn = "MOVE_IN",
  MoveInCesLifeSupportRequired = "MOVE_IN_CES_LIFE_SUPPORT_REQUIRED",
  MoveInCommsNotDelivered = "MOVE_IN_COMMS_NOT_DELIVERED",
  MoveInDefaultPaymentScheduleFailed = "MOVE_IN_DEFAULT_PAYMENT_SCHEDULE_FAILED",
  MoveInMoveOutManualProcess = "MOVE_IN_MOVE_OUT_MANUAL_PROCESS",
  MoveOut = "MOVE_OUT",
  NetworkTariffOneWayNotification = "NETWORK_TARIFF_ONE_WAY_NOTIFICATION",
  NewPsrAddedToPrepayAccount = "NEW_PSR_ADDED_TO_PREPAY_ACCOUNT",
  NonEnergyPaymentCallReminder = "NON_ENERGY_PAYMENT_CALL_REMINDER",
  NoticeOfMeteringWorksOneWayNotification = "NOTICE_OF_METERING_WORKS_ONE_WAY_NOTIFICATION",
  NzSolarMeterChange = "NZ_SOLAR_METER_CHANGE",
  ObsoleteBillingAmendedStandingDataRegisterChanged = "OBSOLETE_BILLING_AMENDED_STANDING_DATA_REGISTER_CHANGED",
  ObsoleteBillingAmendedStandingDataRegisterDeleted = "OBSOLETE_BILLING_AMENDED_STANDING_DATA_REGISTER_DELETED",
  PaymentsFailedRepayment = "PAYMENTS_FAILED_REPAYMENT",
  PaymentInstructionFailed = "PAYMENT_INSTRUCTION_FAILED",
  PaymentPlan = "PAYMENT_PLAN",
  PaymentPlanHardshipCompletion = "PAYMENT_PLAN_HARDSHIP_COMPLETION",
  PaymentPlanHardshipCompletionWorkflowCancelled = "PAYMENT_PLAN_HARDSHIP_COMPLETION_WORKFLOW_CANCELLED",
  PaymentPlanMissedInstalment = "PAYMENT_PLAN_MISSED_INSTALMENT",
  PlannedInterruption = "PLANNED_INTERRUPTION",
  PlannedInterruptionMedicalDependency = "PLANNED_INTERRUPTION_MEDICAL_DEPENDENCY",
  PlannedInterruptionNotificationSentToLifeSupportCustomer = "PLANNED_INTERRUPTION_NOTIFICATION_SENT_TO_LIFE_SUPPORT_CUSTOMER",
  PlannedInterruptionOneWayNotification = "PLANNED_INTERRUPTION_ONE_WAY_NOTIFICATION",
  PlannedInterruptionOneWayNotificationRejected = "PLANNED_INTERRUPTION_ONE_WAY_NOTIFICATION_REJECTED",
  PostHardshipCancellation = "POST_HARDSHIP_CANCELLATION",
  PropertyAddressNeedsUpdate = "PROPERTY_ADDRESS_NEEDS_UPDATE",
  PsrImportCouldNotIdentifyAccountUser = "PSR_IMPORT_COULD_NOT_IDENTIFY_ACCOUNT_USER",
  SaConcessionStatementClosed = "SA_CONCESSION_STATEMENT_CLOSED",
  ScheduledBillingAddressUpdate = "SCHEDULED_BILLING_ADDRESS_UPDATE",
  ScheduledOccupierPackSend = "SCHEDULED_OCCUPIER_PACK_SEND",
  ServiceOrderAcknowledgementOverdue = "SERVICE_ORDER_ACKNOWLEDGEMENT_OVERDUE",
  ServiceOrderCancellationFailed = "SERVICE_ORDER_CANCELLATION_FAILED",
  ServiceOrderCancellationRequestRejected = "SERVICE_ORDER_CANCELLATION_REQUEST_REJECTED",
  ServiceOrderFailed = "SERVICE_ORDER_FAILED",
  ServiceOrderInitialResponseOverdue = "SERVICE_ORDER_INITIAL_RESPONSE_OVERDUE",
  ServiceOrderNotCompleted = "SERVICE_ORDER_NOT_COMPLETED",
  ServiceOrderOtherJobEnquiryCode = "SERVICE_ORDER_OTHER_JOB_ENQUIRY_CODE",
  ServiceOrderPartiallyCompleted = "SERVICE_ORDER_PARTIALLY_COMPLETED",
  ServiceOrderRequestRejected = "SERVICE_ORDER_REQUEST_REJECTED",
  ServiceOrderUnableToCharge = "SERVICE_ORDER_UNABLE_TO_CHARGE",
  ServiceOrderUnsolicitedReceived = "SERVICE_ORDER_UNSOLICITED_RECEIVED",
  ServiceOrderUnsolicitedReceivedDeenergisedMeterPoint = "SERVICE_ORDER_UNSOLICITED_RECEIVED_DEENERGISED_METER_POINT",
  SmartflexDeviceIntegrationPostponed = "SMARTFLEX_DEVICE_INTEGRATION_POSTPONED",
  SmartChangeOfTenancyInProgress = "SMART_CHANGE_OF_TENANCY_IN_PROGRESS",
  SmartChangeOfTenancyRequestFailed = "SMART_CHANGE_OF_TENANCY_REQUEST_FAILED",
  SmartMeterModeChangeUnsupported = "SMART_METER_MODE_CHANGE_UNSUPPORTED",
  SmartPrepayAddDebtFailure = "SMART_PREPAY_ADD_DEBT_FAILURE",
  SmartPrepayNeedToAdjustDebt = "SMART_PREPAY_NEED_TO_ADJUST_DEBT",
  SmartPrepayTopUpFailure = "SMART_PREPAY_TOP_UP_FAILURE",
  SmartPrepayTopUpMultipleActiveProcesses = "SMART_PREPAY_TOP_UP_MULTIPLE_ACTIVE_PROCESSES",
  SmartPrepayTopUpUtrn = "SMART_PREPAY_TOP_UP_UTRN",
  Smets2DataRequestFollowup = "SMETS2_DATA_REQUEST_FOLLOWUP",
  Smets2HealthCheck = "SMETS2_HEALTH_CHECK",
  Smets2IhdHealthCheck = "SMETS2_IHD_HEALTH_CHECK",
  SolarExportCreditsExcess = "SOLAR_EXPORT_CREDITS_EXCESS",
  SolrFinalBillReminder = "SOLR_FINAL_BILL_REMINDER",
  SpecialReadCancellationFailed = "SPECIAL_READ_CANCELLATION_FAILED",
  SpecialReadFailed = "SPECIAL_READ_FAILED",
  SpecialReadOutstanding = "SPECIAL_READ_OUTSTANDING",
  SpecialReadWithEstimateReadReceived = "SPECIAL_READ_WITH_ESTIMATE_READ_RECEIVED",
  UnsupportedFeature = "UNSUPPORTED_FEATURE",
  UnsupportedPaymentDay = "UNSUPPORTED_PAYMENT_DAY",
  WaterAccountReversion = "WATER_ACCOUNT_REVERSION",
  WaterMeterReadingIssue = "WATER_METER_READING_ISSUE",
  WithdrawalReceived = "WITHDRAWAL_RECEIVED",
  WorkflowCancellationFailed = "WORKFLOW_CANCELLATION_FAILED",
  WorkflowStepErrored = "WORKFLOW_STEP_ERRORED",
  WorkflowStepFailed = "WORKFLOW_STEP_FAILED",
}

/** An enumeration. */
export enum AccountRepaymentStatusOptions {
  /** The repayment has been approved but not made yet. */
  Approved = "APPROVED",
  /** The repayment failed permanently. This could be because of technical issues, or if the merchant rejects the payment for some reason. The payment will need to be retried by ops. */
  Failed = "FAILED",
  /** Payments made in a previous system and then imported into Kraken. */
  Historic = "HISTORIC",
  /** The repayment has been made to the merchant to be sent to the customer. This is a terminal state, we don't get any further confirmation. */
  Paid = "PAID",
  /** The request for a repayment has been received but not actioned yet. */
  Requested = "REQUESTED",
  /** The payment has been submitted to the merchant. It is still possible for this repayment to fail. */
  Submitted = "SUBMITTED",
  /** Third Party payments are those recorded for financial purposes in a different system but should be added to statements. */
  ThirdParty = "THIRD_PARTY",
}

export type AccountSearchInputType = {
  /** Internal account id (not account number). */
  readonly account: InputMaybe<Scalars["String"]["input"]>;
  /** The account number eg. A-FF15AE70. */
  readonly accountNumber: InputMaybe<Scalars["String"]["input"]>;
  /** Account Reference. */
  readonly accountReferences: InputMaybe<Scalars["String"]["input"]>;
  /** Account or Billing name. */
  readonly billingName: InputMaybe<Scalars["String"]["input"]>;
  /** Business name. */
  readonly businessName: InputMaybe<Scalars["String"]["input"]>;
  /** Business identifier or number. */
  readonly businessNumber: InputMaybe<Scalars["String"]["input"]>;
  /** Location (Supply or Billing, full or partial, address or post code). */
  readonly location: InputMaybe<Scalars["String"]["input"]>;
  /** Meter Serial Number. */
  readonly meterSerialNumber: InputMaybe<Scalars["String"]["input"]>;
  /** MPAN of property. */
  readonly mpan: InputMaybe<Scalars["String"]["input"]>;
  /** MPRN of property. */
  readonly mprn: InputMaybe<Scalars["String"]["input"]>;
  /** The portfolio number eg. P-A123B456. */
  readonly portfolioNumber: InputMaybe<Scalars["String"]["input"]>;
  /** Statements. */
  readonly statements: InputMaybe<Scalars["String"]["input"]>;
  /** Telephone. */
  readonly telephoneNumber: InputMaybe<Scalars["String"]["input"]>;
  /** URN Number. */
  readonly urn: InputMaybe<Scalars["String"]["input"]>;
  /** The Account User ID (not account number). */
  readonly user: InputMaybe<Scalars["String"]["input"]>;
};

/** An enumeration. */
export enum AccountStatementStatus {
  Closed = "CLOSED",
  Open = "OPEN",
}

export enum AccountStatus {
  /** Supply could have started, be ongoing or ended. */
  Active = "ACTIVE",
  /** Dormant. Users should not be able to log into dormant accounts. */
  Dormant = "DORMANT",
  /** An error occurred when we tried to enroll a meter point. This may be deprecated in future in favour of exposing this through enrollment property of a meter point. */
  EnrolmentError = "ENROLMENT_ERROR",
  /** Meter point enrollment was rejected. This may be deprecated in future in favour of exposing this through enrollment property of a meter point. */
  EnrolmentRejected = "ENROLMENT_REJECTED",
  /** Account requires processes to be completed before supply can be set up */
  Incomplete = "INCOMPLETE",
  /** A pending account is one that has been created but no registrations have started. */
  Pending = "PENDING",
  /** Void. Account created in error. */
  Void = "VOID",
  /** Withdrawn before supply started */
  Withdrawn = "WITHDRAWN",
}

/** An enumeration. */
export enum AccountStatusChoices {
  /** Supply could have started, be ongoing or ended. */
  Active = "ACTIVE",
  /** Dormant. Users should not be able to log into dormant accounts. */
  Dormant = "DORMANT",
  /** An error occurred when we tried to enroll a meter point. This may be deprecated in future in favour of exposing this through enrollment property of a meter point. */
  EnrolmentError = "ENROLMENT_ERROR",
  /** Meter point enrollment was rejected. This may be deprecated in future in favour of exposing this through enrollment property of a meter point. */
  EnrolmentRejected = "ENROLMENT_REJECTED",
  /** Account requires processes to be completed before supply can be set up */
  Incomplete = "INCOMPLETE",
  /** A pending account is one that has been created but no registrations have started. */
  Pending = "PENDING",
  /** Withdrawn before supply started */
  Withdrawn = "WITHDRAWN",
}

/** An enumeration. */
export enum AccountTypeChoices {
  /** An account designed to supply/bill business premises. */
  Business = "BUSINESS",
  /** An account created when we supply a business premises but do not have details for the occupants. */
  BusinessOccupier = "BUSINESS_OCCUPIER",
  /** An account created when we supply a business premises and know there are definitely no occupants. */
  BusinessVacant = "BUSINESS_VACANT",
  /** An account designed to supply/bill domestic premises. */
  Domestic = "DOMESTIC",
  /** An account created when we supply domestic premises that are managed by a business, i.e., a B2B2C model. */
  Managed = "MANAGED",
  /** An account created when we supply a domestic premises but do not have details for the occupants. */
  Occupier = "OCCUPIER",
  /** An account which is responsible for all other accounts in the portfolio, i.e. pays the bills for them. */
  PortfolioLead = "PORTFOLIO_LEAD",
  /** An account created when we supply a domestic premises and know there are definitely no occupants. */
  Vacant = "VACANT",
}

export type AccountUserInput = {
  readonly creditScoreData: InputMaybe<CreditScoreData>;
  readonly creditScoreFetchedAt: InputMaybe<Scalars["DateTime"]["input"]>;
  readonly dateOfBirth: InputMaybe<Scalars["Date"]["input"]>;
  readonly email: Scalars["String"]["input"];
  readonly familyName: Scalars["String"]["input"];
  readonly givenName: Scalars["String"]["input"];
  readonly mobile: Scalars["String"]["input"];
  readonly optedInForMarketing: Scalars["Boolean"]["input"];
  readonly psrData: InputMaybe<UpdateSpecialCircumstancesInput>;
  /** Role codes of the roles to be assigned to the user. */
  readonly roles: InputMaybe<
    ReadonlyArray<InputMaybe<Scalars["String"]["input"]>>
  >;
};

/** An enumeration. */
export enum AccountUserRoleEnum {
  Admin = "ADMIN",
  Carer = "CARER",
  LoyaltyPointUser = "LOYALTY_POINT_USER",
  Traced = "TRACED",
}

/** An enumeration. */
export enum AchievedCarbonIndexChoices {
  High = "HIGH",
  Low = "LOW",
  Moderate = "MODERATE",
  VeryHigh = "VERY_HIGH",
  VeryLow = "VERY_LOW",
}

export type AddCampaignToAccountInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The slug of the campaign we want to assign. */
  readonly campaign: Scalars["String"]["input"];
};

/** The input type for adding an EV Public Charging token. */
export type AddEvPublicChargingTokenInput = {
  /** Identifier of an account in the external system. */
  readonly externalAccountId: Scalars["String"]["input"];
  /** Token identifier. */
  readonly tokenValue: Scalars["String"]["input"];
  /** The start time of token's validity. */
  readonly validFrom: Scalars["DateTime"]["input"];
};

export type AddressDetailsInput = {
  /** First address line. */
  readonly addressLine1: Scalars["String"]["input"];
  /** Second address line. */
  readonly addressLine2: Scalars["String"]["input"];
  /** Third address line. */
  readonly addressLine3: InputMaybe<Scalars["String"]["input"]>;
  /** Fourth address line. */
  readonly addressLine4: InputMaybe<Scalars["String"]["input"]>;
  /** Fifth address line. */
  readonly addressLine5: InputMaybe<Scalars["String"]["input"]>;
  /** Postcode. */
  readonly postcode: Scalars["String"]["input"];
  /** Unique Property Reference Number. */
  readonly uprn: InputMaybe<Scalars["String"]["input"]>;
};

export type AddressInput = {
  readonly addressLine1: InputMaybe<Scalars["String"]["input"]>;
  readonly addressLine2: InputMaybe<Scalars["String"]["input"]>;
  readonly addressLine3: InputMaybe<Scalars["String"]["input"]>;
  readonly addressLine4: InputMaybe<Scalars["String"]["input"]>;
  readonly addressLine5: InputMaybe<Scalars["String"]["input"]>;
  /** Postcode of the property where the appointment took place. */
  readonly postcode: Scalars["String"]["input"];
};

export type AddressSearchType = {
  readonly addressLine1: Scalars["String"]["input"];
  readonly addressLine2: Scalars["String"]["input"];
  readonly addressLine3: Scalars["String"]["input"];
  readonly county: Scalars["String"]["input"];
  readonly postcode: Scalars["String"]["input"];
  readonly town: Scalars["String"]["input"];
};

/** An enumeration. */
export enum AddressTypeEnum {
  Business = "BUSINESS",
  Domestic = "DOMESTIC",
  Unknown = "UNKNOWN",
}

/** An enumeration. */
export enum AgentContractStatusType {
  /** The contracts that have been accepted by the agent. */
  Accepted = "ACCEPTED",
  /** The contracts that have been rejected by the agent. */
  Rejected = "REJECTED",
  /** The contracts that have been requested by the supplier. */
  Requested = "REQUESTED",
  /** The contracts that have been terminated. */
  Terminated = "TERMINATED",
  /** The contracts for which termination has been requested by the supplier. */
  TerminationRequested = "TERMINATION_REQUESTED",
}

export type AgreementRenewalProductInput = {
  /** The Kraken ID of the agreement to be renewed. The agreement must be currently active. */
  readonly agreementId: Scalars["ID"]["input"];
  /** The code of the product the agreement will be renewed to. */
  readonly productCode: Scalars["String"]["input"];
};

export enum Alignment {
  Center = "CENTER",
  End = "END",
  Start = "START",
}

/**
 *
 *     Combined list of subcategories for both consumption and standing charges
 *
 */
export enum AllBandSubCategories {
  Eco7Day = "ECO7_DAY",
  Eco7Night = "ECO7_NIGHT",
  Economy7 = "ECONOMY7",
  Standard = "STANDARD",
  ThreeRate = "THREE_RATE",
  ThreeRateOffPeak = "THREE_RATE_OFF_PEAK",
  ThreeRatePeak = "THREE_RATE_PEAK",
  ThreeRateShoulder = "THREE_RATE_SHOULDER",
}

export type AmendPaymentInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The new amount for the amended payment. */
  readonly amount: Scalars["Int"]["input"];
  /** The new date to collect the payment. */
  readonly paymentDate: Scalars["Date"]["input"];
  /** The ID of the payment to amend. */
  readonly paymentId: Scalars["Int"]["input"];
  /** Reason for amending the payment. */
  readonly reason: InputMaybe<Scalars["String"]["input"]>;
};

export type AmendUnbilledReadingInput = {
  /** The new datetime of reading. */
  readonly readingDatetime: Scalars["DateTime"]["input"];
  /** The ID of the reading that will be amended. */
  readonly readingId: Scalars["Int"]["input"];
  /** The new value of reading. */
  readonly readingValue: Scalars["Int"]["input"];
};

/** An enumeration. */
export enum AppSessionOutcome {
  /** Busy */
  Busy = "BUSY",
  /** Callback */
  Callback = "CALLBACK",
  /** Callback - courtesy call */
  CallbackCourtesyCall = "CALLBACK_COURTESY_CALL",
  /** Callback - pitched */
  CallbackPitched = "CALLBACK_PITCHED",
  /** Consumer app download */
  ConsumerAppDownload = "CONSUMER_APP_DOWNLOAD",
  /** COS */
  Cos = "COS",
  /** COT no proof */
  CotNoProof = "COT_NO_PROOF",
  /** COT proven */
  CotProven = "COT_PROVEN",
  /** Deceased */
  Deceased = "DECEASED",
  /** Demolished */
  Demolished = "DEMOLISHED",
  /** Don’t call again */
  DontCallAgain = "DONT_CALL_AGAIN",
  /** EBSS voucher check in */
  EbssVoucherCheckIn = "EBSS_VOUCHER_CHECK_IN",
  /** Electric juice not interested */
  ElectricJuiceNotInterested = "ELECTRIC_JUICE_NOT_INTERESTED",
  /** Electric juice switch */
  ElectricJuiceSwitch = "ELECTRIC_JUICE_SWITCH",
  /** Electric juice lite switch */
  ElectricJuiceSwitchLite = "ELECTRIC_JUICE_SWITCH_LITE",
  /** Empty */
  Empty = "EMPTY",
  /** Energy help visit - completed */
  EnergyHelpVisitCompleted = "ENERGY_HELP_VISIT_COMPLETED",
  /** Energy help visit - leaflet left */
  EnergyHelpVisitLeaflet = "ENERGY_HELP_VISIT_LEAFLET",
  /** Exhausted - contact */
  ExhaustedContact = "EXHAUSTED_CONTACT",
  /** Exhausted - no contact */
  ExhaustedNoContact = "EXHAUSTED_NO_CONTACT",
  /** Already an existing customer */
  ExistingCustomer = "EXISTING_CUSTOMER",
  /** Insolvency */
  Insolvency = "INSOLVENCY",
  /** Lead generation */
  LeadGeneration = "LEAD_GENERATION",
  /** Business lead generation */
  LeadGenerationBusiness = "LEAD_GENERATION_BUSINESS",
  /** Electric juice switch & lead generation */
  LeadGenerationEj = "LEAD_GENERATION_EJ",
  /** Electric juice lite switch & lead generation */
  LeadGenerationEjLite = "LEAD_GENERATION_EJ_LITE",
  /** Electric vehicle lead generation */
  LeadGenerationEv = "LEAD_GENERATION_EV",
  /** Heat pump lead generation */
  LeadGenerationHeatPump = "LEAD_GENERATION_HEAT_PUMP",
  /** Solar lead generation */
  LeadGenerationSolar = "LEAD_GENERATION_SOLAR",
  /** Meter reading */
  MeterReading = "METER_READING",
  /** Meter reading - no answer */
  MeterReadingNoAnswer = "METER_READING_NO_ANSWER",
  /** Meter reading - unable to take reading */
  MeterReadingUnableToTakeReading = "METER_READING_UNABLE_TO_TAKE_READING",
  /** Multiple properties owned */
  MultipleProperties = "MULTIPLE_PROPERTIES",
  /** Not bill payer */
  NotBillPayer = "NOT_BILL_PAYER",
  /** Not decision maker */
  NotDecisionMaker = "NOT_DECISION_MAKER",
  /** No answer */
  NoAnswer = "NO_ANSWER",
  /** No cold calling */
  NoColdCalling = "NO_COLD_CALLING",
  /** No fixed address */
  NoFixedAddress = "NO_FIXED_ADDRESS",
  /** No pitch */
  NoPitch = "NO_PITCH",
  /** No pitch - not interested */
  NoPitchNotInterested = "NO_PITCH_NOT_INTERESTED",
  /** No pitch - no d2d */
  NoPitchNoD2D = "NO_PITCH_NO_D2D",
  /** No pitch - switched recently */
  NoPitchSwitchedRecently = "NO_PITCH_SWITCHED_RECENTLY",
  /** No pitch - TPI/third party */
  NoPitchTpiThirdParty = "NO_PITCH_TPI_THIRD_PARTY",
  /** No pitch - vulnerable */
  NoPitchVulnerable = "NO_PITCH_VULNERABLE",
  /** Occupier - not bill payer */
  OccupierNotBillPayer = "OCCUPIER_NOT_BILL_PAYER",
  /** Occupier - no answer */
  OccupierNoAnswer = "OCCUPIER_NO_ANSWER",
  /** Occupier - refused to discuss */
  OccupierRefusedToDiscuss = "OCCUPIER_REFUSED_TO_DISCUSS",
  /** Occupier - suspected empty property */
  OccupierSuspectedEmptyProperty = "OCCUPIER_SUSPECTED_EMPTY_PROPERTY",
  /** Occupy account */
  OccupyAccount = "OCCUPY_ACCOUNT",
  /** Paid in full */
  PaidInFull = "PAID_IN_FULL",
  /** Paid partial */
  PaidPartial = "PAID_PARTIAL",
  /** Paid reduced settlement */
  PaidReducedSettlement = "PAID_REDUCED_SETTLEMENT",
  /** Payment plan */
  PaymentPlan = "PAYMENT_PLAN",
  /** Pitch - no quote */
  PitchNoQuote = "PITCH_NO_QUOTE",
  /** Pitch no quote - advanced payment */
  PitchNoQuoteAdvancedPayment = "PITCH_NO_QUOTE_ADVANCED_PAYMENT",
  /** Pitch no quote - in contract */
  PitchNoQuoteInContract = "PITCH_NO_QUOTE_IN_CONTRACT",
  /** Pitch no quote - not interested */
  PitchNoQuoteNotInterested = "PITCH_NO_QUOTE_NOT_INTERESTED",
  /** Pitch no quote - no email */
  PitchNoQuoteNoEmail = "PITCH_NO_QUOTE_NO_EMAIL",
  /** Pitch no quote - price */
  PitchNoQuotePrice = "PITCH_NO_QUOTE_PRICE",
  /** Pitch no quote - switched recently */
  PitchNoQuoteSwitchedRecently = "PITCH_NO_QUOTE_SWITCHED_RECENTLY",
  /** PPM requested */
  PpmRequested = "PPM_REQUESTED",
  /** Prepayment meter */
  PrepaymentMeter = "PREPAYMENT_METER",
  /** Prison */
  Prison = "PRISON",
  /** Property ineligible */
  PropertyIneligible = "PROPERTY_INELIGIBLE",
  /** PSR registered */
  PsrRegistered = "PSR_REGISTERED",
  /** Query */
  Query = "QUERY",
  /** Quoted - callback */
  QuotedCallback = "QUOTED_CALLBACK",
  /** Quoted - no sale */
  QuotedNoSale = "QUOTED_NO_SALE",
  /** Quoted - no sale advanced payment */
  QuotedNoSaleAdvancedPayment = "QUOTED_NO_SALE_ADVANCED_PAYMENT",
  /** Quoted - no sale objected to autopay */
  QuotedNoSaleAutopay = "QUOTED_NO_SALE_AUTOPAY",
  /** Quoted - no sale credit check issue */
  QuotedNoSaleCreditCheckIssue = "QUOTED_NO_SALE_CREDIT_CHECK_ISSUE",
  /** Quoted - no sale objected to deposit */
  QuotedNoSaleDeposit = "QUOTED_NO_SALE_DEPOSIT",
  /** Quoted - no sale exit fees */
  QuotedNoSaleExitFees = "QUOTED_NO_SALE_EXIT_FEES",
  /** Quoted - no sale issue bank details */
  QuotedNoSaleIssueBankDetails = "QUOTED_NO_SALE_ISSUE_BANK_DETAILS",
  /** Quoted - no sale monthly dd */
  QuotedNoSaleMonthlyDd = "QUOTED_NO_SALE_MONTHLY_DD",
  /** Quoted - no sale no email */
  QuotedNoSaleNoEmail = "QUOTED_NO_SALE_NO_EMAIL",
  /** Quoted - no sale other */
  QuotedNoSaleOther = "QUOTED_NO_SALE_OTHER",
  /** Quoted - no sale paper bills */
  QuotedNoSalePaperBills = "QUOTED_NO_SALE_PAPER_BILLS",
  /** Quoted - no sale prepay too high */
  QuotedNoSalePrepay = "QUOTED_NO_SALE_PREPAY",
  /** Quoted - no sale price */
  QuotedNoSalePrice = "QUOTED_NO_SALE_PRICE",
  /** Quoted - no sale - quote emailed */
  QuotedNoSaleQuoteEmailed = "QUOTED_NO_SALE_QUOTE_EMAILED",
  /** Quoted - no sale standing charge */
  QuotedNoSaleStandingCharge = "QUOTED_NO_SALE_STANDING_CHARGE",
  /** Quoted - no sale unsure of current contract */
  QuotedNoSaleUnsureOfCurrentContract = "QUOTED_NO_SALE_UNSURE_OF_CURRENT_CONTRACT",
  /** Quoted - no sale waiver wanted */
  QuotedNoSaleWaiverWanted = "QUOTED_NO_SALE_WAIVER_WANTED",
  /** Quoted - no switch */
  QuotedNoSwitch = "QUOTED_NO_SWITCH",
  /** Sheltered housing */
  ShelteredHousing = "SHELTERED_HOUSING",
  /** Smart meter registered */
  SmartMeterRegistered = "SMART_METER_REGISTERED",
  /** Switched */
  Switched = "SWITCHED",
  /** Switched Business */
  SwitchedBusiness = "SWITCHED_BUSINESS",
  /** Switched (Callback) */
  SwitchedCallback = "SWITCHED_CALLBACK",
  /** Switched (Credit Check Waiver) */
  SwitchedCreditCheckWaiver = "SWITCHED_CREDIT_CHECK_WAIVER",
  /** Switched (First Contact) */
  SwitchedFirstContact = "SWITCHED_FIRST_CONTACT",
  /** The customer was transferred to another team/agent */
  Transferred = "TRANSFERRED",
  /** Unable to locate */
  UnableToLocate = "UNABLE_TO_LOCATE",
  /** Unable to trace */
  UnableToTrace = "UNABLE_TO_TRACE",
  /** Vulnerability project */
  VulnerabilityProject = "VULNERABILITY_PROJECT",
  /** Vulnerable */
  Vulnerable = "VULNERABLE",
  /** Withdrawn */
  Withdrawn = "WITHDRAWN",
  /** Wrong address selected */
  WrongAddressSelected = "WRONG_ADDRESS_SELECTED",
}

/** An enumeration. */
export enum AppointmentStatus {
  /** The appointment was aborted. Choose this option for partially completed work (e.g. on a dual fuel meter exchange where one meter was exchanged successfully but the other exchange could not be completed. */
  Aborted = "ABORTED",
  /** The appointment has been booked. */
  Booked = "BOOKED",
  /** The appointment was cancelled either by the customer or the agent. */
  Cancelled = "CANCELLED",
  /** The appointment has been completed successfully. */
  Completed = "COMPLETED",
}

export type ApproveRepaymentInput = {
  /** The account number for the requested repayment. */
  readonly accountNumber: Scalars["ID"]["input"];
  /** The id of the account repayment to be approved. */
  readonly repaymentId: Scalars["ID"]["input"];
};

export type AssignInkBucketInput = {
  /** The name of the bucket to assign the conversation to. */
  readonly bucketName: Scalars["String"]["input"];
  readonly clientMutationId: InputMaybe<Scalars["String"]["input"]>;
  /** The relay id of the conversation that will be assigned to the bucket. */
  readonly conversationRelayId: Scalars["ID"]["input"];
};

export type AuthenticationInput = {
  /** SSO access token for the chosen provider authentication. */
  readonly accessToken: InputMaybe<Scalars["String"]["input"]>;
  /** Provider code from user login used for SSO. */
  readonly authorizationCode: InputMaybe<Scalars["String"]["input"]>;
  /** SSO token expiry for the provider's authentication (integer in seconds). */
  readonly expiresIn: InputMaybe<Scalars["Int"]["input"]>;
  /** ID of the device in the external provider system. */
  readonly providerDeviceId: InputMaybe<Scalars["String"]["input"]>;
  /** Full redirect URI (including all query string parameters) from the result of an OAuth 2.0 flow. */
  readonly redirectUri: InputMaybe<Scalars["String"]["input"]>;
  /** SSO refresh token for the chosen provider authentication. */
  readonly refreshToken: InputMaybe<Scalars["String"]["input"]>;
  /** State from user login used for SSO. */
  readonly state: InputMaybe<Scalars["String"]["input"]>;
};

/** Input for a backend action. */
export type BackendScreenEventInput = {
  /** The ID of the action to perform. */
  readonly eventId: Scalars["ID"]["input"];
  /** List of key-value pairs (strings) to pass as parameters to the mutation. */
  readonly params: InputMaybe<
    ReadonlyArray<InputMaybe<BackendScreenParamInputType>>
  >;
};

/** A key-value pair (both Strings) which is passed in parameters to a backend action. */
export type BackendScreenParamInputType = {
  readonly key: Scalars["String"]["input"];
  readonly value: Scalars["String"]["input"];
};

export type BankDetailsInput = {
  readonly accountHolder: InputMaybe<Scalars["String"]["input"]>;
  readonly accountNumber: InputMaybe<Scalars["String"]["input"]>;
  readonly accountType: InputMaybe<Scalars["String"]["input"]>;
  readonly bankCode: InputMaybe<Scalars["String"]["input"]>;
  readonly branchCode: InputMaybe<Scalars["String"]["input"]>;
  readonly iban: InputMaybe<Scalars["String"]["input"]>;
};

export type BatteryChargingPreferencesInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The minimum state of charge (soc) %. */
  readonly minimumSocPercentage: Scalars["Int"]["input"];
};

/** An enumeration. */
export enum BatteryCouplingType {
  Ac = "AC",
  Dc = "DC",
}

export type BespokeElectricityUnitRatesInput = {
  /** Rate type associated with the given unit rate. */
  readonly rateType: NonBespokeElectricityRateTypeChoices;
  /** Electricity bespoke unit rate to override the unit rate associated with the tariff. */
  readonly unitRate: Scalars["Decimal"]["input"];
};

export type BespokePpsTariffRatesInput = {
  /** Payment method associated with the given unit rate. */
  readonly paymentMethod: PaymentMethod;
  /** Bespoke standing charge. */
  readonly standingCharge: InputMaybe<Scalars["Decimal"]["input"]>;
  /** Gas bespoke unit rate. */
  readonly unitRate: InputMaybe<Scalars["Decimal"]["input"]>;
  /** Electricity bespoke unit rates with their associated rate type. */
  readonly unitRates: InputMaybe<
    ReadonlyArray<InputMaybe<BespokeElectricityUnitRatesInput>>
  >;
};

export type BespokeTariffRatesInput = {
  /** Bespoke standing charge. */
  readonly standingCharge: InputMaybe<Scalars["Decimal"]["input"]>;
  /** Gas bespoke unit rate. */
  readonly unitRate: InputMaybe<Scalars["Decimal"]["input"]>;
  /** Electricity bespoke unit rates with their associated rate type. */
  readonly unitRates: InputMaybe<
    ReadonlyArray<InputMaybe<BespokeElectricityUnitRatesInput>>
  >;
};

export type BillToLatestSmartMeterSnapshotInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The mpan number. */
  readonly mpan: Scalars["String"]["input"];
};

export enum BillTypeEnum {
  CreditNote = "CREDIT_NOTE",
  Invoice = "INVOICE",
  PreKraken = "PRE_KRAKEN",
  Statement = "STATEMENT",
}

export type BillingAddressDetailsInput = {
  /** Administrative area. */
  readonly administrativeArea: InputMaybe<Scalars["String"]["input"]>;
  /** Billing country. */
  readonly country: InputMaybe<Scalars["String"]["input"]>;
  /** Billing delivery point identifier. */
  readonly deliveryPointIdentifier: InputMaybe<Scalars["String"]["input"]>;
  /** Billing dependent locality. */
  readonly dependentLocality: InputMaybe<Scalars["String"]["input"]>;
  /** Billing locality. */
  readonly locality: InputMaybe<Scalars["String"]["input"]>;
  /** Billing postal code. */
  readonly postalCode: InputMaybe<Scalars["String"]["input"]>;
  /** Billing sorting code. */
  readonly sortingCode: InputMaybe<Scalars["String"]["input"]>;
  /** Billing street address. */
  readonly streetAddress: InputMaybe<Scalars["String"]["input"]>;
  /** Billing structured street address. */
  readonly structuredStreetAddress: InputMaybe<
    Scalars["GenericScalar"]["input"]
  >;
};

export enum BillsOrderBy {
  FromDateDesc = "FROM_DATE_DESC",
  IssuedDateDesc = "ISSUED_DATE_DESC",
}

/** An enumeration. */
export enum BrandChoices {
  /** Affect Energy */
  AffectEnergy = "AFFECT_ENERGY",
  /** Bulb */
  Bulb = "BULB",
  /** Coop Energy */
  CoopEnergy = "COOP_ENERGY",
  /** Ebico Living */
  EbicoLiving = "EBICO_LIVING",
  /** Harper */
  Harper = "HARPER",
  /** London Power */
  LondonPower = "LONDON_POWER",
  /** Octopus Energy */
  OctopusEnergy = "OCTOPUS_ENERGY",
}

/** An enumeration. */
export enum BroaderGroupRejectionReason {
  AlreadyReceivedDiscount = "ALREADY_RECEIVED_DISCOUNT",
  ApplicationsNotOpen = "APPLICATIONS_NOT_OPEN",
  BusinessAccount = "BUSINESS_ACCOUNT",
  Duplicate = "DUPLICATE",
  HasCoreGroupDiscount = "HAS_CORE_GROUP_DISCOUNT",
  HasOpenApplication = "HAS_OPEN_APPLICATION",
  InsufficientEvidenceProvided = "INSUFFICIENT_EVIDENCE_PROVIDED",
  NonDomesticMeterPoint = "NON_DOMESTIC_METER_POINT",
  NotInScotland = "NOT_IN_SCOTLAND",
  NoLongerOnSupply = "NO_LONGER_ON_SUPPLY",
}

/** An enumeration. */
export enum BusinessTypeOptions {
  /** A business account where the company type is charity. */
  Charity = "CHARITY",
  /** A business account for a church or other religious organisation. */
  Church = "CHURCH",
  /** A business account for a government institution. */
  Government = "GOVERNMENT",
  /** A business account where the company type is limited. */
  Limited = "LIMITED",
  /** A business account where the company type is limited liability partnership. */
  LimitedLiabilityPartnership = "LIMITED_LIABILITY_PARTNERSHIP",
  /** A business account for a non-profit organisation. */
  NonProfit = "NON_PROFIT",
  /** A business account where the company type is partnership. */
  Partnership = "PARTNERSHIP",
  /** A business account where the company type is proprietary limited. */
  ProprietaryLimitedCompany = "PROPRIETARY_LIMITED_COMPANY",
  /** A business account where the company type is public limited. */
  PublicLimitedCompany = "PUBLIC_LIMITED_COMPANY",
  /** A business account where the company type is sole trader. */
  SoleTrader = "SOLE_TRADER",
  /** A business account where the company has a trading name to carry out its business activities. */
  TradingAs = "TRADING_AS",
  /** A business account where the company type is a trust. */
  Trust = "TRUST",
}

export enum ButtonStyle {
  Primary = "PRIMARY",
  Secondary = "SECONDARY",
}

export enum ButtonVariance {
  Filled = "FILLED",
  Outlined = "OUTLINED",
  TextOnly = "TEXT_ONLY",
}

/**
 *
 *     How the CHF was installed and connected to the rest of the Smart Metering System.
 *
 */
export enum ChfConnectionMethod {
  /** Cradle. */
  Cradle = "CRADLE",
  /** Esme. */
  Esme = "ESME",
  /** Hot Shoe. */
  HotShoe = "HOT_SHOE",
}

/**
 *
 *     The user's description of the fault, if the meter was not installed due to a technical problem.
 *
 */
export enum ChfFaultReason {
  /** Fault with aerial. */
  AerialFault = "AERIAL_FAULT",
  /** Damaged Case. */
  DamagedCase = "DAMAGED_CASE",
  /** Damaged connector. */
  DamagedConnector = "DAMAGED_CONNECTOR",
  /** Environmental Conditions Exceeded. */
  EnvironmentalConditionsExceeded = "ENVIRONMENTAL_CONDITIONS_EXCEEDED",
  /** Illegal Interference Or Missing Seals. */
  IllegalInterferenceOrMissingSeals = "ILLEGAL_INTERFERENCE_OR_MISSING_SEALS",
  /** Fault with LED. */
  LedFault = "LED_FAULT",
  /** Manufacturing Defect. */
  ManufacturingDefect = "MANUFACTURING_DEFECT",
  /** Fault with SM HAN interface. */
  SmHanFault = "SM_HAN_FAULT",
  /** Fault with SM WAN. */
  SmWanFault = "SM_WAN_FAULT",
}

/**
 *
 *     Whether the fault was identified before or after the installation.
 *
 */
export enum ChfFaultReturnType {
  /** Post Installation. */
  PostInstallation = "POST_INSTALLATION",
  /** Prior To Installation. */
  PriorToInstallation = "PRIOR_TO_INSTALLATION",
}

/**
 *
 *     Whether it is a new or replacement CHF.
 *
 */
export enum ChfInstallType {
  /** New. */
  New = "NEW",
  /** Replacement. */
  Replacement = "REPLACEMENT",
}

/**
 *
 *     Location of the CHF.
 *
 */
export enum ChfLocation {
  /** In the basement/cellar. */
  BasementOrCellar = "BASEMENT_OR_CELLAR",
  /** Indoors, NOT on an external wall. */
  DeepIndoors = "DEEP_INDOORS",
  /** Indoors On External Wall. */
  IndoorsOnExternalWall = "INDOORS_ON_EXTERNAL_WALL",
  /** Outside of the premises. */
  Outside = "OUTSIDE",
}

/**
 *
 *     The reason for the meter not being installed if there was no technical issue.
 *
 */
export enum ChfNoFaultReturnType {
  /** Dual supplier HAN variant replacement. */
  DualSupplierHanVariantReplacement = "DUAL_SUPPLIER_HAN_VARIANT_REPLACEMENT",
  /** General. */
  General = "GENERAL",
  /** Lost or stolen hub. */
  LostOrStolenHub = "LOST_OR_STOLEN_HUB",
  /** Non-domestic opt-out. */
  NonDomesticOptOut = "NON_DOMESTIC_OPT_OUT",
  /** SM WAN variant replacement requested by DCC. */
  SmWanVariantReplacement = "SM_WAN_VARIANT_REPLACEMENT",
}

/** Input required to cancel a LeaveSupplier journey. */
export type CancelLeaveSupplierInput = {
  /** The ID of the LeaveSupplier process to cancel. */
  readonly leaveSupplierProcessId: Scalars["ID"]["input"];
  /** The reason for the cancellation. */
  readonly reason: InputMaybe<Scalars["String"]["input"]>;
};

export type CancelPaymentInput = {
  /** The account number. */
  readonly accountNumber: Scalars["ID"]["input"];
  /** The ID of the payment to cancel. */
  readonly paymentId: Scalars["ID"]["input"];
  /** Reason for cancelling the payment. */
  readonly reason: InputMaybe<Scalars["String"]["input"]>;
};

export type CancelRepaymentRequestInputType = {
  /** The id of the request to be cancelled. */
  readonly requestId: Scalars["String"]["input"];
};

export type CancelSiteworksAppointmentInput = {
  /** The siteworks appointment agent reference code. */
  readonly agentReference: InputMaybe<Scalars["String"]["input"]>;
  /** The siteworks appointment Kraken unique ID. */
  readonly appointmentId: InputMaybe<Scalars["ID"]["input"]>;
};

export type CancelSmartFlexOnboardingInput = {
  /** The ID of the SmartFlex onboarding wizard to cancel. */
  readonly wizardId: Scalars["ID"]["input"];
};

export enum CannotClaimReason {
  InsufficientPoints = "INSUFFICIENT_POINTS",
  MaxClaimsPerPeriodReached = "MAX_CLAIMS_PER_PERIOD_REACHED",
  OutOfStock = "OUT_OF_STOCK",
}

/** An enumeration. */
export enum Category {
  FileAttachmentDnoLetter = "FILE_ATTACHMENT_DNO_LETTER",
  FileAttachmentFlexiOrbCert = "FILE_ATTACHMENT_FLEXI_ORB_CERT",
  FileAttachmentMcsCert = "FILE_ATTACHMENT_MCS_CERT",
}

export type Certificate = {
  /** The export certificate number. */
  readonly number: Scalars["String"]["input"];
  /** The export certificate type. */
  readonly type: CertificateType;
};

/** The export certificate type. */
export enum CertificateType {
  FlexiOrb = "FLEXI_ORB",
  Mcs = "MCS",
}

/** The values used to create a carbon offset charge on the account. */
export type ChargeCarbonOffsetInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The amount the customer was quoted and is expecting to be charged in pence. Used to abort the charge if differs. */
  readonly expectedCost: Scalars["Int"]["input"];
  /** The number of hours to offset. */
  readonly hoursToOffset: Scalars["Int"]["input"];
  /** The transport mode for the journey offset calculation, e.g. CAR. */
  readonly transportModeCode: Scalars["String"]["input"];
  /** The transport sub code for the journey offset calculation e.g. PETROL. Only applies to some transport modes. */
  readonly transportModeSubCode: InputMaybe<Scalars["String"]["input"]>;
};

export type ChargePointInput = {
  /** The unique charge point id. */
  readonly chargePointId: InputMaybe<Scalars["ID"]["input"]>;
};

/** An enumeration. */
export enum ClientType {
  App = "APP",
  Web = "WEB",
}

export type ClimateControlStateInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The state that the climate control device should be set to. A value of true indicates that the device should be turned on, and a value of false indicates it should be switched off.  */
  readonly state: Scalars["Boolean"]["input"];
};

export type CollectDepositInput = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly depositKey: Scalars["String"]["input"];
  readonly idempotencyKey: Scalars["String"]["input"];
};

export enum CollectDepositStatusChoices {
  Approved = "APPROVED",
  Cancelled = "CANCELLED",
  Cleared = "CLEARED",
  Failed = "FAILED",
  HeldForReview = "HELD_FOR_REVIEW",
  None = "NONE",
  Pending = "PENDING",
  Requested = "REQUESTED",
  Scheduled = "SCHEDULED",
}

export type CollectPaymentInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The payment amount (in pence). */
  readonly amount: Scalars["Int"]["input"];
  /** The type of the payment instruction. */
  readonly collectionMethod: InputMaybe<PaymentType>;
  /** The reason a payment is being collected, for internal audit purposes */
  readonly description: Scalars["String"]["input"];
  readonly idempotencyKey: Scalars["String"]["input"];
  /** The ID of the ledger on which to collect the payment. */
  readonly ledgerId: Scalars["ID"]["input"];
  /** The date to attempt to take the payment. Cannot be a date in the past. Payment will be collected on the requested date or as soon as possible after that date. */
  readonly paymentDate: Scalars["Date"]["input"];
};

/** An enumeration. */
export enum CollectionCampaignType {
  B2BDisconnectionProcess = "B2B_DISCONNECTION_PROCESS",
  DebtCollectionAgency = "DEBT_COLLECTION_AGENCY",
  Deceased = "DECEASED",
  FinalB2B = "FINAL_B2B",
  FinalDebtCollection = "FINAL_DEBT_COLLECTION",
  FinalDebtCollection_2 = "FINAL_DEBT_COLLECTION_2",
  HighRisk = "HIGH_RISK",
  HomeVisit = "HOME_VISIT",
  Insolvent = "INSOLVENT",
  Litigation = "LITIGATION",
  LiveB2B = "LIVE_B2B",
  LowRisk = "LOW_RISK",
  MediumRisk = "MEDIUM_RISK",
  Occupier = "OCCUPIER",
  PersistentDebt = "PERSISTENT_DEBT",
  SwitchToSmartPayg = "SWITCH_TO_SMART_PAYG",
  ThirdParty = "THIRD_PARTY",
  Trace = "TRACE",
  TraceAndCollect = "TRACE_AND_COLLECT",
  VulnerabilityVisit = "VULNERABILITY_VISIT",
  VulnerableCustomer = "VULNERABLE_CUSTOMER",
}

export enum CollectionMethod {
  Card = "CARD",
  DirectDebit = "DIRECT_DEBIT",
}

export type CommissionInput = {
  /** The subdomain of the affiliate link used to track the commission. */
  readonly affiliateLinkSubdomain: InputMaybe<Scalars["String"]["input"]>;
  /** The fixed comission fee, in pence, which is paid to the third-party intermediary. */
  readonly fixedTpiFee: InputMaybe<Scalars["Int"]["input"]>;
  /** The third-party intermediary who sold this renewal to the customer. */
  readonly organizationName: Scalars["String"]["input"];
  /** The amount to add to the unit rate when billing, in pence/kWh, which is paid to the third-party intermediary. */
  readonly unitRateUplift: Scalars["Decimal"]["input"];
};

export type CommissionMeterInput = {
  /** Device ID of the CHF (Communications Hub Function). */
  readonly chfDeviceId: Scalars["String"]["input"];
  /** Code provided by manufacturer as part of ASN data, and included as part of device pre-notification, which is required to authorise device commissioning. */
  readonly installationCode: Scalars["String"]["input"];
  /** Device ID (ESME or GSME) of the device being commissioned. */
  readonly meterDeviceId: Scalars["String"]["input"];
  /** Type of meter being commissioned */
  readonly meterType: MeterTypeChoices;
  readonly mpxn: InputMaybe<Scalars["String"]["input"]>;
  /** Serial number for ESME or GSME devices. */
  readonly serialNumber: InputMaybe<Scalars["String"]["input"]>;
};

/** The method the account has specified they prefer we contact them */
export enum CommsDeliveryPreference {
  Email = "EMAIL",
  PostalMail = "POSTAL_MAIL",
}

/**
 *
 *     The type of comms hub status update request to be sent.
 *
 */
export enum CommsHubStatusUpdateType {
  /** Returning CHF due to technical fault. */
  FaultReturn = "FAULT_RETURN",
  /** Returning CHF for non-technical reason. */
  NoFaultReturn = "NO_FAULT_RETURN",
  /** No SM Wide Area Network. */
  NoSmWan = "NO_SM_WAN",
  /** Success. */
  Success = "SUCCESS",
}

export enum CommsStrategyType {
  SendAll = "SEND_ALL",
  SendOnlyJobCompleted = "SEND_ONLY_JOB_COMPLETED",
  SuppressAll = "SUPPRESS_ALL",
}

export type CompleteDeviceRegistrationInput = {
  /** Account number that the device is registered to. */
  readonly accountNumber: Scalars["String"]["input"];
  /** External reference in the third-party system to identify the device. */
  readonly externalDeviceIdentifier: Scalars["String"]["input"];
  /** Postcode of the property (linked to the account) that the device is registered to. */
  readonly postalCode: Scalars["String"]["input"];
};

export type ConfirmSiteworksAppointmentSlotInput = {
  readonly additionalInformation: InputMaybe<Scalars["String"]["input"]>;
  readonly agentReference: InputMaybe<Scalars["String"]["input"]>;
  readonly appointmentDate: Scalars["Date"]["input"];
  readonly calculationId: InputMaybe<Scalars["String"]["input"]>;
  /** Determines which communications will be sent to customers for the appointment. The default is to send all available messages (e.g. appointment confirmed, job completed). */
  readonly commsStrategy: InputMaybe<CommsStrategyType>;
  readonly endTime: Scalars["Time"]["input"];
  readonly promiseId: InputMaybe<Scalars["String"]["input"]>;
  readonly propertyId: Scalars["ID"]["input"];
  readonly siteId: InputMaybe<Scalars["String"]["input"]>;
  readonly slotId: InputMaybe<Scalars["String"]["input"]>;
  readonly startTime: Scalars["Time"]["input"];
};

/**
 *
 *     Connection status of the device, provided as part of the telemetry data.
 *
 */
export enum ConnectionStatus {
  Offline = "OFFLINE",
  Online = "ONLINE",
}

/** An enumeration. */
export enum ConsumptionGroupings {
  Day = "DAY",
  HalfHour = "HALF_HOUR",
  Hour = "HOUR",
  Month = "MONTH",
  Quarter = "QUARTER",
  QuarterHour = "QUARTER_HOUR",
  Week = "WEEK",
}

/** An enumeration. */
export enum ConsumptionUnit {
  Mj = "MJ",
  KWh = "kWh",
}

export type ContactDetailsInput = {
  /** Consent to MBNA. */
  readonly consentToMbna: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Email. */
  readonly email: Scalars["String"]["input"];
  /** First name. */
  readonly firstName: Scalars["String"]["input"];
  /** Last name. */
  readonly lastName: Scalars["String"]["input"];
  /** Phone. */
  readonly phone: Scalars["String"]["input"];
};

export type CreateApiCallInput = {
  /** The ID of the associated API exception, if any. */
  readonly apiExceptionId: InputMaybe<Scalars["Int"]["input"]>;
  /** Any optional useful context involved in the API call. */
  readonly context: InputMaybe<Scalars["JSONString"]["input"]>;
  /** The correlation id header from the HTTP request. */
  readonly correlationId: Scalars["String"]["input"];
  /** The input data provided to the API, if any. */
  readonly inputData: InputMaybe<Scalars["JSONString"]["input"]>;
  /** The name of the operation associated with this call. */
  readonly operationName: Scalars["String"]["input"];
  /** The response returned by the API. */
  readonly response: Scalars["JSONString"]["input"];
};

export type CreateApiExceptionEventInput = {
  /** The ID of the associated API exception, if any. */
  readonly apiExceptionId: InputMaybe<Scalars["Int"]["input"]>;
  /** The event category. */
  readonly category: Scalars["String"]["input"];
  /** Any optional useful context involved in the event. */
  readonly context: InputMaybe<Scalars["JSONString"]["input"]>;
  /** Any useful event description. */
  readonly description: Scalars["String"]["input"];
  /** The event type. */
  readonly eventType: Scalars["String"]["input"];
};

export type CreateApiExceptionInput = {
  /** The account number associated with the exception, if available. */
  readonly accountNumber: InputMaybe<Scalars["ID"]["input"]>;
  /** The ID of the user assigned to handle this exception.If no user is provided, no user will be assigned to the exception. */
  readonly assignedUserId: InputMaybe<Scalars["Int"]["input"]>;
  /** Category associated with this exception. Uses the default category if not provided. */
  readonly category: InputMaybe<ApiExceptionCategories>;
  /** The API client channel where the exception was triggered from. */
  readonly channel: Scalars["String"]["input"];
  /** Contextual information about the exception, if any. */
  readonly context: InputMaybe<Scalars["JSONString"]["input"]>;
  /** The customer contact associated with the exception, if available. */
  readonly customerContact: InputMaybe<Scalars["String"]["input"]>;
  /** External identifier mapping an entity on the client's database. */
  readonly externalIdentifier: Scalars["String"]["input"];
  /** The key date associated with the exception, if available. */
  readonly keyDate: InputMaybe<Scalars["Date"]["input"]>;
  /** The ID of an operations team to handle this exception. If no team is provided, no team will be assigned to the exception. */
  readonly operationsTeamId: InputMaybe<Scalars["Int"]["input"]>;
  /** The priority. Defaults to LOW if not provided. */
  readonly priority: InputMaybe<ApiExceptionPriority>;
  /** The resolution status. Defaults to UNASSIGNED if not provided. */
  readonly resolutionStatus: InputMaybe<ApiExceptionResolutionStatus>;
  /** The resolution type. Defaults to UNASSIGNED if not provided. */
  readonly resolutionType: InputMaybe<ApiExceptionResolutionType>;
  /** The supply point identifier associated with the exception, if available. */
  readonly supplyPointIdentifier: InputMaybe<Scalars["String"]["input"]>;
  /** Tags associated with this exception if any. */
  readonly tags: InputMaybe<ReadonlyArray<InputMaybe<ApiExceptionTags>>>;
  /** The user ID associated with the exception, if available. */
  readonly userId: InputMaybe<Scalars["Int"]["input"]>;
};

export type CreateApiExceptionNoteInput = {
  /** The ID of the associated API exception. */
  readonly apiExceptionId: Scalars["ID"]["input"];
  /** The body of the note. */
  readonly body: Scalars["String"]["input"];
};

/** The input type for the account charge. */
export type CreateAccountChargeInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Optional short note about account charge for customer display. */
  readonly displayNote: InputMaybe<Scalars["String"]["input"]>;
  /** The gross amount of the charge to be added. */
  readonly grossAmount: Scalars["Int"]["input"];
  /** Any extra data that will be associated with account charge. */
  readonly metadata: InputMaybe<Scalars["JSONString"]["input"]>;
  /** Optional short note about account charge for internal use. */
  readonly note: InputMaybe<Scalars["String"]["input"]>;
  /** The reason why the charge is added to the account. This should be a valid charge reason code. */
  readonly reason: Scalars["String"]["input"];
};

/** The input type for the account credit. */
export type CreateAccountCreditInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The gross amount of the credit to be created. */
  readonly grossAmount: Scalars["Int"]["input"];
  /** Any extra data that will be associated with account credit. */
  readonly metadata: InputMaybe<Scalars["JSONString"]["input"]>;
  /** The net amount of the credit to be created. */
  readonly netAmount: Scalars["Int"]["input"];
  /** Optional short note about account credit. */
  readonly note: InputMaybe<Scalars["String"]["input"]>;
  /** The reason why the credit is added to the account. */
  readonly reason: AccountCreditReasonType;
  /** The sales tax amount of the credit to be created. */
  readonly salesTaxAmount: Scalars["Int"]["input"];
};

export type CreateAccountFileAttachmentInput = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly category: Category;
  readonly clientMutationId: InputMaybe<Scalars["String"]["input"]>;
  readonly filename: Scalars["String"]["input"];
};

export type CreateAccountNoteInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Pin the note to account. */
  readonly isPinned: Scalars["Boolean"]["input"];
  /** The note to add. */
  readonly note: Scalars["String"]["input"];
};

export type CreateAccountReminderInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Reminder content. */
  readonly content: Scalars["String"]["input"];
  /** When the reminder is due. */
  readonly dueAt: InputMaybe<Scalars["DateTime"]["input"]>;
  /** The reminder type. */
  readonly reminderType: AccountReminderTypes;
};

export type CreateAcquisitionQuoteRequestForProductsInput = {
  /** The electricity meter points to create a quote request for. */
  readonly electricityMeterPoints: InputMaybe<
    ReadonlyArray<InputMaybe<ElectricityMeterPointConsumptionInput>>
  >;
  /** The gas meter points to create a quote request for. */
  readonly gasMeterPoints: InputMaybe<
    ReadonlyArray<InputMaybe<GasMeterPointConsumptionInput>>
  >;
  /** Optional parameter for the payment method to quote for. Defaults to Direct Debit. */
  readonly paymentMethod: InputMaybe<PaymentMethodChoices>;
  /** The postcode of the meter points being quoted. */
  readonly postcode: Scalars["String"]["input"];
  /** The product codes of products to quote for. */
  readonly productCodes: ReadonlyArray<InputMaybe<Scalars["String"]["input"]>>;
};

export type CreateAffiliateLinkInputType = {
  readonly contactEmail: Scalars["String"]["input"];
  readonly contactName: Scalars["String"]["input"];
  /** The organisation for whom to create the affiliate link for. */
  readonly organisationId: Scalars["ID"]["input"];
  /**
   *
   * Will be validated as follows:
   *
   * - should be at least two characters
   * - should only contain (letters, numbers, and Hyphen)
   * - should not contain bad words
   * - should not contain any of the reserved words including:
   *  affiliates, api, business, click, consul, developer, friends, kraken, mail, sendgrid, tech, webhooks, www, www2
   */
  readonly subdomain: Scalars["String"]["input"];
};

export type CreateAffiliateOrganisationInputType = {
  /** Is this partner allowed to specify payment methods other than Direct Debit in the import csv or API */
  readonly allowAlternativePaymentMethods: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  /** Are meter point registrations limited for profile classes 1 and 2 for registrations from csv or API */
  readonly canRegisterBusinessMeterPoints: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  /** Allow registration requests with customers without an email address. */
  readonly canRegisterCustomersWithoutEmailAddress: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  /** Allow registration requests with exiting account user emails to add to the portfolio belonging to the account user. */
  readonly canRegisterPortfolioAccounts: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  /** Allow performing tariff renewals via API. */
  readonly canRenewTariffs: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Allow this partner access to the IVR support API (modify their own IVR handling through third party 'IVR Flow Editor') */
  readonly canUseIvrSupportApi: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Default Account Type */
  readonly defaultAccountType: AccountTypeChoices;
  /** Restrict to field-sales-only products? This is only allowed for the 'field-sales' and 'events' sales channels */
  readonly isFieldSalesOnlyProduct: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly name: Scalars["String"]["input"];
  /** Sales Channel */
  readonly salesChannel: SalesChannelChoices;
  /** Allow this partner to skip validation that ensures all meter points belong to the same address */
  readonly skipMeterPointAddressValidation: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
};

export type CreateAffiliateSessionInputType = {
  /** The IP Address of the user. */
  readonly ipAddress: InputMaybe<Scalars["String"]["input"]>;
  /** The affiliate link for whom to create the session for. */
  readonly linkId: Scalars["ID"]["input"];
  /** Additional query parameters to attach to this session. */
  readonly queryParams: InputMaybe<Scalars["JSONString"]["input"]>;
  /** The quote share that led to this session. */
  readonly quoteShareId: InputMaybe<Scalars["ID"]["input"]>;
  /** The HTTP user agent. */
  readonly userAgent: InputMaybe<Scalars["String"]["input"]>;
};

/** The input type for creating an auto top-up config. */
export type CreateAutoTopupConfigInput = {
  /** The account number, e.g.: 'A-A1B2C3D4'. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Alphanumber code identifying the device, e.g.: 'A1-BC-D2-00-01-23-EF-4G'. */
  readonly deviceId: Scalars["String"]["input"];
  /** The amount to top-up. The amount should always be provided in the minor unit of currency, i.e. USA cents / GBP pence / etc. Minimum allowed amount is 1. */
  readonly topupAmount: Scalars["Int"]["input"];
};

export type CreateContributionAgreementInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The start datetime of the agreement. */
  readonly activeFrom: Scalars["DateTime"]["input"];
  /** The end datetime of the agreement, if any. */
  readonly activeTo: InputMaybe<Scalars["DateTime"]["input"]>;
  /** The amount contributed per interval. Note, this is in the smallest domination that the currency supports. e.g. Pence, Cents, Yen, etc. */
  readonly amount: Scalars["Int"]["input"];
  /** The frequency of contributions. */
  readonly interval: Interval;
  /** The code of the scheme to contribute to. */
  readonly schemeCode: Scalars["String"]["input"];
};

export type CreateDepositAgreementInput = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly depositKey: Scalars["String"]["input"];
  readonly reason: Scalars["String"]["input"];
};

export type CreateDirectDebitInstructionInput = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly directDebitInstruction: DirectDebitInstructionLocalBankDetailsInput;
};

/** The input type for creating an Electric Juice agreement. */
export type CreateElectricJuiceAgreementInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The time from which the new agreement is valid (default: now). */
  readonly validFrom: InputMaybe<Scalars["DateTime"]["input"]>;
};

/** The input type for creating a new Electric Juice charge card. */
export type CreateElectricJuiceChargeCardInput = {
  /** The account number of the account this charge card should be associated with. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The UID on the charge card. */
  readonly chargeCardUid: Scalars["String"]["input"];
  /** The name printed on the charge card. */
  readonly nameOnCard: Scalars["String"]["input"];
};

/** The input type for adding a charge for Electric Juice. */
export type CreateElectricJuiceChargeInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The price of additional (non-consumption) fees on this charge. */
  readonly additionalFees: Scalars["Int"]["input"];
  /** The UID of the Electric Juice charge card to associate with this charge. */
  readonly chargeCardUid: InputMaybe<Scalars["String"]["input"]>;
  /** The provider that originated this charge. */
  readonly chargeProvider: Scalars["String"]["input"];
  /** The amount of energy consumed in kWh. */
  readonly kwhUsed: Scalars["Decimal"]["input"];
  /** The amount to be charged (excl. tax). */
  readonly netAmount: Scalars["Int"]["input"];
  /** The end time of the charge period. */
  readonly periodEndAt: Scalars["DateTime"]["input"];
  /** The start time of the charge period. */
  readonly periodStartAt: Scalars["DateTime"]["input"];
  /** The location of the charging point this charge is associated with. */
  readonly postcode: Scalars["String"]["input"];
  /** The price per kWh. */
  readonly pricePerKwh: Scalars["Decimal"]["input"];
};

/** The input type for an Electric Juice ledger credit. */
export type CreateElectricJuiceCreditInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The gross amount of the credit to be created. */
  readonly grossAmount: Scalars["Int"]["input"];
  /** The net amount of the credit to be created. */
  readonly netAmount: Scalars["Int"]["input"];
  /** Optional short note about account credit. */
  readonly note: InputMaybe<Scalars["String"]["input"]>;
  /** The reason why the credit is added to the account. */
  readonly reason: AccountCreditReasonType;
  /** The tax amount of the credit to be created. */
  readonly taxAmount: Scalars["Int"]["input"];
};

/** The input type for creating an EV Public Charging agreement. */
export type CreateEvPublicChargingAgreementInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Identifier of an account in the external system. */
  readonly externalAccountId: Scalars["String"]["input"];
  /** The start time of the agreement. */
  readonly validFrom: Scalars["DateTime"]["input"];
};

export type CreateExternalAccountEventInput = {
  /** The number of the account that the event should be created for. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The category of the event. */
  readonly category: ExternalAccountEventCategory;
  /** An array of content data associated with the event. */
  readonly content: ReadonlyArray<InputMaybe<ExternalAccountEventContent>>;
  /** A human-readable description of the event. */
  readonly description: InputMaybe<Scalars["String"]["input"]>;
  /** The subcategory of the event. */
  readonly subcategory: InputMaybe<ExternalAccountEventSubCategory>;
};

export type CreateGoodsQuoteInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** A JSON object containing client parameters to store on the quote. */
  readonly clientParams: InputMaybe<Scalars["GenericScalar"]["input"]>;
  /** Products to get a quote for. */
  readonly productsToQuote: ReadonlyArray<InputMaybe<ProductToQuoteInput>>;
};

export type CreateGoodsQuoteWithoutAccountInput = {
  /** A JSON object containing client parameters to store on the quote. */
  readonly clientParams: InputMaybe<Scalars["GenericScalar"]["input"]>;
  /** Customer profile. */
  readonly customerProfile: CustomerProfileInput;
  /** Products to get a quote for. */
  readonly productsToQuote: ReadonlyArray<InputMaybe<ProductToQuoteInput>>;
};

export type CreateHeatPumpGoodsQuoteInput = {
  /** Account to associate quote to. */
  readonly accountNumber: InputMaybe<Scalars["String"]["input"]>;
  /** Details of the address. */
  readonly addressDetails: AddressDetailsInput;
  /** Details to pass to hubspot. */
  readonly contactDetails: ContactDetailsInput;
  /** ID of the product to quote. */
  readonly productId: Scalars["Int"]["input"];
  /** Details of the property, used for eligiblity checks. */
  readonly propertyDetails: PropertyDetailsInput;
};

export type CreateInkInboundMessageInput = {
  readonly channel: InkCommunicationChannel;
  readonly clientMutationId: InputMaybe<Scalars["String"]["input"]>;
  /**
   *
   * An optional parameter where we can pass the generic message headers if it has one
   *
   * Email channel tries to get the value `conversation-relay-id` from this
   * parameter
   *
   */
  readonly messageHeaders: InputMaybe<Scalars["JSONString"]["input"]>;
  /**
   *
   * An arbitrary, unique ID for this message.
   *
   * This must be unique for each message that is supplied
   * using the same organisation; collisions between messages
   * provided by different organisations are tolerated.
   *
   * Stored as vendor_id.
   *
   */
  readonly messageId: Scalars["String"]["input"];
  readonly newMessage: InkMessageInput;
  /** When the message occurred in the system of origin. */
  readonly occurredAt: InputMaybe<Scalars["DateTime"]["input"]>;
  /**
   *
   * An optional vendor value to denote which system it originated from.
   *
   * If no vendor is passed, we will get the default generic vendor from
   * the setting called INK_DEFAULT_GENERIC_MESSAGE_API_VENDOR.
   *
   */
  readonly vendor: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateOrUpdateLoyaltyCardInput = {
  /** The id of the account user. */
  readonly accountUserId: InputMaybe<Scalars["String"]["input"]>;
  /** The number of the loyalty card. */
  readonly number: InputMaybe<Scalars["String"]["input"]>;
  /** The scheme of the loyalty card. */
  readonly scheme: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateOrUpdateSiteworksAppointmentInput = {
  /** Address of the property where the appointment is taking place. */
  readonly address: InputMaybe<AddressInput>;
  /** The market ID of the agent that carried out the work. This should be an electricity market participant ID or gas market code. */
  readonly agentId: Scalars["String"]["input"];
  /** The scheduled date of the appointment. Required if the appointment is not already booked. */
  readonly appointmentDate: Scalars["Date"]["input"];
  /** The unique appointment reference of the agent. */
  readonly appointmentReference: Scalars["String"]["input"];
  /** A list of electricity meters that the work applies to. */
  readonly electricityMeters: InputMaybe<ReadonlyArray<InputMaybe<MeterInput>>>;
  readonly electricitySupplyType: InputMaybe<ElectricitySupplyType>;
  /** Name of engineer currently assigned to the appointment. */
  readonly engineerName: InputMaybe<Scalars["String"]["input"]>;
  /** The categories of meter the work applies to. */
  readonly fuelType: FuelType;
  /** A list of electricity meters that the work applies to. */
  readonly gasMeters: InputMaybe<ReadonlyArray<InputMaybe<MeterInput>>>;
  readonly gasSupplyType: InputMaybe<GasSupplyType>;
  /** Boolean flag to indicate an emergency appointment. */
  readonly isEmergency: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Free text comments about the appointment. */
  readonly jobNotes: InputMaybe<Scalars["String"]["input"]>;
  /** Required if `fuel_type` is `ELECTRICITY` or `DUAL_FUEL`. */
  readonly mpan: InputMaybe<Scalars["String"]["input"]>;
  /** Required if `fuel_type` is `GAS` or `DUAL_FUEL`. */
  readonly mprn: InputMaybe<Scalars["String"]["input"]>;
  /** If applicable, the category of new meters installed. */
  readonly newMeterCategory: InputMaybe<NewMeterCategory>;
  /** The status of the appointment. */
  readonly status: AppointmentStatus;
  /** Extra context to a change in status such as abort or cancellation reason. */
  readonly statusReason: InputMaybe<Scalars["String"]["input"]>;
  /** The end time of the slot during which the engineer is scheduled at the property. */
  readonly timeSlotEnd: InputMaybe<Scalars["Time"]["input"]>;
  /** The start time of the slot during which the engineer is scheduled at the property. */
  readonly timeSlotStart: Scalars["Time"]["input"];
  /** The type of work the appointment has been booked for. */
  readonly workType: InputMaybe<Scalars["String"]["input"]>;
};

export type CreatePortfolioInput = {
  /** The brand to associate with this portfolio, if not provided the default brand will be used. */
  readonly brandCode: InputMaybe<Scalars["String"]["input"]>;
  /** Whether collective bills should be issued for the portfolio's accounts. The default value is False. */
  readonly collectiveBilling: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The ID of the operations team to associate with this portfolio.If no team is provided, no team will be assigned to the portfolio. */
  readonly operationsTeamId: InputMaybe<Scalars["ID"]["input"]>;
};

export type CreatePortfolioUserRoleInput = {
  /** The user to associate with the portfolio. */
  readonly accountUserId: Scalars["ID"]["input"];
  /** The portfolio to associate the user with. */
  readonly portfolioId: Scalars["ID"]["input"];
  /** The role to assign to the user. If not provided the default role will be used. */
  readonly role: InputMaybe<PortfolioUserRoleEnum>;
};

export type CreateProductRatesInputType = {
  /** The product rate(s) to be created. */
  readonly productRates: ReadonlyArray<InputMaybe<ProductRateInputType>>;
};

export type CreatePurchaseInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** A JSON object containing client parameters to store on the quote. */
  readonly clientParams: InputMaybe<Scalars["JSONString"]["input"]>;
  /** A JSON object containing client parameters to store on the purchase. */
  readonly marketParams: InputMaybe<Scalars["JSONString"]["input"]>;
  /** Products being purchased. */
  readonly saleItems: ReadonlyArray<InputMaybe<ProductToPurchaseInput>>;
};

export type CreateQuoteInput = {
  /** Optional address information about the customer */
  readonly address: InputMaybe<QuoteAddressInput>;
  readonly affiliateSessionId: InputMaybe<Scalars["String"]["input"]>;
  readonly brandCode: Scalars["String"]["input"];
  readonly electricityMeterPoints: InputMaybe<
    ReadonlyArray<InputMaybe<ElectricityMeterPointConsumptionInput>>
  >;
  readonly gasMeterPoints: InputMaybe<
    ReadonlyArray<InputMaybe<GasMeterPointConsumptionInput>>
  >;
  readonly gspGroupId: InputMaybe<Scalars["String"]["input"]>;
  /** Whether the user has consented to their energy consumption estimates being retrieved from the industry vendors. This currently applies to business accounts only. */
  readonly hasConsentedToIndustryDataSearch: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  readonly isBusiness: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Optional parameter to select the payment method for the quote, default is direct debit. */
  readonly paymentMethod: InputMaybe<QuotePaymentMethodChoices>;
  /** Used to verify the position that field sales agents generate quotes from */
  readonly position: InputMaybe<PositionInput>;
  readonly postcode: Scalars["String"]["input"];
};

export type CreateQuoteRequestForProductsInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Optional parameter to override the payment method on the current agreement. */
  readonly paymentMethod: InputMaybe<PaymentMethodChoices>;
  /** If the customer is currently on a flat rate tariff, create a flat rate quote. */
  readonly persistFlatRate: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The product codes of products to quote for. */
  readonly productCodes: ReadonlyArray<InputMaybe<Scalars["String"]["input"]>>;
  /** The property id to create a quote request for. */
  readonly propertyId: Scalars["Int"]["input"];
  /** The date at which the agreements would be renewed. */
  readonly renewalAt: Scalars["DateTime"]["input"];
};

/** Required information for creating a referral */
export type CreateReferralInput = {
  /** The account number for the referred account. */
  readonly accountNumber: Scalars["String"]["input"];
  /** An email address, link or code, referencing the referring account. */
  readonly reference: Scalars["String"]["input"];
};

export type CreateRenewalQuoteRequestInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The property id to create a quote request for. */
  readonly propertyId: Scalars["Int"]["input"];
  /** The date at which the agreements would be renewed. */
  readonly renewalAt: Scalars["DateTime"]["input"];
};

export type CreateShellAccountInput = {
  readonly billingAddressLine1: InputMaybe<Scalars["String"]["input"]>;
  readonly billingAddressLine2: InputMaybe<Scalars["String"]["input"]>;
  readonly billingAddressLine3: InputMaybe<Scalars["String"]["input"]>;
  readonly billingAddressLine4: InputMaybe<Scalars["String"]["input"]>;
  readonly billingAddressLine5: InputMaybe<Scalars["String"]["input"]>;
  readonly billingName: InputMaybe<Scalars["String"]["input"]>;
  /** Day to fixed bill on if billing_period_length set. */
  readonly billingPeriodDay: InputMaybe<Scalars["Int"]["input"]>;
  /** For fixed billing accounts only, the length of their billing period. Can be MONTHLY or QUARTERLY. */
  readonly billingPeriodLength: InputMaybe<Scalars["String"]["input"]>;
  /** Month to start billing from if billing_period_length set to QUARTERLY or the multiplier is > 1. */
  readonly billingPeriodMonth: InputMaybe<Scalars["Int"]["input"]>;
  /** For fixed billing accounts only, the number the period length is to be multiplied by to get the total period length, i.e. for billing every second month, select 2 combined with a billing period length MONTHLY. Can't be > 1 for quarterly billing. */
  readonly billingPeriodMultiplier: InputMaybe<Scalars["Int"]["input"]>;
  readonly billingPostcode: InputMaybe<Scalars["String"]["input"]>;
  readonly billingRichAddress: InputMaybe<Scalars["String"]["input"]>;
  readonly brand: InputMaybe<Scalars["String"]["input"]>;
  readonly businessType: InputMaybe<Scalars["String"]["input"]>;
  readonly clientMutationId: InputMaybe<Scalars["String"]["input"]>;
  readonly companyName: InputMaybe<Scalars["String"]["input"]>;
  readonly companyNumber: InputMaybe<Scalars["String"]["input"]>;
  readonly dateOfBirth: InputMaybe<Scalars["Date"]["input"]>;
  readonly email: Scalars["String"]["input"];
  readonly familyName: Scalars["String"]["input"];
  readonly givenName: Scalars["String"]["input"];
  readonly isBusinessAccount: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly landline: InputMaybe<Scalars["String"]["input"]>;
  readonly mobile: InputMaybe<Scalars["String"]["input"]>;
  readonly password: InputMaybe<Scalars["String"]["input"]>;
  readonly passwordUpdateToken: InputMaybe<Scalars["String"]["input"]>;
  readonly portfolioNumber: InputMaybe<Scalars["String"]["input"]>;
  readonly urn: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateSiteworksEventInput = {
  /** The notes that are associated with the Siteworks event. */
  readonly eventNotes: InputMaybe<Scalars["String"]["input"]>;
  /** The type of Siteworks event that will be created. */
  readonly eventType: SiteworksEventType;
  /** The content that might be submitted as field servies data. */
  readonly fieldServicesData: InputMaybe<Scalars["JSONString"]["input"]>;
  /** The references that are related to jobs, appointments etc. */
  readonly references: InputMaybe<Scalars["JSONString"]["input"]>;
  /** The Siteworks request id. */
  readonly siteworksRequestId: Scalars["String"]["input"];
};

export type CreditScoreData = {
  readonly riskBracket: Scalars["String"]["input"];
  readonly score: Scalars["Int"]["input"];
};

export enum CurrencyOptions {
  UkPence = "UK_PENCE",
}

/** An enumeration. */
export enum CurrentQualifyingComponentOptions {
  AdultDisabilityPayment = "ADULT_DISABILITY_PAYMENT",
  AgeThreshold = "AGE_THRESHOLD",
  DependentChildOverFive = "DEPENDENT_CHILD_OVER_FIVE",
  DependentChildUnderFive = "DEPENDENT_CHILD_UNDER_FIVE",
  DisabilityBenefits = "DISABILITY_BENEFITS",
  HasDisability = "HAS_DISABILITY",
  IncomeRelatedBenefits = "INCOME_RELATED_BENEFITS",
  LimitedCapabilityForWork = "LIMITED_CAPABILITY_FOR_WORK",
  MaternityExemptionCertificate = "MATERNITY_EXEMPTION_CERTIFICATE",
  PersonalIndependencePayments = "PERSONAL_INDEPENDENCE_PAYMENTS",
}

/** Details about the customer. */
export type CustomerDetailsInput = {
  /** The customer's date of birth. */
  readonly dateOfBirth: InputMaybe<Scalars["Date"]["input"]>;
  /** Account email. */
  readonly email: InputMaybe<Scalars["String"]["input"]>;
  /** Family name. */
  readonly familyName: Scalars["String"]["input"];
  /** Given name. */
  readonly givenName: Scalars["String"]["input"];
  /** Account landline number. */
  readonly landline: InputMaybe<Scalars["String"]["input"]>;
  /** Account mobile phone number. */
  readonly mobile: InputMaybe<Scalars["String"]["input"]>;
  /** The customer's communication preferences. */
  readonly preferences: InputMaybe<UpdateAccountUserCommsPreferencesInput>;
  /** The customer's pronouns. */
  readonly pronouns: InputMaybe<Scalars["String"]["input"]>;
  /** The customer's title. */
  readonly title: InputMaybe<Scalars["String"]["input"]>;
};

export type CustomerFeedbackInputType = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly answer: InputMaybe<Scalars["String"]["input"]>;
  readonly feedbackId: Scalars["Int"]["input"];
  readonly formId: Scalars["Int"]["input"];
  readonly issueResolved: Scalars["Boolean"]["input"];
};

export type CustomerProfileInput = {
  /** Line 1 of customer's address. */
  readonly addressLine1: Scalars["String"]["input"];
  /** Line 2 of customer's address. */
  readonly addressLine2: InputMaybe<Scalars["String"]["input"]>;
  /** Line 3 of customer's address. */
  readonly addressLine3: InputMaybe<Scalars["String"]["input"]>;
  /** Line 4 of customer's address. */
  readonly addressLine4: InputMaybe<Scalars["String"]["input"]>;
  /** Line 5 of customer's address. */
  readonly addressLine5: InputMaybe<Scalars["String"]["input"]>;
  /** Customer's email. */
  readonly email: Scalars["String"]["input"];
  /** Customer's family name. */
  readonly familyName: Scalars["String"]["input"];
  /** Customer's given name. */
  readonly givenName: Scalars["String"]["input"];
  /** Customer's phone number. */
  readonly phoneNumber: Scalars["String"]["input"];
  /** Customer's postcode. */
  readonly postcode: Scalars["String"]["input"];
};

/** The status of DNO being notified of this export request. */
export enum DnoStatus {
  /** Notified */
  Notified = "NOTIFIED",
  /** Not Notified */
  NotNotified = "NOT_NOTIFIED",
  /** Unknown */
  Unknown = "UNKNOWN",
}

/**
 *
 *     The frequency of the cost of charge data to be shown in the consumer app.
 *
 *     We are generating this data daily, weekly, monthly or annually, with the following
 *     aggregations:
 *     daily -> half-hourly aggregation
 *     weekly & monthly -> daily aggregations
 *     annually -> monthly aggregations
 *
 */
export enum DataFrequency {
  Annually = "ANNUALLY",
  Daily = "DAILY",
  Monthly = "MONTHLY",
  Weekly = "WEEKLY",
}

export enum DataSource {
  Cache = "CACHE",
  Live = "LIVE",
}

export type DeAuthenticationInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The most recently registered device of this type will be de-authenticated. */
  readonly deviceType: InputMaybe<KrakenFlexDeviceTypes>;
};

/** An enumeration. */
export enum DebtCollectionProceedingStopReason {
  /** Arrears to client */
  ArrearsToClient = "ARREARS_TO_CLIENT",
  /** Bankrupt */
  Bankrupt = "BANKRUPT",
  /** Confirmed empty */
  ConfirmedEmpty = "CONFIRMED_EMPTY",
  /** COS */
  Cos = "COS",
  /** COT / COS */
  CotCos = "COT_COS",
  /** COT no proof */
  CotNoProof = "COT_NO_PROOF",
  /** COT proof seen */
  CotProofSeen = "COT_PROOF_SEEN",
  /** Deceased */
  Deceased = "DECEASED",
  /** Demolished */
  Demolished = "DEMOLISHED",
  /** Enrolled in Error */
  EnrolledInError = "ENROLLED_IN_ERROR",
  /** Expired */
  Exp = "EXP",
  /** Gone away */
  GoneAway = "GONE_AWAY",
  /** High level complaint */
  HighLevelComplaint = "HIGH_LEVEL_COMPLAINT",
  /** Insolvencies dealing */
  InsolvenciesDealing = "INSOLVENCIES_DEALING",
  /** In prison */
  InPrison = "IN_PRISON",
  /** Live to final */
  LiveToFinal = "LIVE_TO_FINAL",
  /** Low balance */
  LowBalance = "LOW_BALANCE",
  /** Negative trace */
  NegativeTrace = "NEGATIVE_TRACE",
  /** Paid in full */
  PaidInFull = "PAID_IN_FULL",
  /** Partial settlement */
  PartialSettlement = "PARTIAL_SETTLEMENT",
  /** Part payment */
  PartPayment = "PART_PAYMENT",
  /** Payment arrangement */
  PaymentArrangement = "PAYMENT_ARRANGEMENT",
  /** Payment plan agreed */
  PaymentPlanAgreed = "PAYMENT_PLAN_AGREED",
  /** PPM arrangement */
  PpmArrangement = "PPM_ARRANGEMENT",
  /** PPM fitted */
  PpmFitted = "PPM_FITTED",
  /** PPM requested */
  PpmRequested = "PPM_REQUESTED",
  /** Process exhausted */
  ProcessExhausted = "PROCESS_EXHAUSTED",
  /** Process exhausted - contact */
  ProcessExhaustedContact = "PROCESS_EXHAUSTED_CONTACT",
  /** Process exhausted - no contact */
  ProcessExhaustedNoContact = "PROCESS_EXHAUSTED_NO_CONTACT",
  /** Query */
  Query = "QUERY",
  /** Reduced settlement */
  ReducedSettlement = "REDUCED_SETTLEMENT",
  /** Refused to deal */
  RefusedToDeal = "REFUSED_TO_DEAL",
  /** Unable to locate property */
  UnableToLocateProperty = "UNABLE_TO_LOCATE_PROPERTY",
  /** Unable to trace */
  UnableToTrace = "UNABLE_TO_TRACE",
  /** Vulnerable */
  Vulnerable = "VULNERABLE",
  /** Withdrawn */
  Withdrawn = "WITHDRAWN",
  /** Write off */
  WriteOff = "WRITE_OFF",
}

export type DecommissionSmartDeviceInput = {
  /** Device ID for the device being decommissioned. */
  readonly deviceId: Scalars["String"]["input"];
};

export type DeleteAccountReferenceInput = {
  /** The account number associated with the removed AccountReference. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The namespace associated with the removed AccountReference */
  readonly namespace: Scalars["String"]["input"];
};

export type DeleteBoostChargeInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
};

export type DeletePushNotificationBindingInput = {
  /** Device push notification token. */
  readonly token: Scalars["String"]["input"];
};

export enum DeletePushNotificationBindingOutput {
  Failed = "FAILED",
  Successful = "SUCCESSFUL",
}

export type DepositAgreementInput = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly depositKey: Scalars["String"]["input"];
};

export type DeviceDetailsInput = {
  /** Auxiliary device variant id. */
  readonly auxDeviceVariantId: InputMaybe<Scalars["ID"]["input"]>;
  /** Unique device variant id. */
  readonly deviceVariantId: InputMaybe<Scalars["ID"]["input"]>;
};

export type DeviceRegistrationInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The authentication details required given the chosen provider. */
  readonly authentication: InputMaybe<AuthenticationInput>;
  /** The device type specific details required for registering a device. */
  readonly deviceDetails: InputMaybe<DeviceDetailsInput>;
  /** The device type to be registered - batteries, electric vehicles, heat pumps or thermostats. */
  readonly deviceType: KrakenFlexDeviceTypes;
  /** The ID of the property the device belongs to. */
  readonly propertyId: Scalars["Int"]["input"];
  /** The provider used to authenticate the device. */
  readonly provider: ProviderChoices;
};

/** An enumeration. */
export enum DeviceStatus {
  /** Commissioned */
  Commissioned = "COMMISSIONED",
  /** Decommissioned */
  Decommissioned = "DECOMMISSIONED",
  /** Installed but not commissioned */
  InstalledNotCommissioned = "INSTALLED_NOT_COMMISSIONED",
  /** Not Applicable */
  NotApplicable = "NOT_APPLICABLE",
  /** Pending */
  Pending = "PENDING",
  /** Recovered */
  Recovered = "RECOVERED",
  /** In recovery */
  Recovery = "RECOVERY",
  /** Suspended */
  Suspended = "SUSPENDED",
  /** Whitelisted */
  Whitelisted = "WHITELISTED",
  /** Withdrawn */
  Withdrawn = "WITHDRAWN",
}

/** An enumeration. */
export enum DeviceStatuses {
  /** Device has been commissioned */
  Commissioned = "COMMISSIONED",
  /** Device has been decommissioned */
  Decommissioned = "DECOMMISSIONED",
  /** Installed but not commissioned */
  InstalledNotCommissioned = "INSTALLED_NOT_COMMISSIONED",
  /** Not applicable */
  NotApplicable = "NOT_APPLICABLE",
  /** Pending */
  Pending = "PENDING",
  /** Device recovered */
  Recovered = "RECOVERED",
  /** Device is in recovery mode */
  Recovery = "RECOVERY",
  /** Decice suspended */
  Suspended = "SUSPENDED",
  /** Device has been whitelisted */
  Whitelisted = "WHITELISTED",
  /** Device has been withdrawn */
  Withdrawn = "WITHDRAWN",
}

/** An enumeration. */
export enum DeviceType {
  /** Consumer Access Device (CAD) */
  Cad = "CAD",
  /** Communications Hub Function (CHF) */
  Chf = "CHF",
  /** Electricity Smart Meter (ESME) */
  Esme = "ESME",
  /** Gas Proxy Function (GPF) */
  Gpf = "GPF",
  /** Gas Smart Meter (GSME) */
  Gsme = "GSME",
  /** HAN Connected Auxiliary Load Control Switch (HCALCS) */
  Hcalcs = "HCALCS",
  /** In-House Display (IHD) */
  Ihd = "IHD",
  /** IHD or CAD (a type 2 device) */
  IhdOrCad = "IHD_OR_CAD",
  /** Prepayment Interface Device (PPMID) */
  Ppmid = "PPMID",
}

export type DirectDebitInstructionLocalBankDetailsInput = {
  readonly accountHolder: Scalars["String"]["input"];
  readonly accountNumber: Scalars["String"]["input"];
  readonly sortCode: Scalars["String"]["input"];
};

/** An enumeration. */
export enum DirectDebitInstructionStatus {
  /** The account for this instruction was closed. */
  AccountClosed = "ACCOUNT_CLOSED",
  /** The instruction is active and can be used to take payments. */
  Active = "ACTIVE",
  /** The instruction could not be set up with the vendor. */
  Failed = "FAILED",
  /** The instruction has not yet been set up. */
  Provisional = "PROVISIONAL",
}

export type DirectDebitPaymentDayUpdateInput = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly paymentDay: Scalars["Int"]["input"];
};

/** The input type for disabling auto top-up. */
export type DisableAutoTopupInput = {
  /** The account number, e.g.: 'A-A1B2C3D4'. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Alphanumber code identifying the device, e.g.: 'A1-BC-D2-00-01-23-EF-4G'. */
  readonly deviceId: Scalars["String"]["input"];
};

/**
 *
 *     The various dispatch notice time types ecisting in the datalake for saving session events.
 *
 */
export enum DispatchNoticeTypeChoices {
  DayAhead = "DAY_AHEAD",
  WithinDay_1 = "WITHIN_DAY_1",
  WithinDay_2 = "WITHIN_DAY_2",
}

/** An enumeration. */
export enum DocumentAccessibilityChoices {
  /** Audio-accessible documents are requested for this account. */
  Audio = "AUDIO",
  /** Braille documents are requested for this account. */
  Braille = "BRAILLE",
  /** Large print documents are requested for this account. */
  LargePrint = "LARGE_PRINT",
}

export type EvpcLineItem = {
  /** The amount (excl. tax) in smallest units of currency. */
  readonly amount: Scalars["Int"]["input"];
  /** The rate band of this line item. */
  readonly band: ProductRateBands;
  /** JSON containing any additional metadata. */
  readonly metadata: InputMaybe<Scalars["JSONString"]["input"]>;
  /** The end of the public charging session. */
  readonly periodEndAt: Scalars["DateTime"]["input"];
  /** The start of the public charging session. */
  readonly periodStartAt: Scalars["DateTime"]["input"];
};

export type EvpcTaxItem = {
  /** The amount in smallest units of currency. */
  readonly amount: Scalars["Int"]["input"];
  /** The amount (excl. tax) that this tax was calculated from, in smallest units of currency. */
  readonly amountTaxed: Scalars["Int"]["input"];
  /** JSON containing any additional metadata. */
  readonly metadata: InputMaybe<Scalars["JSONString"]["input"]>;
  /** The rate at which tax was applied. */
  readonly rate: Scalars["Decimal"]["input"];
  /** The type of tax (e.g. 'VAT'). */
  readonly taxType: Scalars["String"]["input"];
  /** The unit of the tax rate. */
  readonly unitType: TaxUnitType;
};

/** An enumeration. */
export enum ElectricityAgentContractContractType {
  /** Advanced Data Service */
  Ads = "ADS",
  /** Data Aggregator */
  Da = "DA",
  /** Data Collector */
  Dc = "DC",
  /** Meter Operator */
  Mop = "MOP",
  /** Advanced Metering Service */
  Msa = "MSA",
  /** Smart Metering Service */
  Mss = "MSS",
  /** Smart Data Service */
  Sds = "SDS",
  /** Unmetered Data Service */
  Umsds = "UMSDS",
  /** Unmetered Supplies Operator */
  Umso = "UMSO",
}

export type ElectricityBespokeRates = {
  /** Daily bespoke rate for electricity. */
  readonly day: InputMaybe<Scalars["Decimal"]["input"]>;
  /** Nightly bespoke rate for electricity. */
  readonly night: InputMaybe<Scalars["Decimal"]["input"]>;
  /** Off peak rate for electricity. */
  readonly offPeak: InputMaybe<Scalars["Decimal"]["input"]>;
  /** Standard bespoke rate for electricity. */
  readonly standard: InputMaybe<Scalars["Decimal"]["input"]>;
  /** Standing charge for electricity. */
  readonly standingCharge: Scalars["Decimal"]["input"];
};

export type ElectricityConsumptionInput = {
  /** Daily electricity consumption. */
  readonly day: InputMaybe<Scalars["Int"]["input"]>;
  /** If the consumption values are estimated, set this to 'True'. */
  readonly isEstimate: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Nightly electricity consumption. */
  readonly night: InputMaybe<Scalars["Int"]["input"]>;
  /** Off peak hours electricity consumption. */
  readonly offPeak: InputMaybe<Scalars["Int"]["input"]>;
  /** Amount of electricity consumed. */
  readonly standard: InputMaybe<Scalars["Int"]["input"]>;
};

/**
 *
 * Filter measurements by electricity parameters.
 *
 */
export type ElectricityFiltersInput = {
  readonly deviceId: InputMaybe<Scalars["String"]["input"]>;
  readonly marketSupplyPointId: InputMaybe<Scalars["String"]["input"]>;
  readonly readingDirection: InputMaybe<ReadingDirectionType>;
  readonly readingFrequencyType: InputMaybe<ReadingFrequencyType>;
  readonly readingQuality: InputMaybe<ReadingQualityType>;
  readonly registerId: InputMaybe<Scalars["String"]["input"]>;
};

/** An enumeration. */
export enum ElectricityMeterMeterType {
  /** Single Element with ALCS, Boost Function and APC that is compliant with SMETS2 */
  A_2Adef = "A_2ADEF",
  /** Single Element with ALCS and APC that is compliant with SMETS2 */
  A_2Adf = "A_2ADF",
  /** Single Element with Boost Function and APC that is compliant with SMETS2 */
  A_2Aef = "A_2AEF",
  /** Single Element with APC that is compliant with SMETS2 */
  A_2Af = "A_2AF",
  /** Twin Element with ALCS, Boost Function and APC that is compliant with SMETS2 */
  A_2Bdef = "A_2BDEF",
  /** Twin Element with ALCS and APC that is compliant with SMETS2 */
  A_2Bdf = "A_2BDF",
  /** Twin Element with Boost Function and APC that is compliant with SMETS2 */
  A_2Bef = "A_2BEF",
  /** Twin Element  with APC that is compliant with SMETS2 */
  A_2Bf = "A_2BF",
  /** Polyphase with ALCS, Boost Function and APC that is compliant with SMETS2 */
  A_2Cdef = "A_2CDEF",
  /** Polyphase with ALCS and APC that is compliant with SMETS2 */
  A_2Cdf = "A_2CDF",
  /** Polyphase with Boost Function and APC that is compliant with SMETS2 */
  A_2Cef = "A_2CEF",
  /** Polyphase with APC that is compliant with SMETS2 */
  A_2Cf = "A_2CF",
  /** Check */
  Check = "CHECK",
  /** Half Hourly */
  H = "H",
  /** Key */
  K = "K",
  /** Lag */
  Lag = "LAG_",
  /** Lead */
  Lead = "LEAD_",
  /** Main */
  Main = "MAIN_",
  /** Non-Half Hourly */
  N = "N",
  /** Non-remotely Configurable Automated Meter Reading */
  Ncamr = "NCAMR",
  /** A meter that meets the definition of an ADM but is not compliant with any version of SMETS */
  Nss = "NSS",
  /** Remotely Configurable Automated Meter Reading without remote enable/disable capability */
  Rcamr = "RCAMR",
  /** Remotely Configurable Automated Meter Reading with remote enable/disable capability */
  Rcamy = "RCAMY",
  /** Smartcard Prepayment */
  S = "S",
  /** A meter that is compliant with the Smart Metering Equipment Technical Specifications 1 (SMETS1) */
  S1 = "S1",
  /** A single element meter that is compliant with SMETS2 */
  S2A = "S2A",
  /** A single element meter with one or more ALCS that is compliant with SMETS2 */
  S2Ad = "S2AD",
  /** Single element meter with one or more ALCS and Boost Function that is compliant with SMETS2 */
  S2Ade = "S2ADE",
  /** A twin element meter that is compliant with SMETS2 */
  S2B = "S2B",
  /** A twin element meter with one or more ALCS that is compliant with SMETS2 */
  S2Bd = "S2BD",
  /** A twin element meter with one or more ALCS and Boost Function that is compliant with SMETS2 */
  S2Bde = "S2BDE",
  /** A polyphase meter that is compliant with SMETS2 */
  S2C = "S2C",
  /** A polyphase meter with one or more ALCS that is compliant with SMETS2 */
  S2Cd = "S2CD",
  /** A polyphase meter with one or more ALCS and Boost Function that is compliant with SMETS2 */
  S2Cde = "S2CDE",
  /** Special */
  Specl = "SPECL",
  /** Token */
  T = "T",
}

export type ElectricityMeterPointConsumptionInput = {
  readonly annualConsumptionDay: InputMaybe<Scalars["Int"]["input"]>;
  readonly annualConsumptionNight: InputMaybe<Scalars["Int"]["input"]>;
  readonly annualConsumptionStandard: InputMaybe<Scalars["Int"]["input"]>;
  readonly isEstimate: Scalars["Boolean"]["input"];
  readonly mpan: InputMaybe<Scalars["String"]["input"]>;
  readonly profileClass: InputMaybe<Scalars["Int"]["input"]>;
};

export type ElectricityMeterPointInput = {
  /** Annual consumption values for this meter point. Must be provided if no MPAN is provided. */
  readonly consumption: InputMaybe<ElectricityConsumptionInput>;
  /** Should the meter point be quoted on a flat rate. */
  readonly flatRate: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The grid supply point ID of this meter point. */
  readonly gspId: InputMaybe<Scalars["String"]["input"]>;
  /** The meter type on this meter point. Must be provided if no MPAN is provided. */
  readonly meterType: InputMaybe<MeterType>;
  /** Must be provided if no custom consumption input is provided. */
  readonly mpan: InputMaybe<Scalars["String"]["input"]>;
};

export type ElectricityMeterPointProductsInput = {
  /** Annual consumption values for this meter point. Must be provided if no MPAN is provided. */
  readonly consumption: InputMaybe<ElectricityConsumptionInput>;
  /** Should the meter point be quoted on a flat rate. */
  readonly flatRate: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The grid supply point ID of this meter point. */
  readonly gspId: InputMaybe<Scalars["String"]["input"]>;
  /** The meter type on this meter point. Must be provided if no MPAN is provided. */
  readonly meterType: InputMaybe<MeterType>;
  /** Must be provided if no custom consumption input is provided. */
  readonly mpan: InputMaybe<Scalars["String"]["input"]>;
  /** A list of products and optional product parameters to quote for. */
  readonly productsInput: ReadonlyArray<ElectricityProductInput>;
};

/** An enumeration. */
export enum ElectricityMeterTypes {
  /** Key. */
  K = "K",
  /** Smartcard. */
  S = "S",
  /** Token. */
  T = "T",
}

export type ElectricityProductInput = {
  /** Bespoke rates to override default electricity unit rates. */
  readonly bespokeRates: InputMaybe<ElectricityBespokeRates>;
  /** Code specifying the product to quote for. */
  readonly code: InputMaybe<Scalars["String"]["input"]>;
  /** Optional payment method to quote for. */
  readonly paymentMethod: InputMaybe<PaymentMethodChoices>;
};

/** An enumeration. */
export enum ElectricitySupplyType {
  /** Single phase meter point. */
  SinglePhase = "SINGLE_PHASE",
  /** Three phase meter point. */
  ThreePhase = "THREE_PHASE",
}

/** An enumeration. */
export enum Eligibility {
  BusinessAccount = "BUSINESS_ACCOUNT",
  CappedCatchment = "CAPPED_CATCHMENT",
  Eligible = "ELIGIBLE",
  HasSmartTariff = "HAS_SMART_TARIFF",
  IncorrectReadPermission = "INCORRECT_READ_PERMISSION",
  InvalidCatchment = "INVALID_CATCHMENT",
  NoActiveAgreements = "NO_ACTIVE_AGREEMENTS",
  NoRecentReading = "NO_RECENT_READING",
  NoSmartMeter = "NO_SMART_METER",
  OnboardingToSmartTariff = "ONBOARDING_TO_SMART_TARIFF",
}

/** An enumeration. */
export enum EmailFormats {
  Html = "HTML",
  Text = "TEXT",
}

export type EndContributionAgreementInput = {
  /** The ID of the Contribution Agreement to end. */
  readonly contributionAgreementId: Scalars["ID"]["input"];
  /** The future end datetime of the agreement. If not given, terminate now. */
  readonly endAt: InputMaybe<Scalars["DateTime"]["input"]>;
};

export enum EnergyProductAvailability {
  Available = "AVAILABLE",
  Unavailable = "UNAVAILABLE",
}

export enum EnergyProductDirection {
  Export = "EXPORT",
  Import = "IMPORT",
}

/** An enumeration. */
export enum EnergyProductFilters {
  /** Display our business products. */
  Business = "BUSINESS",
  /** Display our domestic products. */
  Domestic = "DOMESTIC",
  /** Display our fixed-term products. */
  Fixed = "FIXED",
  /** Display our greenest products. */
  Green = "GREEN",
  /** Display our prepayment products. */
  Prepay = "PREPAY",
  /** Display our smart (charged half-hourly) products. */
  Smart = "SMART",
  /** Display our variable-term products. */
  Variable = "VARIABLE",
}

/** An enumeration. */
export enum EnergyUnit {
  KilowattHour = "KILOWATT_HOUR",
}

/**
 *
 *     Available vendors supported by Enode.
 *
 */
export enum EnodeVendors {
  Audi = "AUDI",
  Bmw = "BMW",
  Chevrolet = "CHEVROLET",
  Citroen = "CITROEN",
  Cupra = "CUPRA",
  Ds = "DS",
  Fiat = "FIAT",
  Ford = "FORD",
  Hyundai = "HYUNDAI",
  Jaguar = "JAGUAR",
  Kia = "KIA",
  Mercedes = "MERCEDES",
  Mini = "MINI",
  Nissan = "NISSAN",
  Opel = "OPEL",
  Peugeot = "PEUGEOT",
  Porsche = "PORSCHE",
  Renault = "RENAULT",
  Seat = "SEAT",
  Skoda = "SKODA",
  Toyota = "TOYOTA",
  Vauxhall = "VAUXHALL",
  Volkswagen = "VOLKSWAGEN",
  Volvo = "VOLVO",
}

/** An enumeration. */
export enum EnrolmentStatus {
  /** Cancelled */
  Cancelled = "CANCELLED",
  /** Completed */
  Completed = "COMPLETED",
  /** Errored */
  Errored = "ERRORED",
  /** Failed */
  Failed = "FAILED",
  /** In progress */
  InProgress = "IN_PROGRESS",
  /** Not started */
  NotStarted = "NOT_STARTED",
}

/** An enumeration. */
export enum EnrolmentStatusOptions {
  /** Enrolment has been accepted by the industry, which means that it has all the information needed to switch supplier and if that information is correct (to it's knowledge) */
  Accepted = "ACCEPTED",
  /** Enrolment has been completed. */
  Completed = "COMPLETED",
  /** Enrolment has been disputed. This could be that the meter point details that have been provided have been disputed. */
  Disputed = "DISPUTED",
  /** The previous supplier objects to the switch. The have not has cancelled the switch yet, but in 99% cases, they will cancel the switch. */
  ObjectionReceived = "OBJECTION_RECEIVED",
  /** The meterpoint has been created but the enrolment process has not started yet. */
  PreRegistration = "PRE_REGISTRATION",
  /** The previous supplier cancelled the switch. This is a terminal state, and we will have to reapply before this can start again. */
  RegistrationObjected = "REGISTRATION_OBJECTED",
  /** The overseeing industry body has objected to the switch */
  Rejected = "REJECTED",
  /** Enrolment has been requested. This is the default catch-all status, which is returned when no other defined process is happening. */
  Requested = "REQUESTED",
  /** The request to bring the meter point on supply has been withdrawn. */
  Withdrawn = "WITHDRAWN",
}

/** An enumeration. */
export enum EnrolmentStepStatus {
  Cancelled = "CANCELLED",
  Completed = "COMPLETED",
  Errored = "ERRORED",
  Failed = "FAILED",
  InProgress = "IN_PROGRESS",
  Pending = "PENDING",
  Skipped = "SKIPPED",
  Stalled = "STALLED",
}

/** An enumeration. */
export enum EventReasonChoices {
  AdHocCredit = "AD_HOC_CREDIT",
  OctoAssistFundDonation = "OCTO_ASSIST_FUND_DONATION",
  OctoPointsConversion = "OCTO_POINTS_CONVERSION",
  SavingSessionsReward = "SAVING_SESSIONS_REWARD",
}

/** The input type for expiring an EV Public Charging token. */
export type ExpireEvPublicChargingTokenInput = {
  /** Identifier of an account in the external system. */
  readonly externalAccountId: Scalars["String"]["input"];
  /** Token identifier. */
  readonly tokenValue: Scalars["String"]["input"];
  /** The end time of token's validity. */
  readonly validTo: Scalars["DateTime"]["input"];
};

/** An enumeration. */
export enum ExpiringTokenScope {
  /** Scope that enables account user to accept the terms and conditions for a product. */
  AcceptTermsAndConditions = "ACCEPT_TERMS_AND_CONDITIONS",
  /** Scope that enables account user to book smart meter appointments. */
  BookSmartMeterAppointments = "BOOK_SMART_METER_APPOINTMENTS",
  /** Scope that enables account user to checkout a quote (validate terms & conds and provide a payment detail). */
  CheckoutQuote = "CHECKOUT_QUOTE",
  /** Edit Customer Marketing Preference */
  EditCustomerMarketingPreference = "EDIT_CUSTOMER_MARKETING_PREFERENCE",
  /** Scope that enables account user to join campaigns. */
  JoinCampaigns = "JOIN_CAMPAIGNS",
  /** Scope that enables account user to join campaign events. */
  JoinCampaignEvents = "JOIN_CAMPAIGN_EVENTS",
  /** Scope that enables account user to generate a renewal quote and renew agreements. */
  ManageAccountRenewals = "MANAGE_ACCOUNT_RENEWALS",
  /** Scope that enables account user to manage security deposit payments for business accounts. */
  ManageBusinessSecurityDeposit = "MANAGE_BUSINESS_SECURITY_DEPOSIT",
  /** Scope that enables account user to accept goods quotes and process goods purchases. */
  ManageGoodsPurchases = "MANAGE_GOODS_PURCHASES",
  /** Scope that enables account user to do a self-serve product switch through the Dashboard. */
  ManageProductSwitch = "MANAGE_PRODUCT_SWITCH",
  /** Scope that enables account user to redeem loyalty points */
  RedeemLoyaltyPoints = "REDEEM_LOYALTY_POINTS",
  /** Scope that enables account user to report a property move-out. */
  ReportMoveOut = "REPORT_MOVE_OUT",
  /** Scope that enables account user to submit customer feedback. */
  SubmitCustomerFeedback = "SUBMIT_CUSTOMER_FEEDBACK",
  /** Scope that enables account user to submit meter readings. */
  SubmitMeterReadings = "SUBMIT_METER_READINGS",
  /** Scope that enables account user to update their blackhole email address. */
  UpdateBlackholeEmail = "UPDATE_BLACKHOLE_EMAIL",
  /** Update Sensitive Customer Information */
  UpdateSensitiveCustomerInformation = "UPDATE_SENSITIVE_CUSTOMER_INFORMATION",
  /** Scope that enables account user to visit campaign dashboard. */
  ViewCampaignDashboards = "VIEW_CAMPAIGN_DASHBOARDS",
  /** Scope that enables account user to visit detailed property usage pages. */
  ViewDetailedUsage = "VIEW_DETAILED_USAGE",
}

/** The type of generator technology used for export. */
export enum ExportTechnologyType {
  /** Hydro */
  Hydro = "HYDRO",
  /** Photovoltaic */
  Solar = "SOLAR",
  /** Photovoltaic and Storage */
  SolarAndStorage = "SOLAR_AND_STORAGE",
  /** Storage */
  Storage = "STORAGE",
  /** Wind */
  Wind = "WIND",
  /** Wind and Storage */
  WindAndStorage = "WIND_AND_STORAGE",
}

/** Enum of allowable event type categories for external account events. */
export enum ExternalAccountEventCategory {
  Communications = "COMMUNICATIONS",
  Debt = "DEBT",
  Messaging = "MESSAGING",
  Mobile = "MOBILE",
  Web = "WEB",
}

/** A piece of content associated with an external account event. */
export type ExternalAccountEventContent = {
  /** The content type of the content. */
  readonly contentType: ExternalAccountEventContentType;
  /** A human-readable description of the content. */
  readonly description: Scalars["String"]["input"];
  /** The value of the content. */
  readonly value: Scalars["String"]["input"];
};

/**
 * Enum of allowable content types for external account events.
 *
 * The content type field is used to determine how to display the content in the account event
 * description.
 */
export enum ExternalAccountEventContentType {
  Html = "HTML",
  Link = "LINK",
  Plaintext = "PLAINTEXT",
  S3 = "S3",
}

/** Enum of allowable event type subcategories for external account events. */
export enum ExternalAccountEventSubCategory {
  ClickToCall = "CLICK_TO_CALL",
  Dunning = "DUNNING",
  Email = "EMAIL",
  Feedback = "FEEDBACK",
  Print = "PRINT",
  PushNotification = "PUSH_NOTIFICATION",
  Sms = "SMS",
  SocialMedia = "SOCIAL_MEDIA",
  Telephone = "TELEPHONE",
  Whatsapp = "WHATSAPP",
}

/** The ownership status of FiT for this property. */
export enum FitStatus {
  /** None */
  None = "NONE",
  /** Notified */
  Owner = "OWNER",
  /** Previous owner */
  PreviousOwner = "PREVIOUS_OWNER",
  /** Third party owned */
  ThirdPartyOwned = "THIRD_PARTY_OWNED",
  /** Unknown */
  Unknown = "UNKNOWN",
}

/** The input type for sending Fan Club push notifications for discounts. */
export type FanClubDiscountNotificationInput = {
  /** The list of valid catchment areas. */
  readonly catchments: ReadonlyArray<InputMaybe<Scalars["String"]["input"]>>;
  /** The end time of the likely Fan Club discount. */
  readonly endAt: Scalars["DateTime"]["input"];
  /** The start time of the likely Fan Club discount. */
  readonly startAt: Scalars["DateTime"]["input"];
};

export type FitAcceptScheduleInput = {
  /** The account number associated with this schedule. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The ID of the schedule to accept. */
  readonly scheduleId: Scalars["UUID"]["input"];
};

export type FitInstallationInput = {
  readonly fitId: Scalars["String"]["input"];
  readonly meters: ReadonlyArray<InputMaybe<FitMeterInput>>;
};

export type FitMeterInput = {
  readonly id: Scalars["Int"]["input"];
  readonly reading: FitReadingInput;
};

export type FitMeterReadingInput = {
  readonly installations: ReadonlyArray<InputMaybe<FitInstallationInput>>;
};

export type FitReadingInput = {
  readonly isBiennial: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly readAt: Scalars["DateTime"]["input"];
  readonly value: Scalars["Decimal"]["input"];
};

export type FlowTemperatureInput = {
  /** Flow temperature if weather compensation is off. */
  readonly flowTemperature: InputMaybe<TemperatureInput>;
  /** Whether weather compensation should be enabled or not. */
  readonly useWeatherCompensation: Scalars["Boolean"]["input"];
  /** The min and max temperatures for when weather compensation is enabled. */
  readonly weatherCompensationValues: InputMaybe<TemperatureRangeInput>;
};

/** The input type for repudiating previously issued Kraken Tokens and refresh tokens. */
export type ForceReauthenticationInput = {
  /** Also force third-party applications you have authorized to use your account to reauthenticate. */
  readonly includeThirdParties: Scalars["Boolean"]["input"];
};

export type FormSubmissionInput = {
  readonly accountNumber: Scalars["String"]["input"];
  /** Form content */
  readonly content: Scalars["JSONString"]["input"];
  /** Form type */
  readonly formType: InputMaybe<FormType>;
};

/** An enumeration. */
export enum FormType {
  /** Covid-19 Financial Energy Assessment */
  Covid_19FinancialEnergyAssessment = "COVID_19_FINANCIAL_ENERGY_ASSESSMENT",
  /** Covid-19 Gas Prices Financial Energy Assessment */
  Covid_19GasPricesFinancialEnergyAssessment = "COVID_19_GAS_PRICES_FINANCIAL_ENERGY_ASSESSMENT",
}

/** An enumeration. */
export enum FuelType {
  /** Dual Fuel. */
  DualFuel = "DUAL_FUEL",
  /** Electricity. */
  Electricity = "ELECTRICITY",
  /** Gas. */
  Gas = "GAS",
}

/** An enumeration. */
export enum FuelTypeChoices {
  /** Dual Fuel. */
  DualFuel = "DUAL_FUEL",
  /** Electricity. */
  Electricity = "ELECTRICITY",
  /** Gas. */
  Gas = "GAS",
}

/** An enumeration. */
export enum GspGroupIdsOptions {
  A = "_A",
  B = "_B",
  C = "_C",
  D = "_D",
  E = "_E",
  F = "_F",
  G = "_G",
  H = "_H",
  J = "_J",
  K = "_K",
  L = "_L",
  M = "_M",
  N = "_N",
  P = "_P",
}

export type GasBespokeRates = {
  /** Standing charge for gas. */
  readonly standingCharge: Scalars["Decimal"]["input"];
  /** Standard bespoke rate for gas. */
  readonly value: Scalars["Decimal"]["input"];
};

export type GasConsumptionInput = {
  /** If the consumption values are estimated, set this to 'True'. */
  readonly isEstimate: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Amount of gas consumed. */
  readonly value: Scalars["Int"]["input"];
};

/**
 *
 * Filter measurements by gas parameters.
 *
 */
export type GasFiltersInput = {
  readonly deviceId: InputMaybe<Scalars["String"]["input"]>;
  readonly marketSupplyPointId: InputMaybe<Scalars["String"]["input"]>;
  readonly readingFrequencyType: InputMaybe<ReadingFrequencyType>;
  readonly registerId: InputMaybe<Scalars["String"]["input"]>;
};

/** An enumeration. */
export enum GasMeterMechanism {
  /** Coin Meter */
  Cm = "CM",
  /** Credit */
  Cr = "CR",
  /** Electronic Token Meter */
  Et = "ET",
  /** Mechanical Token Meter */
  Mt = "MT",
  /** Non Compliant SMETS Smart Meter */
  Ns = "NS",
  /** Prepayment */
  Pp = "PP",
  /** SMETS 1 compliant Smart Meter */
  S1 = "S1",
  /** SMETS 2 compliant Smart Meter */
  S2 = "S2",
  /** Thrift */
  Th = "TH",
  /** Unknown */
  U = "U",
}

export type GasMeterPointConsumptionInput = {
  readonly annualConsumption: InputMaybe<Scalars["Int"]["input"]>;
  readonly isEstimate: Scalars["Boolean"]["input"];
  readonly mprn: InputMaybe<Scalars["String"]["input"]>;
};

export type GasMeterPointInput = {
  /** Annual consumption values for this meter point. */
  readonly consumption: InputMaybe<GasConsumptionInput>;
  /** The grid supply point ID of this meter point. */
  readonly gspId: InputMaybe<Scalars["String"]["input"]>;
  /** Must be provided if no custom consumption input is provided. */
  readonly mprn: InputMaybe<Scalars["String"]["input"]>;
};

/** An enumeration. */
export enum GasMeterPointMarketCategory {
  /** LSP */
  Lsp = "LSP",
  /** SSP */
  Ssp = "SSP",
}

/** An enumeration. */
export enum GasMeterPointMarketSectorCode {
  /** Domestic */
  D = "D",
  /** Industrial */
  I = "I",
}

/** An enumeration. */
export enum GasMeterPointMeterOwnershipType {
  /** Customer */
  C = "C",
  /** Supplier */
  S = "S",
  /** Transporter */
  T = "T",
}

export type GasMeterPointProductsInput = {
  /** Annual consumption values for this meter point. */
  readonly consumption: InputMaybe<GasConsumptionInput>;
  /** The grid supply point ID of this meter point. */
  readonly gspId: InputMaybe<Scalars["String"]["input"]>;
  /** Must be provided if no custom consumption input is provided. */
  readonly mprn: InputMaybe<Scalars["String"]["input"]>;
  /** A list of products and optional product parameters to quote for. */
  readonly productsInput: ReadonlyArray<GasProductInput>;
};

/** An enumeration. */
export enum GasMeterStatus {
  /** Capped */
  Ca = "CA",
  /** Clamped */
  Cl = "CL",
  /** Cut off */
  Cu = "CU",
  /** Faulty */
  Fa = "FA",
  /** Inactive */
  In = "IN",
  /** Live */
  Li = "LI",
  /** Not Installed */
  Ni = "NI",
  /** Other */
  Ot = "OT",
  /** Removed */
  Re = "RE",
  /** Spin Cap */
  Sp = "SP",
  /** Unknown */
  Un = "UN",
}

/** An enumeration. */
export enum GasMeterTypes {
  /** Electronic token. */
  Et = "ET",
  /** Prepayment. */
  Pp = "PP",
}

export type GasProductInput = {
  /** Bespoke rates to override default gas unit rates. */
  readonly bespokeRates: InputMaybe<GasBespokeRates>;
  /** Code specifying the product to quote for. */
  readonly code: InputMaybe<Scalars["String"]["input"]>;
  /** Optional payment method to quote for. */
  readonly paymentMethod: InputMaybe<PaymentMethodChoices>;
};

/** An enumeration. */
export enum GasSupplyType {
  /** Medium pressure gas supply. */
  Medium = "MEDIUM",
  /** Standard pressure gas supply. */
  Standard = "STANDARD",
}

export type GenerateInkPresignedUrlInput = {
  /** The channel of the contact. */
  readonly channel: InkCommunicationChannel;
  /** The name of the file. */
  readonly filename: Scalars["String"]["input"];
};

/** The input for getting the client secret for an embedded new card payment method form. */
export type GetEmbeddedSecretForNewPaymentInstructionInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The type of the new payment instruction. */
  readonly instructionType: PaymentType;
  /**
   * **WARNING: Will be mandatory in future versions**
   *
   *  The ledger ID.
   */
  readonly ledgerId: InputMaybe<Scalars["String"]["input"]>;
};

/** The input needed for getting the external URL for setting up a payment instruction. */
export type GetHostedUrlForNewPaymentInstructionInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The type of the new payment instruction. */
  readonly instructionType: PaymentType;
  /** The ledger number. */
  readonly ledgerNumber: Scalars["String"]["input"];
  /** The URL to redirect the user to after the action was cancelled. */
  readonly returnUrlCancel: InputMaybe<Scalars["String"]["input"]>;
  /** The URL to redirect the user to after the action resulted in an error. */
  readonly returnUrlError: InputMaybe<Scalars["String"]["input"]>;
  /** The URL to redirect the user to after the action resulted in a failure. */
  readonly returnUrlFailure: InputMaybe<Scalars["String"]["input"]>;
  /** The URL to redirect the user to after the action was completed successfuly. */
  readonly returnUrlSuccess: InputMaybe<Scalars["String"]["input"]>;
};

/** The greenness index LOW/MEDIUM/HIGH (higher is greener). */
export enum GreennessForecastIndex {
  High = "HIGH",
  Low = "LOW",
  Medium = "MEDIUM",
}

/** An enumeration. */
export enum HardshipAgreementHardshipEntryReason {
  /** Financial counsellor or external agent referral */
  ExternalReference = "EXTERNAL_REFERENCE",
  /** Retailer referral */
  RetailerReferral = "RETAILER_REFERRAL",
  /** Customer self-identified as being in hardship */
  SelfIdentified = "SELF_IDENTIFIED",
}

/** An enumeration. */
export enum HardshipAgreementHardshipType {
  /** Death in the family */
  DeathInFamily = "DEATH_IN_FAMILY",
  /** Family violence */
  FamilyViolence = "FAMILY_VIOLENCE",
  /** Household illness */
  HouseholdIllness = "HOUSEHOLD_ILLNESS",
  /** Other */
  Other = "OTHER",
  /** Reduced income */
  ReducedIncome = "REDUCED_INCOME",
  /** Unemployment */
  Unemployment = "UNEMPLOYMENT",
}

/** An enumeration. */
export enum HeatPumpHeatType {
  ElectricBoiler = "ELECTRIC_BOILER",
  ElectricRadiator = "ELECTRIC_RADIATOR",
  ElectricStorageHeater = "ELECTRIC_STORAGE_HEATER",
  LpgBoiler = "LPG_BOILER",
  MainsGasBoiler = "MAINS_GAS_BOILER",
  OilBoiler = "OIL_BOILER",
  Other = "OTHER",
}

export type HeatPumpInput = {
  /** The heat pump variant ID. */
  readonly heatPumpId: Scalars["ID"]["input"];
};

/** An enumeration. */
export enum HeatPumpPropertyType {
  Detached = "DETACHED",
  EndOfTerrace = "END_OF_TERRACE",
  Flat = "FLAT",
  FlatGroundFloor = "FLAT_GROUND_FLOOR",
  Other = "OTHER",
  SemiDetached = "SEMI_DETACHED",
  Terrace = "TERRACE",
}

export type HotWaterStateInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The state that the hot water device should be set to. A value of true indicates that the device should be turned on, and a value of false indicates it should be switched off.  */
  readonly state: Scalars["Boolean"]["input"];
};

/** An enumeration. */
export enum IneligibilityReasons {
  ActiveExclusionCampaign = "ACTIVE_EXCLUSION_CAMPAIGN",
  AlreadySignedUp = "ALREADY_SIGNED_UP",
  IncorrectBrand = "INCORRECT_BRAND",
  NoDirectDebit = "NO_DIRECT_DEBIT",
  NoEligibleMeters = "NO_ELIGIBLE_METERS",
  NoProperties = "NO_PROPERTIES",
  OctoplusDisabled = "OCTOPLUS_DISABLED",
}

/**
 * Input fields for initiating a hosted standalone payment.
 *
 * The amount should always be provided in the minor unit of currency (e.g., pence not pounds,
 * cents not dollars, etc.).
 *
 * A standalone payment can be made against a specific ledger (e.g., a debt ledger) by
 * providing the ledger id. Accounts have a default ledger that will be used if not provided.
 */
export type InitiateHostedStandalonePaymentInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The amount to be collected in the minor unit of currency. */
  readonly amount: Scalars["Int"]["input"];
  /** The method by which the payment is being collected. */
  readonly collectionMethod: CollectionMethod;
  /** A description of the purpose of the payment. */
  readonly description: Scalars["String"]["input"];
  /** The id of the specific ledger against which this payment should be applied. Please provide either ledger number or ID. */
  readonly ledgerId: InputMaybe<Scalars["ID"]["input"]>;
  /** The number of the specific ledger against which this payment should be applied. Please provide either ledger number or ID. */
  readonly ledgerNumber: InputMaybe<Scalars["String"]["input"]>;
  /** The URL to redirect the user to after the action was cancelled. */
  readonly returnUrlCancel: InputMaybe<Scalars["String"]["input"]>;
  /** The URL to redirect the user to after the action resulted in an error. */
  readonly returnUrlError: InputMaybe<Scalars["String"]["input"]>;
  /** The URL to redirect the user to if the url is not longer valid. */
  readonly returnUrlExpired: InputMaybe<Scalars["String"]["input"]>;
  /** The URL to redirect the user to after the action resulted in a failure. */
  readonly returnUrlFailure: InputMaybe<Scalars["String"]["input"]>;
  /** The URL to redirect the user to after the action was completed but the payment is still being processed. */
  readonly returnUrlPending: InputMaybe<Scalars["String"]["input"]>;
  /** The URL to redirect the user to after the action was completed successfuly. */
  readonly returnUrlSuccess: InputMaybe<Scalars["String"]["input"]>;
};

/**
 * Input fields for initiating a standalone payment.
 *
 * The amount should always be provided in the minor unit of currency (e.g., pence not pounds,
 * cents not dollars, etc.).
 *
 * A standalone payment can be made against a specific ledger (e.g., a debt ledger) by
 * providing the ledger id. Accounts have a default ledger that will be used if not provided.
 */
export type InitiateStandalonePaymentInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The amount to be collected in the minor unit of currency. */
  readonly amount: Scalars["Int"]["input"];
  /** The method by which the payment is being collected. */
  readonly collectionMethod: InputMaybe<CollectionMethod>;
  /** A description of the purpose of the payment. */
  readonly description: Scalars["String"]["input"];
  /** The id of the specific ledger against which this payment should be applied. */
  readonly ledgerId: InputMaybe<Scalars["ID"]["input"]>;
};

/** An enumeration. */
export enum InkCommunicationChannel {
  Email = "EMAIL",
  GenericApi = "GENERIC_API",
  Post = "POST",
  Sms = "SMS",
  Whatsapp = "WHATSAPP",
}

export enum InkConversationStatus {
  Closed = "CLOSED",
  Open = "OPEN",
  OpenCustomerReplied = "OPEN_CUSTOMER_REPLIED",
  OpenNew = "OPEN_NEW",
  OpenReminded = "OPEN_REMINDED",
  Snoozed = "SNOOZED",
}

/** This type is used to create an inbound email. */
export type InkEmailMessageInput = {
  /** Message attachments. */
  readonly attachments: InputMaybe<
    ReadonlyArray<InkGenericMessageAttachmentInput>
  >;
  /** The carbon copy (cc) email addresses the message was sent to. */
  readonly ccAddresses: InputMaybe<ReadonlyArray<Scalars["Email"]["input"]>>;
  /** The email address the message was sent from. */
  readonly fromAddress: Scalars["Email"]["input"];
  /** The content of the message, as plain text. */
  readonly plainTextContent: Scalars["String"]["input"];
  /** The S3 bucket in which the original email is stored. */
  readonly s3Bucket: InputMaybe<Scalars["String"]["input"]>;
  /** The S3 key of the original email. */
  readonly s3Key: InputMaybe<Scalars["String"]["input"]>;
  /** The email subject/title. */
  readonly subject: Scalars["String"]["input"];
  /** The email addresses the message was sent to. */
  readonly toAddresses: ReadonlyArray<Scalars["Email"]["input"]>;
};

export type InkGenericMessageAttachmentInput = {
  /** The S3 bucket of the attachment. */
  readonly s3Bucket: Scalars["String"]["input"];
  /** The S3 key of the attachment. */
  readonly s3Key: Scalars["String"]["input"];
};

/** This type is used to create an generic message. */
export type InkGenericMessageInput = {
  /** Message attachments. */
  readonly attachments: InputMaybe<
    ReadonlyArray<InkGenericMessageAttachmentInput>
  >;
  /** The identity the message was sent from. */
  readonly fromHandle: Scalars["String"]["input"];
  /** The content of the message, as plain text. */
  readonly plainTextContent: Scalars["String"]["input"];
  /** The identity the message was sent to. */
  readonly toHandle: Scalars["String"]["input"];
};

export enum InkMessageDeliveryStatus {
  Delivered = "DELIVERED",
  Failed = "FAILED",
  OutsideReplyWindow = "OUTSIDE_REPLY_WINDOW",
  Pending = "PENDING",
  Sent = "SENT",
}

export enum InkMessageDirection {
  Inbound = "INBOUND",
  Outbound = "OUTBOUND",
}

/**
 * An Ink message used as an input.
 *
 * This is intended to be morally equivalent to a tagged union; exactly
 * one of the properties provided here is expected to be provided.
 *
 * At current, only the generic message type is provided, because only
 * the generic message type is currently supported as an input type.
 * This is intended to be a backwards-compatible extension point to
 * allow other message input types to be added in the future.
 */
export type InkMessageInput = {
  readonly email: InputMaybe<InkEmailMessageInput>;
  readonly generic: InputMaybe<InkGenericMessageInput>;
  readonly post: InputMaybe<InkPostMessageInput>;
};

/** This type is used to create an inbound post. */
export type InkPostMessageInput = {
  /** The account number that the letter was sent from. */
  readonly accountNumber: InputMaybe<Scalars["String"]["input"]>;
  /** Message attachments. */
  readonly attachments: InputMaybe<
    ReadonlyArray<InkGenericMessageAttachmentInput>
  >;
  /** Notes on the letter. */
  readonly notes: InputMaybe<Scalars["String"]["input"]>;
  /** The content of the message, as plain text. */
  readonly plainTextContent: Scalars["String"]["input"];
};

/**
 *
 *     The frequency at which contributations are made
 *
 */
export enum Interval {
  Monthly = "MONTHLY",
  Quarterly = "QUARTERLY",
}

/** Input for invalidating an arbitrary payment instruction. */
export type InvalidatePaymentInstructionInput = {
  readonly accountNumber: Scalars["String"]["input"];
  /** The id of the payment instruction to be invalidated. */
  readonly id: Scalars["String"]["input"];
};

/** Input type for the InvalidatePreSignedToken mutation. */
export type InvalidatePreSignedTokenInput = {
  readonly token: Scalars["String"]["input"];
};

/** Input type for the InvalidatePreSignedTokensForUser mutation. */
export type InvalidatePreSignedTokensForUserInput = {
  /** The email address of the user whose tokens should be invalidated. */
  readonly email: Scalars["String"]["input"];
  /** The scope of the token to invalidate.  If this argument is not specified, all pre-signed tokens issued to the user are invalidated. */
  readonly scope: InputMaybe<PreSignedTokenScope>;
};

/** Input type for the InvalidateRefreshToken mutation. */
export type InvalidateRefreshTokenInput = {
  readonly refreshToken: Scalars["String"]["input"];
};

/** Input type for the InvalidateRefreshTokensForUser mutation. */
export type InvalidateRefreshTokensForUserInput = {
  /** The email address of the user whose tokens should be invalidated. */
  readonly email: Scalars["String"]["input"];
};

/** An enumeration. */
export enum JoinConsumerDeviceChoices {
  /** Alternative Home Area Network. */
  AltHan = "ALT_HAN",
  /** Consumer Access Device. */
  Cad = "CAD",
  /** In-Home Display. */
  Ihd = "IHD",
  /** Pre-Payment Meter Interface Device. */
  Ppmid = "PPMID",
}

export type JoinConsumerDeviceInput = {
  /** Device ID of the CHF (Communications Hub Function). */
  readonly chfDeviceId: Scalars["String"]["input"];
  /** Device ID (IHD, PPMID, CAD or Alt HAN) of the device being added to the CHF. */
  readonly consumerDeviceId: Scalars["String"]["input"];
  /** The device type being joined to the CHF. */
  readonly consumerDeviceType: JoinConsumerDeviceChoices;
  /** The fuel type of the device, electricity, gas or dual fuel */
  readonly fuelType: InputMaybe<FuelTypeChoices>;
  /** Code provided by manufacturer as part of ASN data, and included as part of device pre-notification, which can be required to authorise the joined device. */
  readonly installationCode: InputMaybe<Scalars["String"]["input"]>;
};

/** The input type for signing an account up to Fan Club. */
export type JoinFanClubInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The list of catchments that have exceeded the member cap. */
  readonly cappedCatchments: InputMaybe<
    ReadonlyArray<InputMaybe<Scalars["String"]["input"]>>
  >;
  /** The list of valid catchment areas. */
  readonly catchments: ReadonlyArray<InputMaybe<Scalars["String"]["input"]>>;
  /** User's email address. */
  readonly email: Scalars["String"]["input"];
};

/** The input type for signing an account up to Saving Sessions. */
export type JoinSavingSessionsCampaignInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The MPAN to be signed up. */
  readonly mpan: Scalars["String"]["input"];
};

/** The input type for opting an account in to a Saving Sessions event. */
export type JoinSavingSessionsEventInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The code of the event the user is trying to sign up to. */
  readonly eventCode: Scalars["String"]["input"];
};

/**
 *
 *     Types of devices that can be joined to a HAN (Home Area Network).
 *
 */
export enum JoinableDeviceType {
  /** HAN Connected Auxiliary Load Control Switch (HCALCS). */
  AuxSwitch = "AUX_SWITCH",
  /** Electricity meter. */
  ElectricityMeter = "ELECTRICITY_METER",
  /** Gas meter. */
  GasMeter = "GAS_METER",
  /** In-Home Display. */
  Ihd = "IHD",
  /** Pre-Payment Meter Interface Device. */
  Ppmid = "PPMID",
}

/**
 * The current lifecycle status of a KrakenFlex device on the smarter tariff API:
 *
 * - `ONBOARDING` indicates the device has been registered on the system but has not yet completed the on-boarding process.
 *     - Including a test charge step, to validate that communication and control of the device is possible within expected limits.
 * - `ONBOARDING_TEST_IN_PROGRESS` indicates that there is a test charge in progress for the device.
 * - `LIVE` indicates that the device has completed the on-boarding process and is ready for control.
 * - `FAILED_ONBOARDING_TEST` indicates that there has been an issue validating that the device can be reliably communicated with or controlled on the system.
 * - `RETIRED` indicates that the device has no connection details and is not currently available for control.
 */
export enum KrakenFlexDeviceStatusChoices {
  FailedOnboardingTest = "FAILED_ONBOARDING_TEST",
  Live = "LIVE",
  Onboarding = "ONBOARDING",
  OnboardingTestInProgress = "ONBOARDING_TEST_IN_PROGRESS",
  PendingLive = "PENDING_LIVE",
  Retired = "RETIRED",
}

/**
 *
 *     The device types that can be controlled by KrakenFlex.
 *
 */
export enum KrakenFlexDeviceTypes {
  Batteries = "BATTERIES",
  ElectricVehicles = "ELECTRIC_VEHICLES",
  HeatPumps = "HEAT_PUMPS",
  Inverters = "INVERTERS",
  StorageHeaters = "STORAGE_HEATERS",
  Thermostats = "THERMOSTATS",
}

export type LeaveSupplierInput = {
  /** The Kraken account number. */
  readonly accountNumber: Scalars["String"]["input"];
  readonly marketData: InputMaybe<LeaveSupplierMarketInputType>;
  /** The requested last day of supply. */
  readonly requestedSupplyEndDate: Scalars["Date"]["input"];
};

export type LeaveSupplierMarketInputType = {
  /** A list of supply points for initiating a leave supplier journey. */
  readonly supplyPointData: InputMaybe<
    ReadonlyArray<InputMaybe<_DefaultMarketTerminationInput>>
  >;
};

/** The status of the LeaveSupplier process. */
export enum LeaveSupplierProcessStatus {
  Cancelled = "CANCELLED",
  Completed = "COMPLETED",
  Errored = "ERRORED",
  Failed = "FAILED",
  InProgress = "IN_PROGRESS",
  PartiallyCancelled = "PARTIALLY_CANCELLED",
  PartiallyCompleted = "PARTIALLY_COMPLETED",
  PartiallyReversed = "PARTIALLY_REVERSED",
  Pending = "PENDING",
  Reversed = "REVERSED",
  Stalled = "STALLED",
}

export type LifecycleAddressInput = {
  /** Country code. */
  readonly countryCode: InputMaybe<Scalars["String"]["input"]>;
  /** Line 1 of address. */
  readonly line1: Scalars["String"]["input"];
  /** Line 2 of address. */
  readonly line2: InputMaybe<Scalars["String"]["input"]>;
  /** Line 3 of address. */
  readonly line3: InputMaybe<Scalars["String"]["input"]>;
  /** Line 4 of address. */
  readonly line4: InputMaybe<Scalars["String"]["input"]>;
  /** Line 5 of address. */
  readonly line5: InputMaybe<Scalars["String"]["input"]>;
  /** Postal code. */
  readonly postalCode: Scalars["String"]["input"];
};

/**
 *
 *     Set of band categories that are currently
 *     supported for creating product rates.
 *
 */
export enum LimitedBandCategories {
  ConsumptionCharge = "CONSUMPTION_CHARGE",
  StandingCharge = "STANDING_CHARGE",
}

/** An enumeration. */
export enum LineItemGroupingOptions {
  Day = "DAY",
  HalfHour = "HALF_HOUR",
  Hour = "HOUR",
  Month = "MONTH",
  None = "NONE",
  Quarter = "QUARTER",
  Week = "WEEK",
}

/** An enumeration. */
export enum LineItemTypeOptions {
  ConsumptionCharge = "CONSUMPTION_CHARGE",
  StandingCharge = "STANDING_CHARGE",
}

export enum LineLinkErrorType {
  AlreadyLinked = "ALREADY_LINKED",
  NoMatchingLineLink = "NO_MATCHING_LINE_LINK",
}

/** An enumeration. */
export enum LinkTrainingStatus {
  /** In training */
  InTraining = "IN_TRAINING",
  /** Not applicable */
  NotApplicable = "NOT_APPLICABLE",
  /** Qualified */
  Qualified = "QUALIFIED",
}

/** Link an AccountUser to a LINE account. */
export type LinkUserToLineInput = {
  readonly linkToken: Scalars["String"]["input"];
};

export enum LinkedObjectType {
  Account = "ACCOUNT",
  AccountUser = "ACCOUNT_USER",
}

/** An enumeration. */
export enum MamAgentContractContractType {
  /** Meter Asset Manager */
  Mam = "MAM",
}

/** An enumeration. */
export enum MaximumRefundReasonChoices {
  /** Maximum refund is equal to the maximum refund amount allowed to be requested via the dashboard. */
  MaxAllowedToRequestViaDashboard = "MAX_ALLOWED_TO_REQUEST_VIA_DASHBOARD",
  /** Maximum refund is equal to the current balance minus the account recommended balance. */
  MaxAvailableAmount = "MAX_AVAILABLE_AMOUNT",
  /** Maximum refund is equal to the total amount the customer has paid using the current account Direct Debit instruction. */
  TotalAmountPaidViaActiveDdi = "TOTAL_AMOUNT_PAID_VIA_ACTIVE_DDI",
}

/** An enumeration. */
export enum MessageChannel {
  /** Email */
  Email = "EMAIL",
  /** Intercom */
  Intercom = "INTERCOM",
  /** Junifer */
  Junifer = "JUNIFER",
  /** Print */
  Print = "PRINT",
  /** Push Notification */
  PushNotification = "PUSH_NOTIFICATION",
  /** SMS */
  Sms = "SMS",
}

/** The metadata input type for mutations. */
export type MetadataInput = {
  /** An identifier for the associated object, e.g. account_number for the Account linked object type. */
  readonly identifier: Scalars["String"]["input"];
  /** The key for the metadata. */
  readonly key: Scalars["String"]["input"];
  /** The object that the metadata is associated with. */
  readonly linkedObjectType: LinkedObjectType;
  /** The metadata value which should be a valid JSON string. */
  readonly value: Scalars["JSONString"]["input"];
};

export type MeterInput = {
  /** The type of meter. This field is not required but should be supplied whenever possible. */
  readonly meterType: InputMaybe<Scalars["String"]["input"]>;
  /** Serial number of the meter involved in the appointments */
  readonly serialNumber: Scalars["String"]["input"];
  /** Whether the meter details refer to a meter that is currently installed at the site or one that has been removed or replaced. */
  readonly status: InputMaybe<MeterStatus>;
};

export type MeterPointSwitchContext = {
  /** The date the product switch should take effect. Defaults to the current agreement end date, or tomorrow if the agreement is open-ended. */
  readonly changeOn: InputMaybe<Scalars["Date"]["input"]>;
  /** Information on the commission that's associated with this agreement. */
  readonly commission: InputMaybe<CommissionInput>;
  /** Should the meter point be on a flat rate. */
  readonly flatRate: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The MPxN of the meter point. */
  readonly mpxn: Scalars["String"]["input"];
  /** The ID of the selected quoted product. */
  readonly quotedProductId: Scalars["ID"]["input"];
};

/** Represents groupings of meter reading events Meter readings can be filtered by these event types. */
export enum MeterReadingEventType {
  ChangeOfSupply = "CHANGE_OF_SUPPLY",
  Customer = "CUSTOMER",
  DataCollector = "DATA_COLLECTOR",
  Estimate = "ESTIMATE",
  MeterExchange = "METER_EXCHANGE",
  Prepay = "PREPAY",
  PreSupplier = "PRE_SUPPLIER",
  SmartMeter = "SMART_METER",
}

/** An enumeration. */
export enum MeterStatus {
  /** The meter was installed or work was done on an existing meter. */
  OnSite = "ON_SITE",
  /** The meter was removed. */
  Removed = "REMOVED",
}

export enum MeterType {
  Economy7 = "ECONOMY7",
  FlatEconomy7 = "FLAT_ECONOMY7",
  FlatThreeRate = "FLAT_THREE_RATE",
  Smart = "SMART",
  SmartEconomy7 = "SMART_ECONOMY7",
  SmartFlatEconomy7 = "SMART_FLAT_ECONOMY7",
  Standard = "STANDARD",
  ThreeRate = "THREE_RATE",
}

/** An enumeration. */
export enum MeterTypeChoices {
  /** Electricity meter. */
  ElectricityMeter = "ELECTRICITY_METER",
  /** Gas meter. */
  GasMeter = "GAS_METER",
}

/** An enumeration. */
export enum MeterTypes {
  Economy7 = "ECONOMY7",
  FlatEconomy7 = "FLAT_ECONOMY7",
  FlatThreeRate = "FLAT_THREE_RATE",
  NoMeter = "NO_METER",
  Other = "OTHER",
  Smart = "SMART",
  SmartEconomy7 = "SMART_ECONOMY7",
  SmartFlatEconomy7 = "SMART_FLAT_ECONOMY7",
  Standard = "STANDARD",
  ThreeRate = "THREE_RATE",
}

/** An enumeration. */
export enum Mode {
  Auto = "AUTO",
  Boost = "BOOST",
  Off = "OFF",
  On = "ON",
}

export type MoveInNewProperty = {
  /** Street address of the new property. Should not contain the postcode. */
  readonly address: Scalars["String"]["input"];
  /** Date of moving into the new property. */
  readonly moveInDate: InputMaybe<Scalars["String"]["input"]>;
  /** If True, this will trigger the move in flow at the new property for the account. */
  readonly moveInNewProperty: InputMaybe<Scalars["Boolean"]["input"]>;
  /** MPANs of the electricity meter points at the new property. */
  readonly mpans: InputMaybe<
    ReadonlyArray<InputMaybe<Scalars["String"]["input"]>>
  >;
  /** MPRNs of the gas meter points at the new property. */
  readonly mprns: InputMaybe<
    ReadonlyArray<InputMaybe<Scalars["String"]["input"]>>
  >;
  /** Postcode of new property. */
  readonly postcode: Scalars["String"]["input"];
  /** The product to use when creating agreements for the new property. If not provided, the current product for each meter point is used if available, or else the default SVT product. If provided, quote_code must also be provided. */
  readonly productCode: InputMaybe<Scalars["String"]["input"]>;
  /** A quote that contains the product provided in product_code. Should be provided only if product_code is also provided. */
  readonly quoteCode: InputMaybe<Scalars["String"]["input"]>;
};

export type MoveOutInput = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly moveOutDate: Scalars["Date"]["input"];
  /** The property to perform a move in for. */
  readonly newProperty: InputMaybe<MoveInNewProperty>;
  /** The details of the next occupant of the property. */
  readonly newTenant: InputMaybe<MoveOutNewTenant>;
  readonly propertyId: Scalars["String"]["input"];
};

export type MoveOutNewTenant = {
  readonly email: InputMaybe<Scalars["String"]["input"]>;
  readonly familyName: InputMaybe<Scalars["String"]["input"]>;
  readonly givenName: InputMaybe<Scalars["String"]["input"]>;
  readonly mobile: InputMaybe<Scalars["String"]["input"]>;
  readonly role: InputMaybe<Scalars["String"]["input"]>;
};

export type NewAccountInput = {
  /** Account type to quote for (e.g. Business or Domestic). */
  readonly accountType: AccountTypeChoices;
  /** Optional ID of the affiliate session active when creating this quote. */
  readonly affiliateSessionId: InputMaybe<Scalars["String"]["input"]>;
  /** Company brand to quote for. */
  readonly brandCode: Scalars["String"]["input"];
  /** Optional parameter for the payment method to quote for. Defaults to Direct Debit. */
  readonly paymentMethod: InputMaybe<PaymentMethodChoices>;
};

export type NewLeadInputType = {
  /** Lead email. */
  readonly email: InputMaybe<Scalars["String"]["input"]>;
  /** To know if the lead is domestic or business. */
  readonly leadType: InputMaybe<Scalars["String"]["input"]>;
  /** The product the lead is interested in. */
  readonly marketName: InputMaybe<Scalars["String"]["input"]>;
  /** Lead name. */
  readonly name: InputMaybe<Scalars["String"]["input"]>;
  /** Lead phone. */
  readonly phone: InputMaybe<Scalars["String"]["input"]>;
  /** The source where the lead comes from. */
  readonly source: InputMaybe<Scalars["String"]["input"]>;
};

/** An enumeration. */
export enum NewMeterCategory {
  /** Check Meter. */
  CheckMeter = "CHECK_METER",
  /** SMETS1 (first generation smart meter). */
  Smets1 = "SMETS1",
  /** SMETS2 (second generation smart meter). */
  Smets2 = "SMETS2",
  /** Traditional meter. */
  Traditional = "TRADITIONAL",
}

/** An enumeration. */
export enum NonBespokeElectricityRateTypeChoices {
  Eco7Day = "ECO7_DAY",
  Eco7Night = "ECO7_NIGHT",
  OffPeak = "OFF_PEAK",
  Standard = "STANDARD",
}

/** An enumeration. */
export enum NotifiableApplicationExternalProvider {
  /** AWS Pinpoint */
  Pinpoint = "PINPOINT",
}

/** An enumeration. */
export enum NotifiableApplicationService {
  /** iOS (APNs) */
  Apns = "APNS",
  /** iOS Sandbox (APNs Sandbox) */
  ApnsSandbox = "APNS_SANDBOX",
  /** Android (GCM) */
  Gcm = "GCM",
}

export type OcppAuthenticationInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The OCPP authentication details. */
  readonly details: Scalars["String"]["input"];
};

/** The input type for obtaining a Kraken Token (JWT). */
export type ObtainJsonWebTokenInput = {
  /** API key of the account user. Use standalone, don't provide a second input field. */
  readonly APIKey: InputMaybe<Scalars["String"]["input"]>;
  /** Email address of the account user. Use with 'password' field. */
  readonly email: InputMaybe<Scalars["String"]["input"]>;
  /** Live secret key of an third-party organization. Use standalone, don't provide a second input field. */
  readonly organizationSecretKey: InputMaybe<Scalars["String"]["input"]>;
  /** Password of the account user. Use with 'email' field. */
  readonly password: InputMaybe<Scalars["String"]["input"]>;
  /** Short-lived, temporary key (that's pre-signed). Use standalone, don't provide a second input field. */
  readonly preSignedKey: InputMaybe<Scalars["String"]["input"]>;
  /** The refresh token that can be used to extend the expiry claim of a Kraken token. Use standalone, don't provide a second input field. */
  readonly refreshToken: InputMaybe<Scalars["String"]["input"]>;
};

/** The input type for obtaining a long-lived refresh token. */
export type ObtainLongLivedRefreshTokenInput = {
  /** The Kraken Token that will be used to generate the long-lived refresh token. */
  readonly krakenToken: Scalars["String"]["input"];
};

export type OccupyInput = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly directDebitInstruction: InputMaybe<DirectDebitInstructionLocalBankDetailsInput>;
  readonly moveInDate: InputMaybe<Scalars["Date"]["input"]>;
  /** The day of the month that payments should be taken from the account. Should be between 1 and 28. */
  readonly paymentDay: InputMaybe<Scalars["Int"]["input"]>;
  readonly productCode: Scalars["String"]["input"];
  readonly propertyId: Scalars["String"]["input"];
  readonly quoteCode: Scalars["String"]["input"];
  readonly users: InputMaybe<ReadonlyArray<InputMaybe<AccountUserInput>>>;
};

export enum OctoplusRewardStatus {
  Cancelled = "CANCELLED",
  Issued = "ISSUED",
  Pending = "PENDING",
}

/** Whether the action was a turn-on or a turn-off. */
export enum OperationAction {
  Off = "OFF",
  On = "ON",
}

/** An enumeration. */
export enum PaymentFrequencyOptions {
  /** Monthly */
  Monthly = "Monthly",
  /** Planned */
  Planned = "Planned",
  /** Weekly */
  Weekly = "Weekly",
}

/** An enumeration. */
export enum PaymentMethod {
  DirectDebit = "DIRECT_DEBIT",
  NonDirectDebit = "NON_DIRECT_DEBIT",
  Prepayment = "PREPAYMENT",
}

export enum PaymentMethodChoices {
  DirectDebit = "DIRECT_DEBIT",
  NonDirectDebit = "NON_DIRECT_DEBIT",
  Prepayment = "PREPAYMENT",
}

/** An enumeration. */
export enum PaymentMethods {
  CreditCard = "CREDIT_CARD",
  DirectDebit = "DIRECT_DEBIT",
  PayOnReceipt = "PAY_ON_RECEIPT",
}

/**
 *
 *     The mode used by a SMETS2 meter to charge for energy consumed.
 *
 *     Energy consumption can either be paid for in advance (i.e. prepay / pay-as-you-go)
 *     or at some time later (i.e. credit).
 *
 */
export enum PaymentMode {
  /** Credit. */
  Credit = "CREDIT",
  /** Prepayment. */
  Prepay = "PREPAY",
}

export enum PaymentReasonOptions {
  BalanceThresholdCrossed = "BALANCE_THRESHOLD_CROSSED",
  BillIssued = "BILL_ISSUED",
  PaymentPlan = "PAYMENT_PLAN",
  RegularSchedule = "REGULAR_SCHEDULE",
}

export type PaymentScheduleInput = {
  /** Input a customer account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Payment amount must be inputted as pence. */
  readonly paymentAmount: Scalars["Int"]["input"];
  /** Input a direct debit payment day. */
  readonly paymentDay: Scalars["Int"]["input"];
};

/** An enumeration. */
export enum PaymentScheduleReasonOptions {
  /** A payment schedule created to take payments to pay back a debt. These schedules typically expire once the debt has been re-payed. */
  DebtRepaymentPlan = "DEBT_REPAYMENT_PLAN",
  /** A payment schedule created to take the final payment when an account is closed. */
  FinalPayment = "FINAL_PAYMENT",
  /** The default value for usual account payments. */
  GeneralAccountPayment = "GENERAL_ACCOUNT_PAYMENT",
  /** A payment schedule created to take a payment around the supply start date of a meterpoint to help prevent accounts accruing debt. */
  SsdPayment = "SSD_PAYMENT",
}

/** An enumeration. */
export enum PaymentType {
  Bpay = "BPAY",
  Card = "CARD",
  DirectDebit = "DIRECT_DEBIT",
  GmoRefund = "GMO_REFUND",
  PaymentSlip = "PAYMENT_SLIP",
}

export enum PaymentsVendorChoices {
  BottomlinePtx = "BOTTOMLINE_PTX",
  Gocardless = "GOCARDLESS",
  Smartdebit = "SMARTDEBIT",
  Stripe = "STRIPE",
  Westpac = "WESTPAC",
}

/** The time interval that we report the performance for. */
export enum PerformanceGrouping {
  Day = "DAY",
  Live = "LIVE",
  Month = "MONTH",
  Week = "WEEK",
  Year = "YEAR",
}

/** An enumeration. */
export enum PortfolioUserRoleEnum {
  Admin = "ADMIN",
  Carer = "CARER",
  LoyaltyPointUser = "LOYALTY_POINT_USER",
  Traced = "TRACED",
}

export type PositionInput = {
  readonly latitude: InputMaybe<Scalars["Float"]["input"]>;
  readonly longitude: InputMaybe<Scalars["Float"]["input"]>;
};

export type PostCreditInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Optional short note about the credit, to be displayed to the user. */
  readonly displayNote: InputMaybe<Scalars["String"]["input"]>;
  /** The ID of the ledger where the credit will be posted. */
  readonly ledgerId: Scalars["ID"]["input"];
  /** The net amount of the credit to be posted. Amount should be posted in the smallest unit of currency. */
  readonly netAmount: Scalars["Int"]["input"];
  /** Optional short note about the credit, to be displayed to internal systems. */
  readonly note: InputMaybe<Scalars["String"]["input"]>;
  /** The reason why the credit is posted. This should be a valid credit reason code. */
  readonly reason: Scalars["String"]["input"];
  /** The tax amount of the credit to be posted. Amount should be posted in the smallest unit of currency. */
  readonly taxAmount: Scalars["Int"]["input"];
};

/** The input type for post an EV Public Charging charge. */
export type PostEvPublicChargingChargeInput = {
  /** The line items for the new charge. */
  readonly lineItems: ReadonlyArray<EvpcLineItem>;
  /** The tax items for the new charge. */
  readonly taxItems: ReadonlyArray<EvpcTaxItem>;
  /** The value of the token used for this session. */
  readonly tokenValue: Scalars["String"]["input"];
};

export type PostEvPublicChargingCreditInput = {
  /** Optional short note about the credit, to be displayed to the user. */
  readonly displayNote: InputMaybe<Scalars["String"]["input"]>;
  /** The external account identifier. */
  readonly externalAccountId: Scalars["String"]["input"];
  /** The net amount of the credit to be added. Amount should be posted in the smallest unit of currency. */
  readonly netAmount: Scalars["Int"]["input"];
  /** The reason why the credit is added. */
  readonly reason: AccountCreditReasonType;
  /** The tax amount of the credit to be added. Amount should be posted in the smallest unit of currency. */
  readonly taxAmount: Scalars["Int"]["input"];
};

/** An enumeration. */
export enum PowerUnit {
  Kilowatt = "KILOWATT",
}

/**
 *
 *     Choices class for the pre-signed expiring tokens.
 *
 *     These choices must have a certain format:
 *
 *     {ACTION-VERB}_{DEFINING-NOUN}
 *
 *     They should start with an action verb. It should be a single word.
 *     The action verb enables the account user to do the thing (defining noun)
 *     that comes after the action verb. Together they represent a task.
 *
 *     The defining noun could be longer than a single word.
 *     Preferably, it should be kept short and simple as much as possible.
 *
 */
export enum PreSignedTokenScope {
  /** Scope that enables account user to accept the terms and conditions for a product. */
  AcceptTermsAndConditions = "ACCEPT_TERMS_AND_CONDITIONS",
  /** Scope that enables account user to book smart meter appointments. */
  BookSmartMeterAppointments = "BOOK_SMART_METER_APPOINTMENTS",
  /** Scope that enables account user to checkout a quote (validate terms & conds and provide a payment detail). */
  CheckoutQuote = "CHECKOUT_QUOTE",
  /** Edit Customer Marketing Preference */
  EditCustomerMarketingPreference = "EDIT_CUSTOMER_MARKETING_PREFERENCE",
  /** Scope that enables account user to join campaigns. */
  JoinCampaigns = "JOIN_CAMPAIGNS",
  /** Scope that enables account user to join campaign events. */
  JoinCampaignEvents = "JOIN_CAMPAIGN_EVENTS",
  /** Scope that enables account user to generate a renewal quote and renew agreements. */
  ManageAccountRenewals = "MANAGE_ACCOUNT_RENEWALS",
  /** Scope that enables account user to manage security deposit payments for business accounts. */
  ManageBusinessSecurityDeposit = "MANAGE_BUSINESS_SECURITY_DEPOSIT",
  /** Scope that enables account user to accept goods quotes and process goods purchases. */
  ManageGoodsPurchases = "MANAGE_GOODS_PURCHASES",
  /** Scope that enables account user to do a self-serve product switch through the Dashboard. */
  ManageProductSwitch = "MANAGE_PRODUCT_SWITCH",
  /** Scope that enables account user to redeem loyalty points */
  RedeemLoyaltyPoints = "REDEEM_LOYALTY_POINTS",
  /** Scope that enables account user to report a property move-out. */
  ReportMoveOut = "REPORT_MOVE_OUT",
  /** Scope that enables account user to submit customer feedback. */
  SubmitCustomerFeedback = "SUBMIT_CUSTOMER_FEEDBACK",
  /** Scope that enables account user to submit meter readings. */
  SubmitMeterReadings = "SUBMIT_METER_READINGS",
  /** Scope that enables account user to update their blackhole email address. */
  UpdateBlackholeEmail = "UPDATE_BLACKHOLE_EMAIL",
  /** Update Sensitive Customer Information */
  UpdateSensitiveCustomerInformation = "UPDATE_SENSITIVE_CUSTOMER_INFORMATION",
  /** Scope that enables account user to visit campaign dashboard. */
  ViewCampaignDashboards = "VIEW_CAMPAIGN_DASHBOARDS",
  /** Scope that enables account user to visit detailed property usage pages. */
  ViewDetailedUsage = "VIEW_DETAILED_USAGE",
}

/**
 *
 *     The type of premise in which the CHF is located.
 *
 */
export enum PremiseType {
  /** Detached / Semi-detached. */
  DetachedOrSemi = "DETACHED_OR_SEMI",
  /** An apartment block with more than 5 floors. */
  HighRiseApartment = "HIGH_RISE_APARTMENT",
  /** An apartment block with 5 floors or less. */
  LowRiseApartment = "LOW_RISE_APARTMENT",
  /** Terraced. */
  Terraced = "TERRACED",
}

export type PrepareAccountInput = {
  /** The type of account to create. */
  readonly accountType: InputMaybe<AccountTypeChoices>;
  /** The billing address. */
  readonly billingAddress: LifecycleAddressInput;
  /** The billing name. */
  readonly billingName: Scalars["String"]["input"];
  /** The brand of the created account. */
  readonly brandCode: Scalars["String"]["input"];
  /** The chosen payment day. */
  readonly chosenPaymentDay: InputMaybe<Scalars["Int"]["input"]>;
  /** The customer's details. */
  readonly customerDetails: CustomerDetailsInput;
  /** The date of sale, defaults to today if not provided. */
  readonly dateOfSale: InputMaybe<Scalars["Date"]["input"]>;
  /** The preferred supply start date. */
  readonly preferredSsd: InputMaybe<Scalars["Date"]["input"]>;
  /** Sales information. */
  readonly salesInfo: SalesInformationInput;
};

/** An enumeration. */
export enum PrintBatchStatus {
  Closed = "CLOSED",
  Open = "OPEN",
  Processed = "PROCESSED",
}

/** The product rate band of a line item. */
export enum ProductRateBands {
  /** CONSUMPTION. */
  Consumption = "CONSUMPTION",
  /** FEE. */
  Fee = "FEE",
  /** TIME. */
  Time = "TIME",
}

/** Input type for creating a single product rate. */
export type ProductRateInputType = {
  /** The band category of the product rate. */
  readonly bandCategory: LimitedBandCategories;
  /** The band subcategory of the product rate. For gas products, pass 'null'. For electricity products, select a subcategory. */
  readonly bandSubcategory: InputMaybe<AllBandSubCategories>;
  /** The GSP group id of the product rate. */
  readonly gsp: GspGroupIdsOptions;
  /** The payment method of the product rate, if applicable. */
  readonly paymentMethod: InputMaybe<PaymentMethodChoices>;
  /** The value of the product rate. */
  readonly pricePerUnit: Scalars["Decimal"]["input"];
  /** Date and time the product rate is effective from. */
  readonly validFrom: Scalars["DateTime"]["input"];
  /** Date and time the product rate is effective to. */
  readonly validTo: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type ProductToPurchaseInput = {
  /** Number of units. */
  readonly numberOfUnits: Scalars["Int"]["input"];
  /** Products code to purchase. */
  readonly productCode: Scalars["String"]["input"];
};

/** Represents a product and the quantity to quote for a customer. */
export type ProductToQuoteInput = {
  /** Currency. */
  readonly currency: Scalars["String"]["input"];
  /** Number of units. */
  readonly numberOfUnits: Scalars["Int"]["input"];
  /** Price per unit in smallest sub-unit of the currency. */
  readonly pricePerUnit: InputMaybe<Scalars["Int"]["input"]>;
  /** ID of the product to quote. */
  readonly productId: Scalars["Int"]["input"];
};

export type PropertyDetailsInput = {
  /** Whether the property has indoor space for a cylinder. */
  readonly hasIndoorSpaceForCylinder: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Whether the property has outdoor space for a heat pump. */
  readonly hasOutdoorSpaceForHeatPump: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Heat type. */
  readonly heatType: HeatPumpHeatType;
  /** Whether the property is undergoing a home renovation. */
  readonly isHomeRenovation: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Property type. */
  readonly propertyType: HeatPumpPropertyType;
};

/**
 *
 *     This refers to the provider that is used to authenticate when registering a device.
 *
 */
export enum ProviderChoices {
  Daikin = "DAIKIN",
  Ecobee = "ECOBEE",
  Energizer = "ENERGIZER",
  Enode = "ENODE",
  Enphase = "ENPHASE",
  Ford = "FORD",
  Givenergy = "GIVENERGY",
  Huawei = "HUAWEI",
  Jedlix = "JEDLIX",
  Myenergi = "MYENERGI",
  OcppWallbox = "OCPP_WALLBOX",
  Ohme = "OHME",
  Sensi = "SENSI",
  Smartcar = "SMARTCAR",
  SmartPear = "SMART_PEAR",
  Tesla = "TESLA",
  VpAmazon = "VP_AMAZON",
  VpHoneywellCc = "VP_HONEYWELL_CC",
  VpHoneywellRes = "VP_HONEYWELL_RES",
  VpNest = "VP_NEST",
}

export type ProvisioningClaimRequestParameters = {
  /** The EUID of the device we are trying to provision. */
  readonly euid: Scalars["String"]["input"];
  /** The SHA256 hash of the EUID and timestamp. */
  readonly nonce: Scalars["String"]["input"];
  /** The signature of the nonce generated by the device's private key. */
  readonly signature: Scalars["String"]["input"];
  /** A string representing the number of whole milliseconds since the epoch. */
  readonly timestamp: Scalars["String"]["input"];
};

export type PublishTransactionalMessagingTriggerInput = {
  /** The params of the trigger type, as a JSON string. These are defined in the Params class for a trigger type. */
  readonly params: Scalars["JSONString"]["input"];
  /** The code of the trigger type to be published. */
  readonly triggerTypeCode: Scalars["String"]["input"];
};

/**
 *
 *     A list of all current and historic WHD qualifying component options.
 *
 *     All label strings correspond to specific wording of the most recent scheme.
 *
 */
export enum QualifyingComponentOptions {
  /** In receipt of Adult Disability Payment (ADP) */
  AdultDisabilityPayment = "ADULT_DISABILITY_PAYMENT",
  /** Are aged 62 and over (OR in receipt of any pensioner premium) */
  AgeThreshold = "AGE_THRESHOLD",
  /** Have a dependent child aged 5 – 16 or under 18 if in full time education (dependent child who normally resides with the applicant) */
  DependentChildOverFive = "DEPENDENT_CHILD_OVER_FIVE",
  /** Have a dependent child under 5 (dependent child who normally resides with the applicant) */
  DependentChildUnderFive = "DEPENDENT_CHILD_UNDER_FIVE",
  /** In receipt of Disability Living Allowance (DLA), any disability premium (all rates) or disabled child element of Universal Credit */
  DisabilityBenefits = "DISABILITY_BENEFITS",
  /** Have a medically dependant illness (disability or mobility issue) */
  HasDisability = "HAS_DISABILITY",
  /** In receipt of any Income-related benefit which includes: Carer’s Premium and Carer’s Allowance (for someone within the household) OR Attendance Allowance (for applicant or their partner) OR Industrial Injuries Benefit */
  IncomeRelatedBenefits = "INCOME_RELATED_BENEFITS",
  /** In receipt of the limited capability for work element of Universal Credit */
  LimitedCapabilityForWork = "LIMITED_CAPABILITY_FOR_WORK",
  /** Hold a Maternity Exemption Certificate (MATEX) */
  MaternityExemptionCertificate = "MATERNITY_EXEMPTION_CERTIFICATE",
  /** Hold a Medical Exemption Certificate (MEDEX) */
  MedicalExemptionCertificate = "MEDICAL_EXEMPTION_CERTIFICATE",
  /** In receipt of Personal Independence Payments (PIP) */
  PersonalIndependencePayments = "PERSONAL_INDEPENDENCE_PAYMENTS",
  /** Are exempt from prescription charges (only for customers in England) or hold a HC2 certificate */
  PrescriptionChargesExemption = "PRESCRIPTION_CHARGES_EXEMPTION",
  /** Hold a valid war pension NHS exemption certificate and the prescription is for your disability */
  WarPensionExemptionCertificate = "WAR_PENSION_EXEMPTION_CERTIFICATE",
}

/** An enumeration. */
export enum QualifyingCriteriaOptions {
  /** In receipt of Child Tax Credit where the award statement shows a total annual household income of £18,723 or less (before tax and National Insurance) */
  ChildTaxCredit = "CHILD_TAX_CREDIT",
  /** In receipt of Council Tax Reduction (excludes the 25% single person’s discount) */
  CouncilTaxReduction = "COUNCIL_TAX_REDUCTION",
  /** In receipt of Income-related Employment & Support Allowance (ESA) */
  EmploymentAndSupportAllowance = "EMPLOYMENT_AND_SUPPORT_ALLOWANCE",
  /** In receipt of Housing Benefit with a total annual household income of £18,723 or less (before tax and National Insurance) */
  HousingBenefit = "HOUSING_BENEFIT",
  /** In receipt of Income Support */
  IncomeSupport = "INCOME_SUPPORT",
  /** In receipt of Income-based Job Seeker’s Allowance (JSA) */
  JobSeekersAllowance = "JOB_SEEKERS_ALLOWANCE",
  /** A total annual household income of £18,723 or less (before tax and National Insurance) */
  LowIncomeThreshold = "LOW_INCOME_THRESHOLD",
  /** In receipt of the Savings Element of Pension Credit only */
  SavingsElementOfPensionCredit = "SAVINGS_ELEMENT_OF_PENSION_CREDIT",
  /** In receipt of universal credit, and has an earned income of between zero and £1,561 in at least one of the twelve preceding assessment periods */
  UniversalCredit = "UNIVERSAL_CREDIT",
  /** In receipt of Working Tax Credit with a total annual household income of £18,723 or less (before tax and National Insurance) */
  WorkingTaxCredit = "WORKING_TAX_CREDIT",
}

/** Information about the complexity of the query. */
export type QueryComplexityInputType = {
  /** The operation name of the query to calculate complexity for if more than one is provided. */
  readonly operationName: InputMaybe<Scalars["String"]["input"]>;
  /** The query to calculate complexity for. */
  readonly query: Scalars["String"]["input"];
  /** Any variables to include for the query. Pagination variables should be included as they will affect the overall weight of the query. */
  readonly variables: InputMaybe<Scalars["JSONString"]["input"]>;
};

export type QuoteAccountOnProductsInput = {
  /** Account number to create this quote for. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Date at which the product switch takes effect. */
  readonly at: Scalars["DateTime"]["input"];
  /** A list of electricity meterpoints to create this quote for. */
  readonly electricityMeterPointsInput: InputMaybe<
    ReadonlyArray<ElectricityMeterPointProductsInput>
  >;
  /** A list of gas meterpoints to create this quote for. */
  readonly gasMeterPointsInput: InputMaybe<
    ReadonlyArray<GasMeterPointProductsInput>
  >;
};

export type QuoteAddressInput = {
  readonly addressLine1: InputMaybe<Scalars["String"]["input"]>;
  readonly addressLine2: InputMaybe<Scalars["String"]["input"]>;
  readonly addressLine3: InputMaybe<Scalars["String"]["input"]>;
};

export type QuoteCampaignOfferInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Slug of campaign to quote on. */
  readonly campaignSlug: Scalars["String"]["input"];
  /** Property to quote on. */
  readonly propertyId: Scalars["Int"]["input"];
};

export type QuoteNewMeterPointsInput = {
  /** A list of electricity meterpoints to create this quote for. */
  readonly electricityMeterPointsInput: InputMaybe<
    ReadonlyArray<ElectricityMeterPointInput>
  >;
  /** A list of gas meterpoints to create this quote for. */
  readonly gasMeterPointsInput: InputMaybe<ReadonlyArray<GasMeterPointInput>>;
  /** Additional context about the future account which is required to create the quote. */
  readonly newAccountInput: NewAccountInput;
  /** Only quote on products with these tags. If not provided, quote against all available products. */
  readonly productTags: InputMaybe<ReadonlyArray<Scalars["String"]["input"]>>;
};

export type QuoteNewMeterPointsOnBespokeProductsInput = {
  /** A list of electricity meterpoints to create this quote for. */
  readonly electricityMeterPointsInput: InputMaybe<
    ReadonlyArray<ElectricityMeterPointProductsInput>
  >;
  /** A list of gas meterpoints to create this quote for. */
  readonly gasMeterPointsInput: InputMaybe<
    ReadonlyArray<GasMeterPointProductsInput>
  >;
  /** Data for creating a new account. */
  readonly newAccountInput: NewAccountInput;
};

/** An enumeration. */
export enum QuotePaymentMethod {
  /** Credit card */
  Creditcard = "CREDITCARD",
  /** Direct Debit */
  Directdebit = "DIRECTDEBIT",
  /** Pay on receipt of bill */
  Onreceipt = "ONRECEIPT",
  /** Prepayment */
  Prepayment = "PREPAYMENT",
}

/** An enumeration. */
export enum QuotePaymentMethodChoices {
  Creditcard = "CREDITCARD",
  Directdebit = "DIRECTDEBIT",
  Onreceipt = "ONRECEIPT",
  Prepayment = "PREPAYMENT",
}

/** An enumeration. */
export enum RateTypeChoices {
  /** Economy7. */
  Economy7 = "ECONOMY7",
  /** Standard. */
  Standard = "STANDARD",
  /** Three-rate. */
  ThreeRate = "THREE_RATE",
}

/** Reading direction is based on the utility generated or consumed by the customer. */
export enum ReadingDirectionType {
  /** Reading is based on the customer's usage of the utility. */
  Consumption = "CONSUMPTION",
  /**
   *
   * Reading is based on the utility generated by the customer.
   *
   * For example: This will return solar readings if a customer has solar panels installed at their location.
   *
   */
  Generation = "GENERATION",
}

/** The frequency of the reading. */
export enum ReadingFrequencyType {
  /** Readings taken on a day to day basis. */
  Daily = "DAILY",
  DayInterval = "DAY_INTERVAL",
  /** Readings taken in every 15 minute intervals. */
  FifteenMinInterval = "FIFTEEN_MIN_INTERVAL",
  /** Readings taken in every 5 minute intervals. */
  FiveMinInterval = "FIVE_MIN_INTERVAL",
  HourInterval = "HOUR_INTERVAL",
  MonthInterval = "MONTH_INTERVAL",
  /** Readings taken at a point in time. */
  PointInTime = "POINT_IN_TIME",
  QuarterInterval = "QUARTER_INTERVAL",
  /** Interval Readings as provided, may be variable in length. */
  RawInterval = "RAW_INTERVAL",
  /** Readings taken in every 30 minute intervals. */
  ThirtyMinInterval = "THIRTY_MIN_INTERVAL",
  WeekInterval = "WEEK_INTERVAL",
}

export type ReadingInputType = {
  readonly reading: InputMaybe<Scalars["Int"]["input"]>;
  readonly registerId: InputMaybe<Scalars["ID"]["input"]>;
};

export enum ReadingQualityType {
  Actual = "ACTUAL",
  Combined = "COMBINED",
  Estimate = "ESTIMATE",
}

/** The type of statistic for the reading interval. */
export enum ReadingStatisticTypeEnum {
  /** The estimated carbon cost of the interval. */
  CarbonCost = "CARBON_COST",
  /** The calculated cost of consumption for the interval. */
  ConsumptionCost = "CONSUMPTION_COST",
  /** The calculated monetary value of generation for the interval */
  GenerationValue = "GENERATION_VALUE",
  /** The calculated cost of standing charges for the interval. */
  StandingChargeCost = "STANDING_CHARGE_COST",
  /** The apportion cost of a time of use bucket for the interval. */
  TouBucketCost = "TOU_BUCKET_COST",
}

export type ReauthenticateDeviceInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The authentication details required for the currently authenticated device. */
  readonly authentication: AuthenticationInput;
  /** The most recently registered device of this type will be re-authenticated. */
  readonly deviceType: KrakenFlexDeviceTypes;
};

/** The input type for redeeming Loyalty Points. */
export type RedeemLoyaltyPointsInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The number of Loyalty Points to redeem. */
  readonly points: Scalars["Int"]["input"];
};

/** The input type for redeeming OctoPoints. */
export type RedeemOctoPointsInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
};

/** An enumeration. */
export enum ReferralSchemeTypeChoices {
  /** Legacy Referral. */
  LegacyReferral = "LEGACY_REFERRAL",
  /** Partner Reward. */
  PartnerReward = "PARTNER_REWARD",
  /** Promo Reward. */
  PromoReward = "PROMO_REWARD",
  /** Referral Reward. */
  ReferralReward = "REFERRAL_REWARD",
  /** Signup Reward. */
  SignupReward = "SIGNUP_REWARD",
}

/** An enumeration. */
export enum ReferralStatusChoices {
  /** Cancelled. */
  Cancelled = "Cancelled",
  /** Paid. */
  Paid = "Paid",
  /** Pending. */
  Pending = "Pending",
}

export type RefreshQuoteInput = {
  readonly code: Scalars["String"]["input"];
};

export type RefundPaymentInput = {
  /** The account number. */
  readonly accountNumber: Scalars["ID"]["input"];
  /** The amount to be repaid. */
  readonly amountInMinorUnit: Scalars["Int"]["input"];
  /** Unique constraint to prevent duplicate requests. */
  readonly idempotencyKey: Scalars["String"]["input"];
  /** The ID of the payment to refund. */
  readonly paymentId: Scalars["ID"]["input"];
  /** Reason for refunding the payment. */
  readonly reason: Scalars["String"]["input"];
};

/** The input type for the refund request. */
export type RefundRequestInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The requested refund amount. */
  readonly requestedAmount: Scalars["Int"]["input"];
};

export type RegisterDeviceInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The authentication details required given the chosen provider. */
  readonly authentication: InputMaybe<AuthenticationInput>;
  /** The charger details. */
  readonly chargePoint: ChargePointInput;
  /** The ID of the property the electric vehicle belongs to. */
  readonly propertyId: InputMaybe<Scalars["Int"]["input"]>;
  /** The provider used to authenticate the device. */
  readonly supportedProvider: ProviderChoices;
  /** The unique vehicle ID of the electric vehicle. */
  readonly vehicle: VehicleInput;
};

export type RegisterHeatPumpInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The authentication details required given the chosen provider. */
  readonly authentication: AuthenticationInput;
  /** The make, model and power of the heat pump. */
  readonly heatPump: HeatPumpInput;
  /** The ID of the property the heat pump belongs to. */
  readonly propertyId: InputMaybe<Scalars["Int"]["input"]>;
  /** The provider used to authenticate the device. */
  readonly provider: ProviderChoices;
};

export type RegisterPushNotificationBindingInput = {
  /** Register a push notification binding. A push notification binding connects an account user to a specific application running on a specific device through a 'registration token' (Android) or 'device token' (iOS). Using this binding we can send push notifications to the account user's devices. */
  readonly bundleId: Scalars["String"]["input"];
  /** Device push notification token. */
  readonly token: Scalars["String"]["input"];
};

/** This type is used by agent services to notify Kraken of a new device. */
export type RegisterSmartDeviceInput = {
  /** The ID of the device to register. */
  readonly deviceId: Scalars["String"]["input"];
  /** The 4-letter manufacturer code for the device. */
  readonly deviceManufacturer: Scalars["String"]["input"];
  /** Model of the device. */
  readonly deviceModel: Scalars["String"]["input"];
  /** Type of the device, e.g. ESME or GSME. */
  readonly deviceType: Scalars["String"]["input"];
  /** ESME variant for an ESME device. */
  readonly esmeVariant: InputMaybe<Scalars["String"]["input"]>;
  /** Firmware version number. */
  readonly firmwareVersion: InputMaybe<Scalars["String"]["input"]>;
  /** Installation code of the device. */
  readonly installCode: Scalars["String"]["input"];
  /** MPID of the Meter Asset Provider for the device. Used with ESME or GSME devices. */
  readonly mapMpid: InputMaybe<Scalars["String"]["input"]>;
  /** Serial number for ESME or GSME devices. */
  readonly serialNumber: InputMaybe<Scalars["String"]["input"]>;
  /** SMETS CHTS version number. */
  readonly smetsChtsVersion: InputMaybe<Scalars["String"]["input"]>;
  /** Supplier associated with the device. */
  readonly supplierMpid: Scalars["String"]["input"];
};

/** An enumeration. */
export enum RemoveConsumerDeviceChoices {
  /** Consumer Access Device. */
  Cad = "CAD",
}

export type RemoveConsumerDeviceInput = {
  /** Device ID of the CAD being removed from the CHF/HAN. */
  readonly consumerDeviceId: Scalars["String"]["input"];
  /** The device type being joined, currently limited to CAD only. */
  readonly consumerDeviceType: RemoveConsumerDeviceChoices;
};

export type RemovedElectricityMeterInput = {
  readonly meterType: InputMaybe<ElectricityMeterTypes>;
  readonly prepayData: InputMaybe<RemovedMeterPrepayDataInput>;
  readonly readAt: InputMaybe<Scalars["DateTime"]["input"]>;
  readonly registers: ReadonlyArray<
    InputMaybe<RemovedElectricityMeterRegisterInput>
  >;
  readonly serialNumber: Scalars["String"]["input"];
};

export type RemovedElectricityMeterPointInput = {
  readonly meters: InputMaybe<
    ReadonlyArray<InputMaybe<RemovedElectricityMeterInput>>
  >;
  readonly mpan: InputMaybe<Scalars["String"]["input"]>;
};

export type RemovedElectricityMeterRegisterInput = {
  readonly finalReading: Scalars["Float"]["input"];
  /** Identifier string/label for the register. */
  readonly id: Scalars["String"]["input"];
};

export type RemovedGasMeterInput = {
  readonly finalReading: Scalars["Float"]["input"];
  readonly meterType: InputMaybe<GasMeterTypes>;
  readonly prepayData: InputMaybe<RemovedMeterPrepayDataInput>;
  readonly readAt: InputMaybe<Scalars["DateTime"]["input"]>;
  readonly serialNumber: Scalars["String"]["input"];
};

export type RemovedGasMeterPointInput = {
  readonly meters: InputMaybe<ReadonlyArray<InputMaybe<RemovedGasMeterInput>>>;
  readonly mprn: InputMaybe<Scalars["String"]["input"]>;
};

export type RemovedMeterPrepayDataInput = {
  /** The credit balance of the meter in millipence. */
  readonly balance: InputMaybe<Scalars["Int"]["input"]>;
  /** The total of all debt left on the removed meter in millipence. */
  readonly cumulativeDebtBalance: InputMaybe<Scalars["Int"]["input"]>;
  /** Amount of emergency credit remaining on the meter in millipence. */
  readonly emergencyCreditBalance: InputMaybe<Scalars["Int"]["input"]>;
};

export type RenewAgreementForMeterPointInput = {
  /** The date the agreement was agreed from (inclusive, if different to valid_from). */
  readonly agreedFromDate: InputMaybe<Scalars["Date"]["input"]>;
  /** Bespoke rates overriding those of the associated tariff, with payment method. */
  readonly bespokePpsTariffRates: InputMaybe<
    ReadonlyArray<InputMaybe<BespokePpsTariffRatesInput>>
  >;
  /** Bespoke rates overriding those of the associated tariff. */
  readonly bespokeTariffRates: InputMaybe<BespokeTariffRatesInput>;
  /** Information on the commission that's associated with this agreement. */
  readonly commission: InputMaybe<CommissionInput>;
  /** MPxN to renew the agreement for. */
  readonly mpxn: Scalars["String"]["input"];
  /** Tariff code for the new agreement. */
  readonly tariffCode: Scalars["String"]["input"];
  /** The start date of the new agreement (inclusive). */
  readonly validFromDate: Scalars["Date"]["input"];
  /** The end date of the new agreement (exclusive). */
  readonly validToDate: InputMaybe<Scalars["Date"]["input"]>;
};

export type RenewAgreementsForAccountInput = {
  /** Account number */
  readonly accountNumber: Scalars["String"]["input"];
  /** The date the new agreement takes effect. This can be no more than 90 days in the future. */
  readonly changeOn: InputMaybe<Scalars["Date"]["input"]>;
  /** A list of electricity agreements and the code of the product they will be renewed to. */
  readonly electricityAgreements: InputMaybe<
    ReadonlyArray<InputMaybe<AgreementRenewalProductInput>>
  >;
  /** A list of gas agreements and the code of the product they will be renewed to. */
  readonly gasAgreements: InputMaybe<
    ReadonlyArray<InputMaybe<AgreementRenewalProductInput>>
  >;
};

export type RenewAgreementsInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The date the new agreement takes effect. This can be no more than 90 days in the future. */
  readonly changeOn: InputMaybe<Scalars["Date"]["input"]>;
  /** Where the account's current payment schedule has a debt repayment element, we let the user choose whether to continue making catch-up payments, or to repay the full debt in addition to their next payment. */
  readonly makeFullDebtRepayment: Scalars["Boolean"]["input"];
  /** If the customer is currently on a flat rate tariff, persist this into the new agreement. */
  readonly persistFlatRate: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The ID of the property that agreements should be renewed for. */
  readonly propertyId: Scalars["ID"]["input"];
  /** The ID if the quoted product we wish to use to create new agreements. Part of the tariff renewal journey involves re-quoting to ensure this is available. */
  readonly quotedProductId: Scalars["ID"]["input"];
};

/** Input fields for Repayment Intervention. */
export type RepaymentInput = {
  /** The Repayment Intervention reason. */
  readonly reason: InputMaybe<Scalars["String"]["input"]>;
  /** The repayment ID. */
  readonly repaymentId: Scalars["ID"]["input"];
};

/**
 *
 *     Methods by which repayments can be sent to the customer.
 *
 */
export enum RepaymentMethod {
  BankTransfer = "BANK_TRANSFER",
  Card = "CARD",
  Cheque = "CHEQUE",
}

/**
 *
 *     Possible status' for a repayment (or refund) request
 *
 */
export enum RepaymentRequestStatus {
  Accepted = "ACCEPTED",
  Cancelled = "CANCELLED",
  Rejected = "REJECTED",
  Requested = "REQUESTED",
}

export type ReplaceAgreementInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** MPxN of the related meter point to the agreement. */
  readonly mpxn: Scalars["String"]["input"];
  /** Product code to replace with. */
  readonly newProductCode: Scalars["String"]["input"];
  /** Date to replace on, must be in future. */
  readonly replaceOnDate: Scalars["Date"]["input"];
};

/** Specify a new SMETS2 Communications Hub to replace an existing Communications Hub. */
export type ReplaceCommsHubInput = {
  /** The device id of the new Communications Hub. */
  readonly newCommsHubDeviceId: Scalars["String"]["input"];
  /** The device id of the old Communications Hub. */
  readonly oldCommsHubDeviceId: Scalars["String"]["input"];
};

export type ReportRemovedMeterDetailsInput = {
  /** The installer/agents own booking reference for the appointment to remove these meters. */
  readonly appointmentId: InputMaybe<Scalars["String"]["input"]>;
  readonly electricityMeterPoint: InputMaybe<RemovedElectricityMeterPointInput>;
  readonly gasMeterPoint: InputMaybe<RemovedGasMeterPointInput>;
};

export type RequestConsumptionDataInput = {
  /** Device ID for the meter. */
  readonly deviceId: Scalars["String"]["input"];
  /** The last half hourly end time (inclusive) to retrieve. */
  readonly endAt: InputMaybe<Scalars["DateTime"]["input"]>;
  /** The first half hourly period start (inclusive) to retrieve. */
  readonly startAt: InputMaybe<Scalars["DateTime"]["input"]>;
};

/** Input type for the RequestPasswordReset mutation. */
export type RequestPasswordResetInput = {
  /** The email requesting a password reset email. */
  readonly email: Scalars["String"]["input"];
};

export type RequestRepaymentInputType = {
  /** The account number for the requested ledger's account. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The amount to be repaid. */
  readonly amountInMinorUnit: Scalars["Int"]["input"];
  /** Unique constraint to prevent duplicate requests. */
  readonly idempotencyKey: Scalars["String"]["input"];
  /** The ledger id from which the repayment will be requested. */
  readonly ledgerId: Scalars["String"]["input"];
  /** The method by which the money will be transferred to the customer. */
  readonly method: InputMaybe<RequestableRepaymentMethod>;
  /** The reason for the repayment. */
  readonly reason: InputMaybe<Scalars["String"]["input"]>;
};

/** An enumeration. */
export enum RequestableRepaymentMethod {
  BankTransfer = "BANK_TRANSFER",
  Cheque = "CHEQUE",
}

export type RequoteInput = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly includeHiddenProducts: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Optional parameter to select the payment method for the quote, default is direct debit. */
  readonly paymentMethod: InputMaybe<QuotePaymentMethodChoices>;
  readonly persistFlatRate: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly productAvailableAt: InputMaybe<Scalars["DateTime"]["input"]>;
  readonly propertyId: Scalars["ID"]["input"];
};

export type ResetPasswordMutationInput = {
  readonly clientMutationId: InputMaybe<Scalars["String"]["input"]>;
  readonly password: Scalars["String"]["input"];
  readonly token: Scalars["String"]["input"];
  readonly userId: Scalars["String"]["input"];
};

export type RoomTemperatureInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The temperature the room should be set to. The valid temperature range is between 12 and 30 degrees in increments of 0.5 degrees. */
  readonly temperature: Scalars["Float"]["input"];
};

/** An enumeration. */
export enum Smets2InterestReason {
  /** Already has or is about to have a smart meter installed. */
  Smets2InterestReasonAlreadyHasSmartMeter = "SMETS2_INTEREST_REASON_ALREADY_HAS_SMART_METER",
  /** Cannot attend appointment. */
  Smets2InterestReasonCannotAttendAppointment = "SMETS2_INTEREST_REASON_CANNOT_ATTEND_APPOINTMENT",
  /** Cannot see benefit. */
  Smets2InterestReasonCannotSeeBenefit = "SMETS2_INTEREST_REASON_CANNOT_SEE_BENEFIT",
  /** Doesn't own own home. */
  Smets2InterestReasonDoNotOwnHome = "SMETS2_INTEREST_REASON_DO_NOT_OWN_HOME",
  /** About to move house. */
  Smets2InterestReasonHouseMoveImminent = "SMETS2_INTEREST_REASON_HOUSE_MOVE_IMMINENT",
  /** Is a landlord. */
  Smets2InterestReasonIsLandlord = "SMETS2_INTEREST_REASON_IS_LANDLORD",
  /** More information about smart meters required. */
  Smets2InterestReasonMoreInformationRequired = "SMETS2_INTEREST_REASON_MORE_INFORMATION_REQUIRED",
  /** Negative publicity about smart meters. */
  Smets2InterestReasonNegativePublicity = "SMETS2_INTEREST_REASON_NEGATIVE_PUBLICITY",
  /** Property rarely or never occupied. */
  Smets2InterestReasonPropertyNotOccupied = "SMETS2_INTEREST_REASON_PROPERTY_NOT_OCCUPIED",
  /** About to switch supplier. */
  Smets2InterestReasonSwitchImminent = "SMETS2_INTEREST_REASON_SWITCH_IMMINENT",
  /** Sceptical of technology. */
  Smets2InterestReasonTechnologySceptical = "SMETS2_INTEREST_REASON_TECHNOLOGY_SCEPTICAL",
  /** Has vulnerability. */
  Smets2InterestReasonVulnerability = "SMETS2_INTEREST_REASON_VULNERABILITY",
  /** Wants to wait until it's compulsory. */
  Smets2InterestReasonWaitUntilItIsCompulsory = "SMETS2_INTEREST_REASON_WAIT_UNTIL_IT_IS_COMPULSORY",
  /** Worried about installation. */
  Smets2InterestReasonWorriedAboutInstallation = "SMETS2_INTEREST_REASON_WORRIED_ABOUT_INSTALLATION",
  /** Worried about smart meters. */
  Smets2InterestReasonWorriedAboutSmartMeters = "SMETS2_INTEREST_REASON_WORRIED_ABOUT_SMART_METERS",
  /** Worried about energy usage cost increasing. */
  Smets2InterestReasonWorriedAboutUsageCost = "SMETS2_INTEREST_REASON_WORRIED_ABOUT_USAGE_COST",
  /** Worried about health & safety. */
  Smets2InterestReasonWorriedHealthSafety = "SMETS2_INTEREST_REASON_WORRIED_HEALTH_SAFETY",
  /** Worried about security. */
  Smets2InterestReasonWorriedSecurity = "SMETS2_INTEREST_REASON_WORRIED_SECURITY",
}

/** An enumeration. */
export enum SalesChannelChoices {
  Acquisition = "ACQUISITION",
  Aggregator = "AGGREGATOR",
  Broker = "BROKER",
  DebtCollectionAgency = "DEBT_COLLECTION_AGENCY",
  DigiTelesales = "DIGI_TELESALES",
  Direct = "DIRECT",
  Events = "EVENTS",
  FieldSales = "FIELD_SALES",
  GiftOfKit = "GIFT_OF_KIT",
  HighReferrer = "HIGH_REFERRER",
  Landlord = "LANDLORD",
  MoveIn = "MOVE_IN",
  NewTenant = "NEW_TENANT",
  ParentPower = "PARENT_POWER",
  Partnerships = "PARTNERSHIPS",
  PeoplePower = "PEOPLE_POWER",
  PriceComparison = "PRICE_COMPARISON",
  SupplierOfLastResort = "SUPPLIER_OF_LAST_RESORT",
  Telesales = "TELESALES",
  WorkplacePopUp = "WORKPLACE_POP_UP",
  WorksWithOctopus = "WORKS_WITH_OCTOPUS",
}

/** Information about the sale to associate with the account. */
export type SalesInformationInput = {
  /** Unique reference number. */
  readonly affiliateParams: InputMaybe<Scalars["String"]["input"]>;
  /** Unique reference number. */
  readonly affiliateSubdomain: InputMaybe<Scalars["String"]["input"]>;
  /** Sales channel. */
  readonly salesChannel: Scalars["String"]["input"];
  /** Sales subchannel. */
  readonly salesSubchannel: InputMaybe<Scalars["String"]["input"]>;
  /** Unique reference number. */
  readonly urn: InputMaybe<Scalars["String"]["input"]>;
};

/** An enumeration. */
export enum SavingSessionsAccountEventResultStatusChoices {
  Calculating = "CALCULATING",
  Fail = "FAIL",
  MissingReadings = "MISSING_READINGS",
  None = "NONE",
  PartialSuccess = "PARTIAL_SUCCESS",
  Success = "SUCCESS",
  Upcoming = "UPCOMING",
}

/** An enumeration. */
export enum SavingSessionsAccountEventStatus {
  Done = "DONE",
  Ongoing = "ONGOING",
  Upcoming = "UPCOMING",
}

export type SavingSessionsEnrolmentOptions = {
  /** The MPAN of the meter point to enrol with Saving Sessions. If not provided, a random eligible meter point for the account will be selected */
  readonly nominatedMpan: InputMaybe<Scalars["String"]["input"]>;
  /** Whether or not the account should enrol in Saving Sessions. */
  readonly shouldEnrol: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ScheduleSettings = {
  /** Whether this setting turns the zone on or off, or changes its temperature. */
  readonly action: Scalars["String"]["input"];
  /** Desired zone temperature (for zones which support setpoints). */
  readonly setpointInCelsius: InputMaybe<Scalars["FloatSafeDecimal"]["input"]>;
  /** Time for when settings should be active, in `HH:MM` (24h) format . */
  readonly time: Scalars["Time"]["input"];
};

/** An enumeration. */
export enum ScheduleType {
  BacsTransfer = "BACS_TRANSFER",
  CardPayment = "CARD_PAYMENT",
  DirectDebit = "DIRECT_DEBIT",
  PaymentSlip = "PAYMENT_SLIP",
}

/** A mapping of sensor codes to the display names we would like those sensors to have. */
export type SensorDisplayNameUpdate = {
  /** The new display name to set for this sensor. */
  readonly newDisplayName: Scalars["String"]["input"];
  /** The code of the sensor you want to update. */
  readonly sensorCode: Scalars["String"]["input"];
};

/** An enumeration. */
export enum SensorType {
  Ntc = "NTC",
  Tstat = "TSTAT",
  Zigbee = "ZIGBEE",
}

/** The input type for setting the Loyalty Points user. */
export type SetLoyaltyPointsUserInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The account user receiving the points. */
  readonly newLoyaltyPointsUserId: Scalars["String"]["input"];
};

export type SetUpDirectDebitInstructionInput = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly bankDetails: BankDetailsInput;
  readonly ledgerId: Scalars["ID"]["input"];
  readonly validFrom: Scalars["DateTime"]["input"];
};

export type SetZoneModeParameters = {
  /** Time at which boost should end. */
  readonly endAt: InputMaybe<Scalars["DateTime"]["input"]>;
  /** The zone mode, i.e. ON, OFF, AUTO or BOOST. */
  readonly mode: Mode;
  /** Target temperature for a zone in celsius. */
  readonly setpointInCelsius: InputMaybe<Scalars["FloatSafeDecimal"]["input"]>;
  /** The heat pump controller zone, i.e. WATER, ZONE_1, ZONE_2 or AUXILIARY. */
  readonly zone: Zone;
};

export type SetZonePrimarySensorParameters = {
  /** The code for the sensor we want to make primary, such as 'SENSOR01'. */
  readonly sensorCode: Scalars["String"]["input"];
  /** The heat pump controller zone. */
  readonly zone: Zone;
};

export type SetZoneSchedulesParameters = {
  /** The schedule(s) to be set for a specific zone. */
  readonly schedules: ReadonlyArray<InputMaybe<ZoneSchedule>>;
  /** The heat pump controller zone, i.e. WATER, ZONE_1, ZONE_2 or AUXILIARY. */
  readonly zone: Zone;
};

export type ShareGoodsQuoteInput = {
  /** The email to share the quote with. */
  readonly email: Scalars["String"]["input"];
  /** The quote to share. */
  readonly quoteCode: Scalars["String"]["input"];
};

/** An enumeration. */
export enum SiteworksAppointmentAgent {
  /** AES Smart Metering */
  Aes = "AES",
  /** EDF Energy Customers PLC */
  Ecm = "ECM",
  /** Electricity North West Limited */
  ElecNw = "ELEC_NW",
  /** Energy Assets Ltd */
  EnergyAssets = "ENERGY_ASSETS",
  /** Enterprise Managed Services Ltd */
  EnterpriseManaged = "ENTERPRISE_MANAGED",
  /** E.on Metering */
  EonMetering = "EON_METERING",
  /** EDF Energy Customers Ltd */
  London = "LONDON",
  /** Lowri Beck Services Ltd */
  LowriBeck = "LOWRI_BECK",
  /** Morrison Data Services */
  Mds = "MDS",
  /** MeterPlus */
  Meterplus = "METERPLUS",
  /** Midlands Electricity plc */
  MidsElec = "MIDS_ELEC",
  /** National Grid */
  NationalGrid = "NATIONAL_GRID",
  /** Northern Powergrid */
  NPowergrid = "N_POWERGRID",
  /** Octopus Energy Services */
  Oes = "OES",
  /** Octopus Energy Services Ltd */
  Oesl = "OESL",
  /** Providor Ltd */
  Providor = "PROVIDOR",
  /** SGN Metering Services */
  Sgn = "SGN",
  /** Siemens Metering Services */
  Siemens = "SIEMENS",
  /** Smart Metering Systems */
  Sms = "SMS",
}

/** An enumeration. */
export enum SiteworksAppointmentStatus {
  /** The Siteworks appointment that has been aborted. */
  Aborted = "ABORTED",
  /** The Siteworks appointment that has been booked. */
  Booked = "BOOKED",
  /** The Siteworks appointment that has been cancelled. */
  Cancelled = "CANCELLED",
  /** The Siteworks work that has been completed. */
  Completed = "COMPLETED",
}

/**
 *
 *     Please note: these labels are exposed in the API documentation.
 *
 */
export enum SiteworksEventType {
  /** SMICOP compliance report submitted */
  SmicopComplianceReportSubmitted = "SMICOP_COMPLIANCE_REPORT_SUBMITTED",
}

/** An enumeration. */
export enum SmartDeviceAutoTopupTriggerFailureReasons {
  FailedToCollectPayment = "FAILED_TO_COLLECT_PAYMENT",
  FailedToTriggerAddCreditToMeter = "FAILED_TO_TRIGGER_ADD_CREDIT_TO_METER",
  NoImportMeter = "NO_IMPORT_METER",
  PaymentNotSuccessful = "PAYMENT_NOT_SUCCESSFUL",
}

/** An enumeration. */
export enum SmartDeviceAutoTopupTriggerSources {
  LowCreditBalance = "LOW_CREDIT_BALANCE",
}

/** An enumeration. */
export enum SmartDeviceAutoTopupTriggerStatus {
  Completed = "COMPLETED",
  Failed = "FAILED",
  Initiated = "INITIATED",
}

/** The current lifecycle status of a KrakenFlex device on the smarter tariff API. */
export enum SmartFlexDeviceLifecycleStatus {
  FailedOnboardingTest = "FAILED_ONBOARDING_TEST",
  Live = "LIVE",
  Onboarding = "ONBOARDING",
  OnboardingTestInProgress = "ONBOARDING_TEST_IN_PROGRESS",
  PendingLive = "PENDING_LIVE",
  Retired = "RETIRED",
}

export enum SmartFlexDeviceState {
  /** Authentication Complete - ready to start test (if needed) or pending live where auth or telemetry is delayed. */
  AuthenticationComplete = "AUTHENTICATION_COMPLETE",
  /** Authentication Failed - failed to connect and ready to restart authentication and authorization. */
  AuthenticationFailed = "AUTHENTICATION_FAILED",
  /** Authentication Pending - ready to start authentication and authorization, or auth is in progress. */
  AuthenticationPending = "AUTHENTICATION_PENDING",
  /** Manual Boosting (e.g. bump charging) - user has overridden the schedule to immediately boost (e.g. bump charge now). */
  Boosting = "BOOSTING",
  /** Lost Connection - lost connection to the device, ready to re-auth (if not temporary / automatic fix). */
  LostConnection = "LOST_CONNECTION",
  /** Retired - deleted / de-authed (re-auth not possible, re-register device to onboard again). */
  Retired = "RETIRED",
  /** Setup Complete - test is complete (if needed) and device is live, but not ready for smart control. */
  SetupComplete = "SETUP_COMPLETE",
  /** Smart Control Capable - live and ready for smart control (e.g. at home and plugged in) but none is scheduled. */
  SmartControlCapable = "SMART_CONTROL_CAPABLE",
  /** Smart Control in Progress - smart control (e.g. smart charging) is scheduled or is currently occurring. */
  SmartControlInProgress = "SMART_CONTROL_IN_PROGRESS",
  /** Smart Control Not Available - not currently capable of smart control (e.g. away from home or unplugged). */
  SmartControlNotAvailable = "SMART_CONTROL_NOT_AVAILABLE",
  /** Smart Control Off (suspended) - smart control has been (temporarily) disabled (e.g. by the user with holiday mode). */
  SmartControlOff = "SMART_CONTROL_OFF",
  /** Test Charge Failed - connection or smart control test has failed or could not start, ready to retry test. */
  TestChargeFailed = "TEST_CHARGE_FAILED",
  /** Test Charge in Progress - connection and smart control test has successfully started and is occurring. */
  TestChargeInProgress = "TEST_CHARGE_IN_PROGRESS",
  /** Test Charge Not Available - not currently capable of smart control test (e.g. away from home or unplugged). */
  TestChargeNotAvailable = "TEST_CHARGE_NOT_AVAILABLE",
}

/** Identifies a SMETS2 meter (or a SMETS1 E&A'd meter). */
export type SmartMeterDeviceInput = {
  /** Account number of customer. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Electricity or gas meter device ID. */
  readonly deviceId: Scalars["String"]["input"];
};

/** An enumeration. */
export enum SmartMeterInterestChoices {
  /** We have captured that this account is interested in a SMETS2 meter. This does not mean they've booked an appointment. */
  Interested = "INTERESTED",
  /** We have captured that this account could be interested in a SMETS2 meter in the future, so it is appropriate to follow up with them. */
  NotAtTheMoment = "NOT_AT_THE_MOMENT",
  /** We have captured that this account is not interested in a SMETS2 meter. We should use this to avoid advertising SMETS2 meters to them, or contacting them about installing a SMETS2 meter. */
  NotInterested = "NOT_INTERESTED",
}

/** An enumeration. */
export enum SmartMeterInterestSourceChoices {
  Affiliate = "AFFILIATE",
  Website = "WEBSITE",
}

/**
 *
 *     Meter reading frequency choices for smart meters.
 *
 *     Please note: these labels are exposed in the API documentation.
 *
 */
export enum SmartMeterReadingFrequencyChoices {
  /** Daily */
  Daily = "DAILY",
  /** Half hourly */
  HalfHourly = "HALF_HOURLY",
  /** Monthly */
  Monthly = "MONTHLY",
}

/** An enumeration. */
export enum SmartOnboardingEventType {
  /** Agreements Updated. */
  AgreementsUpdated = "AGREEMENTS_UPDATED",
  /** Onboarding cancelled. */
  Cancelled = "CANCELLED",
  /** Onboarding completed. */
  Completed = "COMPLETED",
  /** Documents Checked. */
  DocumentsChecked = "DOCUMENTS_CHECKED",
  /** Export Enabled In Kraken. */
  ExportEnabledInKraken = "EXPORT_ENABLED_IN_KRAKEN",
  /** Export Meter Reading Available. */
  ExportMeterReadingAvailable = "EXPORT_METER_READING_AVAILABLE",
  /** Export MPAN applied for. */
  ExportMpanAppliedFor = "EXPORT_MPAN_APPLIED_FOR",
  /** Export MPAN created. */
  ExportMpanCreated = "EXPORT_MPAN_CREATED",
  /** Export Mpan Not Found. */
  ExportMpanNotFound = "EXPORT_MPAN_NOT_FOUND",
  /** Export MPAN is on supply. */
  ExportMpanOnSupply = "EXPORT_MPAN_ON_SUPPLY",
  /** First Credit Applied. */
  FirstCreditApplied = "FIRST_CREDIT_APPLIED",
  /** FIT resolution. */
  FitResolution = "FIT_RESOLUTION",
  /** Email to install Intelligent Octopus app installed. */
  IntelligentOctopusInstallAppEmailSent = "INTELLIGENT_OCTOPUS_INSTALL_APP_EMAIL_SENT",
  /** Test dispatch in app complete. */
  IntelligentOctopusTestDispatchComplete = "INTELLIGENT_OCTOPUS_TEST_DISPATCH_COMPLETE",
  /** Meter exchange date agreed. */
  MeterExchangeBooked = "METER_EXCHANGE_BOOKED",
  /** Email sent to book meter exchange. */
  MeterExchangeEmailSent = "METER_EXCHANGE_EMAIL_SENT",
  /** Meter Installed. */
  MeterInstalled = "METER_INSTALLED",
  /** Meter Readings Available. */
  MeterReadingsAvailable = "METER_READINGS_AVAILABLE",
  /** MTDs updated. */
  MtdUpdated = "MTD_UPDATED",
  /** Note Added. */
  NoteAdded = "NOTE_ADDED",
  /** Previous Agreement Billing Gap Filled. */
  PreviousAgreementBillingGapFilled = "PREVIOUS_AGREEMENT_BILLING_GAP_FILLED",
  /** Onboarding started. */
  Started = "STARTED",
  /** Tariff Changed On Meter. */
  TariffChangedOnMeter = "TARIFF_CHANGED_ON_METER",
  /** Email sent to confirm tariff switch. */
  TariffSwitchConfirmationEmailSent = "TARIFF_SWITCH_CONFIRMATION_EMAIL_SENT",
  /** Customer accepted terms and conditions. */
  TermsAccepted = "TERMS_ACCEPTED",
  /** Email sent to request terms acceptance. */
  TermsEmailSent = "TERMS_EMAIL_SENT",
  /** Unable To Proceed. */
  UnableToProceed = "UNABLE_TO_PROCEED",
}

/** An enumeration. */
export enum SmartOnboardingTariffCodes {
  /** Octopus Energy's Agile Octopus tariff */
  AgileOctopus = "AGILE_OCTOPUS",
  /** Octopus Energy's Cosy Octopus tariff */
  CosyOctopus = "COSY_OCTOPUS",
  /** Octopus Energy's Intelligent Octopus Flux tariff */
  IntelligentFlux = "INTELLIGENT_FLUX",
  /** Octopus Energy's Intelligent Octopus Go tariff */
  IntelligentOctopus = "INTELLIGENT_OCTOPUS",
  /** Octopus Energy's Flux tariff */
  OctopusFlux = "OCTOPUS_FLUX",
  /** Octopus Energy's Octopus Go tariff */
  OctopusGo = "OCTOPUS_GO",
  /** Octopus Energy's Octopus Go Faster tariff */
  OctopusGoFaster = "OCTOPUS_GO_FASTER",
  /** Octopus Energy's Octopus Go Green tariff */
  OctopusGoGreen = "OCTOPUS_GO_GREEN",
  /** Octopus Energy's Octopus Agile tariff */
  OutgoingAgile = "OUTGOING_AGILE",
  /** Octopus Energy's Outgoing Fixed tariff */
  OutgoingFixed = "OUTGOING_FIXED",
  /** Octopus Energy's Powerloop tariff */
  Powerloop = "POWERLOOP",
  /** Octopus Energy's Tesla Energy Plan import tariff */
  TeslaImport = "TESLA_IMPORT",
}

/** An enumeration. */
export enum SmartOnboardingTermsStatuses {
  /** Customer acceptance of T&Cs required */
  TermsAcceptanceRequired = "TERMS_ACCEPTANCE_REQUIRED",
  /** T&Cs accepted */
  TermsAccepted = "TERMS_ACCEPTED",
  /** Awaiting customer acceptance of T&Cs */
  TermsEmailSent = "TERMS_EMAIL_SENT",
}

/** This type is used by clients to top-up a smart prepay meter */
export type SmartPrepayMeterAmountInput = {
  /** Account number of customer. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Amount of credit to add to the meter, in pence. */
  readonly amount: Scalars["Int"]["input"];
  /** Electricity or gas meter device ID. */
  readonly deviceId: Scalars["String"]["input"];
  /** Apply as temporary credit. */
  readonly isTemporaryCredit: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The top-up will wait for this payment to clear before proceeding. */
  readonly paymentIntentId: InputMaybe<Scalars["ID"]["input"]>;
  /** Reason for top-up. */
  readonly reason: InputMaybe<Scalars["String"]["input"]>;
};

export enum SmartPrepayPaymentStatusChoices {
  AcceptedByMeter = "ACCEPTED_BY_METER",
  Resolved = "RESOLVED",
  UtrnReceived = "UTRN_RECEIVED",
  UtrnRequested = "UTRN_REQUESTED",
}

export enum SmartPrepayProcessStatusChoices {
  Completed = "COMPLETED",
  Failed = "FAILED",
  Initiated = "INITIATED",
  NotStarted = "NOT_STARTED",
  Pending = "PENDING",
  UtrnMustBeAppliedManually = "UTRN_MUST_BE_APPLIED_MANUALLY",
}

/** An enumeration. */
export enum Songs {
  /** No Song Preferred */
  NoSongPreferred = "NO_SONG_PREFERRED",
  /** "Auf Wiederseh’n Sweetheart" by Vera Lynn */
  Song_1938 = "SONG_1938",
  /** "I Believe" by Frankie Laine */
  Song_1939 = "SONG_1939",
  /** "Secret Love" by Doris Day */
  Song_1940 = "SONG_1940",
  /** "Rose Marie" by Slim Whitman */
  Song_1941 = "SONG_1941",
  /** "I’ll Be Home" by Pat Boone */
  Song_1942 = "SONG_1942",
  /** "Diana" by Paul Anka */
  Song_1943 = "SONG_1943",
  /** "Jailhouse Rock" by Elvis Presley */
  Song_1944 = "SONG_1944",
  /** "Living Doll" by Cliff Richard */
  Song_1945 = "SONG_1945",
  /** "It’s Now or Never" by Elvis Presley */
  Song_1946 = "SONG_1946",
  /** "Wooden Heart" by Elvis Presley */
  Song_1947 = "SONG_1947",
  /** "I Remember You" by Frank Ifield */
  Song_1948 = "SONG_1948",
  /** "She Loves You" by The Beatles */
  Song_1949 = "SONG_1949",
  /** "Can’t Buy Me Love" by The Beatles */
  Song_1950 = "SONG_1950",
  /** "Tears" by Ken Dodd */
  Song_1951 = "SONG_1951",
  /** "Green, Green Grass of Home" by Tom Jones */
  Song_1952 = "SONG_1952",
  /** "Release Me" by Engelbert Humperdinck */
  Song_1953 = "SONG_1953",
  /** "Hey Jude" by The Beatles */
  Song_1954 = "SONG_1954",
  /** "Sugar, Sugar" by The Archies */
  Song_1955 = "SONG_1955",
  /** "The Wonder of You" by Elvis Presley */
  Song_1956 = "SONG_1956",
  /** "My Sweet Lord" by George Harrison */
  Song_1957 = "SONG_1957",
  /** "Amazing Grace" by The Royal Scots Dragoon Guards Band */
  Song_1958 = "SONG_1958",
  /** "Tie a Yellow Ribbon Round the Ole Oak Tree" by Dawn */
  Song_1959 = "SONG_1959",
  /** "Tiger Feet" by Mud */
  Song_1960 = "SONG_1960",
  /** "Bye Bye Baby" by Bay City Rollers */
  Song_1961 = "SONG_1961",
  /** "Save Your Kisses for Me" by Brotherhood of Man */
  Song_1962 = "SONG_1962",
  /** "Mull of Kintyre" / "Girls’ School" by Wings */
  Song_1963 = "SONG_1963",
  /** "Rivers of Babylon" / "Brown Girl in the Ring" by Boney M. */
  Song_1964 = "SONG_1964",
  /** "Bright Eyes" by Art Garfunkel */
  Song_1965 = "SONG_1965",
  /** "Don’t Stand So Close to Me" by The Police */
  Song_1966 = "SONG_1966",
  /** "Don’t You Want Me" by The Human League */
  Song_1967 = "SONG_1967",
  /** "Come On Eileen" by Dexys Midnight Runners */
  Song_1968 = "SONG_1968",
  /** "Karma Chameleon" by Culture Club */
  Song_1969 = "SONG_1969",
  /** "I Just Called To Say I Love You" by Stevie Wonder */
  Song_1970 = "SONG_1970",
  /** "The Power of Love" by Jennifer Rush */
  Song_1971 = "SONG_1971",
  /** "Don’t Leave Me This Way" by The Communards */
  Song_1972 = "SONG_1972",
  /** "Never Gonna Give You Up" by Rick Astley */
  Song_1973 = "SONG_1973",
  /** "The Only Way Is Up" by Yazz */
  Song_1974 = "SONG_1974",
  /** "Ride On Time" by Black Box */
  Song_1975 = "SONG_1975",
  /** "Unchained Melody" by The Righteous Brothers */
  Song_1976 = "SONG_1976",
  /** "Everything I Do I Do It for You" by Bryan Adams */
  Song_1977 = "SONG_1977",
  /** "I Will Always Love You" by Whitney Houston */
  Song_1978 = "SONG_1978",
  /** "I’d Do Anything for Love (But I Won’t Do That)" by Meat Loaf */
  Song_1979 = "SONG_1979",
  /** "Love Is All Around" by Wet Wet Wet */
  Song_1980 = "SONG_1980",
  /** "Unchained Melody" by Robson & Jerome */
  Song_1981 = "SONG_1981",
  /** "Killing Me Softly" by Fugees */
  Song_1982 = "SONG_1982",
  /** "Candle in the Wind 1997" / "Something About the Way You Look Tonight" by Elton John */
  Song_1983 = "SONG_1983",
  /** "Believe" by Cher */
  Song_1984 = "SONG_1984",
  /** "...Baby One More Time" by Britney Spears */
  Song_1985 = "SONG_1985",
  /** "Pure Shores" by All Saints */
  Song_1986 = "SONG_1986",
  /** "It Wasn’t Me" by Shaggy featuring Rikrok */
  Song_1987 = "SONG_1987",
  /** "Anything Is Possible" / "Evergreen" by Will Young */
  Song_1988 = "SONG_1988",
  /** "Where Is the Love?" by The Black Eyed Peas */
  Song_1989 = "SONG_1989",
  /** "Call On Me" by Eric Prydz */
  Song_1990 = "SONG_1990",
  /** "Is This the Way to Amarillo" by Tony Christie featuring Peter Kay */
  Song_1991 = "SONG_1991",
  /** "Crazy" by Gnarls Barkley */
  Song_1992 = "SONG_1992",
  /** "Bleeding Love" by Leona Lewis */
  Song_1993 = "SONG_1993",
  /** "Hallelujah" by Alexandra Burke */
  Song_1994 = "SONG_1994",
  /** "Poker Face" by Lady Gaga */
  Song_1995 = "SONG_1995",
  /** "Just The Way You Are" by Bruno Mars */
  Song_1996 = "SONG_1996",
  /** "Someone Like You" by Adele */
  Song_1997 = "SONG_1997",
  /** "Somebody That I Used to Know" by Gotye featuring Kimbra */
  Song_1998 = "SONG_1998",
  /** "Get Lucky" by Daft Punk */
  Song_1999 = "SONG_1999",
  /** "Happy" by Pharrell Williams */
  Song_2000 = "SONG_2000",
  /** "Uptown Funk" by Mark Ronson featuring Bruno Mars */
  Song_2001 = "SONG_2001",
  /** "7 Years" by Lukas Graham */
  Song_2002 = "SONG_2002",
  /** "Shape of You" by Ed Sheeran */
  Song_2003 = "SONG_2003",
  /** Silence */
  SongHoldMusic_4_33Silence = "SONG_hold_music_4_33_silence",
  /** Relaxing: Holding Firm by Dan Phillipson */
  SongHoldMusicHoldingFirm = "SONG_hold_music_holding_firm",
}

export type StartExportOnboardingProcessInput = {
  /** Version of the terms and conditions that have been accepted. */
  readonly acceptedTermsAndConditionsVersion: InputMaybe<
    Scalars["String"]["input"]
  >;
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The export certificate object. */
  readonly certificate: InputMaybe<Certificate>;
  /** The DNO status. */
  readonly dnoStatus: DnoStatus;
  /** The export MPAN. */
  readonly exportMpan: InputMaybe<Scalars["String"]["input"]>;
  /** The FiT ID. */
  readonly fitId: InputMaybe<Scalars["String"]["input"]>;
  /** The FiT ownership status. */
  readonly fitStatus: FitStatus;
  /** The import MPAN. */
  readonly importMpan: InputMaybe<Scalars["String"]["input"]>;
  /** Whether to take over the FiT generation payments. */
  readonly includeFitGeneration: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The export product code. */
  readonly productCode: Scalars["String"]["input"];
  /** The export technology type. */
  readonly technologyType: ExportTechnologyType;
  /** Have the terms and conditions for this product been accepted? To be deprecated. */
  readonly termsAndConditionsAccepted: Scalars["Boolean"]["input"];
};

export type StartSmartFlexOnboardingInput = {
  /** The account to which the device should be registered. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The property where the device is located/charged. */
  readonly propertyId: Scalars["Int"]["input"];
};

export type StartSmartOnboardingProcessInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  readonly isNewAccount: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The MPAN to switch. */
  readonly mpan: InputMaybe<Scalars["String"]["input"]>;
  /** The MPRN to switch. */
  readonly mprn: InputMaybe<Scalars["String"]["input"]>;
  /** The product code to switch to. */
  readonly productCode: Scalars["String"]["input"];
  /** A target start date for the new agreement. Must be today or later. Will be ignored if date is in the past at time of creating the new agreement. */
  readonly targetAgreementChangeDate: InputMaybe<Scalars["Date"]["input"]>;
  readonly termsAndConditions: InputMaybe<TermsAndConditions>;
};

/** An enumeration. */
export enum State {
  ApMode = "AP_MODE",
  BleMode = "BLE_MODE",
  EmergencyMode = "EMERGENCY_MODE",
  FactoryRestore = "FACTORY_RESTORE",
  FaultMode = "FAULT_MODE",
  NormalMode = "NORMAL_MODE",
  Setup = "SETUP",
}

/** An enumeration. */
export enum StatementReversalsAfterClose {
  /** All charges have been reversed after the statement was closed. */
  All = "ALL",
  /** No reversals after the statement was closed. */
  None = "NONE",
  /** The statement has not been closed yet. */
  NotClosed = "NOT_CLOSED",
  /** Some charges have been reversed after the statement was closed. */
  Some = "SOME",
}

/** An enumeration. */
export enum Status {
  /** Approved */
  Approved = "APPROVED",
  /** Approved (customer service gesture) */
  ApprovedCustomerServiceGesture = "APPROVED_CUSTOMER_SERVICE_GESTURE",
  /** Awaiting audit */
  AwaitingAudit = "AWAITING_AUDIT",
  /** Awaiting customer evidence */
  AwaitingCustomerEvidence = "AWAITING_CUSTOMER_EVIDENCE",
  /** Pending */
  Pending = "PENDING",
  /** Rejected */
  Rejected = "REJECTED",
  /** Withdrawn */
  Withdrawn = "WITHDRAWN",
}

/** The input for storing a new card instruction from an embedded form. */
export type StoreElectricJuicePaymentInstructionInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The datetime from which the instruction is vaild. */
  readonly validFrom: Scalars["DateTime"]["input"];
  /** The vendor's reference for this payment method. */
  readonly vendorReference: Scalars["String"]["input"];
};

/** The input for storing a new payment instruction created through the embedded process. */
export type StorePaymentInstructionInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The type of the new payment instruction. */
  readonly instructionType: PaymentType;
  /**
   * **WARNING: Will be mandatory in future versions**
   *
   *  The ledger ID to which the instructions will be linked.
   */
  readonly ledgerId: InputMaybe<Scalars["String"]["input"]>;
  /** The datetime from which the instruction is vaild. */
  readonly validFrom: Scalars["DateTime"]["input"];
  /** The vendor's reference for this payment method. */
  readonly vendorReference: Scalars["String"]["input"];
};

/** An enumeration. */
export enum SupplyType {
  Electricity = "ELECTRICITY",
  Gas = "GAS",
}

export type SwitchMeterPointProductsInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The information required to switch each meter point onto the specified product. */
  readonly meterPointSwitchContexts: ReadonlyArray<MeterPointSwitchContext>;
  /** Runs payment adequacy and checks if the amount - the customer is paying each month - should be updated. */
  readonly updatePaymentAmount: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** An enumeration. */
export enum TaskStatusEnum {
  Failed = "FAILED",
  Finished = "FINISHED",
  Started = "STARTED",
}

/**
 * The dimension of the tax rate.
 *
 * e.g. a sales tax is a `PROPORTION` tax with a rate of 0.25, CCL is a `CURRENCY_PER_KWH` tax
 * with a value of 0.5.
 */
export enum TaxUnitType {
  CurrencyPerKwh = "CURRENCY_PER_KWH",
  Proportion = "PROPORTION",
}

export enum TelemetryGrouping {
  FiveMinutes = "FIVE_MINUTES",
  HalfHourly = "HALF_HOURLY",
  Hourly = "HOURLY",
  OneMinute = "ONE_MINUTE",
  TenSeconds = "TEN_SECONDS",
}

/** Describes the temperature of something that is relevant to the heating system. */
export type TemperatureInput = {
  /** The units in which the temperature is being measured. */
  readonly unit: TemperatureUnit;
  /** The temperature measured. */
  readonly value: Scalars["Decimal"]["input"];
};

/** An input type to represent a finite temperature range. */
export type TemperatureRangeInput = {
  /** The maximum allowable temperature in range. */
  readonly maximum: TemperatureInput;
  /** The minimum allowable temperature in range. */
  readonly minimum: TemperatureInput;
};

/** An enumeration. */
export enum TemperatureUnit {
  DegreesCelsius = "DEGREES_CELSIUS",
}

export type TermsAndConditions = {
  readonly accepted: Scalars["Boolean"]["input"];
  /** The version of the terms and conditions the user was presented with. */
  readonly version: Scalars["String"]["input"];
};

export type TermsVersionInput = {
  /** The major version of terms and conditions that were accepted. */
  readonly versionMajor: Scalars["Int"]["input"];
  /** The minor version of terms and conditions that were accepted. */
  readonly versionMinor: Scalars["Int"]["input"];
};

/**
 *
 *     The reason (if any) that we believe a test dispatch (test charge) did not succeed.
 *
 */
export enum TestDispatchAssessmentFailureReason {
  AssessmentsFailed = "ASSESSMENTS_FAILED",
  DeviceDisconnected = "DEVICE_DISCONNECTED",
  Error = "ERROR",
  None = "NONE",
  NotAtHome = "NOT_AT_HOME",
  SocLimitReached = "SOC_LIMIT_REACHED",
  UnableToCommunicate = "UNABLE_TO_COMMUNICATE",
  Unknown = "UNKNOWN",
}

/**
 * The style is the typographical hierarchy.
 * These are Typescale Categories from the Mobile Design System (Figma).
 */
export enum TextStyleV1 {
  Body1 = "BODY1",
  Body2 = "BODY2",
  ButtonText = "BUTTON_TEXT",
  Callout1 = "CALLOUT1",
  Callout2 = "CALLOUT2",
  Callout3 = "CALLOUT3",
  InputTitle = "INPUT_TITLE",
  Small1 = "SMALL1",
  Small2 = "SMALL2",
  Small3 = "SMALL3",
  Tabular = "TABULAR",
  Title1 = "TITLE1",
  Title2 = "TITLE2",
  Title3 = "TITLE3",
  Title4 = "TITLE4",
  Title5 = "TITLE5",
  Title6 = "TITLE6",
}

/** Transaction types which will be included or excluded, depending on the input argument. */
export enum TransactionTypeFilter {
  /** For filtering/excluding energy charge transactions: Gas or Electricity. */
  EnergyCharges = "ENERGY_CHARGES",
  /** For filtering/excluding imported charge transactions. */
  ImportedCharges = "IMPORTED_CHARGES",
  /** For filtering/excluding imported credit transactions. */
  ImportedCredits = "IMPORTED_CREDITS",
  /** For filtering/excluding imported payment transactions. */
  ImportedPayments = "IMPORTED_PAYMENTS",
  /** For filtering/excluding imported repayment transactions. */
  ImportedRepayments = "IMPORTED_REPAYMENTS",
  /** For filtering/excluding issued transactions. */
  IssuedTransactions = "ISSUED_TRANSACTIONS",
}

export enum TransactionsOrderBy {
  PostedDateAsc = "POSTED_DATE_ASC",
  PostedDateDesc = "POSTED_DATE_DESC",
}

export type TransferLedgerBalanceInputType = {
  /** The amount ( in lowest unit ) to transfer. If the amount is negative,the effect is reversed  (the source ledger's balance increases and the destination ledger's balance decreases). */
  readonly amount: Scalars["Int"]["input"];
  /** Optional short note about transfer reason. */
  readonly note: InputMaybe<Scalars["String"]["input"]>;
  /** Account's ledger from which the requested amount is debited. */
  readonly sourceAccountLedger: AccountLedgerInput;
  /** Account's ledger to which the requested amount is credited. */
  readonly targetAccountLedger: AccountLedgerInput;
};

/** The input type for transferring Loyalty Points. */
export type TransferLoyaltyPointsBetweenUsersInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The number of Loyalty Points to transfer. */
  readonly points: Scalars["Int"]["input"];
  /** The account user receiving the points. */
  readonly receivingUserId: Scalars["String"]["input"];
};

/**
 *
 * Provide a typed source to filter measurements.
 * If a typed_source and a raw source is given, preference is given to the raw source.
 * To get better results, make sure none of the input fields are empty.
 *
 */
export type TypedSourceInputType = {
  readonly readingDirection: InputMaybe<ReadingDirectionType>;
  readonly readingFrequencyType: InputMaybe<ReadingFrequencyType>;
  readonly readingQuality: InputMaybe<ReadingQualityType>;
  readonly sourceIdentifier: InputMaybe<Scalars["String"]["input"]>;
  readonly utility: InputMaybe<UtilityType>;
};

export type UpdateApiExceptionInput = {
  /** The ID of the user assigned to handle this exception.If no user is provided, no user will be assigned to the exception. */
  readonly assignedUserId: InputMaybe<Scalars["Int"]["input"]>;
  /** The new category. If none is provided, the field won't be updated. */
  readonly category: InputMaybe<ApiExceptionCategories>;
  /** The new context. If none is provided, the field won't be updated. This will completely replace the existing context by the new one. */
  readonly context: InputMaybe<Scalars["JSONString"]["input"]>;
  /** The ID of the API Exception that will be updated. */
  readonly id: Scalars["Int"]["input"];
  /** The new key date. If none is provided, the field won't be updated. */
  readonly keyDate: InputMaybe<Scalars["Date"]["input"]>;
  /** The ID of an operations team to handle this exception. If no team is provided, no team will be assigned to the exception. */
  readonly operationsTeamId: InputMaybe<Scalars["Int"]["input"]>;
  /** The new priority. If none is provided, the field won't be updated. */
  readonly priority: InputMaybe<ApiExceptionPriority>;
  /** The new resolution status. If none is provided, the field won't be updated. */
  readonly resolutionStatus: InputMaybe<ApiExceptionResolutionStatus>;
  /** The new resolution type. If none is provided, the field won't be updated. */
  readonly resolutionType: InputMaybe<ApiExceptionResolutionType>;
  /** The updated list of tags. If none is provided, the field won't be updated. */
  readonly tags: InputMaybe<ReadonlyArray<InputMaybe<ApiExceptionTags>>>;
};

export type UpdateApiExceptionNoteInput = {
  /** The ID of the API Exception note being updated. */
  readonly apiExceptionNoteId: Scalars["ID"]["input"];
  /** The body of the note. */
  readonly body: Scalars["String"]["input"];
};

/** Input fields for updating billing email for an account. */
export type UpdateAccountBillingEmailInput = {
  /** Account number for account. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The billing_email which can be up to 512 characters. Use null to unset billing_email. */
  readonly billingEmail: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateAccountSmartMeterInterestInput = {
  readonly accountNumber: Scalars["String"]["input"];
  /** Input field for setting smart meter interest. */
  readonly smets2Interest: SmartMeterInterestChoices;
  /** The source category of the smart meter interest update. */
  readonly smets2InterestSource: InputMaybe<SmartMeterInterestSourceChoices>;
  /** Input field for setting the reason for why a customer is not interested in a smart meter. */
  readonly smets2RefusalReason: InputMaybe<Smets2InterestReason>;
};

export type UpdateAccountUserCommsPreferencesInput = {
  readonly emailFormat: InputMaybe<EmailFormats>;
  readonly fontSizeMultiplier: InputMaybe<Scalars["Float"]["input"]>;
  readonly isOptedInMeterReadingConfirmations: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  readonly isOptedInToClientMessages: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly isOptedInToOfferMessages: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly isOptedInToRecommendedMessages: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  readonly isOptedInToSmsMessages: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly isOptedInToThirdPartyMessages: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  readonly isOptedInToUpdateMessages: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly isUsingInvertedEmailColours: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly preferredHoldMusic: InputMaybe<Songs>;
};

export type UpdateAccountUserCommsPreferencesMutationInput = {
  readonly clientMutationId: InputMaybe<Scalars["String"]["input"]>;
  readonly emailFormat: InputMaybe<Scalars["String"]["input"]>;
  readonly fontSizeMultiplier: InputMaybe<Scalars["Float"]["input"]>;
  readonly isOptedInMeterReadingConfirmations: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  readonly isOptedInToClientMessages: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly isOptedInToOfferMessages: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly isOptedInToRecommendedMessages: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  readonly isOptedInToSmsMessages: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly isOptedInToThirdPartyMessages: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  readonly isOptedInToUpdateMessages: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly isUsingInvertedEmailColours: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly preferredHoldMusic: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateAccountUserMutationInput = {
  readonly clientMutationId: InputMaybe<Scalars["String"]["input"]>;
  readonly dateOfBirth: InputMaybe<Scalars["Date"]["input"]>;
  readonly email: InputMaybe<Scalars["String"]["input"]>;
  readonly familyName: InputMaybe<Scalars["String"]["input"]>;
  readonly givenName: InputMaybe<Scalars["String"]["input"]>;
  readonly landline: InputMaybe<Scalars["String"]["input"]>;
  readonly mobile: InputMaybe<Scalars["String"]["input"]>;
  readonly pronouns: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateAffiliateLinkInputType = {
  readonly contactEmail: InputMaybe<Scalars["String"]["input"]>;
  readonly contactName: InputMaybe<Scalars["String"]["input"]>;
  readonly isBusiness: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly landingUrl: InputMaybe<Scalars["String"]["input"]>;
  /** The id of the affiliate link that is going to be edited. */
  readonly linkId: Scalars["ID"]["input"];
  /** The organisation for whom to update the affiliate link for. */
  readonly organisationId: InputMaybe<Scalars["ID"]["input"]>;
  /**
   *
   * Will be validated as follows:
   *
   * - should be at least two characters
   * - should only contain (letters, numbers, and Hyphen)
   * - should not contain bad words
   * - should not contain any of the reserved words including:
   *  affiliates, api, business, click, consul, developer, friends, kraken, mail, sendgrid, tech, webhooks, www, www2
   */
  readonly subdomain: InputMaybe<Scalars["String"]["input"]>;
  readonly trainingStatus: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateAffiliateOrganisationInputType = {
  /** Is this partner allowed to specify payment methods other than Direct Debit in the import csv or API */
  readonly allowAlternativePaymentMethods: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  /** Are meter point registrations limited for profile classes 1 and 2 for registrations from csv or API */
  readonly canRegisterBusinessMeterPoints: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  /** Allow registration requests with customers without an email address. */
  readonly canRegisterCustomersWithoutEmailAddress: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  /** Allow registration requests with exiting account user emails to add to the portfolio belonging to the account user. */
  readonly canRegisterPortfolioAccounts: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  /** Allow performing tariff renewals via API. */
  readonly canRenewTariffs: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Allow this partner access to the IVR support API (modify their own IVR handling through third party 'IVR Flow Editor') */
  readonly canUseIvrSupportApi: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Default Account Type */
  readonly defaultAccountType: InputMaybe<AccountTypeChoices>;
  /** Restrict to field-sales-only products? This is only allowed for the 'field-sales' and 'events' sales channels */
  readonly isFieldSalesOnlyProduct: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly name: InputMaybe<Scalars["String"]["input"]>;
  /** The organisation that is going to be edited. */
  readonly organisationId: Scalars["ID"]["input"];
  /** Sales Channel */
  readonly salesChannel: InputMaybe<SalesChannelChoices>;
  /** Allow this partner to skip validation that ensures all meter points belong to the same address */
  readonly skipMeterPointAddressValidation: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
};

/** Input type for updating the schedule auto top up amount for for an account. Requires an `account_number`, ledger_id and `payment_amount` to be provided. */
export type UpdateAutoTopUpAmountInput = {
  /** Account number to update the schedule auto top up amount for. */
  readonly accountNumber: Scalars["String"]["input"];
  /** Specifies the ledger ID associated with the current schedule for updates. */
  readonly ledgerId: Scalars["Int"]["input"];
  /** The new auto-top-up amount for the payment schedule. */
  readonly paymentAmount: Scalars["Int"]["input"];
};

/** Input fields for updating comms delivery preferences for an account */
export type UpdateCommsDeliveryPreferenceInput = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly commsDeliveryPreference: CommsDeliveryPreference;
};

export type UpdateCommsHubStatusInput = {
  /** How the CHF was installed and connected to the rest of the Smart Metering System. */
  readonly chfConnectionMethod: InputMaybe<ChfConnectionMethod>;
  /** Device ID of the CHF (Communications Hub Function). */
  readonly chfDeviceId: Scalars["String"]["input"];
  /** Is it a new or replacement CHF? */
  readonly chfInstallType: InputMaybe<ChfInstallType>;
  /** Location of the CHF. */
  readonly chfLocation: InputMaybe<ChfLocation>;
  /** The engineer's description of the fault. */
  readonly faultReason: InputMaybe<ChfFaultReason>;
  /** Whether a fault was identified before or after the installation. */
  readonly faultReturnType: InputMaybe<ChfFaultReturnType>;
  /** Was an external aerial installed? */
  readonly hasAerialInstalled: InputMaybe<Scalars["Boolean"]["input"]>;
  /** In the case of NO_SM_WAN, was the issue a thick stone wall obstruction (as defined in CHSM)? */
  readonly hasConnectivityObstruction: InputMaybe<Scalars["Boolean"]["input"]>;
  /** In the case of NO_SM_WAN, was the issue a local metal obstruction (as defined in CHSM)? */
  readonly hasMetalObstruction: InputMaybe<Scalars["Boolean"]["input"]>;
  /** In the case of NO_SM_WAN, was the CHF in a shared/communal area (as defined in CHSM)? */
  readonly hasSharedObstruction: InputMaybe<Scalars["Boolean"]["input"]>;
  /** MPxN of a meter point linked to the CHF. */
  readonly mpxn: InputMaybe<Scalars["String"]["input"]>;
  /** In the case of NO_FAULT_RETURN, the reason for the meter not being installed. */
  readonly noFaultReturnType: InputMaybe<ChfNoFaultReturnType>;
  /** Type of the premise in which the CHF is located. */
  readonly premiseType: InputMaybe<PremiseType>;
  /** The type of status update to be sent. */
  readonly updateType: CommsHubStatusUpdateType;
};

export type UpdateMessageTagsInput = {
  readonly clientMutationId: InputMaybe<Scalars["String"]["input"]>;
  /** The message to set the tags on. */
  readonly messageRelayId: Scalars["ID"]["input"];
  /** The tag names to set on the message. */
  readonly tagNames: ReadonlyArray<Scalars["String"]["input"]>;
  /** The tag code to set on the message. */
  readonly taggerCode: Scalars["String"]["input"];
  /** The tag version to set on the message. */
  readonly taggerVersion: Scalars["String"]["input"];
};

export type UpdatePasswordInput = {
  /** New password */
  readonly newPassword: Scalars["String"]["input"];
  /** Confirm new password */
  readonly newPasswordConfirmed: Scalars["String"]["input"];
  /** Old password */
  readonly oldPassword: Scalars["String"]["input"];
};

export type UpdatePaymentSchedulePaymentAmountInput = {
  readonly accountNumber: Scalars["String"]["input"];
  /** Amount in pence */
  readonly amount: Scalars["Int"]["input"];
};

export type UpdatePaymentSchedulePaymentDayInput = {
  readonly accountNumber: Scalars["String"]["input"];
  readonly paymentDay: Scalars["Int"]["input"];
};

export type UpdateSmartMeterDataPreferencesInput = {
  readonly accountNumber: Scalars["String"]["input"];
  /** The consent that smart meter readings can be used for further analysis */
  readonly allowReadingsAnalysis: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The desired reading frequency for the smart meter. */
  readonly readingFrequency: SmartMeterReadingFrequencyChoices;
};

export type UpdateSpecialCircumstancesInput = {
  /** Additional presence preferred */
  readonly additionalPresencePreferred: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Blind */
  readonly blind: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Careline/telecare system */
  readonly carelineTelecareSystem: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Chronic/serious illness */
  readonly chronicSeriousIllness: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Dementia */
  readonly dementia: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Developmental condition */
  readonly developmentalCondition: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Pensionable age */
  readonly elderly: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly familiesWithYoungChildren5OrUnder: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  readonly familiesWithYoungChildren5OrUnderEndDate: InputMaybe<
    Scalars["String"]["input"]
  >;
  readonly foreignLanguageSpeaker: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly hearingImpairment: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Heart, lung & ventilator */
  readonly heartLungMachine: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Dialysis, feeding pump and automated medication */
  readonly kidneyDialysis: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Preferred language */
  readonly language: InputMaybe<Scalars["String"]["input"]>;
  /** MDE electric showering */
  readonly mdeElectricShowering: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Medicine refrigeration */
  readonly medicineRefrigeration: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Mental health */
  readonly mentalHealth: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Nebuliser and apnoea monitor */
  readonly nebuliser: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Oxygen concentrator */
  readonly oxygenConcentrator: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Oxygen Use */
  readonly oxygenUse: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly partialSighted: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly partnerPassword: InputMaybe<Scalars["String"]["input"]>;
  readonly physicalImpairment: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly poorSenseOfSmell: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly restrictedHandMovement: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly restrictedMovement: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly speechImpairment: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly stairLift: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly temporaryLifeChanges: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly temporaryLifeChangesEndDate: InputMaybe<Scalars["String"]["input"]>;
  readonly temporaryPostHospitalRecovery: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  readonly temporaryPostHospitalRecoveryEndDate: InputMaybe<
    Scalars["String"]["input"]
  >;
  readonly temporaryYoungAdultHouseholder: InputMaybe<
    Scalars["Boolean"]["input"]
  >;
  readonly temporaryYoungAdultHouseholderEndDate: InputMaybe<
    Scalars["String"]["input"]
  >;
  /** Use a unique password to identify our staff and partners */
  readonly usePasswordToIdentify: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Consent required to allow priority service request information to be shared. You will only need to provide this once */
  readonly userConsent: InputMaybe<Scalars["Boolean"]["input"]>;
  readonly waterDependent: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UpdateSsdInput = {
  /** The account number. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The desired Supply Start Date (SSD). */
  readonly desiredSsd: Scalars["Date"]["input"];
};

export type UpdateUserInput = {
  readonly dateOfBirth: InputMaybe<Scalars["Date"]["input"]>;
  readonly email: InputMaybe<Scalars["String"]["input"]>;
  readonly familyName: InputMaybe<Scalars["String"]["input"]>;
  readonly givenName: InputMaybe<Scalars["String"]["input"]>;
  /** Because this field is clearable, null and the empty string are treated differently; passing null or omitting the field leaves the value as-is, but explicitly passing an empty string clears this value. */
  readonly landline: InputMaybe<Scalars["String"]["input"]>;
  /** Because this field is clearable, null and the empty string are treated differently; passing null or omitting the field leaves the value as-is, but explicitly passing an empty string clears this value. */
  readonly mobile: InputMaybe<Scalars["String"]["input"]>;
  /** How the user would like us to address them (e.g. 'she/her', 'they/them'). Because this field is clearable, null and the empty string are treated differently; passing null or omitting the field leaves the value as-is, but explicitly passing an empty string clears this value. */
  readonly pronouns: InputMaybe<Scalars["String"]["input"]>;
  /** The user's title. */
  readonly title: InputMaybe<Scalars["String"]["input"]>;
  /** The user for whom to perform the update. This is only needed when using an Organisation role */
  readonly userId: InputMaybe<Scalars["String"]["input"]>;
};

/**
 *
 * Filter measurements by the given utility parameters.
 *
 */
export type UtilityFiltersInput = {
  readonly electricityFilters: InputMaybe<ElectricityFiltersInput>;
  readonly gasFilters: InputMaybe<GasFiltersInput>;
};

export enum UtilityType {
  Electricity = "ELECTRICITY",
  EmbeddedElectricity = "EMBEDDED_ELECTRICITY",
  Gas = "GAS",
}

/** Input required to validate email address via Kickbox */
export type ValidateEmailInput = {
  /** Check if an email is already in use. */
  readonly checkUniqueness: InputMaybe<Scalars["Boolean"]["input"]>;
  /** The user's email address. */
  readonly email: Scalars["String"]["input"];
};

export type ValidatePhoneNumberInput = {
  /** The user's phone number. */
  readonly phoneNumber: Scalars["String"]["input"];
};

export type VehicleChargingPreferencesInput = {
  /** Account number. */
  readonly accountNumber: Scalars["String"]["input"];
  readonly targetType: InputMaybe<Scalars["String"]["input"]>;
  readonly weekdayTargetSoc: Scalars["Int"]["input"];
  readonly weekdayTargetTime: Scalars["String"]["input"];
  readonly weekendTargetSoc: Scalars["Int"]["input"];
  readonly weekendTargetTime: Scalars["String"]["input"];
};

export type VehicleEligibilityInputType = {
  /** Registration number of a car. */
  readonly registrationNumber: InputMaybe<Scalars["String"]["input"]>;
};

export type VehicleInput = {
  /** The unique electric vehicle id. */
  readonly vehicleId: Scalars["Int"]["input"];
};

/** An enumeration. */
export enum WanCoverageStrengths {
  /** WAN coverage for this postcode is high quality. */
  High = "HIGH",
  /** WAN coverage for this postcode is low quality. */
  Low = "LOW",
  /** WAN coverage for this postcode is medium quality. */
  Medium = "MEDIUM",
}

export type WarmHomeDiscountApplicationInputType = {
  /** A set of criteria under which someone is eligible for the Warm Home Discount. The applicant must meet at least one of these criteria, as well as at least one qualifying component criteria. */
  readonly qualifyingComponent: InputMaybe<CurrentQualifyingComponentOptions>;
  /** A set of criteria under which someone is eligible for the Warm Home Discount. The applicant must meet at least one of these criteria, as well as at least one qualifying component criteria. */
  readonly qualifyingCriteria: InputMaybe<QualifyingCriteriaOptions>;
};

/** An enumeration. */
export enum WhdAccountType {
  Credit = "CREDIT",
  SmartPrepay = "SMART_PREPAY",
  TraditionalPrepay = "TRADITIONAL_PREPAY",
}

export type WheelOfFortuneSpinInput = {
  /** The number of the account for which readings are submitted. */
  readonly accountNumber: Scalars["String"]["input"];
  /** The supply type that the spin should be registered for. */
  readonly supplyType: SupplyType;
  /** Indication whether the user has accepted the WoF terms and conditions. */
  readonly termsAccepted: Scalars["Boolean"]["input"];
};

/**
 *
 *     Categories of work that a Siteworks appointment is booked for.
 *
 */
export enum WorkCategory {
  /** Accuracy Test. */
  AccuracyTest = "ACCURACY_TEST",
  /** Bracket Installation. */
  BracketInstallation = "BRACKET_INSTALLATION",
  /** Commission. */
  Commission = "COMMISSION",
  /** Comms Hub Power Cycle. */
  CommsHubPowerCycle = "COMMS_HUB_POWER_CYCLE",
  /** Comms Hub Replacement. */
  CommsHubReplacement = "COMMS_HUB_REPLACEMENT",
  /** Confirm Meter Details. */
  ConfirmMeterDetails = "CONFIRM_METER_DETAILS",
  /** De Energise. */
  DeEnergise = "DE_ENERGISE",
  /** Energise. */
  Energise = "ENERGISE",
  /** Exchange. */
  Exchange = "EXCHANGE",
  /** Ihd Install. */
  IhdInstall = "IHD_INSTALL",
  /** Investigate Fault. */
  InvestigateFault = "INVESTIGATE_FAULT",
  /** Isolator Switch Install. */
  IsolatorSwitchInstall = "ISOLATOR_SWITCH_INSTALL",
  /** Meter Tails Upgrade. */
  MeterTailsUpgrade = "METER_TAILS_UPGRADE",
  /** Move. */
  Move = "MOVE",
  /** New Connection. */
  NewConnection = "NEW_CONNECTION",
  /** Reinstall. */
  Reinstall = "REINSTALL",
  /** Remove. */
  Remove = "REMOVE",
  /** Replace Seals. */
  ReplaceSeals = "REPLACE_SEALS",
}

/** An enumeration. */
export enum Zone {
  Auxiliary = "AUXILIARY",
  Water = "WATER",
  Zone_1 = "ZONE_1",
  Zone_2 = "ZONE_2",
}

export type ZoneSchedule = {
  /** Days of the week a schedule should be active, Sunday through Saturday, in bitmask format,e.g. Sun, Tue, Wed => 1011000. */
  readonly days: Scalars["String"]["input"];
  /** Settings in a schedule for the selected day(s). */
  readonly settings: ReadonlyArray<InputMaybe<ScheduleSettings>>;
};

export enum ZoneType {
  Aux = "AUX",
  Div = "DIV",
  Ext = "EXT",
  Heat = "HEAT",
  Water = "WATER",
}

/**
 * Default input required to initiate a LeaveSupplier journey for a given market.
 * This type should only be used when there are no configured markets while building
 * the LeaveSupplierMarketInputType.
 */
export type _DefaultMarketTerminationInput = {
  /** The market supply point identification number. */
  readonly supplyPointIdentifier: Scalars["String"]["input"];
};

export type GetJwtMutationVariables = Exact<{
  apiKey: Scalars["String"]["input"];
}>;

export type GetJwtMutation = {
  readonly obtainKrakenToken: { readonly token: string } | null;
};

export type GetConsumptionDataQueryVariables = Exact<{
  startDate: Scalars["DateTime"]["input"];
  endDate: InputMaybe<Scalars["DateTime"]["input"]>;
  electricityDeviceId: Scalars["String"]["input"];
  gasDeviceId: Scalars["String"]["input"];
}>;

export type GetConsumptionDataQuery = {
  readonly electricity: ReadonlyArray<{
    readonly readAt: any | null;
    readonly consumptionDelta: any | null;
  } | null> | null;
  readonly gas: ReadonlyArray<{
    readonly readAt: any | null;
    readonly consumptionDelta: any | null;
  } | null> | null;
};
