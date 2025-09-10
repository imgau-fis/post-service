import axios from "axios";

// Khi build bằng Bun trong Dockerfile, mình truyền ARG VITE_API_URL
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";
export const api = axios.create({ baseURL: `${API_URL}` });

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  contentHtml?: string;
  author: string;
  tags: string[];
  publishedAt?: string;
};
