import Link from "next/link";
import React from "react";
import { Post } from "../utils/Interface";
import { client } from "@/sanity/lib/client";

async function getPosts() {
  const query = `
  *[_type == "post"] | order(publishedAt desc)[0..5] {
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    _id,
    tags[]-> {
      _id,
      slug,
      name  
    }
  }
  `;
  const data = await client.fetch(query);
  return data;
}

const LastPostList = async () => {
  const posts: Post[] = await getPosts();
  return (
    <div className="flex flex-col gap-3">
      <p className="text-2xl">Últimas postagens</p>
      <div className="flex flex-col gap-2 pl-1">
        {posts?.length > 0 &&
          posts?.map((post) => (
            <a
              href={`/posts/${post?.slug?.current}`}
              key={post?._id}
              className="text-sm hover:underline xl:text-base"
            >
              {post.title}
            </a>
          ))}
      </div>
    </div>
  );
};

export default LastPostList;
