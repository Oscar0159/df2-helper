"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const footerLinkClass =
  "inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-10 border-border/60 border-t py-6">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
        <div className="hidden space-y-2 md:block">
          <p className="max-w-lg text-muted-foreground text-sm leading-6">
            {t("description")}
          </p>
        </div>

        <div className="md:justify-self-end">
          <nav className="flex flex-col items-center gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2 md:items-center md:justify-end">
            <a
              href="https://discord.com/invite/deadfrontier2"
              target="_blank"
              rel="noreferrer"
              className={footerLinkClass}
            >
              <Image
                src="/Discord-Symbol-Black.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden="true"
                className="size-4 dark:invert"
              />
              {t("resources.discord")}
              <ArrowUpRight className="size-3.5" />
            </a>
            <a
              href="https://github.com/Oscar0159/df2-helper"
              target="_blank"
              rel="noreferrer"
              className={footerLinkClass}
            >
              <Image
                src="/GitHub_Invertocat_Black.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden="true"
                className="size-4 dark:invert"
              />
              {t("resources.github")}
              <ArrowUpRight className="size-3.5" />
            </a>
          </nav>
        </div>
      </div>

      <p className="mt-6 text-center text-muted-foreground text-xs md:text-right">
        {t("copyright", { year: "2026" })}
      </p>
    </footer>
  );
}
