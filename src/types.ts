export type IndustryType =
  | 'General Business'
  | 'Technology & SaaS'
  | 'Hospitality & Restaurant'
  | 'Hotel & Travel'
  | 'Retail & E-commerce'
  | 'Higher Education & Academics'
  | 'Healthcare & Wellness'
  | 'Fitness & Recreation'
  | 'Events & Entertainment'
  | 'Professional Services';

export type QuestionType =
  | 'star_rating'
  | 'numeric_rating'
  | 'emoji_mood'
  | 'nps'
  | 'likert_scale'
  | 'multiple_choice'
  | 'checkbox'
  | 'yes_no'
  | 'short_text'
  | 'long_text'
  | 'dropdown';

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
}

export interface ConditionalRule {
  id: string;
  dependsOnQuestionId: string;
  operator: 'equals' | 'not_equals' | 'less_than_or_equal' | 'greater_than_or_equal' | 'contains';
  value: string | number;
  action: 'show' | 'hide';
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  category?: string;
  options?: QuestionOption[];
  minRating?: number;
  maxRating?: number;
  minLabel?: string;
  maxLabel?: string;
  conditionalRules?: ConditionalRule[];
  order: number;
}

export type SurveyStatus = 'draft' | 'published' | 'archived';

export interface Survey {
  id: string;
  title: string;
  description: string;
  category: string;
  industry: IndustryType;
  status: SurveyStatus;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  allowAnonymous: boolean;
  totalResponses: number;
  averageRating: number;
  feedbackPulseScore: number;
  slug: string;
}

export interface Answer {
  questionId: string;
  questionTitle: string;
  questionType: QuestionType;
  value: string | number | string[];
  numericScore?: number; // Normalized 1-5 or 0-10 score
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  surveyTitle: string;
  respondentName?: string;
  respondentEmail?: string;
  isAnonymous: boolean;
  submittedAt: string;
  answers: Answer[];
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number; // -1 to 1
  keyQuote?: string;
  detectedTopics: string[];
}

export type IssueStatus =
  | 'new'
  | 'under_review'
  | 'in_progress'
  | 'action_taken'
  | 'resolved'
  | 'reopened';

export type IssueSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  createdAt: string;
  completedAt?: string;
  status: 'pending' | 'completed';
}

export interface IssueHistoryEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  previousStatus?: IssueStatus;
  newStatus?: IssueStatus;
  note?: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: IssueSeverity;
  status: IssueStatus;
  surveyId?: string;
  surveyTitle?: string;
  averageRating: number;
  mentionsCount: number;
  trendPercentage: number; // e.g. +34%
  detectedAt: string;
  updatedAt: string;
  resolvedAt?: string;
  owner: string;
  relatedQuotes: Array<{
    text: string;
    date: string;
    rating?: number;
  }>;
  actions: ActionItem[];
  history: IssueHistoryEntry[];
  // Before vs After improvement tracking
  improvementMetric?: {
    beforeRating: number;
    beforePeriod: string;
    actionDate: string;
    afterRating: number;
    afterPeriod: string;
    improvementPercentage: number;
    isImprovement: boolean;
  };
}

export interface FeedbackPulseData {
  score: number; // 0 - 100
  status: 'Healthy' | 'Moderate' | 'Critical';
  averageRating: number;
  positivePercentage: number;
  neutralPercentage: number;
  negativePercentage: number;
  trendPercentage: number;
  totalResponses: number;
  openIssuesCount: number;
  resolvedIssuesCount: number;
}

export interface OrganizationSettings {
  organizationName: string;
  industry: IndustryType;
  logoUrl?: string;
  primaryColor: string;
  timezone: string;
  allowPublicResponses: boolean;
  notifications: {
    criticalFeedbackAlerts: boolean;
    weeklyDigest: boolean;
    issueAssignmentAlerts: boolean;
    campaignCompletionAlerts: boolean;
    emailAlertsAddress: string;
  };
  appearance: {
    theme: 'dark' | 'light' | 'system';
    compactMode: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Viewer';
  organizationId: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  category: 'auth' | 'campaign' | 'response' | 'issue' | 'settings';
  details: string;
}

export interface SurveyTemplate {
  id: string;
  title: string;
  description: string;
  industry: IndustryType;
  category: string;
  iconName: string;
  questions: Omit<Question, 'id'>[];
}
