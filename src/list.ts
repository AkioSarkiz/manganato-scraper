import axios from "./axios";
import { DashboardManga, PaginationProps } from "./types";
import { getBaseUrl } from "./utilities";
import { parse } from "node-html-parser";
import { decode } from "html-entities";
import { ParseDashboardPageProps } from "./types";

/**
 * NOTE: If something is going wrong and method can't get data then you receive empty array.
 */
export const parseDashboardPage = async (props: ParseDashboardPageProps): Promise<DashboardManga[]> => {
  const mangaList: DashboardManga[] = [];
  const url = getBaseUrl(props.url);

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

export const getLatestMangaList = async (props?: PaginationProps): Promise<DashboardManga[]> => {
  const url = `genre-all/${props?.page ? props.page : ""}`;

  return parseDashboardPage({ url, ...props });
};

export const getNewestMangaList = async (props?: PaginationProps): Promise<DashboardManga[]> => {
  const url = `genre-all/${props?.page ? props.page : ""}?type=newest`;

  return parseDashboardPage({ url, ...props });
};

export const geHotMangaList = async (props?: PaginationProps): Promise<DashboardManga[]> => {
  const url = `genre-all/${props?.page ? props.page : ""}?type=topview`;

  return parseDashboardPage({ url, ...props });
};
