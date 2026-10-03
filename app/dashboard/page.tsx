import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-gray-400">WELCOME TO</p>

        <h1 className="mt-2 text-5xl font-bold">
          ZENTHIL
        </h1>

        <p className="mt-4 text-gray-400">
          What do you need?
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <a
            href="/service"
            className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:bg-white/10"
          >
            <div className="text-3xl">🔎</div>
            <h2 className="mt-6 text-2xl font-semibold">
              I need a service
            </h2>
            <p className="mt-2 text-gray-400">
              Find someone who can help with what you need.
            </p>
          </a>

          <a
            href="/offer"
            className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:bg-white/10"
          >
            <div className="text-3xl">🛠️</div>
            <h2 className="mt-6 text-2xl font-semibold">
              I offer a service
            </h2>
            <p className="mt-2 text-gray-400">
              Tell people what you do and let them contact you.
            </p>
          </a>
        </div>

        <p className="mt-10 text-xs text-gray-500">
          Signed in as {user.email}
        </p>
      </div>
    </main>
  );
}