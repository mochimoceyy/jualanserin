import type { Config } from "@netlify/functions";
import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { testimonials } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method === "GET") {
    const rows = await db
      .select({ name: testimonials.name, message: testimonials.message, createdAt: testimonials.createdAt })
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt))
      .limit(100);
    return Response.json(rows);
  }

  if (req.method === "POST") {
    let body: { name?: unknown; message?: unknown };
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Data tidak valid" }, { status: 400 });
    }
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 60) : "";
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 500) : "";
    if (!name || !message) {
      return Response.json({ error: "Nama dan testimoni wajib diisi" }, { status: 400 });
    }
    const [row] = await db
      .insert(testimonials)
      .values({ name, message })
      .returning({ name: testimonials.name, message: testimonials.message, createdAt: testimonials.createdAt });
    return Response.json(row, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/testimonials",
};
