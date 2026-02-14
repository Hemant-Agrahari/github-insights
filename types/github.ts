export type Label = {
  id: number;
  name: string;
  color: string;
};

export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  state: string;
  user: User;
  labels: Label[];
  comments: number;
  created_at: string;
  updated_at: string;
  body: string | null;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: User;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
  language: string | null;
  license: {
    name: string;
  } | null;
  updated_at: string;
}

export interface Contributor extends User {
  id: number;
  contributions: number;
}
