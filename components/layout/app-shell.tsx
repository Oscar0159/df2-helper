'use client';

import { Header } from '@/components/layout/header';

import { AppBreadcrumbs } from './app-breadcrumbs';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="absolute -z-10 h-full w-full bg-[radial-gradient(var(--muted)_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,var(--background)_70%,transparent_100%)] bg-size-[16px_16px]"></div>
      <Header />
      <AppBreadcrumbs />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* TOOL SELECTOR */}
        {children}
      </main>
    </div>
  );
}
