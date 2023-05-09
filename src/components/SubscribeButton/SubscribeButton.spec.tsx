import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SessionContextValue, signIn, useSession } from "next-auth/react";

import { SubscribeButton } from ".";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

jest.mock("next-auth/react");
jest.mock("../../services/api");
jest.mock("../../services/stripe-js");

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => {});

describe("SubscribeButton component", () => {
  it("should renders correctly", () => {
    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("should redirect user to sign in when not authenticated", () => {
    const sessionMocked = jest.mocked(useSession);
    const signInMocked = jest.mocked(signIn);

    sessionMocked.mockReturnValueOnce({
      data: {
        user: null,
        expires: null,
      },
    } as SessionContextValue);
    signInMocked.mockReturnValueOnce(null);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalledWith("github");
  });

  it("should redirect to posts when user already has a subscription", () => {
    const useRouterMocked = jest.mocked(useRouter);

    const pushMocked = jest.fn();

    useRouterMocked.mockImplementationOnce(
      () =>
        ({
          push: pushMocked,
        } as any)
    );

    const sessionMocked = jest.mocked(useSession);

    sessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "fredowisk",
        },
        activeSubscription: {
          isActive: true,
        },
        expires: null,
      },
    } as SessionContextValue);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMocked).toHaveBeenCalledWith("/posts");
  });

  it("should redirect user to checkout when user doesn't have a subscription", async () => {
    const sessionMocked = jest.mocked(useSession);

    const apiMocked = jest.mocked(api);

    const loadStripeMocked = jest.mocked(getStripeJs);

    sessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "fredowisk",
        },
      },
    } as SessionContextValue);

    apiMocked.post.mockResolvedValueOnce({
      data: {
        sessionId: "fake-sessionId",
      },
    } as any);

    const redirectMocked = jest.fn();

    loadStripeMocked.mockResolvedValueOnce({
      redirectToCheckout: redirectMocked,
    } as any);

    const windowSpy = jest.fn();

    window.alert = windowSpy;

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    await waitFor(() => fireEvent.click(subscribeButton));

    expect(redirectMocked).toHaveBeenCalledWith({
      sessionId: "fake-sessionId",
    });
    expect(windowSpy).not.toHaveBeenCalled();
  });

  it("should alert an error message when checkout throws an error", async () => {
    const sessionMocked = jest.mocked(useSession);

    const apiMocked = jest.mocked(api);

    const loadStripeMocked = jest.mocked(getStripeJs);

    sessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "fredowisk",
        },
      },
    } as SessionContextValue);

    apiMocked.post.mockResolvedValueOnce({
      data: {
        sessionId: "fake-sessionId",
      },
    } as any);

    loadStripeMocked.mockRejectedValueOnce(new Error());

    const windowSpy = jest.fn();

    window.alert = windowSpy;

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    await waitFor(() => fireEvent.click(subscribeButton));

    expect(windowSpy).toHaveBeenCalled();
  });
});
