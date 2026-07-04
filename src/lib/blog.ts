import {readFileSync} from "fs";
import {join} from "path";
import type {Locale} from "@/i18n/routing";

export type BlogPost = {
  slug: string;
  language: Locale;
  title: string;
  description: string;
  date: string;
  body?: string;
};

export function getBlogPosts(locale: Locale) {
  const path = join(process.cwd(), ".velite", "blog.json");
  const posts = JSON.parse(readFileSync(path, "utf8")) as BlogPost[];
  return posts.filter((post) => post.language === locale);
}
