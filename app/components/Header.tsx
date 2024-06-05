"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaInstagram, FaFacebookF, FaSearch } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário
    router.push(`/?search=${searchQuery}`);
    setSearchQuery("");
  };
  return (
    <header className="w-full flex justify-center items-center relative h-[250px] bg-[url('../../public/bgHeader.jpg')] bg-cover bg-center">
      <div className="absolute z-10 top-0 left-0 bg-black/70 flex w-full h-full justify-center items-center">
        <div className="flex flex-col max-w-6xl p-5 md:p-0 text-white w-full h-full">
          <div className="flex flex-col gap-5 justify-center items-center h-[70%]">
            <Link href="/" className="text-center text-2xl md:text-5xl">
              Estruturas Corrompidas
            </Link>
            <h2 className="text-center text-lg md:text-2xl ">
              &quot;Contos&quot; de fraudes em contratos de contrução pública
            </h2>
          </div>
          <div className="flex justify-center md:justify-between items-center w-full flex-1 md:p-5 xl:p-0">
            <div className="flex items-center gap-4 md:gap-5">
              <a
                href="#"
                className="p-1 md:p-3 flex items-center justify-center border border-white rounded-full hover:text-red-600 hover:border-red-600"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-1 md:p-3 flex items-center justify-center border border-white rounded-full hover:text-blue-600 hover:border-blue-600"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-1 md:p-3 flex items-center justify-center border border-white rounded-full hover:text-gray-600 hover:border-gray-600"
              >
                <FaXTwitter />
              </a>
            </div>
            <div className="border border-white rounded-lg pr-2 hidden md:flex">
              <form className="flex items-center" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-transparent border-none outline-none text-base p-2"
                />
                <button type="submit" className="w-5">
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
