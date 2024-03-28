import { search } from "../src";
import { describe, test, expect, expectTypeOf } from "vitest";
import { SearchManga } from "../src/types";

describe("should find manga", () => {
  test("try to find attack on titan", async () => {
    const result = await search({
      query: "attack on titan",
    });
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<SearchManga[]>();
  });
});
