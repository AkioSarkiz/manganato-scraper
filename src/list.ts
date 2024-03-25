import axios from "./axios";
import { LatestManga } from "./types";
import { getBaseUrl } from "./utils";
import { parse } from "node-html-parser";
import { decode } from "html-entities";

/**
 * NOTE: If something is going wrong and method can't get data then you receive empty array.
 */
export const getLatestManga = async (): Promise<any[]> => {
  const url = getBaseUrl("genre-all");
  const response = await axios.get(url);
  const mangaList: LatestManga[] = [];

  if (response.status !== 200) {
    return [];
  }

  const document = parse(response.data);
  const panel = document.querySelector(".panel-content-genres");

  if (!panel) {
    return [];
  }

  const mangaCards = panel.querySelectorAll(".content-genres-item");

  mangaCards.forEach((mangaCard) => {
    const title = mangaCard.querySelector(".genres-item-info > h3")?.innerText;
    const link = mangaCard
      .querySelector(".genres-item-info > a")
      ?.getAttribute("href") as string;
    const cover = mangaCard
      .querySelector(".img-loading")
      ?.getAttribute("src") as string;
    const rating = mangaCard.querySelector(".genres-item-rate")?.innerText;
    const views = mangaCard.querySelector(".genres-item-view")?.innerText;
    let description =
      mangaCard.querySelector(".genres-item-description")?.innerText || null;

    if (description) {
      description = decode(description.replace(/\n/g, ""));
    }

    if (title && link && cover && rating && views) {
      mangaList.push({
        title: title.trim(),
        link,
        cover,
        rating,
        views,
        description,
      });
    }
  });

  return mangaList;
};
