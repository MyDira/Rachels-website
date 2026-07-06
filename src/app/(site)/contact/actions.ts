"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendMessage(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email and message.",
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject: subject || null,
      message,
    });
    if (error) throw error;
    return {
      status: "success",
      message: "Thank you! Your message is on its way to Rachel.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Something went wrong sending your message — please email Rachel directly instead.",
    };
  }
}
