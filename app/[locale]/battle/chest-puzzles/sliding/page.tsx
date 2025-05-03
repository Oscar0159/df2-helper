import SlidingViewer from './components/sliding-viewer';

export default function page() {
  return (
    <main className="relative flex h-dvh flex-col items-center justify-center gap-8">
      <SlidingViewer />
    </main>
  );
}
