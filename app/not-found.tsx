import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-24">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2" aria-label="Mowpro home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-600 font-bold text-white">
            M
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">Mowpro</span>
        </Link>
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">404</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Lost in the rough.</h1>
        <p className="mt-3 text-slate-600">That page doesn&apos;t exist — or it&apos;s still being mowed.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
