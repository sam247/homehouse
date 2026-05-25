import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const clientId =
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "3773d0e1-5f07-49f5-bad0-6713cf9c2021";

export default defineConfig({
  branch,
  clientId,
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "publishedAt",
            label: "Published At",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "availability",
        label: "Availability",
        path: "content/availability",
        format: "json",
        match: {
          include: "blocks",
        },
        fields: [
          {
            type: "object",
            name: "blocks",
            label: "Blocked Date Ranges",
            list: true,
            fields: [
              {
                type: "string",
                name: "start",
                label: "Start (YYYY-MM-DD)",
                required: true,
              },
              {
                type: "string",
                name: "end",
                label: "End (YYYY-MM-DD)",
                required: true,
              },
              {
                type: "string",
                name: "label",
                label: "Label",
              },
            ],
          },
        ],
      },
    ],
  },
});
