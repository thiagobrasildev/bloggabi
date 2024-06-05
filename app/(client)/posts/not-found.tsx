import Header from "@/app/components/Header";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <h1>404 - Página não encontrada.</h1>
      <div>
        <Link href={"/"}>Voltar para Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
