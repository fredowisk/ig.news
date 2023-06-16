import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import Head from "next/head";

import styles from "./post.module.scss";

interface PostProps {
  publication: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

interface SessionResponse extends Session {
  activeSubscription: object;
}

export default function Post({ publication }: PostProps) {
  return (
    <>
      <Head>
        <title>{`${publication.title} | ig.news`}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{publication.title}</h1>
          <time>{publication.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: publication.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params: { slug },
}) => {
  const session = (await getSession({ req })) as SessionResponse;

  if (!session?.user) {
    return {
      redirect: {
        destination: "/api/auth/signin/github",
        permanent: false,
      },
    };
  }

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `posts/preview/${slug}`,
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("publication", String(slug));

  const { data } = response;

  const publication = {
    slug,
    title: RichText.asText(data.title),
    content: RichText.asHtml(data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      { day: "2-digit", month: "long", year: "numeric" }
    ),
  };

  return {
    props: { publication },
  };
};
