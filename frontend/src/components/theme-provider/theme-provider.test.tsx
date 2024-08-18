import { useTheme } from "@/shared/hooks/use-theme-hook";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("theme-provider", () => {
  it("should render hook", () => {
    const { current } = renderHook(() => useTheme()).result;

    expect(current).toBeDefined();
  });

  it("should set theme", () => {
    const hook = renderHook(() => useTheme());

    hook.result.current.setTheme("dark");

    const currentTheme = hook.result.current.theme;

    expect(currentTheme).toBe("dark");
  });
});
