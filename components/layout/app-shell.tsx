'use client';

import { Header } from '@/components/layout/header';

import { AppBreadcrumbs } from './app-breadcrumbs';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AppBreadcrumbs />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* TOOL SELECTOR */}
        {children}
      </main>
    </div>
  );
}
