import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-dom";

import { getPrismicClient } from "../../services/prismic";

import styles from "./styles.module.scss";

type Publication = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  publications: Publication[];
}

export default function Posts({ publications }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {publications.map((publication) => (
            <Link href={`/posts/${publication.slug}`} key={publication.slug}>
              <time>{publication.updatedAt}</time>
              <strong>{publication.title}</strong>
              <p>{publication.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getAllByType("publication", {
    fetch: ["publication.title", "publication.content"],
    pageSize: 100,
  });

  const publications = response.map((publication) => {
    return {
      slug: publication.uid,
      title: RichText.asText(publication.data.title),
      excerpt:
        publication.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(publication.last_publication_date).toLocaleDateString(
        "pt-BR",
        { day: "2-digit", month: "long", year: "numeric" }
      ),
    };
  });

  return {
    props: { publications },
    revalidate: 60 * 60,
  };
};
