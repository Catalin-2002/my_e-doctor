export type Location = {
  lat: number;
  lng: number;
}

export type Occupation = 'IT';

export type User = {
  userId: string;
  location?: Location;
  firstName: string;
  lastName: string;
  occupation?: Occupation;
  email: string;
}

