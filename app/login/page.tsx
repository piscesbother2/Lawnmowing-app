import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-24">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <Link href="/" className="inline-flex items-center gap-2" aria-label="Mowpro home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-600 font-bold text-white">
            M
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">Mowpro</span>
        </Link>
        <h1 className="mt-8 text-2xl font-bold text-slate-900">Sign-in coming soon</h1>
        <p className="mt-3 text-slate-600">
          Magic-link authentication is being wired up right now. Check back in a few days, or email{" "}
          <a
            href="mailto:ekiser@dsplifecollaborative.com"
            className="font-medium text-emerald-700 hover:text-emerald-800"
          >
            ekiser@dsplifecollaborative.com
          </a>{" "}
          to get on the early-access list.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
