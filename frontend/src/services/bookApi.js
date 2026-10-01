import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const searchBooks = async (query) => {
  const response = await api.get(
    "/external-books/search",
    {
      params: { q: query }
    }
  );

  return response.data;
};

export const saveBook = async (book) => {
  const response = await api.post(
    "/external-books/save",
    book
  );

  return response.data;
};

export const getSavedBooks = async () => {
  const response = await api.get("/books");

  return response.data;
};

export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);

  return response.data;
};

export const createBook = async (book) => {
  const response = await api.post("/books", book);

  return response.data;
};

export const toggleBookFavorite = async (id) => {
  const response = await api.patch(
    `/books/${id}/favorite`
  );

  return response.data;
};

export const removeBookFromLibrary = async (id) => {
  const response = await api.delete(
    `/books/${id}/library`
  );

  return response.data;
};

export const getReadingProgress = async (id) => {
  const response = await api.get(
    `/progress/${id}`
  );

  return response.data;
};

export const updateReadingProgress = async (
  id,
  progress,
  currentPage
) => {
  const response = await api.patch(`/progress/${id}`, {
    progress,
    currentPage
  });

  return response.data;
};

export const getAudioProgress = async (id) => {
  const response = await api.get(
    `/audio-progress/${id}`
  );

  return response.data;
};

export const updateAudioProgress = async (
  id,
  currentTime
) => {
  const response = await api.patch(
    `/audio-progress/${id}`,
    {
      currentTime
    }
  );

  return response.data;
};

export const getAllBooksForAdmin = async () => {
  const response = await api.get("/books/admin/all");
  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/uploads", formData);

  return response.data;
};