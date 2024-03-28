import axios from "./axios";
import { LatestManga } from "./types";
import { getBaseUrl } from "./utils";
import { parse } from "node-html-parser";
import { decode } from "html-entities";

export interface LatestMangaProps {
  // default is 1
  page?: number;
}

/**
 * NOTE: If something is going wrong and method can't get data then you receive empty array.
 */
export const getLatestManga = async (props?: LatestMangaProps): Promise<LatestManga[]> => {
  const mangaList: LatestManga[] = [];
  const url = getBaseUrl(`genre-all/${props?.page ? props.page : ""}?type=newest`);

  const response = await axios.get(url);

  if (response.status !== 200) {
    return [];
  }

  const document = parse(response.data);
  const panel = document.querySelector(".panel-content-genres");

  if (!panel) {
    return [];
  }

  const mangaCards = panel.querySelectorAll(".content-genres-item");

  for (let i = 0; i < mangaCards.length; i++) {
    const mangaCard = mangaCards[i];
    const title = mangaCard.querySelector(".genres-item-info > h3")?.innerText;
    const link = mangaCard.querySelector(".genres-item-info > a")?.getAttribute("href") as string;
    const cover = mangaCard.querySelector(".img-loading")?.getAttribute("src") as string;
    const rating = mangaCard.querySelector(".genres-item-rate")?.innerText;
    const views = mangaCard.querySelector(".genres-item-view")?.innerText;
    let description = mangaCard.querySelector(".genres-item-description")?.innerText || null;

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
  }

  return mangaList;
};
