export interface Card {
  id: string;
  name: string;
  address: string;
  description: string;
  schedule: Schedule[];
  phone: string;
  location: string[];
  logo: string;
}

export interface Schedule {
  day: number;
  opens: string;
  closes: string;
}
