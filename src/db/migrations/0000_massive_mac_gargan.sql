CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `comment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text(256) NOT NULL,
	`resource_id` integer NOT NULL,
	`text` text NOT NULL,
	FOREIGN KEY (`resource_id`) REFERENCES `resource`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `like` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text(256) NOT NULL,
	`resource_id` integer NOT NULL,
	FOREIGN KEY (`resource_id`) REFERENCES `resource`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `resource` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text(256) NOT NULL,
	`slug` text(256) NOT NULL,
	`suggestion` integer DEFAULT false NOT NULL,
	`link` text(256) NOT NULL,
	`type_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	`short_description` text,
	`description` text,
	`details` text,
	`note` text,
	`date` integer,
	`date_plain` text(256),
	`related_resources_plain` text(256),
	`anonymous_likes_count` integer DEFAULT 0 NOT NULL,
	`old_slug` text(256),
	FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `resource_to_related_resource` (
	`resource_id` integer NOT NULL,
	`related_resource_id` integer NOT NULL,
	PRIMARY KEY(`related_resource_id`, `resource_id`),
	FOREIGN KEY (`resource_id`) REFERENCES `resource`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`related_resource_id`) REFERENCES `resource`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `resource_to_topic` (
	`resource_id` integer NOT NULL,
	`topic_id` integer NOT NULL,
	PRIMARY KEY(`resource_id`, `topic_id`),
	FOREIGN KEY (`resource_id`) REFERENCES `resource`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`topic_id`) REFERENCES `topic`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `topic` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `type` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_name_unique` ON `category` (`name`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `comment` (`user_id`);--> statement-breakpoint
CREATE INDEX `resource_idx` ON `comment` (`resource_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `like_resource_id_user_id_unique` ON `like` (`resource_id`,`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `resource_slug_unique` ON `resource` (`slug`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `resource` (`created_at`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `resource` (`name`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `resource` (`type_id`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `resource` (`category_id`);--> statement-breakpoint
CREATE INDEX `anonymous_likes_count_idx` ON `resource` (`anonymous_likes_count`);--> statement-breakpoint
CREATE UNIQUE INDEX `topic_name_unique` ON `topic` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `type_name_unique` ON `type` (`name`);