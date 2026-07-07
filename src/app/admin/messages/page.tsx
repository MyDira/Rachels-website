"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/utils/supabase/client";
import type { ContactMessage } from "@/lib/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[] | null>(null);
  const [dbError, setDbError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setDbError(
        "The database tables don't exist yet. Run supabase/migrations/0001_init.sql in the Supabase SQL editor first."
      );
      setMessages([]);
      return;
    }
    setMessages(data as ContactMessage[]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRead = async (m: ContactMessage) => {
    await createClient()
      .from("contact_messages")
      .update({ read: !m.read })
      .eq("id", m.id);
    load();
  };

  const remove = async (m: ContactMessage) => {
    if (!confirm("Delete this message?")) return;
    await createClient().from("contact_messages").delete().eq("id", m.id);
    load();
  };

  return (
    <AdminShell title="Messages">
      {dbError && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {dbError}
        </div>
      )}
      {messages === null ? (
        <p className="font-normal text-slate-mid">Loading…</p>
      ) : messages.length === 0 ? (
        !dbError && (
          <p className="font-normal text-slate-mid">
            No messages yet — when someone fills out the contact form, it lands
            here.
          </p>
        )
      ) : (
        <ul className="grid gap-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`card-soft rounded-2xl p-6 ${m.read ? "opacity-70" : ""}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-ink">
                    {m.name}
                    {!m.read && (
                      <span className="label-caps ml-3 rounded-full bg-slate-brand px-2.5 py-0.5 text-[0.5rem] font-semibold text-white">
                        New
                      </span>
                    )}
                  </p>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-sm font-normal text-slate-mid hover:text-slate-brand"
                  >
                    {m.email}
                  </a>
                </div>
                <span className="text-xs font-normal text-slate-mid">
                  {new Date(m.created_at).toLocaleString()}
                </span>
              </div>
              {m.subject && (
                <p className="mt-3 text-sm font-medium text-slate-ink">
                  {m.subject}
                </p>
              )}
              <p className="mt-2 whitespace-pre-wrap font-normal leading-relaxed text-slate-mid">
                {m.message}
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject ?? "your message")}`}
                  className="label-caps rounded-full bg-slate-brand px-4 py-2 text-[0.55rem] font-semibold text-white"
                >
                  Reply
                </a>
                <button
                  onClick={() => toggleRead(m)}
                  className="label-caps rounded-full border border-slate-light px-4 py-2 text-[0.55rem] font-semibold text-slate-mid hover:border-slate-brand"
                >
                  Mark {m.read ? "unread" : "read"}
                </button>
                <button
                  onClick={() => remove(m)}
                  className="label-caps rounded-full border border-red-200 px-4 py-2 text-[0.55rem] font-semibold text-red-500 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
