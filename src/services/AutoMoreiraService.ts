interface IErrorResponse {
  message?: string;
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    return (
      (await (response.json() as Promise<IErrorResponse>)).message ||
      response.statusText ||
      'error'
    );
  } catch {
    return response.statusText || 'error';
  }
}

export async function getData<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return (await response.json()) as Promise<T>;
}

export async function postData<T>(endpoint: string, body: T): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
  return (await response.json()) as Promise<T>;
}

export async function deleteData<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return (await response.json()) as Promise<T>;
}
