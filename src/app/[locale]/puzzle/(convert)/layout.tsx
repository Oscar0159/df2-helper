import { ConvertNavButtonGroup } from './components/convert-nav-button-group';

export default function ConvertLayout({
    children,
    params: { lng },
}: Readonly<{
    children: React.ReactNode;
    params: { lng: string };
}>) {
    return (
        <>
            <ConvertNavButtonGroup className="mb-5" />
            {children}
        </>
    );
}
