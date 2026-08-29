// Central book catalog for the app.
// Each book stores a base folder URL + how many pages it has + how the
// page filename is built (e.g. "01.jpg", "02.jpg", ...). The Reader
// screen (app/reader/[bookId].tsx) uses this to build the image URL
// for whatever page the counter is currently on.

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  // Folder that holds the sequential page images, must end with "/"
  baseUrl: string;
  // Total number of pages available for this book
  pageCount: number;
  // Given a 1-based page number, return the filename inside baseUrl
  pageFileName: (page: number) => string;
  // Optional dedicated cover image; falls back to page 1 if omitted
  coverUrl?: string;
}

// Zero-pads a page number to 2 digits: 1 -> "01", 12 -> "12"
const twoDigit = (n: number) => String(n).padStart(2, "0");

export const BOOKS: Book[] = [
  {
    id: "noorani-qaida-urdu",
    title: "Noorani Qaida",
    subtitle: "Begin Your Journey",
    category: "Qaida",
    baseUrl: "https://files.fusionlogics.com/confido_books/1002-Noorani_Qaida_Urdu/",
    // اپنی کتاب کے کل صفحات یہاں درج کریں
    pageCount: 100,
    pageFileName: (page) => `${twoDigit(page)}.jpg`,
  },
];

export function getBookById(id: string | undefined): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}

export function getPageUrl(book: Book, page: number): string {
  const clamped = Math.min(Math.max(page, 1), book.pageCount);
  return `${book.baseUrl}${book.pageFileName(clamped)}`;
}
