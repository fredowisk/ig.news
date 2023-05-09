import { render, screen } from "@testing-library/react";

import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  it("should renders correctly", () => {
    render(<ActiveLink href="/" activeClassName="active" text="Home" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should be receiving active className", () => {
    render(<ActiveLink href="/" activeClassName="active" text="Home" />);

    expect(screen.getByText("Home")).toHaveClass("active");
  });
});
