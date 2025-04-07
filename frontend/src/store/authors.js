import { create } from "zustand";

export const useAuthorsStore = create((set) => ({
  authors: [],
  author: {},
  isLoading: false,
  authorBooks: [],
  isLoadingBooks: false,

  setAuthors: (authors) => set({ authors, isLoading: false }),

  fetchAuthors: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/authors");
      const data = await res.json();
      set({ authors: data.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching authors:", error);
      set({ isLoading: false });
    }
  },

  fetchAuthor: async (id) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/authors/${id}`);
      const data = await res.json();
      set({ author: data.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching the author:", error);
      set({ isLoading: false });
    }
  },

  createAuthor: async (newAuthor) => {
    const res = await fetch("/api/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAuthor),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message };
    }

    set((state) => ({ authors: [...state.authors, data.data] }));
    return { success: true, message: "Author created successfully" };
  },

  editAuthor: async (aid, updatedAuthor) => {
    const res = await fetch(`/api/authors/${aid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAuthor),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    return { success: true, message: data.message };
  },

  deleteAuthor: async (aid) => {
    const res = await fetch(`/api/authors/${aid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    return { success: true, message: data.message };
  },

  removeBookFromAuthor: async (aid, bid) => {
    const res = await fetch(`/api/authors/${aid}/books/${bid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      authorBooks: state.authorBooks.filter(
        (authorBooks) => authorBooks._id !== bid
      ),
    }));
    return { success: true, message: data.message };
  },

  addBookToAuthor: async (aid, bid) => {
    const res = await fetch(`/api/authors/${aid}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idBook: bid }),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      authorBooks: [...state.authorBooks, data.data],
      isLoadingBooks: false,
    }));
    return { success: true, message: data.message };
  },

  fetchBooksForAuthor: async (id) => {
    set({ isLoadingBooks: true });
    try {
      const res = await fetch(`/api/authors/${id}/books`);
      const data = await res.json();
      set({ authorBooks: data.data, isLoadingBooks: false });
    } catch (error) {
      console.error("Error fetching books for the author:", error);
      set({ isLoadingBooks: false });
    }
  },
}));
