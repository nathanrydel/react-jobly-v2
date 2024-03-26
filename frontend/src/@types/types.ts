export type User = {
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
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