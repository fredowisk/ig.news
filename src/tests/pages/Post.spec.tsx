import { render, screen } from "@testing-library/react";
import { getSession } from "next-auth/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";

jest.mock("next-auth/react");

jest.mock("prismic-dom", () => ({
  RichText: {
    asText(richText: string) {
      return richText;
    },
    asHtml(richText: [{ type: string; text: string }]) {
      return richText[0].text;
    },
  },
}));

jest.mock("../../services/prismic", () => ({
  getPrismicClient: () => ({
    getByUID: async () => ({
      data: {
        title: "fake-title",
        content: [
          {
            type: "paragraph",
            text: "fake-text",
          },
        ],
      },
      last_publication_date: "11/03/1998",
    }),
  }),
}));

describe("Post page", () => {
  const publication = {
    slug: "fake-uid",
    title: "fake-title",
    content: "fake-text",
    updatedAt: "03 de novembro de 1998",
  };

  it("should render correctly", () => {
    render(<Post publication={publication} />);

    expect(screen.getByText("fake-title")).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    jest.mocked(getSession).mockResolvedValueOnce({
      activeSubscription: {
        isActive: true,
      },
    } as any);

    const response = await getServerSideProps({
      req: {},
      params: {
        slug: publication.slug,
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          publication,
        },
      })
    );
  });

  it("should redirect to home when load initial data without an active subscription", async () => {
    jest.mocked(getSession).mockResolvedValueOnce({} as any);

    const response = await getServerSideProps({
      req: {},
      params: {}
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/",
          permanent: false,
        },
      })
    );
  });
});
