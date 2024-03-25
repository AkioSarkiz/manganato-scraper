import { getLatestManga } from "../src";
import { describe, test, expect } from "vitest";

describe("should load latest manga", () => {
  test("dump test", async () => {
    const result = await getLatestManga();
    expect(result).toBeInstanceOf(Array);
  });
});
