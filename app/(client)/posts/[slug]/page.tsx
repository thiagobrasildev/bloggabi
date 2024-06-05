import LastPostList from "@/app/components/LastPostList";
import { PortableText } from "next-sanity";
import {
  PortableTextComponents,
  PortableTextTypeComponentProps,
  PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";
import React from "react";
import { Post } from "@/app/utils/Interface";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import PostContent from "./PostContent";
import { Metadata } from "next";

interface Params {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({
  params,
  searchParams,
}: Params): Promise<Metadata> {
  const commentsOrder = searchParams?.comments || "desc";
  const post: Post = await getPost(params?.slug, commentsOrder.toString());

  return {
    title: post.title,
    description: post.body,
  };
}

async function getPost(slug: string, commentsOrder: string = "desc") {
  const query = `
  *[_type == "post" && slug.current == "${slug}"][0] {
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    _id,
    body,
    tags[]-> {
      _id,
      slug,
      name  
    },
    "comments": *[_type == "comment" && post._ref == ^._id] | order(_createdAt ${commentsOrder}) {
      name,
      comment,
      _createdAt,
    }
  }
  `;
  const post = await client.fetch(query);
  return post;
}

export const revalidate = 60;

const Page = async ({ params, searchParams }: Params) => {
  const commentsOrder = searchParams?.comments || "desc";
  const post: Post = await getPost(params?.slug, commentsOrder.toString());

  if (!post) {
    notFound();
  }

  return <PostContent post={post} comment={commentsOrder} />;
};

export default Page;
