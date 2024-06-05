"use client";

import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  postId: string;
}

const AddComment = ({ postId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { name, email, comment } = data;

    const res = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ name, email, comment, postId }),
    });
    if (!res.ok) {
      console.log("Failed to add comment");
      return;
    }
    reset();
  };

  return (
    <div className="mt-14">
      <p className="font-bold mb-4">
        Deixe um comentário <span role="img">💬</span>
      </p>
      <form
        className="flex flex-col border shadow-sm rounded px-8 pt-6 pb-6 mb-10"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <label className="font-bold">Nome</label>
        <input
          {...register("name", { required: true })}
          className="mb-4 py-1 bg-slate-50 border"
        />
        {errors.name && (
          <p className="text-red-600 text-xs">Nome é obrigatório.</p>
        )}
        <label className="font-bold">
          Email <span className="text-xs">Seu email não será publicado!</span>
        </label>
        <input
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/,
          })}
          className="mb-4 py-1 bg-slate-50 border"
        />
        {errors.email && (
          <p className="text-red-600 text-xs">
            Por favor entre com um email válido.
          </p>
        )}
        <label className="font-bold">Comentário</label>
        <textarea
          {...register("comment", { required: true, minLength: 2 })}
          className="mb-4 py-1 bg-slate-50 border"
        />
        {errors.comment && (
          <p className="text-red-600 text-xs">Mínimo de dois caracteres.</p>
        )}
        <input
          className={`cursor-pointer bg-slate-200 text-gray-900 rounded py-2 hover:bg-slate-400 ${isSubmitting ? "opacity-50" : ""}`}
          disabled={isSubmitting}
          value={isSubmitting ? "Enviando..." : "Enviar"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddComment;
