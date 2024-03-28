import { geHotMangaList, getLatestMangaList, getNewestMangaList } from "../src";
import { describe, test, expect, expectTypeOf } from "vitest";
import { DashboardManga } from "../src/types";

describe("should load latest manga", () => {
  test("without any props", async () => {
    const result = await getLatestMangaList();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<DashboardManga[]>();
  });

  test("a second page", async () => {
    const result = await getLatestMangaList({ page: 2 });
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<DashboardManga[]>();
  });
});

describe("should load newest manga", () => {
  test("without any props", async () => {
    const result = await getNewestMangaList();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<DashboardManga[]>();
  });

  test("a second page", async () => {
    const result = await getNewestMangaList({ page: 2 });
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<DashboardManga[]>();
  });
});

describe("should load hot manga", () => {
  test("without any props", async () => {
    const result = await geHotMangaList();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<DashboardManga[]>();
  });

  test("a second page", async () => {
    const result = await geHotMangaList({ page: 2 });
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<DashboardManga[]>();
  });
});
