import { getLatestManga } from "../src";
import { describe, test, expect, expectTypeOf } from "vitest";
import { LatestManga } from "../src/types";

describe("should load latest manga", () => {
  test("without any props", async () => {
    const result = await getLatestManga();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<LatestManga[]>();
  });

  test("a second page", async () => {
    const result = await getLatestManga({ page: 2 });
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<LatestManga[]>();
  });
});
