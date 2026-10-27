CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
