import { getLatestMangaList } from "../..";

const func = async () => {
  const result = await getLatestMangaList();

  return result;
};

func().then((value) => console.log(value));
