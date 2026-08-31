import { Question, QuestionType } from '../types';

// Positive & Negative lexicons for robust, instant client-side sentiment analysis
const POSITIVE_WORDS = [
  'great', 'excellent', 'amazing', 'phenomenal', 'good', 'fast', 'helpful',
  'clean', 'smooth', 'love', 'perfect', 'friendly', 'best', 'delicious',
  'outstanding', 'satisfying', 'responsive', 'seamless', 'delightful', 'easy',
  'clear', 'recommend', 'superb', 'wonderful', 'happy', 'valuable'
];

const NEGATIVE_WORDS = [
  'slow', 'bad', 'terrible', 'awful', 'horrible', 'delay', 'delayed', 'wait',
  'waiting', 'poor', 'rude', 'broken', 'error', 'confusing', 'hard', 'difficult',
  'expensive', 'dirty', 'noisy', 'overwhelmed', 'lacking', 'frustrating',
  'missing', 'bug', 'crash', 'issue', 'problem', 'unacceptable'
];

const TOPIC_KEYWORDS: Record<string, string[]> = {
  'Waiting Time & Speed': ['wait', 'waiting', 'slow', 'delay', 'delayed', 'minutes', 'hour', 'queue'],
  'Service & Staff Attentiveness': ['staff', 'waiter', 'server', 'attendant', 'support', 'help', 'polite', 'rude'],
  'Quality & Freshness': ['food', 'taste', 'quality', 'delicious', 'fresh', 'flavor', 'meal', 'dish'],
  'Product & Workflow UX': ['bug', 'crash', 'confusing', 'ui', 'ux', 'feature', 'export', 'dashboard', 'integration'],
  'Pricing & Value': ['price', 'pricing', 'expensive', 'cost', 'worth', 'value', 'fee', 'charge'],
  'Facilities & Cleanliness': ['clean', 'dirty', 'hygiene', 'room', 'noise', 'elevator', 'restroom', 'bathroom'],
};

export const IntelligenceService = {
  // Client-side sentiment analyzer
  analyzeSentiment(text: string): {
    sentiment: 'positive' | 'neutral' | 'negative';
    score: number;
    detectedTopics: string[];
  } {
    if (!text || text.trim().length === 0) {
      return { sentiment: 'neutral', score: 0, detectedTopics: [] };
    }

    const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    let positiveScore = 0;
    let negativeScore = 0;

    words.forEach((w) => {
      if (POSITIVE_WORDS.includes(w)) positiveScore += 1;
      if (NEGATIVE_WORDS.includes(w)) negativeScore += 1.2;
    });

    const total = positiveScore + negativeScore;
    let normalized = 0;
    if (total > 0) {
      normalized = (positiveScore - negativeScore) / total;
    }

    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    if (normalized > 0.25) sentiment = 'positive';
    else if (normalized < -0.25) sentiment = 'negative';

    // Topic detection
    const detectedTopics: string[] = [];
    Object.entries(TOPIC_KEYWORDS).forEach(([topic, keywords]) => {
      const match = keywords.some((k) => words.includes(k) || text.toLowerCase().includes(k));
      if (match) detectedTopics.push(topic);
    });

    return {
      sentiment,
      score: Number(normalized.toFixed(2)),
      detectedTopics,
    };
  },

  // Suggested Actions for detected issues
  getSuggestedActions(issueCategory: string, issueTitle: string): string[] {
    const titleLower = (issueCategory + ' ' + issueTitle).toLowerCase();

    if (titleLower.includes('wait') || titleLower.includes('speed')) {
      return [
        'Deploy additional staff or floor expeditors during peak demand windows.',
        'Implement automated queue dispatch and real-time status display.',
        'Audit prep bottlenecks and streamline handoff checklists.',
      ];
    }
    if (titleLower.includes('doc') || titleLower.includes('product') || titleLower.includes('bug')) {
      return [
        'Publish step-by-step code samples and runnable sandbox templates.',
        'Add in-app tooltip guides and validation diagnostics.',
        'Prioritize sprint ticket with engineering team for hotfix release.',
      ];
    }
    if (titleLower.includes('room') || titleLower.includes('clean') || titleLower.includes('facility')) {
      return [
        'Schedule maintenance inspection and acoustic dampening review.',
        'Implement standardized housekeeping verification checklist.',
        'Offer proactive upgrade or complimentary amenity to affected guests.',
      ];
    }

    return [
      'Conduct follow-up deep dive interviews with affected respondents.',
      'Establish SLA monitoring for team response times in this category.',
      'Review training protocols and update operational SOPs.',
    ];
  },

  // AI Survey Question Generator
  generateQuestionsForTopic(topic: string): Array<Omit<Question, 'id' | 'order'>> {
    const cleanTopic = topic.trim().toLowerCase();

    if (cleanTopic.includes('hospitality') || cleanTopic.includes('food') || cleanTopic.includes('dining') || cleanTopic.includes('restaurant')) {
      return [
        {
          type: 'star_rating',
          title: `How would you rate the overall flavor and presentation of your dining experience?`,
          required: true,
          category: 'Food Quality',
          minRating: 1,
          maxRating: 5,
        },
        {
          type: 'numeric_rating',
          title: 'How satisfied were you with the attentiveness and speed of your server?',
          required: true,
          category: 'Service',
          minRating: 1,
          maxRating: 5,
        },
        {
          type: 'yes_no',
          title: 'Did you experience any delays or issues with your table order?',
          required: true,
          category: 'Operations',
        },
        {
          type: 'long_text',
          title: 'What is one thing our chef or staff could do to make your next visit memorable?',
          required: false,
          category: 'Feedback',
        },
      ];
    }

    if (cleanTopic.includes('event') || cleanTopic.includes('conference') || cleanTopic.includes('workshop')) {
      return [
        {
          type: 'emoji_mood',
          title: 'How do you feel about the keynote presentations and speaker lineup?',
          required: true,
          category: 'Content',
        },
        {
          type: 'nps',
          title: 'How likely are you to attend this event again next year?',
          required: true,
          category: 'Retention',
          minRating: 0,
          maxRating: 10,
        },
        {
          type: 'multiple_choice',
          title: 'Which aspect of the venue was most impressive?',
          required: true,
          category: 'Venue',
          options: [
            { id: 'v1', label: 'Audio/Visual setup & stage production', value: 'av' },
            { id: 'v2', label: 'Networking lounge & catering', value: 'catering' },
            { id: 'v3', label: 'Breakout room workshops', value: 'workshops' },
          ],
        },
        {
          type: 'long_text',
          title: 'What speakers or topics should we invite for the next edition?',
          required: false,
          category: 'Ideas',
        },
      ];
    }

    // Default universal questions for any topic
    return [
      {
        type: 'emoji_mood',
        title: `Overall, how satisfied are you with your ${topic} experience?`,
        required: true,
        category: 'Satisfaction',
      },
      {
        type: 'nps',
        title: `How likely are you to recommend our ${topic} to colleagues or friends?`,
        required: true,
        category: 'Advocacy',
        minRating: 0,
        maxRating: 10,
      },
      {
        type: 'likert_scale',
        title: `The ${topic} met or exceeded my initial expectations.`,
        required: true,
        category: 'Expectations',
        minRating: 1,
        maxRating: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree',
      },
      {
        type: 'long_text',
        title: `What is the single most important improvement we could make to ${topic}?`,
        required: false,
        category: 'Suggestions',
      },
    ];
  },

  // Executive Synthesis
  generateExecutiveSummary(feedbackCount: number, avgRating: number, positivePct: number, topIssues: string[]): string {
    const health = avgRating >= 4.0 ? 'strong overall satisfaction' : 'moderate friction points requiring attention';
    const issuesText = topIssues.length > 0 ? `Key recurring themes center on ${topIssues.slice(0, 2).join(' and ')}.` : 'No critical recurring anomalies detected.';

    return `Based on ${feedbackCount} verified responses, the platform exhibits ${health} (${avgRating}/5.0 average, ${positivePct}% positive sentiment). ${issuesText} Corrective workflows currently maintain active monitoring.`;
  },
};
