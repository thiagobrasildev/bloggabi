import LastPostList from "../components/LastPostList";
import PostComponent from "../components/PostComponent";
import { client } from "@/sanity/lib/client";
import { Post } from "../utils/Interface";
import { useRouter } from "next/router";
import PaginationControls from "../components/PaginationControls";
import { post } from "@/sanity/schemas/post";

async function getPosts(searchQuery: string) {
  // const query = `
  // *[_type == "post"] | order(publishedAt desc) {
  //   title,
  //   slug,
  //   mainImage,
  //   publishedAt,
  //   excerpt,
  //   _id,
  //   tags[]-> {
  //     _id,
  //     slug,
  //     name
  //   }
  // }
  // `;
  // const data = await client.fetch(query, { searchQuery: `*${searchQuery}*` });
  // return data;
  let query = `*[_type == "post"] | order(publishedAt desc)`;

  // Adicione a cláusula de busca apenas se houver um termo de busca
  if (searchQuery) {
    query = `*[_type == "post" && title match $searchQuery] | order(publishedAt desc)`;
  }

  const data = await client.fetch(query, { searchQuery: `*${searchQuery}*` });
  return data;
}

export const revalidate = 60;

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = searchParams["search"] ?? "";
  const posts: Post[] = await getPosts(searchQuery as string);
  //pagination
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "6";

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  let content = null;

  if (posts.length > 0) {
    content = (
      <>
        {posts
          ?.slice(start, end)
          .map((post) => <PostComponent key={post?._id} post={post} />)}
        {posts?.length > 6 && (
          <PaginationControls
            hasNextPage={end < posts?.length}
            hasPrevPage={start > 0}
            totalPost={posts.length}
          />
        )}
      </>
    );
  } else if (searchQuery) {
    content = (
      <div className="flex flex-col">
        <p>Nenhum post encontrado para `{searchQuery}`</p>
        <a
          href="/"
          className="p-2 border border-gray-900 rounded mt-3 max-w-max hover:text-white font-extrabold hover:bg-gray-700 text-center flex justify-center items-center"
        >
          &larr; Voltar
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6">
      <div className="flex flex-col gap-10 md:gap-16 lg:gap-20 md:w-[60%] lg:w-[70%] xl:w-[75%] mt-8">
        {/* {posts?.length > 0 &&
          posts
            ?.slice(start, end)
            .map((post) => <PostComponent key={post?._id} post={post} />)}
        {posts?.length > 6 && (
          <PaginationControls
            hasNextPage={end < posts?.length}
            hasPrevPage={start > 0}
            totalPost={posts.length}
          />
        )} */}
        {content}
      </div>
      <aside className="flex md:flex-1 md:border-l-[1px] border-gray-300 md:min-h-screen mt-8 md:px-5">
        <LastPostList />
      </aside>
    </div>
  );
}
