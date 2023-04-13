import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useSession, SessionContextValue } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { useEffect } from "react";

import { RichText } from "prismic-dom";

import { getPrismicClient } from "../../../services/prismic";

import styles from "../post.module.scss";

interface PostPreviewProps {
  publication: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

type SessionResponse = SessionContextValue & {
  data: {
    activeSubscription: object;
  };
};

export default function PostPreview({ publication }: PostPreviewProps) {
  const session = useSession() as SessionResponse;
  const router = useRouter();

  useEffect(() => {
    if (session.data?.activeSubscription) {
      router.push(`/posts/${publication.slug}`);
    }
  }, [session]);

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: publication.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <span>Subscribe now</span> 🤗
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const prismic = getPrismicClient();

  const response = await prismic.getByUID("publication", String(slug));

  const { data } = response;

  const publication = {
    slug,
    title: RichText.asText(data.title),
    content: RichText.asHtml(data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      { day: "2-digit", month: "long", year: "numeric" }
    ),
  };

  return {
    props: { publication },
    revalidate: 60 * 30,
  };
};