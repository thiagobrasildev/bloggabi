import Header from "@/app/components/Header";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <h1>404 - Página não encontrada.</h1>
      <div>
        <a href={"/"}>Voltar para Home</a>
      </div>
    </div>
  );
};

export default NotFound;
