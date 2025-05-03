import { HoverEffect } from '@/components/ui/card-hover-effect';

const projects = [
  {
    title: 'Binary',
    description:
      'A technology company that builds economic infrastructure for the internet.',
    link: '/battle/chest-puzzles/binary',
  },
  {
    title: 'Alphabet',
    description:
      'A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
    link: '/battle/chest-puzzles/alphabet',
  },
  {
    title: 'Letter',
    description:
      'A multinational technology company that specializes in Internet-related services and products.',
    link: '/battle/chest-puzzles/letter',
  },
  {
    title: 'Morse Code',
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: '/battle/chest-puzzles/morse-code',
  },
  {
    title: 'Light Out',
    description:
      'A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    link: '/battle/chest-puzzles/light-out',
  },
  {
    title: 'Sliding',
    description:
      'A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
    link: '/battle/chest-puzzles/sliding',
  },
];

export default function Page() {
  return (
    <main>
      <div className="relative flex h-dvh flex-col items-center justify-center gap-8 px-[15%]">
        <HoverEffect items={projects} />
      </div>
    </main>
  );
}
