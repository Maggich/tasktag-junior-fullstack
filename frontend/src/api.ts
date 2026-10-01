export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  tag: Tag | null;
  created_at: string;
}

interface PaginatedResponse<T> {
  count: number;
  results: T[];
}

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

async function getResults<T>(path: string): Promise<T[]> {
  const response = await fetch(`${apiUrl}/${path}/`);
  if (!response.ok) {
    throw new Error(`Не удалось загрузить данные (${response.status}).`);
  }
  const data: PaginatedResponse<T> = await response.json();
  return data.results;
}

export const getTasks = () => getResults<Task>("tasks");
export const getTags = () => getResults<Tag>("tags");
