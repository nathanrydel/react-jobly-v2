export type User = SignUpUser & {
  isAdmin?: boolean;
  applications?: number[];
};

export type SignUpUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
};

export type Company = {
  handle: string;
  name: string;
  description: string;
  numEmployees: number;
  logoUrl: string;
};

export type Job = {
  title: string;
  salary: string;
  equity: string;
  companyHandle: string;
};

export type AuthUser = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  photo_url: string | null;
};
