import { render, screen } from "@testing-library/react";
import { stripe } from "../../services/stripe";
import Home, { getStaticProps } from "../../pages";

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return {
        data: {
          user: null,
        },
      };
    },
  };
});

jest.mock("../../services/stripe");

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({}));

describe("Home page", () => {
  it("should render correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "R$10,00" }} />);

    expect(screen.getByText(/R\$10,00/i)).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    const retrieveStripePricesMocked = jest.mocked(stripe.prices.retrieve);

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$10.00",
          },
        },
        revalidate: 86400,
      })
    );
  });
});
