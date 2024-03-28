import { geHotManga, getLatestManga, getNewestManga } from "../src";
import { describe, test, expect, expectTypeOf } from "vitest";
import { DashboardManga } from "../src/types";

describe("should load latest manga", () => {
  test("without any props", async () => {
    const result = await getLatestManga();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<DashboardManga[]>();
  });

  test("a second page", async () => {
    const result = await getLatestManga({ page: 2 });
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<DashboardManga[]>();
  });
});


describe("should load newest manga", () => {
  test("without any props", async () => {
    const result = await getNewestManga();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<DashboardManga[]>();
  });

  test("a second page", async () => {
    const result = await getNewestManga({ page: 2 });
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<DashboardManga[]>();
  });
});

describe("should load hot manga", () => {
  test("without any props", async () => {
    const result = await geHotManga();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<DashboardManga[]>();
  });

  test("a second page", async () => {
    const result = await geHotManga({ page: 2 });
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expectTypeOf(result).toEqualTypeOf<DashboardManga[]>();
  });
});
