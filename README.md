# Confido Islamic Books — Frontend (Expo / React Native)

## Setup

```bash
npm install
npx expo start
```

## What's included

- **No login page wired in** — the app opens straight to the bottom tabs (per your instruction). The login screen design is saved for later; just add an `app/login.tsx` + a redirect in `app/_layout.tsx` when you're ready to turn it on.
- **Bookshelf tab** (`app/(tabs)/index.tsx`) — lists books as cards. Tapping a book navigates straight into the Reader.
- **Reader screen** (`app/reader/[bookId].tsx`) — shows one page image at a time, with:
  - a page counter (`Page X / Y`)
  - **Next** / **Previous** buttons that increment/decrement the counter and swap the image
  - Next/Previous automatically disable at the first/last page
- **Book data** (`constants/books.ts`) — this is where books and their page URLs live. `Noorani Qaida` is wired up already:

```ts
baseUrl: "https://files.fusionlogics.com/confido_books/1002-Noorani_Qaida_Urdu/",
pageCount: 4,
pageFileName: (page) => `${twoDigit(page)}.jpg`, // 01.jpg, 02.jpg, ...
```

## Adding a new book

Add an entry to the `BOOKS` array in `constants/books.ts`:

```ts
{
  id: "some-unique-id",
  title: "Book Title",
  subtitle: "Short subtitle",
  category: "Category",
  baseUrl: "https://files.fusionlogics.com/confido_books/<folder>/",
  pageCount: 30, // total pages for this book
  pageFileName: (page) => `${String(page).padStart(2, "0")}.jpg`,
}
```

That's it — the Bookshelf and Reader screens both read from this array automatically. Once the admin Upload flow (`app/(tabs)/upload.tsx`) and backend are ready, this array can be swapped for an API call.

## Notes

- `pageCount` for Noorani Qaida is set to `4` based on the links you shared (01–04). Update it once you know the real total page count for the book.
- Tab bar icons use `@expo/vector-icons` (bundled with Expo, no extra install needed).
