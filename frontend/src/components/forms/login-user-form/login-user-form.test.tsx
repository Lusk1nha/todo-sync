import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { LoginUserForm } from "./login-user-form";
import { TestProviders } from "@/test/test-providers";

describe("login-user-form", () => {
  it("should render", () => {
    const login = render(
      <TestProviders>
        <LoginUserForm onSubmit={(data) => console.log(data)} />
      </TestProviders>
    );

    expect(login).toBeDefined();
  });
});
