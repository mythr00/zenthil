"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function OfferPage() {
  const router = useRouter();
  const supabase = createClient();

  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!description.trim() || !serviceName.trim()) {
      setError("Please describe your service and what you offer.");
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

    const { error: providerError } = await supabase
      .from("provider_profiles")
      .upsert(
        {
          user_id: user.id,
          business_name: businessName.trim() || null,
          description: description.trim(),
          service_area: serviceArea.trim() || null,
        },
        {
          onConflict: "user_id",
        }
      );

    if (providerError) {
      console.error("PROVIDER PROFILE ERROR:", providerError);
      setError(providerError.message);
      setLoading(false);
      return;
    }

    const { error: serviceError } = await supabase
      .from("services")
      .insert({
        provider_id: user.id,
        name: serviceName.trim(),
        description: description.trim(),
        category: category.trim() || null,
        location: serviceArea.trim() || null,
        active: true,
      });

    if (serviceError) {
      console.error("SERVICE ERROR:", serviceError);
      setError(serviceError.message);
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
            Offer a service
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            What do you offer?
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Tell people what you do. Customers will be able to discover your
            services and contact you directly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-6">
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-semibold"
              >
                Business or professional name
              </label>

              <input
                id="businessName"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder="Example: Lagos Plumbing Services"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="serviceName"
                className="block text-sm font-semibold"
              >
                What service do you offer?
              </label>

              <input
                id="serviceName"
                value={serviceName}
                onChange={(event) => setServiceName(event.target.value)}
                placeholder="Example: Plumbing and pipe repair"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold"
              >
                Describe what you do
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Tell customers what you can help them with..."
                className="mt-2 min-h-36 w-full resize-none rounded-2xl border border-slate-300 p-4 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold"
                >
                  Category
                </label>

                <input
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="Example: Home services"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div>
                <label
                  htmlFor="serviceArea"
                  className="block text-sm font-semibold"
                >
                  Service area
                </label>

                <input
                  id="serviceArea"
                  value={serviceArea}
                  onChange={(event) => setServiceArea(event.target.value)}
                  placeholder="Example: Lagos"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>
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
            {loading ? "Creating profile..." : "Create provider profile"}
          </button>
        </form>
      </section>
    </main>
  );
}