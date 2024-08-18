import { TestProviders } from "@/test/test-providers";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ForgotUserForm } from "./forgot-user-form";

describe("forgot-user-form", () => {
  it("should render", () => {
    const forgot = render(
      <TestProviders>
        <ForgotUserForm onSubmit={(data) => console.log(data)} />
      </TestProviders>
    );

    expect(forgot).toBeDefined();
  });
});
