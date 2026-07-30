import type { ReactNode } from 'react';

type ContentLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ContentLayout({ title, description, children }: ContentLayoutProps) {
  return (
    <section className="rounded-3xl border border-border bg-card/90 p-6 text-card-foreground shadow-xl shadow-black/10">
      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-primary">Screen</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-card-foreground">{title}</h1>
      {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
      <div className="mt-6 text-card-foreground">{children}</div>
    </section>
  );
}
