import { z } from "zod";

export const enquirySchema = z.object({
  parentName: z.string().trim().min(2, "Parent name is required."),
  studentName: z.string().trim().min(2, "Student name is required."),
  classInterested: z.string().trim().min(1, "Class is required."),
  phoneNumber: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine(
      (value) => /^(?:91)?[6-9]\d{9}$/.test(value),
      "Enter a valid 10-digit Indian mobile number."
    ),
  message: z.string().trim().max(800, "Message is too long.").optional()
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  phoneNumber: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine(
      (value) => /^(?:91)?[6-9]\d{9}$/.test(value),
      "Enter a valid 10-digit Indian mobile number."
    ),
  email: z.string().trim().email("Enter a valid email address.").or(z.literal("")),
  subject: z.string().trim().min(3, "Subject is required.").max(120),
  message: z.string().trim().min(10, "Please enter a little more detail.").max(1200)
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
