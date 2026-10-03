import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          ZENTHIL
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-20 text-center">
        <div className="mb-6 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
          Find the right people to get things done
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          From idea to done.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          ZENTHIL connects people who need services with people who offer them.
          Describe what you need, discover the right providers, and connect
          directly.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/service"
            className="rounded-2xl bg-slate-950 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            I need a service
          </Link>

          <Link
            href="/offer"
            className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 hover:bg-slate-50"
          >
            I offer a service
          </Link>
        </div>

        <div className="mt-20 grid w-full max-w-4xl gap-6 text-left md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="text-2xl">🔎</div>
            <h2 className="mt-4 font-semibold">Describe what you need</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Tell ZENTHIL what you&apos;re looking for in your own words.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="text-2xl">🤝</div>
            <h2 className="mt-4 font-semibold">Discover providers</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Find people and businesses offering the service you need.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="text-2xl">💬</div>
            <h2 className="mt-4 font-semibold">Connect directly</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Message providers and arrange the details directly with them.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
