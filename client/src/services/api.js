const baseUrl = 'http://localhost:3030';

export const api = {
  register: `${baseUrl}/auth/register`,
  login: `${baseUrl}/auth/login`,
  logout: `${baseUrl}/auth/logout`,
  adminArticle: `${baseUrl}/admin/articles`,
  adminCategory: `${baseUrl}/admin/categories`,
  home: `${baseUrl}/home`,
  articles: `${baseUrl}/articles`,
  categories: `${baseUrl}/categories`,
  comments: `${baseUrl}/comments`,
  users: `${baseUrl}/users`,
  diaries: `${baseUrl}/diaries`,
  weeks: `${baseUrl}/weeks`,
};
