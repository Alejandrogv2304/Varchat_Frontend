import type { ReactNode } from 'react';

type ContentLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ContentLayout({ title, description, children }: ContentLayoutProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/30">
      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-sky-300">Screen</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{title}</h1>
      {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{description}</p> : null}
      <div className="mt-6 text-slate-200">{children}</div>
    </section>
  );
}