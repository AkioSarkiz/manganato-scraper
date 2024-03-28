import axios from "./axios";
import { DashboardManga } from "./types";
import { getBaseUrl } from "./utils";
import { parse } from "node-html-parser";
import { decode } from "html-entities";

export interface PaginationProps {
  // default is 1
  page?: number;
}

export interface ParseDashboardPageProps extends PaginationProps {
  url: string;
}

/**
 * NOTE: If something is going wrong and method can't get data then you receive empty array.
 */
const parseDashboardPage = async (props: ParseDashboardPageProps): Promise<DashboardManga[]> => {
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

export const getLatestManga = async (props?: PaginationProps): Promise<DashboardManga[]> => {
  const url = getBaseUrl(`genre-all/${props?.page ? props.page : ""}`);

  return parseDashboardPage({ url, ...props });
};

export const getNewestManga = async (props?: PaginationProps): Promise<DashboardManga[]> => {
  const url = getBaseUrl(`genre-all/${props?.page ? props.page : ""}?type=newest`);

  return parseDashboardPage({ url, ...props });
};

export const geHotManga = async (props?: PaginationProps): Promise<DashboardManga[]> => {
  const url = getBaseUrl(`genre-all/${props?.page ? props.page : ""}?type=topview`);

  return parseDashboardPage({ url, ...props });
};
