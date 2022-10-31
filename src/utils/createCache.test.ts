import { createCache } from "./createCache";

const cache = createCache();

describe("createCache", () => {
  it("should return provided value if no keys found", async () => {
    const result1 = await cache("test", () => Promise.resolve("TEST1"));
    expect(result1).toBe("TEST1");
  });

  it("should return cached value if key found", async () => {
    const result1 = await cache("test", () => Promise.resolve("TEST2"));
    expect(result1).toBe("TEST1");
  });
});
