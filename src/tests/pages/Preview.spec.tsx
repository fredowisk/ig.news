import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import PostPreview, { getStaticProps, getStaticPaths } from "../../pages/posts/preview/[slug]";

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
          {
            type: "paragraph",
            text: "fake-text",
          },
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

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({}));

describe("Post page", () => {
  const publication = {
    slug: "fake-uid",
    title: "fake-title",
    content: "fake-text",
    updatedAt: "03 de novembro de 1998",
  };

  it("should render correctly", () => {
    jest.mocked(useSession).mockReturnValueOnce({ data: {} } as any);

    render(<PostPreview publication={publication} />);

    expect(screen.getByText("fake-title")).toBeInTheDocument();
  });

  it("should redirect to post/slug when render preview with an active subscription", async () => {
    jest.mocked(useSession).mockReturnValueOnce({
      data: {
        activeSubscription: {
          isActive: true,
        },
      },
    } as any);

    const mockedPush = jest.fn();

    jest.mocked(useRouter).mockReturnValue({
      push: mockedPush,
    });

    render(<PostPreview publication={publication} />);

    expect(mockedPush).toHaveBeenCalledWith(`/posts/${publication.slug}`);
  });

  it("should load initial data", async () => {
    const response = await getStaticProps({
      params: {
        slug: publication.slug,
      },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          publication,
        },
        revalidate: 1800,
      })
    );
  });

  it("should return the correct static paths", async () => {
    const response = await getStaticPaths({});

    expect(response).toEqual(
      expect.objectContaining({
        paths: [],
        fallback: "blocking",
      })
    );
  })
});
