import type {
  Order,
  PaginatedResponseProps,
  Reservation,
  TableStatus,
} from "@/types";

export const API_URL = "http://localhost:3000/api";

export async function customFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // Crucial for BetterAuth!
  });

  if (!response.ok) {
    // Attempt to parse the backend error message
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error ||
        errorData.message ||
        `HTTP error! status: ${response.status}`,
    );
  }

  return response.json();
}

// Category update and delete functions

export const createCategory = ({ name }: { name: string }) => {
  return customFetch("/category/create", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
};

export const updateCategory = ({ name, id }: { name: string; id: string }) => {
  return customFetch(`/category/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
};

export const deleteCategory = ({ id }: { id: string }) => {
  return customFetch(`/category/delete/${id}`, {
    method: "DELETE",
  });
};
