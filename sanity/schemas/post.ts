import { Rule } from "sanity";

export const post = {
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Obrigatório"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: Rule) => Rule.required().error("Obrigatório"),
    },
    {
      name: "mainImage",
      title: "Imagem Principal",
      type: "image",
      options: {
        hotdpot: true,
      },
    },
    {
      name: "publishedAt",
      title: "Publicado em",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "excerpt",
      title: "Descrição curta",
      type: "text",
      validation: (Rule: Rule) =>
        Rule.max(400).error("Máximo de 400 caracteres"),
    },
    {
      name: "body",
      title: "Corpo da postagem",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [{ type: "text", name: "alt", title: "Tag da imagem" }],
        },
      ],
    },
  ],
};
