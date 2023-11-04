ALTER TABLE "messages" ADD COLUMN "roomId" uuid;--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "createdAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "orderTotal" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "tips" numeric NOT NULL;