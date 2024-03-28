import parse from "node-html-parser";
import axios from "./axios";
import { SearchManga, SearchProps } from "./types";
import { getBaseUrl } from "./utilities";

export const search = async (props: SearchProps) => {
  const mangaList: SearchManga[] = [];
  const query = props.query.replaceAll(" ", "_");
  const url = getBaseUrl(`search/story/${query}?${props?.page ? props.page : ""}`);

  const response = await axios.get(url);

  if (response.status !== 200) {
    return [];
  }

  const document = parse(response.data);
  const panel = document.querySelector(".panel-search-story");

  if (!panel) {
    return [];
  }

  const mangaCards = panel?.querySelectorAll(".search-story-item");

  for (let i = 0; i < mangaCards.length; i++) {
    const mangaCard = mangaCards[i];
    const title = mangaCard.querySelector("h3")?.innerText;
    const link = mangaCard.querySelector(".item-img")?.getAttribute("href") as string;
    const cover = mangaCard.querySelector(".img-loading")?.getAttribute("src") as string;
    const rating = mangaCard.querySelector(".item-rate")?.innerText;
    const views = mangaCard.querySelectorAll(".item-time")[1]?.innerText;

    if (title && link && cover && rating && views) {
      mangaList.push({
        title: title.trim(),
        link,
        cover,
        rating,
        views,
      });
    }
  }

  return mangaList;
};
