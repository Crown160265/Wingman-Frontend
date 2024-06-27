import { JIRA_INTEGRATION_URL, SLACK_INTEGRATION_URL, GITHUB_INTEGRATION_URL } from './urls';


export const appTexts = [
  {
    name: 'Jira',
    description: 'Jira integration allows Wingman to alert you about high priority tickets, summarize the day for you, show you burndown and more.',
    integrationLink: JIRA_INTEGRATION_URL
  },
  {
    name: 'Github',
    description: 'Github integration allows Wingman to report PRs that are pending review too long, show you productivity metrics or summarize your sprint.',
    integrationLink: GITHUB_INTEGRATION_URL
  },
  {
    name: 'Slack',
    description: 'Slack integration allows wingman to notify you once an alert was triggered or share a reply from Wingman on Slack with a colleague.',
    integrationLink: SLACK_INTEGRATION_URL
  },
  {
    name: 'Coming Soon',
    description: 'More integrations coming soon.',
    integrationLink: ''
  },
]