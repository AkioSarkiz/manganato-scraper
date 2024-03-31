# The manganato scraper

### Requirements

- Node version 20.x and above

### How to install

```bash
npm install manganato-scraper
```

### How to use

```typescript
import { getLatestMangaList } from "manganato-scraper";

const result = await getLatestMangaList();

// an example result
// [
//    ...
//   {
//     title: 'Attack On Titan',
//     link: 'https://chapmanganato.to/manga-oa952283',
//     cover: 'https://avt.mkklcdnv6temp.com/34/b/1-1583465037.jpg',
//     rating: '4.5',
//     views: 'View : 106.5M'
//   },
//   {
//     title: 'Shingeki No Kyojin - Before The Fall',
//     link: 'https://chapmanganato.to/manga-vi952091',
//     cover: 'https://avt.mkklcdnv6temp.com/27/k/1-1583464768.jpg',
//     rating: '4.7',
//     views: 'View : 8M'
//   },
//   ...
// ]
```

### Available methods

| Method             | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| getLatestMangaList | Get latests manga from the website. This method supported pagination     |
| getNewestMangaList | Get newest manga from the website. This method supported pagination      |
| geHotMangaList     | Get hot\popular manga from the website. This method supported pagination |
| search             | Find the mangas by query. This method supported pagination               |
| getMangaDetails    | get details about the manga                                              |
