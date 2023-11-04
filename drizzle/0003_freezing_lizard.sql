DROP TABLE "rooms";--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "createdAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN IF EXISTS "roomId";