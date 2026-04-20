CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE TABLE `alert` (
	`id` text PRIMARY KEY NOT NULL,
	`student_user_id` text NOT NULL,
	`reason` text NOT NULL,
	`severity` text NOT NULL,
	`status` text NOT NULL,
	`last_updated_at` integer NOT NULL,
	`summary` text NOT NULL,
	`recommendation` text NOT NULL,
	FOREIGN KEY (`student_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `alert_student_user_id_idx` ON `alert` (`student_user_id`);--> statement-breakpoint
CREATE TABLE `counseling_request` (
	`id` text PRIMARY KEY NOT NULL,
	`student_user_id` text NOT NULL,
	`topic` text NOT NULL,
	`preferred_slot` text NOT NULL,
	`summary` text NOT NULL,
	`status` text NOT NULL,
	`submitted_at` integer NOT NULL,
	FOREIGN KEY (`student_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `counseling_request_student_user_id_idx` ON `counseling_request` (`student_user_id`);--> statement-breakpoint
CREATE TABLE `counseling_session` (
	`id` text PRIMARY KEY NOT NULL,
	`student_user_id` text NOT NULL,
	`counselor_user_id` text,
	`title` text NOT NULL,
	`counselor_name` text NOT NULL,
	`scheduled_at` integer NOT NULL,
	`format` text NOT NULL,
	`location` text NOT NULL,
	`status` text NOT NULL,
	`invitation_status` text NOT NULL,
	`focus` text NOT NULL,
	`note` text NOT NULL,
	`outcome` text,
	`follow_up` text,
	FOREIGN KEY (`student_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`counselor_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `counseling_session_student_user_id_idx` ON `counseling_session` (`student_user_id`);--> statement-breakpoint
CREATE TABLE `mood_entry` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`score` integer NOT NULL,
	`note` text,
	`recorded_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `mood_entry_user_id_recorded_at_idx` ON `mood_entry` (`user_id`,`recorded_at`);--> statement-breakpoint
CREATE TABLE `resource_point` (
	`id` text PRIMARY KEY NOT NULL,
	`resource_id` text NOT NULL,
	`sort_order` integer NOT NULL,
	`content` text NOT NULL,
	FOREIGN KEY (`resource_id`) REFERENCES `resource`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `resource_point_resource_id_sort_order_idx` ON `resource_point` (`resource_id`,`sort_order`);--> statement-breakpoint
CREATE TABLE `resource` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`title` text NOT NULL,
	`read_time` text NOT NULL,
	`summary` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `school_class` (
	`id` text PRIMARY KEY NOT NULL,
	`school_id` text NOT NULL,
	`name` text NOT NULL,
	`homeroom_name` text NOT NULL,
	`counselor_name` text NOT NULL,
	`student_count` integer DEFAULT 0 NOT NULL,
	`completion_rate` integer DEFAULT 0 NOT NULL,
	`risk_band` text NOT NULL,
	FOREIGN KEY (`school_id`) REFERENCES `school`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `school_class_school_id_idx` ON `school_class` (`school_id`);--> statement-breakpoint
CREATE TABLE `school` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`principal` text NOT NULL,
	`counselor_count` integer DEFAULT 0 NOT NULL,
	`student_count` integer DEFAULT 0 NOT NULL,
	`class_count` integer DEFAULT 0 NOT NULL,
	`completion_rate` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE TABLE `student_intervention` (
	`id` text PRIMARY KEY NOT NULL,
	`student_user_id` text NOT NULL,
	`title` text NOT NULL,
	`owner` text NOT NULL,
	`status` text NOT NULL,
	`when_label` text NOT NULL,
	FOREIGN KEY (`student_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `student_intervention_student_user_id_idx` ON `student_intervention` (`student_user_id`);--> statement-breakpoint
CREATE TABLE `system_config` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`group_name` text NOT NULL,
	`value` text NOT NULL,
	`status` text NOT NULL,
	`summary` text NOT NULL,
	`impact` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`role` text DEFAULT 'student',
	`school_id` text,
	`class_id` text,
	`student_code` text,
	`last_access_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);--> statement-breakpoint
CREATE TABLE `whisper_report` (
	`id` text PRIMARY KEY NOT NULL,
	`student_user_id` text,
	`owner_label` text NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`urgency` text NOT NULL,
	`status` text DEFAULT 'Sedang Ditinjau',
	`submitted_at` integer NOT NULL,
	`excerpt` text NOT NULL,
	`detail` text NOT NULL,
	`next_step` text NOT NULL,
	`assigned_to` text NOT NULL,
	FOREIGN KEY (`student_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `whisper_report_student_user_id_idx` ON `whisper_report` (`student_user_id`);