export type Location = {
  lat: number;
  lng: number;
};

export type OccupationField =
  | 'TECHNOLOGY'
  | 'HEALTHCARE'
  | 'EDUCATION'
  | 'FINANCE'
  | 'ENGINEERING'
  | 'ARTS'
  | 'MARKETING'
  | 'LEGAL'
  | 'CONSTRUCTION'
  | 'RETAIL'
  | 'HOSPITALITY'
  | 'GOVERNMENT'
  | 'AGRICULTURE'
  | 'OTHER';

export type User = {
  userId: string;
  location?: Location;
  firstName: string;
  lastName: string;
  occupation?: string;
  dateOfBirth?: number;
  email: string;
};
