import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RegisterUserForm } from "./register-user-form";
import { TestProviders } from "@/test/test-providers";

describe("register-user-form", () => {
  it("should render", () => {
    const register = render(
      <TestProviders>
        <RegisterUserForm onSubmit={(data) => console.log(data)} />
      </TestProviders>
    );

    expect(register).toBeDefined();
  });
});
