export function reportsData(utcYear:number, utcMonth:number, utcAmdate:number, utcAmhour:number, utcAmminute:number, utcPmdate:number, utcPmhour:number, userId:string, organizationId:string){
  return(
    
    {
      reports: [
      {
        isActive: true,
        name: 'Morning Daily Standup Report',
        sections: [
          {
            name: 'Pull Requests Pending Review',
            resource: 'PULL_REQUEST',
            sectionFilters: [
              {
                attribute: 'status',
                metric: 'VALUE',
                operator: 'EQUAL',
                threshold: 'open'
              }
            ]
          }
        ],
        schedule: {
          day: `${utcMonth}/${utcAmdate}/${utcYear}`,
          hour: `${utcAmhour}`
        }
      },
      {
        isActive: true,
        name: 'Evening Daily Summary Report',
        sections: [
          {
            name: 'Pull Requests Pending Review',
            resource: 'PULL_REQUEST',
            sectionFilters: [
              {
                attribute: 'status',
                metric: 'VALUE',
                operator: 'EQUAL',
                threshold: 'close'
              }
            ]
          }
        ],
        schedule: {
          day: `${utcMonth}/${utcPmdate}/${utcYear}`,
          hour: `${utcPmhour}`
        }
      },
      {
        isActive: true,
        name: 'Send me a Sprint Summary once it has been completed',
        sections: [
          {
            name: 'Pull Requests Pending Review',
            resource: 'PULL_REQUEST',
            sectionFilters: [
              {
                attribute: 'status',
                metric: 'VALUE',
                operator: 'EQUAL',
                threshold: 'reopen'
              }
            ]
          }
        ],
        schedule: {
          day: `${utcMonth}/${utcPmdate}/${utcYear}`,
          hour: `${utcPmhour}`
        }
      }
      
      ],
      isOnboarding: true,
      organizationId: organizationId,
      userId: userId
    }
  );
}

export function alertsData(bug:number, tickets:number, hours:number, hours1:number, comments:number, userId:string, organizationId:string ){
  return(
    {
      jira: [
        {
        },
        {
        },
        {
        },
        {
        },
        {
        }
      ],
      github: [
        {
          activateBy: 'EVENT',
          component: 'PULL_REQUEST',
          isActive: true,
          name: 'Large Pull Request Merged Without Comments',
          // message: 'Notify me when large pull requests have been merged without comments',
          resource: 'REPOSITORY',
          resourceId: '39fbb3bd-6cb1-426a-92ad-49793b50d2c6',
          trigger:[
            {
              phase: 0,
              conditions: [
                {	
                  attribute: 'status',
                  component: 'PULL_REQUEST',
                  metric: 'VALUE',
                  threshold: 'closed',
                  operator: 'EQUAL'
                },
                {	
                  attribute: 'comments',
                  component: 'PULL_REQUEST',
                  metric: 'COUNT',
                  threshold: '1',
                  operator: 'LESSER'
                },
                {	
                  attribute: 'mergedAt',
                  component: 'PULL_REQUEST',
                  metric: 'TIME',
                  operator: 'RANGE',
                  threshold: '24 HOURS'
                }
              ],
              triggerEscalation:[
                {
                  escalateTo: 'MANAGER',
                }
              ]
            }
          ]
        },
        {
          activateBy: 'CRON',
          component: 'PULL_REQUEST',
          isActive: true,
          name: 'Pull Request Pending Review',
          // message: 'Notify me when there are pull requests who have been pending review for more than 5 hours',
          resource: 'REPOSITORY',
          resourceId: '39fbb3bd-6cb1-426a-92ad-49793b50d2c6',
          trigger:[
            {
              phase: 0,
              conditions: [
                {	
                  attribute: 'status',
                  component: 'PULL_REQUEST',
                  metric: 'VALUE',
                  operator: 'EQUAL',
                  threshold: 'open',
                },
                {	
                  attribute: 'reviews',
                  component: 'PULL_REQUEST',
                  metric: 'COUNT',
                  operator: 'LESSER',
                  threshold: '1',
                },
                {	
                  attribute: 'openedAt',
                  component: 'PULL_REQUEST',
                  metric: 'TIME',
                  operator: 'ELAPSED',
                  threshold: '5 HOURS',
                }
              ],
              triggerEscalation:[
                {
                  escalateTo: 'REVIEWERS',
                }
              ],
            }
          ]
        },
        {
          activateBy: 'CRON',
          component: 'PULL_REQUEST',
          isActive: true,
          name: 'Pull Request Approved Pending Merge',
          // message: 'Notify me when there are pull request that have been approved but not merged within 5 hours',
          resource: 'REPOSITORY',
          resourceId: '39fbb3bd-6cb1-426a-92ad-49793b50d2c6',
          trigger:[
            {
              phase: 0,
             
              conditions: [
                {	
                  attribute: 'status',
                  component: 'PULL_REQUEST',
                  metric: 'VALUE',
                  operator: 'EQUAL',
                  threshold: 'open',
                },
                {	
                  attribute: 'isApproved',
                  component: 'PULL_REQUEST',
                  metric: 'VALUE',
                  operator: 'EQUAL',
                  threshold: 'true',
                },
                {	
                  attribute: 'approvedAt',
                  component: 'PULL_REQUEST',
                  metric: 'TIME',
                  operator: 'ELAPSED',
                  threshold: '5 HOURS',
                }
              ],
              triggerEscalation:[
                {
                  escalateTo: 'MANAGER',
                }
              ],
            }
          ]
        },
        {
        }
      ],
      isOnboarding: true,
      organizationId: organizationId,
      userId: userId
    }
  );
}


export function personalData(){
  return(
    {
      personalData: [       
        {
          avatar: 'avatar1',
          name: 'Scalett Johansson',
          JiraUser: 'scarlettjohansson@gmail.com',
          SlackUser: '@scarlett',
          GithubUser: ['Scarlettj','User1', 'User2',],
          team: ['My team', 'DevOps Team'],
          role: 'Manager',
        },
        {
          avatar: 'avatar2',
          name: 'Leonardo DiCaprio',
          JiraUser: 'leonardodicaprio@gmail.com',
          SlackUser: '@Leonardo',
          GithubUser: ['Dicap','Leonardo','User3', 'User4',],
          team: ['My team', 'DevOps Team'],
          role: 'Manager',
        },
        {
          avatar: 'avatar3',
          name: 'Patrick Bateamn',
          JiraUser: '',
          SlackUser: '@Patrick',
          GithubUser: ['Patrick001','User5', 'User6', 'User7',],
          team: ['My team', 'DevOps Team'],
          role: 'Manager',
        },
        {
          avatar: 'avatar4',
          name: 'Tobey Meguire',
          JiraUser: 'tobeymaguire@gmail.com',
          SlackUser: '@Tobey',
          GithubUser: ['Tobey','User8', 'User9',],
          team: ['My team', 'DevOps Team'],
          role: 'Manager',
        },
        {
          avatar: 'avatar5',
          name: 'Kevin Hart',
          JiraUser: 'kevinhart@gmail.com',
          SlackUser: '',
          GithubUser: [],
          team: [],
          role: '',
        },
        {
          avatar: 'avatar6',
          name: 'Brad Pitt',
          JiraUser: 'bradpitt@gmail.com',
          SlackUser: '',
          GithubUser: [],
          team: [],
          role: '',
        },

      ],
    }
  );
}