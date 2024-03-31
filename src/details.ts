import parse, { HTMLElement } from "node-html-parser";
import axios from "./axios";
import { Author, Chapter, DetailedManga, DetailedMangaProps, Genre } from "./types/details";

interface ParsedTableRow {
  header: HTMLElement;
  value: HTMLElement;
}

const parseTable = (tableNode: HTMLElement): Array<ParsedTableRow> => {
  let tableTrs = tableNode.querySelectorAll("tr");

  return Array.from(tableTrs)
    .map((item: HTMLElement): ParsedTableRow | null => {
      const header = item.querySelector("td:nth-child(1)");
      const value = item.querySelector("td:nth-child(2)");

      if (!header || !value) {
        return null;
      }

      return { header, value };
    })
    .filter((value) => value) as ParsedTableRow[];
};

export const getMangaDetails = async (props: DetailedMangaProps): Promise<DetailedManga | null> => {
  const response = await axios.get(props.url);

  if (response.status !== 200) {
    return null;
  }

  const document = parse(response.data);
  const storyRightInfo = document.querySelector(".story-info-right");
  const chapterContainer = document.querySelector(".row-content-chapter");

  if (!storyRightInfo || !chapterContainer) {
    return null;
  }

  const chapterLis = Array.from(chapterContainer.querySelectorAll("li"));
  const tableInfo = storyRightInfo.querySelector(".variations-tableInfo");

  if (!tableInfo) {
    return null;
  }

  const parsedTableInfo = parseTable(tableInfo);

  const altTitles: string[] | undefined = parsedTableInfo
    .find((value) => value.header.innerText.trim() === "Alternative :")
    ?.value.innerText.split(",")
    .map((value) => value.trim());

  const status = parsedTableInfo
    .find((value) => value.header.innerText.trim() === "Status :")
    ?.value.innerText.trim()
    .toLocaleLowerCase();

  const authors: Author[] | undefined = parsedTableInfo
    .find((value) => value.header.innerText.trim() === "Author(s) :")
    ?.value.querySelectorAll("a")
    .map(
      (value) =>
        ({
          link: value.getAttribute("href"),
          name: value.innerText.trim(),
        } as Author)
    );

  const genres: Genre[] | undefined = parsedTableInfo
    .find((value) => value.header.innerText.trim() === "Genres :")
    ?.value.querySelectorAll("a")
    .map(
      (value) =>
        ({
          link: value.getAttribute("href"),
          name: value.innerText.trim(),
        } as Genre)
    );

  const chapters: Chapter[] | undefined = chapterLis
    .map((value): Chapter | null => {
      const uploaded_at = value.querySelector(".chapter-time")?.innerText;
      const views = value.querySelector(".chapter-view")?.innerText;
      const name = value.querySelector("a")?.innerText.replace(/Vol\.\d+\s+Chapter\s+\d+:"/i, "");
      const link = value.querySelector("a")?.getAttribute("href");

      if (!uploaded_at || !views || !name || !link) {
        return null;
      }

      return {
        uploaded_at,
        views,
        name,
        link,
      };
    })
    .filter(Boolean) as Chapter[];

  const description = document.querySelector("#panel-story-info-description")?.childNodes[2].textContent.trim();

  if (
    !altTitles ||
    !status ||
    !["ongoing", "completed"].includes(status) ||
    !authors ||
    !description ||
    !genres ||
    !chapters
  ) {
    return null;
  }

  return {
    title: String(storyRightInfo.querySelector("h1")?.innerText),
    alt_titles: altTitles,
    status: status as "ongoing" | "completed",
    authors,
    description,
    genres,
    chapters,
  };
};
