import { ConvertNavButtonGroup } from './components/convert-nav-button-group';

export default function ConvertLayout({
    children,
    params: { lng },
}: Readonly<{
    children: React.ReactNode;
    params: { lng: string };
}>) {
    return (
        <main className="w-full p-5 pb-24 sm:pb-5 sm:pt-8">
            <ConvertNavButtonGroup className="mb-5" />
            {children}
        </main>
    );
}
