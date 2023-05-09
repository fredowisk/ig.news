import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "../../pages/posts";

jest.mock("prismic-dom", () => ({
  RichText: {
    asText(richText: string) {
      return richText;
    },
  },
}));

jest.mock("../../services/prismic", () => ({
  getPrismicClient: () => ({
    getAllByType: async () => [
      {
        uid: "fake-uid",
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
      },
    ],
  }),
}));

describe("Posts page", () => {
  const publications = [
    {
      slug: "fake-uid",
      title: "fake-title",
      excerpt: "fake-text",
      updatedAt: "03 de novembro de 1998",
    },
  ];
  it("should render correctly", () => {
    render(<Posts publications={publications} />);

    expect(screen.getByText("fake-title")).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          publications,
        },
        revalidate: 3600,
      })
    );
  });
});
