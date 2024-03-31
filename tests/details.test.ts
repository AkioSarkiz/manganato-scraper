
import { describe, test, expectTypeOf, assert } from "vitest";
import { DashboardManga, DetailedManga } from "../src/types";
import { getMangaDetails } from "../src";

const mangasUrls = [
  { label: "isekai walking", link: "https://manganato.com/manga-qi993717" },
  { label: "Class no Daikirai na Joshi to Kekkon suru Koto ni Natta", link: "https://manganato.com/manga-pn992596" },
  { label: "Solo Leveling", link: "https://chapmanganato.to/manga-dr980474" },
  { label: "Versatile Mage", link: "https://chapmanganato.to/manga-bf979214" },
];

describe.each(mangasUrls)("details of $label", async ({ label, link }) => {
  test("response", async () => {
    const result = await getMangaDetails({ url: link });

    if (!result) {
      assert.fail("parse failed");
    }

    expectTypeOf(result).toEqualTypeOf<DetailedManga>();
  });
});
