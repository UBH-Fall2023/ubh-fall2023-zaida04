DROP TABLE "users";--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "senderId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "receiverId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "items" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "ordererId" SET DATA TYPE text;