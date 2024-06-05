import { client } from "@/sanity/lib/client";
import { MetadataRoute } from "next";
import { Post } from "./utils/Interface";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: Post[] = await getPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ slug }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${slug.current}`,
    //lastModified: new Date(posts)
  }));
  return [...postEntries];
}

async function getPosts() {
  let query = `*[_type == "post"] | order(publishedAt desc)`;

  const data = await client.fetch(query);
  return data;
}
