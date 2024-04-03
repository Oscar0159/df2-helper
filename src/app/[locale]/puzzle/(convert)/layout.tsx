import { ConvertNavButtonGroup } from './components/convert-nav-button-group';

export default function ConvertLayout({
    children,
    params: { lng },
}: Readonly<{
    children: React.ReactNode;
    params: { lng: string };
}>) {
    return (
        <main className="w-full pt-10">
            <ConvertNavButtonGroup className="mb-5" />
            {children}
        </main>
    );
}
