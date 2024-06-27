import { 
  Authors, 
  Categories,
  SubCategories,
} from '../default/enums';

export interface Conversation {
  id: string;
  name: string;
}

export interface ListDataObject {
  [key: string]: any;
}

export interface ListContributorActivity {
  contributor: string;
  activity: {
    reviews: any[],
    comments: any[],
    pullRequests: {
      contributor: {
        username: string;
      },
      createdAt: string;
      closedAt: string | null;
      description: string;
      status: string;
      link: string,
      mergedAt: string | null,
      number: number,
      title: string,
      updatedAt: string
    }[],
  }
}

export interface ChartDataObject {
  chartType: string;
  dataLabels: {
    enabled: boolean;
  };
  title: {
    text: string;
  };
  colors: string[];
  series: {
    name: string;
    data: number[];
  }[];
  xAxis: {
    categories: string[];
    title: {
      text: string;

    };
  };
  yAxis: {
    title: {
      text: string;
    };
    min: number;
    max: number;
  };
}

export interface AlertDateDataObject {
  name: string;
  resource: string;
}

export interface AlertEventDataObject {
  contributor: string;
  size: number;
  link: string;
  pullRequest: {
    title: string;
    number: number;
  }
}

interface Issue {
  assignee: {
    name: string;
    active: boolean;
  },
  createAt: string;
  comments: string[];
  id: string;
  link: string;
  name: string;
  points: number;
  priority: {
    external: string;
    internal: string;
  },
  resolvedAt: string | null;
  status: {
    name: string;
    updatedAt: string;
  },
  type: string;
}

export interface PullRequest {
  contributor: {
    username: string;
  },
  createdAt: string;
  status: string;
  link: string;
  title: string;
  number: number;
  description: string;
  mergedAt: string | null;
  isPendingReview: boolean;
  reviews: any[];
  comments: any[];
  files: any[];
}

export interface ReportDataObject {
  highPriorityBugIssues: Issue[],
  issuesExpected: Issue[],
  overdueIssues: Issue[],
  pendingPullRequests: PullRequest[],
};

export interface Message {
  id: string;
  conversationId: string;
  author: Authors;
  content: string; //| ListDataObject[] | ChartDataObject | AlertDataObject;
  createdAt: string;
  category: Categories;
  subCategory: SubCategories;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  organizationId: string;
}
