export enum CommunicationManagementProviders {
  SLACK = 'SLACK',
}

export enum SoftwareManagementProviders {
  GITHUB = 'GITHUB',
}

export enum ProjectManagementProviders {
  JIRA = 'JIRA',
}

export enum Authors {
  USER = 'USER',
  AGENT = 'AGENT',
}

export enum Categories {
  LIST = 'LIST',
  ALERT = 'ALERT',
  TEXT = 'TEXT',
  CHART = 'CHART',
  RECORD = 'RECORD',
  REPORT = 'REPORT',

}

export enum SubCategories {
  ALERT_TRIGGER_PULL_REQUEST_SIZE = 'ALERT_TRIGGER_PULL_REQUEST_SIZE',
  ALERT_TRIGGER_PULL_REQUEST_PENDING_REVIEW = 'ALERT_TRIGGER_PULL_REQUEST_PENDING_REVIEW',
  LIST_PULL_REQUESTS = 'LIST_PULL_REQUESTS',
  LIST_PROJECT_ISSUES = 'LIST_PROJECT_ISSUES',
  LIST_CONTRIBUTOR_ACTIVITY = 'LIST_CONTRIBUTOR_ACTIVITY',

  TEXT_ERROR_MISSING_COMMUNICATION_MANAGEMENT_INTEGRATION = 'TEXT_ERROR_MISSING_COMMUNICATION_MANAGEMENT_INTEGRATION',
  TEXT_ERROR_MISSING_PROJECT_MANAGEMENT_INTEGRATION = 'TEXT_ERROR_MISSING_PROJECT_MANAGEMENT_INTEGRATION',
  TEXT_ERROR_MISSING_SOFTWARE_MANAGEMENT_INTEGRATION = 'TEXT_ERROR_MISSING_SOFTWARE_MANAGEMENT_INTEGRATION',
}
