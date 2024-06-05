"use client";

import LastPostList from "@/app/components/LastPostList";
import { PortableText } from "next-sanity";
import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import React from "react";
import { Post } from "@/app/utils/Interface";
import { client } from "@/sanity/lib/client";
import { useNextSanityImage } from "next-sanity-image";
import { urlForImage } from "@/sanity/lib/image";
import AddComment from "@/app/components/AddComment";
import AllComments from "@/app/components/AllComments";

const PostContent: React.FC<{ post: Post; comment: string | string[] }> = ({
  post,
  comment,
}) => {
  const imageProps = useNextSanityImage(client, post.mainImage);

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6">
      <div className="flex flex-col gap-1 md:gap-1 lg:gap-6 md:w-[60%] lg:w-[70%] xl:w-[75%] mt-3 lg:mt-6">
        <h1 className="uppercase text-base font-bold md:text-2xl lg:text-3xl w-full text-center hover:text-gray-700">
          {post?.title}
        </h1>
        <div className="w-full h-[150px] md:h-[300px] overflow-hidden relative mt-1">
          <Image
            {...imageProps}
            alt="imagem post"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="rounded"
          />
        </div>
        <div className={richTextStyles}>
          <PortableText
            value={post?.body}
            components={myPortableTextComponents}
          />
          <AddComment postId={post?._id} />
          <AllComments
            comments={post?.comments || []}
            slug={post?.slug?.current}
            commentsOrder={comment.toString()}
          />
        </div>
      </div>
      <aside className="flex md:flex-1 md:border-l-[1px] border-gray-300 md:min-h-screen mt-8 md:px-5">
        <LastPostList />
      </aside>
    </div>
  );
};

const myPortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image src={urlForImage(value)} alt="post" width={700} height={700} />
    ),
  },
  block: {
    h2: (props) => (
      <h2 className="text-2xl font-bold mt-6 mb-2">{props.children}</h2>
    ),
    normal: (props) => (
      <p className="mb-4 indent-8 text-sm md:text-lg xl:text-xl">
        {props.children}
      </p>
    ),
  },
  list: {
    bullet: (props) => (
      <ul className="list-disc ml-5 mb-4">{props.children}</ul>
    ),
    number: (props) => (
      <ol className="list-decimal ml-5 mb-4">{props.children}</ol>
    ),
  },
  listItem: {
    bullet: (props) => <li className="mb-2">{props.children}</li>,
    number: (props) => <li className="mb-2">{props.children}</li>,
  },
};

const richTextStyles = `mt-6 md:mt-4 px-3 text-left max-w-full prose-headings:my-5 prose-heading:text-2xl prose-p:mb-5 prose-p:leading-7 prose-li:list-disc prose-li:leading-7 prose-li:ml-4`;

export default PostContent;
