import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(4001),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  ALLOWED_ORIGINS: z.string(),
  JWT_SECRET: z.string().min(10),
});

const result = envSchema.safeParse({
  ...process.env,
  JWT_SECRET: process.env.JWT_SECRET ?? process.env.MY_SECRET,
});

if (!result.success) {
  console.error("Variáveis de ambiente ausentes ou inválidas:");
  result.error.issues.forEach((issue) => {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  });
  process.exit(1);
}

export const env = result.data;
