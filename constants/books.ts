// Central book catalog for the app.
// Each book stores a base folder URL + how the page filename is
// built (e.g. "01.jpg", "02.jpg", ...). pageCount is OPTIONAL — when
// left out, the Reader screen detects the last page dynamically (by
// noticing the next page image fails to load) instead of relying on
// a fixed count from this file.

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  // Folder that holds the sequential page images, must end with "/"
  baseUrl: string;
  // Optional — if you DO know the exact total, set it here and the
  // Reader will use it directly. Leave it out to let the Reader
  // detect the end dynamically instead of enforcing a fixed limit.
  pageCount?: number;
  // Given a 1-based page number, return the filename inside baseUrl
  pageFileName: (page: number) => string;
  // Optional dedicated cover image URL; falls back to page 1 if omitted
  coverUrl?: string;
  // Optional local cover image (require(...)) — takes priority over coverUrl
  localCover?: any;
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
    // No pageCount set — Reader detects the last page dynamically.
    pageFileName: (page) => `${twoDigit(page)}.jpg`,
    localCover: require("../assets/images/noorani-qaida.jpg"),
  },
  {
    id: "quran-pak-16-lines",
    title: "Quran Pak",
    subtitle: "16 Lines",
    category: "Quran",
    baseUrl: "https://files.fusionlogics.com/confido_books/1001-Quran_Pak_16_Lines/",
    // No pageCount set — Reader detects the last page dynamically.
    // Filename pattern for this book is "1001(1).jpg", "1001(2).jpg", ...
    pageFileName: (page) => `1001(${page}).jpg`,
  },
];

export function getBookById(id: string | undefined): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}

export function getPageUrl(book: Book, page: number): string {
  // No artificial clamp when pageCount is unset — just guard against
  // going below page 1.
  const min = Math.max(page, 1);
  const clamped = book.pageCount ? Math.min(min, book.pageCount) : min;
  return `${book.baseUrl}${book.pageFileName(clamped)}`;
}
