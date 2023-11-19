export type Location = {
  lat: number;
  lng: number;
};

export type User = {
  userId: string;
  location?: Location;
  firstName: string;
  lastName: string;
  occupationField?: string;
  dateOfBirth?: number;
  email: string | null;
  imageLocation?: string | null;
};
