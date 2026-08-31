export interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
  region: string;
  city: string;
}

export const TIMEZONE_GROUPS: { region: string; timezones: TimezoneOption[] }[] = [
  {
    region: 'North America (US & Canada)',
    timezones: [
      { value: 'America/New_York', label: 'Eastern Time (ET) — New York, Toronto, Miami', offset: 'UTC-05:00', region: 'North America', city: 'New York' },
      { value: 'America/Chicago', label: 'Central Time (CT) — Chicago, Dallas, Winnipeg', offset: 'UTC-06:00', region: 'North America', city: 'Chicago' },
      { value: 'America/Denver', label: 'Mountain Time (MT) — Denver, Salt Lake City, Calgary', offset: 'UTC-07:00', region: 'North America', city: 'Denver' },
      { value: 'America/Phoenix', label: 'Mountain Standard (No DST) — Phoenix, Tucson', offset: 'UTC-07:00', region: 'North America', city: 'Phoenix' },
      { value: 'America/Los_Angeles', label: 'Pacific Time (PT) — Los Angeles, San Francisco, Vancouver', offset: 'UTC-08:00', region: 'North America', city: 'Los Angeles' },
      { value: 'America/Anchorage', label: 'Alaska Time (AKT) — Anchorage, Juneau', offset: 'UTC-09:00', region: 'North America', city: 'Anchorage' },
      { value: 'Pacific/Honolulu', label: 'Hawaii Standard (HST) — Honolulu', offset: 'UTC-10:00', region: 'North America', city: 'Honolulu' },
    ],
  },
  {
    region: 'Europe & United Kingdom',
    timezones: [
      { value: 'Europe/London', label: 'GMT / British Time — London, Dublin, Edinburgh, Lisbon', offset: 'UTC+00:00', region: 'Europe', city: 'London' },
      { value: 'Europe/Paris', label: 'Central European Time (CET) — Paris, Berlin, Rome, Madrid, Amsterdam', offset: 'UTC+01:00', region: 'Europe', city: 'Paris' },
      { value: 'Europe/Athens', label: 'Eastern European Time (EET) — Athens, Helsinki, Bucharest, Sofia', offset: 'UTC+02:00', region: 'Europe', city: 'Athens' },
      { value: 'Europe/Kyiv', label: 'Eastern European — Kyiv, Chisinau', offset: 'UTC+02:00', region: 'Europe', city: 'Kyiv' },
      { value: 'Europe/Istanbul', label: 'Turkey Time (TRT) — Istanbul, Ankara', offset: 'UTC+03:00', region: 'Europe', city: 'Istanbul' },
      { value: 'Europe/Moscow', label: 'Moscow Standard (MSK) — Moscow, St. Petersburg', offset: 'UTC+03:00', region: 'Europe', city: 'Moscow' },
    ],
  },
  {
    region: 'Asia & Pacific',
    timezones: [
      { value: 'Asia/Dubai', label: 'Gulf Standard (GST) — Dubai, Abu Dhabi, Muscat', offset: 'UTC+04:00', region: 'Asia', city: 'Dubai' },
      { value: 'Asia/Kolkata', label: 'India Standard Time (IST) — New Delhi, Mumbai, Bengaluru', offset: 'UTC+05:30', region: 'Asia', city: 'Kolkata' },
      { value: 'Asia/Dhaka', label: 'Bangladesh Standard — Dhaka, Chittagong', offset: 'UTC+06:00', region: 'Asia', city: 'Dhaka' },
      { value: 'Asia/Bangkok', label: 'Indochina Time (ICT) — Bangkok, Hanoi, Jakarta', offset: 'UTC+07:00', region: 'Asia', city: 'Bangkok' },
      { value: 'Asia/Singapore', label: 'Singapore Standard (SGT) — Singapore, Kuala Lumpur', offset: 'UTC+08:00', region: 'Asia', city: 'Singapore' },
      { value: 'Asia/Hong_Kong', label: 'Hong Kong Time (HKT) — Hong Kong, Shenzhen', offset: 'UTC+08:00', region: 'Asia', city: 'Hong Kong' },
      { value: 'Asia/Shanghai', label: 'China Standard (CST) — Beijing, Shanghai', offset: 'UTC+08:00', region: 'Asia', city: 'Shanghai' },
      { value: 'Asia/Tokyo', label: 'Japan Standard (JST) — Tokyo, Osaka, Kyoto', offset: 'UTC+09:00', region: 'Asia', city: 'Tokyo' },
      { value: 'Asia/Seoul', label: 'Korea Standard (KST) — Seoul, Busan', offset: 'UTC+09:00', region: 'Asia', city: 'Seoul' },
      { value: 'Australia/Perth', label: 'Australian Western (AWST) — Perth', offset: 'UTC+08:00', region: 'Australia', city: 'Perth' },
      { value: 'Australia/Adelaide', label: 'Australian Central (ACST) — Adelaide, Darwin', offset: 'UTC+09:30', region: 'Australia', city: 'Adelaide' },
      { value: 'Australia/Sydney', label: 'Australian Eastern (AEST) — Sydney, Melbourne, Brisbane', offset: 'UTC+10:00', region: 'Australia', city: 'Sydney' },
      { value: 'Pacific/Auckland', label: 'New Zealand (NZST) — Auckland, Wellington', offset: 'UTC+12:00', region: 'Pacific', city: 'Auckland' },
    ],
  },
  {
    region: 'Latin America & Caribbean',
    timezones: [
      { value: 'America/Mexico_City', label: 'Central Standard (CST) — Mexico City, Guadalajara', offset: 'UTC-06:00', region: 'Latin America', city: 'Mexico City' },
      { value: 'America/Bogota', label: 'Colombia Time (COT) — Bogotá, Medellín, Lima', offset: 'UTC-05:00', region: 'Latin America', city: 'Bogota' },
      { value: 'America/Sao_Paulo', label: 'Brasília Time (BRT) — São Paulo, Rio de Janeiro', offset: 'UTC-03:00', region: 'Latin America', city: 'Sao Paulo' },
      { value: 'America/Argentina/Buenos_Aires', label: 'Argentina Time (ART) — Buenos Aires', offset: 'UTC-03:00', region: 'Latin America', city: 'Buenos Aires' },
      { value: 'America/Santiago', label: 'Chile Time (CLT) — Santiago', offset: 'UTC-04:00', region: 'Latin America', city: 'Santiago' },
    ],
  },
  {
    region: 'Middle East & Africa',
    timezones: [
      { value: 'Africa/Cairo', label: 'Eastern European (EET) — Cairo', offset: 'UTC+02:00', region: 'Africa', city: 'Cairo' },
      { value: 'Africa/Johannesburg', label: 'South Africa Standard (SAST) — Johannesburg, Cape Town', offset: 'UTC+02:00', region: 'Africa', city: 'Johannesburg' },
      { value: 'Africa/Lagos', label: 'West Africa Time (WAT) — Lagos, Accra', offset: 'UTC+01:00', region: 'Africa', city: 'Lagos' },
      { value: 'Africa/Nairobi', label: 'East Africa Time (EAT) — Nairobi, Addis Ababa', offset: 'UTC+03:00', region: 'Africa', city: 'Nairobi' },
      { value: 'Asia/Jerusalem', label: 'Israel Standard (IST) — Tel Aviv, Jerusalem', offset: 'UTC+02:00', region: 'Middle East', city: 'Jerusalem' },
      { value: 'Asia/Riyadh', label: 'Arabia Standard (AST) — Riyadh, Doha, Kuwait City', offset: 'UTC+03:00', region: 'Middle East', city: 'Riyadh' },
    ],
  },
  {
    region: 'Universal / Standard',
    timezones: [
      { value: 'UTC', label: 'Coordinated Universal Time (UTC / GMT)', offset: 'UTC+00:00', region: 'Universal', city: 'UTC' },
    ],
  },
];

export const ALL_TIMEZONES: TimezoneOption[] = TIMEZONE_GROUPS.flatMap((g) => g.timezones);

/**
 * Detect the browser's current timezone and match to the closest friendly label
 */
export function detectUserTimezone(): TimezoneOption {
  try {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const match = ALL_TIMEZONES.find((t) => t.value === detected);
    if (match) return match;

    // Partial city or continent match
    const parts = detected.split('/');
    const city = parts[parts.length - 1];
    const partialMatch = ALL_TIMEZONES.find((t) => t.value.includes(city));
    if (partialMatch) return partialMatch;

    // Fallback based on UTC offset
    const offsetMin = -new Date().getTimezoneOffset();
    const sign = offsetMin >= 0 ? '+' : '-';
    const hours = String(Math.floor(Math.abs(offsetMin) / 60)).padStart(2, '0');
    const mins = String(Math.abs(offsetMin) % 60).padStart(2, '0');
    const formattedOffset = `UTC${sign}${hours}:${mins}`;

    const offsetMatch = ALL_TIMEZONES.find((t) => t.offset === formattedOffset);
    if (offsetMatch) return offsetMatch;
  } catch (e) {
    console.warn('Could not detect timezone:', e);
  }

  return ALL_TIMEZONES[0];
}
