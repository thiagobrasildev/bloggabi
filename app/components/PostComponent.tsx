"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Post } from "../utils/Interface";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";

interface Props {
  post: Post;
}

const PostComponent = ({ post }: Props) => {
  const { title, slug, mainImage, publishedAt, excerpt, body, _id } = post;
  const newDate = new Date(post?.publishedAt);
  const formatedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(newDate);

  console.log(mainImage);

  const imageProps = useNextSanityImage(client, mainImage);

  return (
    <div className="flex flex-col w-full">
      <Link href={`/posts/${post?.slug?.current}`}>
        <h1 className="uppercase text-xl md:text-3xl w-full text-center hover:text-gray-700">
          {post?.title}
        </h1>
      </Link>
      <div className="w-full h-[150px] md:h-[300px] overflow-hidden relative mt-4">
        <Image
          {...imageProps}
          alt="imagem post"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="rounded"
        />
      </div>
      <div className="py-5 px-1 w-full">
        <p className="line-clamp-3 text-sm text-left md:text-lg">
          {post?.excerpt}
        </p>
      </div>
      <div className="w-full px-1 py-2 flex justify-between items-center">
        <span className="text-sm md:text-base">{formatedDate}</span>
        <Link
          href={`/posts/${post?.slug?.current}`}
          className="flex gap-1 justify-between items-center border border-gray-700 rounded-md p-1 md:p-2 text-sm md:text-base font-bold text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-100"
        >
          Continuar lendo <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default PostComponent;
