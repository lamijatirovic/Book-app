import { create } from "zustand";

export const useBooksStore = create((set) => ({
  books: [],
  book: {},
  isLoading: false,
  isLoadingAuthors: false,
  bookAuthors: [],

  setBooks: (books) => set({ books, isLoading: false }),

  fetchBooks: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      set({ books: data.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching books:", error);
      set({ isLoading: false });
    }
  },

  fetchBook: async (id) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/books/${id}`);
      const data = await res.json();
      set({ book: data.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching the book:", error);
      set({ isLoading: false });
    }
  },

  fetchAuthorsForBook: async (id) => {
    set({ isLoadingAuthors: true });
    try {
      const res = await fetch(`/api/books/${id}/authors`);
      const data = await res.json();
      set({ bookAuthors: data.data, isLoadingAuthors: false });
    } catch (error) {
      console.error("Error fetching authors for the book:", error);
      set({ isLoadingAuthors: false });
    }
  },

  createBook: async (newBook) => {
    if (
      !newBook.title ||
      !newBook.isbn ||
      !newBook.pages ||
      !newBook.published ||
      !newBook.image
    ) {
      return { success: false, message: "Please fill in all the fields." };
    }
    const existingBookRes = await fetch(`/api/books/isbn/${newBook.isbn}`);
    const existingBookData = await existingBookRes.json();

    if (existingBookData.success) {
      return {
        success: false,
        message: "A book with this ISBN already exists.",
      };
    }

    const res = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    const data = await res.json();
    set((state) => ({ books: [...state.books, data.data] }));
    return { success: true, message: "Book created successfully" };
  },

  editBook: async (bid, updatedBook) => {
    if (
      !updatedBook.title ||
      !updatedBook.isbn ||
      !updatedBook.pages ||
      !updatedBook.published ||
      !updatedBook.image
    ) {
      return { success: false, message: "Please fill in all the fields." };
    }
    const existingBookRes = await fetch(`/api/books/isbn/${updatedBook.isbn}`);
    const existingBookData = await existingBookRes.json();

    if (existingBookData.success && existingBookData.data._id !== bid) {
      return {
        success: false,
        message: "A book with this ISBN already exists.",
      };
    }

    const res = await fetch(`/api/books/${bid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });
    const data = await res.json();
    set((state) => ({ books: [...state.books, data.data] }));
    return { success: true, message: "Book updated successfully" };
  },

  deleteBook: async (bid) => {
    const res = await fetch(`/api/books/${bid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    return { success: true, message: data.message };
  },

  removeAuthorFromBook: async (bid, aid) => {
    const res = await fetch(`/api/books/${bid}/authors/${aid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      bookAuthors: state.bookAuthors.filter(
        (bookAuthors) => bookAuthors._id !== aid
      ),
    }));
    return { success: true, message: data.message };
  },

  addAuthorToBook: async (bid, aid) => {
    const res = await fetch(`/api/books/${bid}/authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authorId: aid }),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      bookAuthors: [...state.bookAuthors, data.data],
      isLoadingAuthors: false,
    }));
    return { success: true, message: data.message };
  },
}));
