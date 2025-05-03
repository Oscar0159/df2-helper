import { routing } from '@/i18n/routing';
import messages from '@/messages/en-US.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  }
}
