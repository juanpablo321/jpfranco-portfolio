import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import {
  getAllBlogArticles,
  getBlogArticleBySlug,
  getBlogArticlesByCategory,
} from "../sanity";

export const blogRouter = router({
  /**
   * Returns all blog articles ordered by date descending (summary fields only).
   */
  getAll: publicProcedure.query(async () => {
    return getAllBlogArticles();
  }),

  /**
   * Returns a single blog article by its slug, including the full Portable Text body.
   */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ input }) => {
      return getBlogArticleBySlug(input.slug);
    }),

  /**
   * Returns all blog articles for a specific category.
   */
  getByCategory: publicProcedure
    .input(z.object({ category: z.string().min(1) }))
    .query(async ({ input }) => {
      return getBlogArticlesByCategory(input.category);
    }),
});
