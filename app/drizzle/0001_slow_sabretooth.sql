ALTER TABLE `counseling_request` ADD `scheduled_session_id` text REFERENCES counseling_session(id);--> statement-breakpoint
ALTER TABLE `counseling_session` ADD `request_id` text REFERENCES counseling_request(id);--> statement-breakpoint
ALTER TABLE `counseling_session` ADD `student_confirmation_note` text;--> statement-breakpoint
ALTER TABLE `counseling_session` ADD `student_completion_note` text;