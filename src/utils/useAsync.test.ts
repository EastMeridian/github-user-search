import { renderHook, waitFor } from "@testing-library/react";
import { useAsync } from "./useAsync";

describe("useAsync", () => {
  it("should return error if error thrown", async () => {
    const { result } = renderHook(() =>
      useAsync(() => Promise.reject(new Error("ERROR1")))
    );

    await waitFor(() => expect(result.current.error).toBe("ERROR1"));
  });

  it("should return content and loading boolean", async () => {
    const { result } = renderHook(() =>
      useAsync(() => Promise.resolve("RESOLVE1"))
    );

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.data).toBe("RESOLVE1"));
  });
});
