import {
  Survey,
  SurveyResponse,
  Issue,
  OrganizationSettings,
  AuditLog,
  FeedbackPulseData,
  IndustryType,
  SurveyTemplate,
} from '../types';

const SETTINGS_KEY = 'sentio_org_settings_v2';
const SURVEYS_KEY = 'sentio_surveys_v2';
const RESPONSES_KEY = 'sentio_responses_v2';
const ISSUES_KEY = 'sentio_issues_v2';
const AUDIT_LOGS_KEY = 'sentio_audit_logs_v2';

export const DEFAULT_SETTINGS: OrganizationSettings = {
  organizationName: 'Demo',
  industry: 'Technology & SaaS',
  primaryColor: '#DEDBC8',
  timezone: 'UTC-05:00 (Eastern Time)',
  allowPublicResponses: true,
  notifications: {
    criticalFeedbackAlerts: true,
    weeklyDigest: true,
    issueAssignmentAlerts: true,
    campaignCompletionAlerts: false,
    emailAlertsAddress: 'admin@demo.io',
  },
  appearance: {
    theme: 'dark',
    compactMode: false,
  },
};

export const INITIAL_TEMPLATES: SurveyTemplate[] = [
  {
    id: 'template-cx',
    title: 'Customer Experience (CX) Pulse',
    description: 'Measure overall satisfaction, net promoter score, and key pain points across touchpoints.',
    industry: 'Technology & SaaS',
    category: 'Customer Experience',
    iconName: 'Sparkles',
    questions: [
      {
        type: 'emoji_mood',
        title: 'How was your overall experience with our service today?',
        description: 'Select the mood that best reflects your impression.',
        required: true,
        category: 'Satisfaction',
        order: 1,
      },
      {
        type: 'nps',
        title: 'How likely are you to recommend us to a friend or colleague?',
        description: '0 = Not at all likely, 10 = Extremely likely',
        required: true,
        category: 'NPS',
        minRating: 0,
        maxRating: 10,
        order: 2,
      },
      {
        type: 'long_text',
        title: 'What is the main reason for your rating?',
        description: 'Please share any specific details or suggestions.',
        required: false,
        category: 'Feedback',
        order: 3,
      },
    ],
  },
  {
    id: 'template-restaurant',
    title: 'Restaurant & Dining Experience',
    description: 'Gather feedback on food quality, speed of service, ambiance, and hospitality.',
    industry: 'Hospitality & Restaurant',
    category: 'Dining Quality',
    iconName: 'Utensils',
    questions: [
      {
        type: 'star_rating',
        title: 'How would you rate the taste and presentation of your meal?',
        required: true,
        category: 'Food Quality',
        minRating: 1,
        maxRating: 5,
        order: 1,
      },
      {
        type: 'star_rating',
        title: 'How satisfied were you with the speed of service and attentiveness?',
        required: true,
        category: 'Service Speed',
        minRating: 1,
        maxRating: 5,
        order: 2,
      },
      {
        type: 'multiple_choice',
        title: 'Would you visit us again or order takeout in the future?',
        required: true,
        category: 'Retention',
        options: [
          { id: 'opt-1', label: 'Definitely yes', value: 'yes' },
          { id: 'opt-2', label: 'Maybe', value: 'maybe' },
          { id: 'opt-3', label: 'Probably not', value: 'no' },
        ],
        order: 3,
      },
      {
        type: 'long_text',
        title: 'What could we improve for your next visit?',
        required: false,
        category: 'Improvements',
        order: 4,
      },
    ],
  },
  {
    id: 'template-hotel',
    title: 'Hotel & Guest Stay Review',
    description: 'Evaluate room cleanliness, amenities, check-in smoothness, and staff courtesy.',
    industry: 'Hotel & Travel',
    category: 'Guest Experience',
    iconName: 'BedDouble',
    questions: [
      {
        type: 'star_rating',
        title: 'Overall stay satisfaction score',
        required: true,
        category: 'Overall Stay',
        minRating: 1,
        maxRating: 5,
        order: 1,
      },
      {
        type: 'likert_scale',
        title: 'The check-in and check-out process was smooth and seamless.',
        required: true,
        category: 'Front Desk',
        minRating: 1,
        maxRating: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree',
        order: 2,
      },
      {
        type: 'yes_no',
        title: 'Did you experience any issues with room cleanliness or noise during your stay?',
        required: true,
        category: 'Room Comfort',
        order: 3,
      },
      {
        type: 'long_text',
        title: 'Any additional notes for our management team?',
        required: false,
        category: 'Notes',
        order: 4,
      },
    ],
  },
  {
    id: 'template-product',
    title: 'Product Feature & Usability Feedback',
    description: 'Collect user sentiment, feature satisfaction, workflow blockers, and request priorities.',
    industry: 'Technology & SaaS',
    category: 'Product UX',
    iconName: 'Layers',
    questions: [
      {
        type: 'numeric_rating',
        title: 'How easy was it to achieve your goal using this feature?',
        description: '1 = Very Difficult, 7 = Very Easy (CES)',
        required: true,
        category: 'Effort Score',
        minRating: 1,
        maxRating: 7,
        order: 1,
      },
      {
        type: 'checkbox',
        title: 'Which capabilities did you use most frequently?',
        required: false,
        category: 'Feature Usage',
        options: [
          { id: 'f-1', label: 'Automated analytics & reporting', value: 'analytics' },
          { id: 'f-2', label: 'Collaborative issue tracking', value: 'issues' },
          { id: 'f-3', label: 'Interactive survey builder', value: 'builder' },
          { id: 'f-4', label: 'Export & API integrations', value: 'export' },
        ],
        order: 2,
      },
      {
        type: 'long_text',
        title: 'What feature or workflow was most confusing or missing?',
        required: false,
        category: 'Pain Points',
        order: 3,
      },
    ],
  },
  {
    id: 'template-employee',
    title: 'Employee Satisfaction & Team Pulse',
    description: 'Gauge workplace engagement, leadership transparency, work-life balance, and team morale.',
    industry: 'General Business',
    category: 'Internal Pulse',
    iconName: 'Users',
    questions: [
      {
        type: 'emoji_mood',
        title: 'How are you feeling about your workload and momentum this week?',
        required: true,
        category: 'Morale',
        order: 1,
      },
      {
        type: 'likert_scale',
        title: 'I have the tools and support needed to perform my job effectively.',
        required: true,
        category: 'Support',
        minRating: 1,
        maxRating: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree',
        order: 2,
      },
      {
        type: 'long_text',
        title: 'What is one thing management could do to improve team productivity?',
        required: false,
        category: 'Suggestions',
        order: 3,
      },
    ],
  },
  {
    id: 'template-event',
    title: 'Event & Conference Feedback',
    description: 'Post-event survey covering keynote sessions, venue organization, and networking value.',
    industry: 'Events & Entertainment',
    category: 'Event Impact',
    iconName: 'Ticket',
    questions: [
      {
        type: 'star_rating',
        title: 'Overall rating of the conference experience',
        required: true,
        minRating: 1,
        maxRating: 5,
        order: 1,
      },
      {
        type: 'multiple_choice',
        title: 'Which track provided the greatest practical value?',
        required: true,
        options: [
          { id: 'tr-1', label: 'Keynote & Future Vision', value: 'keynote' },
          { id: 'tr-2', label: 'Technical Hands-on Workshops', value: 'workshops' },
          { id: 'tr-3', label: 'Executive Panel Discussions', value: 'panels' },
        ],
        order: 2,
      },
      {
        type: 'long_text',
        title: 'What topics should we prioritize for next year?',
        required: false,
        order: 3,
      },
    ],
  },
  {
    id: 'template-academic',
    title: 'Academic Course & Instructor Evaluation',
    description: 'Collect constructive feedback on curriculum pacing, clarity of materials, and instructor engagement.',
    industry: 'Higher Education & Academics',
    category: 'Curriculum Evaluation',
    iconName: 'GraduationCap',
    questions: [
      {
        type: 'star_rating',
        title: 'How effective was the instructional pacing and clarity of concepts?',
        required: true,
        minRating: 1,
        maxRating: 5,
        order: 1,
      },
      {
        type: 'likert_scale',
        title: 'Learning objectives were clearly communicated throughout the term.',
        required: true,
        minRating: 1,
        maxRating: 5,
        minLabel: 'Disagree',
        maxLabel: 'Agree',
        order: 2,
      },
      {
        type: 'long_text',
        title: 'What part of the syllabus was most beneficial or could be improved?',
        required: false,
        order: 3,
      },
    ],
  },
  {
    id: 'template-healthcare',
    title: 'Patient & Clinic Care Quality',
    description: 'Assess clinic cleanliness, provider bedside manner, and appointment scheduling efficiency.',
    industry: 'Healthcare & Wellness',
    category: 'Care Quality',
    iconName: 'HeartPulse',
    questions: [
      {
        type: 'star_rating',
        title: 'How satisfied were you with the attentiveness and care of the medical staff?',
        required: true,
        minRating: 1,
        maxRating: 5,
        order: 1,
      },
      {
        type: 'numeric_rating',
        title: 'Waiting time satisfaction (1 = Long wait, 5 = Minimal wait)',
        required: true,
        minRating: 1,
        maxRating: 5,
        order: 2,
      },
      {
        type: 'long_text',
        title: 'Any comments regarding facilities or scheduling experience?',
        required: false,
        order: 3,
      },
    ],
  },
  {
    id: 'template-fitness',
    title: 'Gym & Fitness Facility Review',
    description: 'Gather member feedback on equipment availability, locker room hygiene, and class coaching.',
    industry: 'Fitness & Recreation',
    category: 'Facility & Coaching',
    iconName: 'Activity',
    questions: [
      {
        type: 'star_rating',
        title: 'Equipment maintenance and cleanliness rating',
        required: true,
        minRating: 1,
        maxRating: 5,
        order: 1,
      },
      {
        type: 'multiple_choice',
        title: 'How often do you participate in group training sessions?',
        required: true,
        options: [
          { id: 'g-1', label: '3+ times per week', value: 'daily' },
          { id: 'g-2', label: '1-2 times per week', value: 'weekly' },
          { id: 'g-3', label: 'Rarely / Solo gym only', value: 'solo' },
        ],
        order: 2,
      },
      {
        type: 'long_text',
        title: 'What new equipment or classes would you like to see added?',
        required: false,
        order: 3,
      },
    ],
  },
  {
    id: 'template-purchase',
    title: 'Post-Purchase & Delivery Survey',
    description: 'Track checkout ease, shipment punctuality, packaging condition, and product expectations.',
    industry: 'Retail & E-commerce',
    category: 'Order Fulfillment',
    iconName: 'ShoppingBag',
    questions: [
      {
        type: 'emoji_mood',
        title: 'How pleased are you with the arrival speed and package condition?',
        required: true,
        order: 1,
      },
      {
        type: 'yes_no',
        title: 'Did the item match the online descriptions and specifications?',
        required: true,
        order: 2,
      },
      {
        type: 'long_text',
        title: 'Any suggestions for our checkout or unboxing experience?',
        required: false,
        order: 3,
      },
    ],
  },
];

export const INITIAL_SURVEYS: Survey[] = [
  {
    id: 'srv-101',
    title: 'Q3 Enterprise Client Experience Survey',
    description: 'Quarterly strategic feedback on platform performance, support response time, and roadmap requests.',
    category: 'Customer Success',
    industry: 'Technology & SaaS',
    status: 'published',
    createdAt: '2026-08-10T14:30:00Z',
    updatedAt: '2026-08-28T09:15:00Z',
    publishedAt: '2026-08-12T10:00:00Z',
    allowAnonymous: true,
    totalResponses: 148,
    averageRating: 4.4,
    feedbackPulseScore: 86,
    slug: 'q3-client-experience',
    questions: [
      {
        id: 'q-1',
        type: 'emoji_mood',
        title: 'How satisfied are you with our platform reliability this quarter?',
        required: true,
        category: 'Reliability',
        order: 1,
      },
      {
        id: 'q-2',
        type: 'star_rating',
        title: 'Rate the responsiveness of our technical support team',
        required: true,
        category: 'Support',
        minRating: 1,
        maxRating: 5,
        order: 2,
      },
      {
        id: 'q-3',
        type: 'nps',
        title: 'How likely are you to recommend our intelligence solutions to peers?',
        required: true,
        category: 'NPS',
        minRating: 0,
        maxRating: 10,
        order: 3,
      },
      {
        id: 'q-4',
        type: 'long_text',
        title: 'What could we improve in our workflow or integrations?',
        required: false,
        category: 'Feedback',
        conditionalRules: [
          {
            id: 'cr-1',
            dependsOnQuestionId: 'q-2',
            operator: 'less_than_or_equal',
            value: 3,
            action: 'show',
          },
        ],
        order: 4,
      },
    ],
  },
  {
    id: 'srv-102',
    title: 'Grand Bistro Guest Satisfaction Pulse',
    description: 'Continuous dining evaluation covering cuisine freshness, waitstaff courtesy, and peak hour speed.',
    category: 'Dining Service',
    industry: 'Hospitality & Restaurant',
    status: 'published',
    createdAt: '2026-08-15T11:00:00Z',
    updatedAt: '2026-08-29T18:20:00Z',
    publishedAt: '2026-08-15T12:00:00Z',
    allowAnonymous: true,
    totalResponses: 92,
    averageRating: 4.2,
    feedbackPulseScore: 81,
    slug: 'bistro-guest-satisfaction',
    questions: [
      {
        id: 'bq-1',
        type: 'star_rating',
        title: 'How was the culinary taste and presentation of your meal?',
        required: true,
        category: 'Culinary Quality',
        minRating: 1,
        maxRating: 5,
        order: 1,
      },
      {
        id: 'bq-2',
        type: 'star_rating',
        title: 'How was the speed and attentiveness of our service staff?',
        required: true,
        category: 'Service Speed',
        minRating: 1,
        maxRating: 5,
        order: 2,
      },
      {
        id: 'bq-3',
        type: 'long_text',
        title: 'What was the highlight or any pain point during your visit?',
        required: false,
        category: 'Comments',
        order: 3,
      },
    ],
  },
  {
    id: 'srv-103',
    title: 'Global Summit 2026 Attendee Evaluation',
    description: 'Post-event insights on speaker caliber, venue acoustics, and networking session quality.',
    category: 'Event Operations',
    industry: 'Events & Entertainment',
    status: 'published',
    createdAt: '2026-08-20T08:00:00Z',
    updatedAt: '2026-08-30T10:00:00Z',
    publishedAt: '2026-08-21T09:00:00Z',
    allowAnonymous: true,
    totalResponses: 64,
    averageRating: 4.6,
    feedbackPulseScore: 89,
    slug: 'global-summit-2026',
    questions: [
      {
        id: 'eq-1',
        type: 'emoji_mood',
        title: 'Overall sentiment regarding the keynote presentations',
        required: true,
        category: 'Keynote',
        order: 1,
      },
      {
        id: 'eq-2',
        type: 'likert_scale',
        title: 'The interactive sessions provided high actionable value for my team.',
        required: true,
        category: 'Relevance',
        minRating: 1,
        maxRating: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree',
        order: 2,
      },
      {
        id: 'eq-3',
        type: 'long_text',
        title: 'What topics would you like featured in the upcoming edition?',
        required: false,
        order: 3,
      },
    ],
  },
];

export const INITIAL_RESPONSES: SurveyResponse[] = [
  {
    id: 'resp-1',
    surveyId: 'srv-101',
    surveyTitle: 'Q3 Enterprise Client Experience Survey',
    respondentName: 'Elena Rostova',
    respondentEmail: 'elena@solaris.dev',
    isAnonymous: false,
    submittedAt: '2026-08-31T02:40:00Z',
    sentiment: 'positive',
    sentimentScore: 0.85,
    keyQuote: 'The new analytics export is phenomenal. Our executive team uses it daily without hiccups.',
    detectedTopics: ['Analytics', 'Speed', 'Reporting'],
    answers: [
      {
        questionId: 'q-1',
        questionTitle: 'How satisfied are you with our platform reliability this quarter?',
        questionType: 'emoji_mood',
        value: '5',
        numericScore: 5,
      },
      {
        questionId: 'q-2',
        questionTitle: 'Rate the responsiveness of our technical support team',
        questionType: 'star_rating',
        value: 5,
        numericScore: 5,
      },
      {
        questionId: 'q-3',
        questionTitle: 'How likely are you to recommend our intelligence solutions to peers?',
        questionType: 'nps',
        value: 10,
        numericScore: 10,
      },
    ],
  },
  {
    id: 'resp-2',
    surveyId: 'srv-102',
    surveyTitle: 'Grand Bistro Guest Satisfaction Pulse',
    isAnonymous: true,
    submittedAt: '2026-08-30T21:15:00Z',
    sentiment: 'negative',
    sentimentScore: -0.7,
    keyQuote: 'The food was delicious but waiting time was too long during peak dinner hours.',
    detectedTopics: ['Waiting Time', 'Peak Hours', 'Food Quality'],
    answers: [
      {
        questionId: 'bq-1',
        questionTitle: 'How was the culinary taste and presentation of your meal?',
        questionType: 'star_rating',
        value: 5,
        numericScore: 5,
      },
      {
        questionId: 'bq-2',
        questionTitle: 'How was the speed and attentiveness of our service staff?',
        questionType: 'star_rating',
        value: 2,
        numericScore: 2,
      },
      {
        questionId: 'bq-3',
        questionTitle: 'What was the highlight or any pain point during your visit?',
        questionType: 'long_text',
        value: 'The food was delicious but waiting time was too long during peak dinner hours.',
      },
    ],
  },
  {
    id: 'resp-3',
    surveyId: 'srv-101',
    surveyTitle: 'Q3 Enterprise Client Experience Survey',
    isAnonymous: true,
    submittedAt: '2026-08-30T17:30:00Z',
    sentiment: 'neutral',
    sentimentScore: 0.1,
    keyQuote: 'Solid capabilities overall, though documentation for webhooks could be more descriptive.',
    detectedTopics: ['Documentation', 'API', 'Webhooks'],
    answers: [
      {
        questionId: 'q-1',
        questionTitle: 'How satisfied are you with our platform reliability this quarter?',
        questionType: 'emoji_mood',
        value: '4',
        numericScore: 4,
      },
      {
        questionId: 'q-2',
        questionTitle: 'Rate the responsiveness of our technical support team',
        questionType: 'star_rating',
        value: 4,
        numericScore: 4,
      },
      {
        questionId: 'q-3',
        questionTitle: 'How likely are you to recommend our intelligence solutions to peers?',
        questionType: 'nps',
        value: 8,
        numericScore: 8,
      },
    ],
  },
  {
    id: 'resp-4',
    surveyId: 'srv-103',
    surveyTitle: 'Global Summit 2026 Attendee Evaluation',
    respondentName: 'Marcus Vance',
    respondentEmail: 'mvance@zenith.org',
    isAnonymous: false,
    submittedAt: '2026-08-30T14:10:00Z',
    sentiment: 'positive',
    sentimentScore: 0.9,
    keyQuote: 'Best conference structure I attended this year. The breakout design labs were pure gold.',
    detectedTopics: ['Design Labs', 'Speakers', 'Organization'],
    answers: [
      {
        questionId: 'eq-1',
        questionTitle: 'Overall sentiment regarding the keynote presentations',
        questionType: 'emoji_mood',
        value: '5',
        numericScore: 5,
      },
      {
        questionId: 'eq-2',
        questionTitle: 'The interactive sessions provided high actionable value for my team.',
        questionType: 'likert_scale',
        value: 5,
        numericScore: 5,
      },
    ],
  },
  {
    id: 'resp-5',
    surveyId: 'srv-102',
    surveyTitle: 'Grand Bistro Guest Satisfaction Pulse',
    isAnonymous: true,
    submittedAt: '2026-08-29T20:45:00Z',
    sentiment: 'negative',
    sentimentScore: -0.6,
    keyQuote: 'Waited 35 minutes for our main course after ordering. Staff was polite but seemed overwhelmed.',
    detectedTopics: ['Waiting Time', 'Staff Capacity'],
    answers: [
      {
        questionId: 'bq-1',
        questionTitle: 'How was the culinary taste and presentation of your meal?',
        questionType: 'star_rating',
        value: 4,
        numericScore: 4,
      },
      {
        questionId: 'bq-2',
        questionTitle: 'How was the speed and attentiveness of our service staff?',
        questionType: 'star_rating',
        value: 2,
        numericScore: 2,
      },
    ],
  },
];

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'issue-01',
    title: 'Long Waiting Time During Peak Hours',
    description: 'Multiple guests reported delays exceeding 30 minutes for food arrival during Friday and Saturday rush hours.',
    category: 'Service Speed',
    severity: 'critical',
    status: 'action_taken',
    surveyId: 'srv-102',
    surveyTitle: 'Grand Bistro Guest Satisfaction Pulse',
    averageRating: 2.1,
    mentionsCount: 18,
    trendPercentage: 34,
    detectedAt: '2026-08-16T19:00:00Z',
    updatedAt: '2026-08-28T14:00:00Z',
    owner: 'Sarah Jenkins (Ops Lead)',
    relatedQuotes: [
      {
        text: 'The food was delicious but waiting time was too long during peak dinner hours.',
        date: 'Aug 30, 2026',
        rating: 2,
      },
      {
        text: 'Waited 35 minutes for our main course after ordering. Staff was overwhelmed.',
        date: 'Aug 29, 2026',
        rating: 2,
      },
      {
        text: 'Appetizers arrived quickly, but main courses took nearly 40 minutes.',
        date: 'Aug 24, 2026',
        rating: 2,
      },
    ],
    actions: [
      {
        id: 'act-1',
        title: 'Add additional kitchen expeditor during peak evening rush',
        description: 'Scheduled dedicated secondary expeditor on Thursday-Sunday 6 PM to 10 PM.',
        assignedTo: 'Sarah Jenkins',
        createdAt: '2026-08-20T10:00:00Z',
        completedAt: '2026-08-21T08:00:00Z',
        status: 'completed',
      },
      {
        id: 'act-2',
        title: 'Deploy smart table-side order routing terminals',
        description: 'Installed direct kitchen display routing to eliminate hand-written ticket delays.',
        assignedTo: 'Mike Torres (IT Ops)',
        createdAt: '2026-08-22T11:00:00Z',
        completedAt: '2026-08-25T17:00:00Z',
        status: 'completed',
      },
    ],
    history: [
      {
        id: 'hist-1',
        timestamp: '2026-08-16T19:00:00Z',
        actor: 'Sentio Issue Radar AI',
        action: 'Issue automatically detected from negative sentiment and low rating threshold (rating < 2.5)',
        newStatus: 'new',
      },
      {
        id: 'hist-2',
        timestamp: '2026-08-18T09:30:00Z',
        actor: 'Sarah Jenkins',
        action: 'Assigned owner and shifted status to Under Review',
        previousStatus: 'new',
        newStatus: 'under_review',
      },
      {
        id: 'hist-3',
        timestamp: '2026-08-21T08:30:00Z',
        actor: 'Sarah Jenkins',
        action: 'Action taken: Additional staff deployed and order routing upgraded',
        previousStatus: 'in_progress',
        newStatus: 'action_taken',
        note: 'Monitoring subsequent survey batch for rating improvement.',
      },
    ],
    improvementMetric: {
      beforeRating: 2.3,
      beforePeriod: 'Aug 1 - Aug 20',
      actionDate: 'August 21, 2026',
      afterRating: 3.8,
      afterPeriod: 'Aug 22 - Aug 31',
      improvementPercentage: 65,
      isImprovement: true,
    },
  },
  {
    id: 'issue-02',
    title: 'Webhook Integration Documentation Gaps',
    description: 'Enterprise developers reported ambiguity in signature verification code examples for custom webhooks.',
    category: 'Product & Docs',
    severity: 'medium',
    status: 'in_progress',
    surveyId: 'srv-101',
    surveyTitle: 'Q3 Enterprise Client Experience Survey',
    averageRating: 3.2,
    mentionsCount: 9,
    trendPercentage: -12,
    detectedAt: '2026-08-22T10:15:00Z',
    updatedAt: '2026-08-29T11:00:00Z',
    owner: 'DevRel Team',
    relatedQuotes: [
      {
        text: 'Webhook documentation for HMAC-SHA256 signature verification lacks complete Node/Go samples.',
        date: 'Aug 27, 2026',
        rating: 3,
      },
    ],
    actions: [
      {
        id: 'act-3',
        title: 'Publish interactive webhook signature testing suite',
        description: 'Creating runnable codesandboxes for Python, Node, and Go in dev docs.',
        assignedTo: 'DevRel Team',
        createdAt: '2026-08-25T14:00:00Z',
        status: 'pending',
      },
    ],
    history: [
      {
        id: 'hist-4',
        timestamp: '2026-08-22T10:15:00Z',
        actor: 'Sentio Issue Radar',
        action: 'Detected repeated topic cluster: "Webhook documentation"',
        newStatus: 'new',
      },
      {
        id: 'hist-5',
        timestamp: '2026-08-24T10:00:00Z',
        actor: 'Alex Mercer (Product Manager)',
        action: 'Assigned to DevRel Team for sprint execution',
        previousStatus: 'new',
        newStatus: 'in_progress',
      },
    ],
    improvementMetric: {
      beforeRating: 3.0,
      beforePeriod: 'Aug 1 - Aug 24',
      actionDate: 'Aug 25, 2026',
      afterRating: 3.9,
      afterPeriod: 'Aug 26 - Aug 31',
      improvementPercentage: 30,
      isImprovement: true,
    },
  },
  {
    id: 'issue-03',
    title: 'Room Noise Isolation on 4th Floor',
    description: 'Guests in corner suites reported elevator vibration sounds during late evening check-in hours.',
    category: 'Room Comfort',
    severity: 'high',
    status: 'under_review',
    averageRating: 2.7,
    mentionsCount: 6,
    trendPercentage: 15,
    detectedAt: '2026-08-25T08:00:00Z',
    updatedAt: '2026-08-30T16:00:00Z',
    owner: 'Engineering & Facilities',
    relatedQuotes: [
      {
        text: 'Room 408 had a constant mechanical hum from the elevator shaft around midnight.',
        date: 'Aug 28, 2026',
        rating: 2,
      },
    ],
    actions: [],
    history: [
      {
        id: 'hist-6',
        timestamp: '2026-08-25T08:00:00Z',
        actor: 'Sentio Issue Radar',
        action: 'Issue tagged under category "Room Comfort"',
        newStatus: 'new',
      },
    ],
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-08-31T04:40:00Z',
    actor: 'Admin User',
    action: 'Workspace Settings Synchronized',
    category: 'settings',
    details: 'Verified single source of truth for organization settings & notification rules.',
  },
  {
    id: 'log-2',
    timestamp: '2026-08-31T02:40:00Z',
    actor: 'Elena Rostova (Respondent)',
    action: 'Survey Response Submitted',
    category: 'response',
    details: 'Submitted response for "Q3 Enterprise Client Experience Survey" (Rating: 5/5, Positive sentiment).',
  },
  {
    id: 'log-3',
    timestamp: '2026-08-28T14:00:00Z',
    actor: 'Sarah Jenkins',
    action: 'Issue Status Transitioned to Action Taken',
    category: 'issue',
    details: 'Transitioned "Long Waiting Time During Peak Hours" to Action Taken after kitchen expeditor deployment.',
  },
  {
    id: 'log-4',
    timestamp: '2026-08-21T09:00:00Z',
    actor: 'Campaign Lead',
    action: 'Survey Published',
    category: 'campaign',
    details: 'Published "Global Summit 2026 Attendee Evaluation" with public QR code link.',
  },
  {
    id: 'log-5',
    timestamp: '2026-08-16T19:00:00Z',
    actor: 'Sentio Intelligence Engine',
    action: 'Issue Detected via Sentiment Analysis',
    category: 'issue',
    details: 'Automatically identified recurring issue "Long Waiting Time During Peak Hours" from 18 mentions.',
  },
];

// Memory Fallback
let cachedSettings: OrganizationSettings | null = null;
let cachedSurveys: Survey[] | null = null;
let cachedResponses: SurveyResponse[] | null = null;
let cachedIssues: Issue[] | null = null;
let cachedAuditLogs: AuditLog[] | null = null;

function invalidateMemoryCaches() {
  cachedSettings = null;
  cachedSurveys = null;
  cachedResponses = null;
  cachedIssues = null;
  cachedAuditLogs = null;
}

// Event emitter helper
function notifyChange(channel: string, payload: any) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(channel, { detail: payload }));
  }
}

// STORAGE KEYS & SCOPING
const USER_KEY = 'sentio_auth_user_v2';
const REGISTERED_ACCOUNTS_KEY = 'sentio_registered_accounts_v2';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  organization: string;
  industry?: IndustryType;
  isDemoUser?: boolean;
}

function getUserStoragePrefix(): string {
  if (typeof window === 'undefined') return 'demo';
  const user = StoreService.getCurrentUser();
  if (!user || user.isDemoUser || user.email === 'admin@sentio.io') {
    return 'demo';
  }
  const cleanId = (user.id || user.email).replace(/[^a-zA-Z0-9_-]/g, '_');
  return `usr_${cleanId}`;
}

function getKeyFor(entity: 'settings' | 'surveys' | 'responses' | 'issues' | 'audit_logs'): string {
  const prefix = getUserStoragePrefix();
  return `sentio_${prefix}_${entity}_v2`;
}

export const StoreService = {
  // USER SESSION
  getCurrentUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(USER_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to read user from localStorage:', e);
    }
    return null;
  },

  setCurrentUser(user: AuthUser | null): void {
    if (typeof window === 'undefined') return;
    try {
      invalidateMemoryCaches();
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_KEY);
      }
      notifyChange('sentio_user_changed', user);
    } catch (e) {
      console.error('Failed to set user in localStorage:', e);
    }
  },

  getRegisteredAccounts(): AuthUser[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to read registered accounts:', e);
    }
    return [];
  },

  initNewAccountWorkspace(options: {
    id?: string;
    name: string;
    email: string;
    organizationName: string;
    industry: IndustryType;
  }): AuthUser {
    const userId = options.id || 'usr-' + Math.random().toString(36).substring(2, 9);
    const user: AuthUser = {
      id: userId,
      name: options.name,
      email: options.email,
      organization: options.organizationName,
      industry: options.industry,
      isDemoUser: false,
    };

    if (typeof window !== 'undefined') {
      try {
        const accounts = this.getRegisteredAccounts();
        const filtered = accounts.filter((a) => a.email.toLowerCase() !== options.email.toLowerCase());
        filtered.push(user);
        localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(filtered));
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } catch (e) {
        console.warn('Failed to register account in localStorage:', e);
      }
    }

    invalidateMemoryCaches();

    const userPrefix = `usr_${user.id.replace(/[^a-zA-Z0-9_-]/g, '_')}`;

    const cleanSettings: OrganizationSettings = {
      organizationName: options.organizationName,
      industry: options.industry,
      primaryColor: '#DEDBC8',
      timezone: 'UTC-05:00 (Eastern Time)',
      allowPublicResponses: true,
      notifications: {
        criticalFeedbackAlerts: true,
        weeklyDigest: true,
        issueAssignmentAlerts: true,
        campaignCompletionAlerts: false,
        emailAlertsAddress: options.email,
      },
      appearance: {
        theme: 'dark',
        compactMode: false,
      },
    };

    const initialAudit: AuditLog[] = [
      {
        id: `log-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString(),
        actor: user.name,
        action: 'Workspace Initialized',
        category: 'settings',
        details: `Created new organization workspace for "${options.organizationName}".`,
      },
    ];

    if (typeof window !== 'undefined') {
      localStorage.setItem(`sentio_${userPrefix}_settings_v2`, JSON.stringify(cleanSettings));
      localStorage.setItem(`sentio_${userPrefix}_surveys_v2`, JSON.stringify([]));
      localStorage.setItem(`sentio_${userPrefix}_responses_v2`, JSON.stringify([]));
      localStorage.setItem(`sentio_${userPrefix}_issues_v2`, JSON.stringify([]));
      localStorage.setItem(`sentio_${userPrefix}_audit_logs_v2`, JSON.stringify(initialAudit));
    }

    cachedSettings = cleanSettings;
    cachedSurveys = [];
    cachedResponses = [];
    cachedIssues = [];
    cachedAuditLogs = initialAudit;

    notifyChange('sentio_user_changed', user);
    notifyChange('sentio_settings_changed', cleanSettings);
    notifyChange('sentio_surveys_changed', []);
    notifyChange('sentio_responses_changed', []);
    notifyChange('sentio_issues_changed', []);
    notifyChange('sentio_audit_logs_changed', initialAudit);

    return user;
  },

  signInDemoAdmin(): AuthUser {
    invalidateMemoryCaches();
    const demoUser: AuthUser = {
      id: 'usr-demo-admin',
      name: 'Alex Vance',
      email: 'admin@sentio.io',
      organization: 'Demo',
      industry: 'Technology & SaaS',
      isDemoUser: true,
    };
    this.setCurrentUser(demoUser);
    return demoUser;
  },

  signInUser(email: string, name?: string, organizationName?: string, industry?: IndustryType): AuthUser {
    invalidateMemoryCaches();
    if (email.toLowerCase() === 'admin@sentio.io') {
      return this.signInDemoAdmin();
    }

    const accounts = this.getRegisteredAccounts();
    const found = accounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
    if (found) {
      this.setCurrentUser(found);
      return found;
    }

    const fallbackUser: AuthUser = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      name: name || email.split('@')[0],
      email: email.trim(),
      organization: organizationName || 'Demo',
      industry: industry || 'Technology & SaaS',
      isDemoUser: false,
    };

    return this.initNewAccountWorkspace({
      id: fallbackUser.id,
      name: fallbackUser.name,
      email: fallbackUser.email,
      organizationName: fallbackUser.organization,
      industry: fallbackUser.industry || 'Technology & SaaS',
    });
  },

  signOut(): void {
    invalidateMemoryCaches();
    this.setCurrentUser(null);
  },

  // SETTINGS
  getSettings(): OrganizationSettings {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    const key = getKeyFor('settings');
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed: OrganizationSettings = JSON.parse(stored);
        if (parsed.organizationName === 'Lumina Dynamics') {
          parsed.organizationName = 'Demo';
          localStorage.setItem(key, JSON.stringify(parsed));
        }
        cachedSettings = parsed;
        return cachedSettings;
      }
    } catch (e) {
      console.warn('Failed to read settings from localStorage, using default:', e);
    }

    const user = this.getCurrentUser();
    if (user && !user.isDemoUser && user.email !== 'admin@sentio.io') {
      const customSettings: OrganizationSettings = {
        ...DEFAULT_SETTINGS,
        organizationName: user.organization || 'My Workspace',
        industry: user.industry || 'Technology & SaaS',
        notifications: {
          ...DEFAULT_SETTINGS.notifications,
          emailAlertsAddress: user.email,
        },
      };
      cachedSettings = customSettings;
      localStorage.setItem(key, JSON.stringify(customSettings));
      return customSettings;
    }

    cachedSettings = DEFAULT_SETTINGS;
    localStorage.setItem(key, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  },

  saveSettings(newSettings: Partial<OrganizationSettings>): OrganizationSettings {
    return this.updateSettings(newSettings);
  },

  updateSettings(newSettings: Partial<OrganizationSettings>): OrganizationSettings {
    const key = getKeyFor('settings');
    const current = this.getSettings();
    const updated: OrganizationSettings = {
      ...current,
      ...newSettings,
      notifications: {
        ...current.notifications,
        ...(newSettings.notifications || {}),
      },
      appearance: {
        ...current.appearance,
        ...(newSettings.appearance || {}),
      },
    };

    try {
      localStorage.setItem(key, JSON.stringify(updated));
      cachedSettings = updated;
    } catch (e) {
      console.error('Failed to persist settings:', e);
    }

    // Add audit log
    const user = this.getCurrentUser();
    this.addAuditLog({
      actor: user?.name || 'Admin User',
      action: 'Updated Workspace Settings',
      category: 'settings',
      details: `Updated organization name to "${updated.organizationName}" in industry "${updated.industry}".`,
    });

    notifyChange('sentio_settings_changed', updated);
    return updated;
  },

  // SURVEYS
  getSurveys(): Survey[] {
    if (typeof window === 'undefined') return [];
    const key = getKeyFor('surveys');
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        cachedSurveys = JSON.parse(stored);
        return cachedSurveys!;
      }
    } catch (e) {
      console.warn('Failed to read surveys from localStorage:', e);
    }

    const user = this.getCurrentUser();
    if (!user || user.isDemoUser || user.email === 'admin@sentio.io') {
      cachedSurveys = INITIAL_SURVEYS;
      localStorage.setItem(key, JSON.stringify(INITIAL_SURVEYS));
      return INITIAL_SURVEYS;
    }

    cachedSurveys = [];
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  },

  getSurveyById(id: string): Survey | undefined {
    if (!id) return undefined;
    const cleanId = id.trim().toLowerCase();

    // 1. Check current active workspace
    const activeSurveys = this.getSurveys();
    let found = activeSurveys.find(
      (s) => s.id.toLowerCase() === cleanId || (s.slug && s.slug.toLowerCase() === cleanId)
    );
    if (found) return found;

    // 2. Scan all localStorage survey stores for public links
    if (typeof window !== 'undefined') {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith('sentio_') && k.endsWith('_surveys_v2')) {
            const raw = localStorage.getItem(k);
            if (raw) {
              const list: Survey[] = JSON.parse(raw);
              const match = list.find(
                (s) => s.id.toLowerCase() === cleanId || (s.slug && s.slug.toLowerCase() === cleanId)
              );
              if (match) return match;
            }
          }
        }
      } catch (e) {
        console.warn('Error searching survey stores:', e);
      }
    }

    // 3. Fallback to INITIAL_SURVEYS
    found = INITIAL_SURVEYS.find(
      (s) => s.id.toLowerCase() === cleanId || (s.slug && s.slug.toLowerCase() === cleanId)
    );
    return found;
  },

  saveSurvey(survey: Partial<Survey> & { title: string; questions: any[] }): Survey {
    const key = getKeyFor('surveys');
    const surveys = this.getSurveys();
    const now = new Date().toISOString();
    let savedSurvey: Survey;

    if (survey.id && surveys.some((s) => s.id === survey.id)) {
      // Update existing
      surveys.forEach((s, idx) => {
        if (s.id === survey.id) {
          surveys[idx] = {
            ...s,
            ...survey,
            updatedAt: now,
          };
          savedSurvey = surveys[idx];
        }
      });
      const user = this.getCurrentUser();
      this.addAuditLog({
        actor: user?.name || 'Admin User',
        action: 'Survey Updated',
        category: 'campaign',
        details: `Updated survey "${savedSurvey!.title}" (${savedSurvey!.questions.length} questions).`,
      });
    } else {
      // Create new
      const newId = `srv-${Date.now().toString().slice(-6)}`;
      const slug = survey.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const settings = this.getSettings();

      savedSurvey = {
        id: newId,
        title: survey.title,
        description: survey.description || 'General feedback and rating survey.',
        category: survey.category || 'General',
        industry: survey.industry || settings.industry,
        status: survey.status || 'published',
        questions: survey.questions || [],
        createdAt: now,
        updatedAt: now,
        publishedAt: survey.status === 'published' ? now : undefined,
        allowAnonymous: survey.allowAnonymous ?? true,
        totalResponses: 0,
        averageRating: 5.0,
        feedbackPulseScore: 95,
        slug: slug || `survey-${newId}`,
      };
      surveys.unshift(savedSurvey);

      const user = this.getCurrentUser();
      this.addAuditLog({
        actor: user?.name || 'Admin User',
        action: 'Survey Created & Published',
        category: 'campaign',
        details: `Created new survey "${savedSurvey.title}" with ${savedSurvey.questions.length} questions.`,
      });
    }

    localStorage.setItem(key, JSON.stringify(surveys));
    cachedSurveys = surveys;
    notifyChange('sentio_surveys_changed', surveys);
    return savedSurvey!;
  },

  deleteSurvey(id: string): void {
    const key = getKeyFor('surveys');
    const surveys = this.getSurveys().filter((s) => s.id !== id);
    localStorage.setItem(key, JSON.stringify(surveys));
    cachedSurveys = surveys;
    const user = this.getCurrentUser();
    this.addAuditLog({
      actor: user?.name || 'Admin User',
      action: 'Survey Deleted',
      category: 'campaign',
      details: `Deleted survey with ID: ${id}`,
    });
    notifyChange('sentio_surveys_changed', surveys);
  },

  // RESPONSES
  getResponses(): SurveyResponse[] {
    if (typeof window === 'undefined') return [];
    const key = getKeyFor('responses');
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        cachedResponses = JSON.parse(stored);
        return cachedResponses!;
      }
    } catch (e) {
      console.warn('Failed to read responses from localStorage:', e);
    }

    const user = this.getCurrentUser();
    if (!user || user.isDemoUser || user.email === 'admin@sentio.io') {
      cachedResponses = INITIAL_RESPONSES;
      localStorage.setItem(key, JSON.stringify(INITIAL_RESPONSES));
      return INITIAL_RESPONSES;
    }

    cachedResponses = [];
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  },

  submitResponse(newResponse: Omit<SurveyResponse, 'id' | 'submittedAt'>): SurveyResponse {
    const now = new Date().toISOString();
    const id = `resp-${Date.now().toString().slice(-6)}`;

    const completeResponse: SurveyResponse = {
      ...newResponse,
      id,
      submittedAt: now,
    };

    let targetSurveysKey = getKeyFor('surveys');
    let targetResponsesKey = getKeyFor('responses');

    if (typeof window !== 'undefined') {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith('sentio_') && k.endsWith('_surveys_v2')) {
            const raw = localStorage.getItem(k);
            if (raw) {
              const list: Survey[] = JSON.parse(raw);
              if (list.some((s) => s.id === newResponse.surveyId)) {
                targetSurveysKey = k;
                targetResponsesKey = k.replace('_surveys_v2', '_responses_v2');
                break;
              }
            }
          }
        }
      } catch (e) {
        console.warn('Error locating target survey store:', e);
      }
    }

    let targetResponses: SurveyResponse[] = [];
    try {
      const existingRaw = localStorage.getItem(targetResponsesKey);
      targetResponses = existingRaw ? JSON.parse(existingRaw) : [];
    } catch (e) {
      targetResponses = [];
    }
    targetResponses.unshift(completeResponse);
    localStorage.setItem(targetResponsesKey, JSON.stringify(targetResponses));

    if (targetResponsesKey === getKeyFor('responses')) {
      cachedResponses = targetResponses;
      notifyChange('sentio_responses_changed', targetResponses);
    }

    // Update target survey metrics
    try {
      const existingSurveysRaw = localStorage.getItem(targetSurveysKey);
      if (existingSurveysRaw) {
        const surveysList: Survey[] = JSON.parse(existingSurveysRaw);
        const surveyIdx = surveysList.findIndex((s) => s.id === newResponse.surveyId);
        if (surveyIdx !== -1) {
          const targetSurvey = surveysList[surveyIdx];
          const surveyResponses = targetResponses.filter((r) => r.surveyId === targetSurvey.id);
          const total = surveyResponses.length;

          let scoreSum = 0;
          let scoreCount = 0;
          surveyResponses.forEach((r) => {
            r.answers.forEach((ans) => {
              if (typeof ans.numericScore === 'number') {
                scoreSum += ans.numericScore;
                scoreCount++;
              }
            });
          });

          const avgRating = scoreCount > 0 ? Number((scoreSum / scoreCount).toFixed(1)) : 5.0;
          const pulse = Math.min(100, Math.max(20, Math.round(avgRating * 18 + 10)));

          surveysList[surveyIdx] = {
            ...targetSurvey,
            totalResponses: total,
            averageRating: avgRating,
            feedbackPulseScore: pulse,
          };

          localStorage.setItem(targetSurveysKey, JSON.stringify(surveysList));
          if (targetSurveysKey === getKeyFor('surveys')) {
            cachedSurveys = surveysList;
            notifyChange('sentio_surveys_changed', surveysList);
          }
        }
      }
    } catch (e) {
      console.warn('Failed to update survey metrics:', e);
    }

    // Auto issue detection trigger check
    if (completeResponse.sentiment === 'negative' || completeResponse.sentimentScore < -0.3) {
      this.checkAndTriggerIssue(completeResponse);
    }

    this.addAuditLog({
      actor: completeResponse.isAnonymous ? 'Anonymous Respondent' : completeResponse.respondentName || 'Respondent',
      action: 'Survey Response Recorded',
      category: 'response',
      details: `Submitted response for "${completeResponse.surveyTitle}" (Sentiment: ${completeResponse.sentiment}).`,
    });

    return completeResponse;
  },

  // ISSUES
  getIssues(): Issue[] {
    if (typeof window === 'undefined') return [];
    const key = getKeyFor('issues');
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        cachedIssues = JSON.parse(stored);
        return cachedIssues!;
      }
    } catch (e) {
      console.warn('Failed to read issues from localStorage:', e);
    }

    const user = this.getCurrentUser();
    if (!user || user.isDemoUser || user.email === 'admin@sentio.io') {
      cachedIssues = INITIAL_ISSUES;
      localStorage.setItem(key, JSON.stringify(INITIAL_ISSUES));
      return INITIAL_ISSUES;
    }

    cachedIssues = [];
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  },

  updateIssue(id: string, updates: Partial<Issue>, actor: string = 'User'): Issue | undefined {
    const key = getKeyFor('issues');
    const issues = this.getIssues();
    const idx = issues.findIndex((i) => i.id === id);
    if (idx === -1) return undefined;

    const previousStatus = issues[idx].status;
    const now = new Date().toISOString();

    const updatedIssue: Issue = {
      ...issues[idx],
      ...updates,
      updatedAt: now,
      resolvedAt: updates.status === 'resolved' ? now : issues[idx].resolvedAt,
    };

    if (updates.status && updates.status !== previousStatus) {
      updatedIssue.history.unshift({
        id: `hist-${Date.now().toString().slice(-5)}`,
        timestamp: now,
        actor,
        action: `Status updated to ${updates.status.replace(/_/g, ' ')}`,
        previousStatus,
        newStatus: updates.status,
      });

      this.addAuditLog({
        actor,
        action: `Issue Status Changed to ${updates.status}`,
        category: 'issue',
        details: `Issue "${updatedIssue.title}" transitioned from ${previousStatus} to ${updates.status}.`,
      });
    }

    issues[idx] = updatedIssue;
    localStorage.setItem(key, JSON.stringify(issues));
    cachedIssues = issues;
    notifyChange('sentio_issues_changed', issues);
    return updatedIssue;
  },

  addActionToIssue(issueId: string, actionTitle: string, assignedTo: string, description: string = ''): Issue | undefined {
    const key = getKeyFor('issues');
    const issues = this.getIssues();
    const idx = issues.findIndex((i) => i.id === issueId);
    if (idx === -1) return undefined;

    const now = new Date().toISOString();
    const newAction = {
      id: `act-${Date.now().toString().slice(-5)}`,
      title: actionTitle,
      description,
      assignedTo,
      createdAt: now,
      status: 'pending' as const,
    };

    issues[idx].actions.unshift(newAction);
    issues[idx].status = 'in_progress';
    issues[idx].updatedAt = now;
    issues[idx].history.unshift({
      id: `hist-${Date.now().toString().slice(-5)}`,
      timestamp: now,
      actor: assignedTo,
      action: `Added corrective action item: "${actionTitle}"`,
      newStatus: 'in_progress',
    });

    localStorage.setItem(key, JSON.stringify(issues));
    cachedIssues = issues;

    this.addAuditLog({
      actor: assignedTo,
      action: 'Corrective Action Added',
      category: 'issue',
      details: `Added action "${actionTitle}" to issue "${issues[idx].title}".`,
    });

    notifyChange('sentio_issues_changed', issues);
    return issues[idx];
  },

  checkAndTriggerIssue(response: SurveyResponse): void {
    if (!response.keyQuote && response.answers.length === 0) return;
    const key = getKeyFor('issues');
    const issues = this.getIssues();

    const textToAnalyze = (
      (response.keyQuote || '') +
      ' ' +
      response.answers.map((a) => (typeof a.value === 'string' ? a.value : '')).join(' ')
    ).toLowerCase();

    const matchedIssue = issues.find((i) =>
      textToAnalyze.includes(i.title.toLowerCase().split(' ')[0])
    );

    if (matchedIssue) {
      matchedIssue.mentionsCount += 1;
      matchedIssue.relatedQuotes.unshift({
        text: response.keyQuote || 'Negative sentiment captured in survey response.',
        date: 'Just now',
        rating: 2,
      });
      matchedIssue.updatedAt = new Date().toISOString();
      localStorage.setItem(key, JSON.stringify(issues));
      cachedIssues = issues;
      notifyChange('sentio_issues_changed', issues);
    }
  },

  // AUDIT LOGS
  getAuditLogs(): AuditLog[] {
    if (typeof window === 'undefined') return [];
    const key = getKeyFor('audit_logs');
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        cachedAuditLogs = JSON.parse(stored);
        return cachedAuditLogs!;
      }
    } catch (e) {
      console.warn('Failed to read audit logs:', e);
    }

    const user = this.getCurrentUser();
    if (!user || user.isDemoUser || user.email === 'admin@sentio.io') {
      cachedAuditLogs = INITIAL_AUDIT_LOGS;
      localStorage.setItem(key, JSON.stringify(INITIAL_AUDIT_LOGS));
      return INITIAL_AUDIT_LOGS;
    }

    cachedAuditLogs = [];
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  },

  addAuditLog(entry: Omit<AuditLog, 'id' | 'timestamp'>): void {
    const key = getKeyFor('audit_logs');
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      ...entry,
      id: `log-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    if (logs.length > 100) logs.pop();
    try {
      localStorage.setItem(key, JSON.stringify(logs));
      cachedAuditLogs = logs;
      notifyChange('sentio_audit_logs_changed', logs);
    } catch (e) {
      console.error('Failed to save audit log:', e);
    }
  },

  // FEEDBACK PULSE CALCULATOR
  getFeedbackPulse(): FeedbackPulseData {
    const responses = this.getResponses();
    const issues = this.getIssues();
    const total = responses.length;

    const openIssues = issues.filter((i) => i.status !== 'resolved').length;
    const resolvedIssues = issues.filter((i) => i.status === 'resolved').length;

    if (total === 0) {
      return {
        score: 100,
        status: 'Healthy',
        averageRating: 0,
        positivePercentage: 0,
        neutralPercentage: 0,
        negativePercentage: 0,
        trendPercentage: 0,
        totalResponses: 0,
        openIssuesCount: openIssues,
        resolvedIssuesCount: resolvedIssues,
      };
    }

    let positiveCount = 0;
    let neutralCount = 0;
    let negativeCount = 0;
    let scoreSum = 0;
    let scoredItems = 0;

    responses.forEach((r) => {
      if (r.sentiment === 'positive') positiveCount++;
      else if (r.sentiment === 'negative') negativeCount++;
      else neutralCount++;

      r.answers.forEach((ans) => {
        if (typeof ans.numericScore === 'number') {
          scoreSum += ans.numericScore;
          scoredItems++;
        }
      });
    });

    const avg = scoredItems > 0 ? Number((scoreSum / scoredItems).toFixed(1)) : 5.0;
    const posPct = Math.round((positiveCount / total) * 100);
    const neuPct = Math.round((neutralCount / total) * 100);
    const negPct = Math.max(0, 100 - posPct - neuPct);

    const pulseRaw = Math.round((avg / 5) * 50 + (posPct / 100) * 50);
    const score = Math.min(100, Math.max(20, pulseRaw));
    const status = score >= 75 ? 'Healthy' : score >= 50 ? 'Moderate' : 'Critical';

    return {
      score,
      status,
      averageRating: avg,
      positivePercentage: posPct,
      neutralPercentage: neuPct,
      negativePercentage: negPct,
      trendPercentage: 8,
      totalResponses: total,
      openIssuesCount: openIssues,
      resolvedIssuesCount: resolvedIssues,
    };
  },

  // Reset demo data
  resetAllDemoData(): void {
    const demoPrefix = 'demo';
    localStorage.setItem(`sentio_${demoPrefix}_settings_v2`, JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem(`sentio_${demoPrefix}_surveys_v2`, JSON.stringify(INITIAL_SURVEYS));
    localStorage.setItem(`sentio_${demoPrefix}_responses_v2`, JSON.stringify(INITIAL_RESPONSES));
    localStorage.setItem(`sentio_${demoPrefix}_issues_v2`, JSON.stringify(INITIAL_ISSUES));
    localStorage.setItem(`sentio_${demoPrefix}_audit_logs_v2`, JSON.stringify(INITIAL_AUDIT_LOGS));

    invalidateMemoryCaches();

    notifyChange('sentio_settings_changed', DEFAULT_SETTINGS);
    notifyChange('sentio_surveys_changed', INITIAL_SURVEYS);
    notifyChange('sentio_responses_changed', INITIAL_RESPONSES);
    notifyChange('sentio_issues_changed', INITIAL_ISSUES);
    notifyChange('sentio_audit_logs_changed', INITIAL_AUDIT_LOGS);
  },
};
