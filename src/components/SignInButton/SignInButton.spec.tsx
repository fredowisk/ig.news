import { render, screen, fireEvent } from "@testing-library/react";

import { SessionContextValue, useSession, signOut, signIn } from "next-auth/react";

import { SignInButton } from ".";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("should renders correctly when user is not loggedIn", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null } as SessionContextValue);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("should renders correctly when user is loggedIn", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "fredowisk",
        },
      },
    } as SessionContextValue);

    render(<SignInButton />);

    expect(screen.getByText("fredowisk")).toBeInTheDocument();
  });

  it("should call signOut when click on user button when user is loggedIn", () => {
    const useSessionMocked = jest.mocked(useSession);
    const signOutMocked = jest.mocked(signOut);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "fredowisk",
        },
      },
    } as SessionContextValue);

    signOutMocked.mockResolvedValueOnce(undefined);

    render(<SignInButton />);

    fireEvent.click(screen.getByText("fredowisk"));

    expect(signOutMocked).toHaveBeenCalled();
  });

  it("should call signIn when click on Sign in with Github button", () => {
    const useSessionMocked = jest.mocked(useSession);
    const signInMocked = jest.mocked(signIn);

    useSessionMocked.mockReturnValueOnce({
      data: null,
    } as SessionContextValue);

    signInMocked.mockResolvedValueOnce(undefined);

    render(<SignInButton />);

    fireEvent.click(screen.getByText("Sign in with Github"));

    expect(signInMocked).toHaveBeenCalledWith("github");
  });
});
