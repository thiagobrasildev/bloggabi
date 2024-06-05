"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Post } from "../utils/Interface";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPost: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  totalPost,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "6";

  return (
    <div className="flex gap-2 justify-center items-center">
      {page != "1" && (
        <button
          className="hover:bg-gray-900 hover:text-white border border-gray-900 px-4 py-1 rounded font-extrabold cursor-pointer flex justify-center items-center"
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`);
          }}
        >
          &larr;
        </button>
      )}

      <div>
        {page} / {Math.ceil(totalPost / Number(per_page))}
      </div>

      <button
        className="hover:bg-gray-900 hover:text-white border border-gray-900 px-4 py-1 rounded font-extrabold cursor-pointer flex justify-center items-center"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        &rarr;
      </button>
    </div>
  );
};

export default PaginationControls;
