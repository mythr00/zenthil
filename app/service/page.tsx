"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ServicePage() {
  const router = useRouter();
  const supabase = createClient();

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!description.trim()) {
      setError("Please describe the service you need.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error: insertError } = await supabase
      .from("service_requests")
      .insert({
        customer_id: user.id,
        title: description.trim().slice(0, 100),
        description: description.trim(),
        location: location.trim() || null,
        urgency: urgency || null,
        status: "open",
      });

    if (insertError) {
  console.error("SERVICE REQUEST INSERT ERROR:", insertError);
  setError(
    `Request failed: ${insertError.message}${
      insertError.details ? ` — ${insertError.details}` : ""
    }`
  );
  setLoading(false);
  return;
}

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            ZENTHIL
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-slate-600 hover:text-slate-950"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Find a service
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            What do you need?
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Tell us what you&apos;re trying to get done. Describe it naturally and
            ZENTHIL will help you find people or businesses that can help.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <label
            htmlFor="service"
            className="block text-sm font-semibold text-slate-900"
          >
            Describe what you need
          </label>

          <textarea
            id="service"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Example: I need someone to repair my leaking bathroom pipe this weekend..."
            className="mt-3 min-h-40 w-full resize-none rounded-2xl border border-slate-300 p-4 text-base outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-slate-900"
              >
                Location
              </label>

              <input
                id="location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City or area"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="urgency"
                className="block text-sm font-semibold text-slate-900"
              >
                How soon?
              </label>

              <select
                id="urgency"
                value={urgency}
                onChange={(event) => setUrgency(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              >
                <option value="">Select urgency</option>
                <option value="urgent">As soon as possible</option>
                <option value="this_week">This week</option>
                <option value="this_month">This month</option>
                <option value="flexible">I&apos;m flexible</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating request..." : "Find providers"}
          </button>
        </form>
      </section>
    </main>
  );
}
