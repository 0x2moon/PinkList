const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error("Usuário não autenticado. Token não encontrado.");
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  user?: number;
}

export async function fetchTasks(): Promise<Task[]> {
  const headers = getAuthHeaders();
  const response = await fetch(`${API_URL}/tasks/`, { headers });

  if (!response.ok) {
    throw new Error('Falha ao carregar tarefas. Status: ' + response.status);
  }

  return response.json();
}

export async function createTask(title: string): Promise<Task> {
  const headers = getAuthHeaders();
  const response = await fetch(`${API_URL}/tasks/`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ title: title, completed: false }),
  });

  if (!response.ok) {
    throw new Error('Falha ao criar tarefa.');
  }

  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const headers = getAuthHeaders();
  const response = await fetch(`${API_URL}/tasks/${id}/`, {
    method: 'DELETE',
    headers: headers,
  });

  if (response.status !== 204) {
    throw new Error('Falha ao deletar tarefa.');
  }
}