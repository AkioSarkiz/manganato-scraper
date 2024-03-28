export interface DashboardManga {
  title: string;
  link: string;
  cover: string;
  rating: string;
  views: string;
  description: string | null;
}

export interface SearchManga {
  title: string;
  link: string;
  cover: string;
  rating: string;
  views: string;
}

export interface PaginationProps {
  // default is 1
  page?: number;
}

export interface ParseDashboardPageProps extends PaginationProps {
  url: string;
}

export interface SearchProps extends PaginationProps {
  query: string;
}
