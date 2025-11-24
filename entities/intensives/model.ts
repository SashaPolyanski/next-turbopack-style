interface Teacher {
  description: string;
  image: string;
  name: string;
}

interface Theme {
  category: string;
  description: string;
  order: string;
  title: string;
  uid: string;
}

export interface Webinar {
  address: string;
  cancel_reason: string;
  canceled: string;
  date: string;
  description: string;
  gmt: string;
  important: string;
  notifications: string;
  skill_level: string;
  subscribe: string;
  teacher: Array<Teacher>;
  theme: Theme;
  time_end: string;
  time_end_UTC: string;
  time_start: string;
  time_start_UTC: string;
  type: string;
  uid: string;
  vacant_places: number;
}
