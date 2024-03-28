import { search } from "../..";

const func = async () => {
  const searchResult = await search({
    query: "Attack On Titan",
  });

  return searchResult;
};

func().then((value) => console.log(value));
