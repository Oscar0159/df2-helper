"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AppBreadcrumbs } from "./app-breadcrumbs";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-2 sm:px-6 lg:px-8">
      <Header />
      <AppBreadcrumbs />

      <main className="flex flex-1 flex-col py-6">
        {/* TOOL SELECTOR */}
        {children}
      </main>

      <Footer />
    </div>
  );
}
