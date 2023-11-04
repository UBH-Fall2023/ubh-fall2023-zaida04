ALTER TABLE "messages" ADD COLUMN "roomId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "createdAt" timestamp NOT NULL;