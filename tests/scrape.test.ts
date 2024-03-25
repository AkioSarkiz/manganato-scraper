import { scrape } from "../src";

test("dump test", () => {
  const result = scrape();
  expect(result).toBeInstanceOf(Array);
});
