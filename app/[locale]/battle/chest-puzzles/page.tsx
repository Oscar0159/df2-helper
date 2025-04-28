import React from 'react';

export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const todo = await (await fetch('https://fakerapi.it/api/v2/texts', {next: {revalidate: 3600}})).json();

  console.log(todo.data[0]);
  return (
    <main className="relative flex h-dvh flex-col items-center justify-center gap-8">
      <div>{locale}</div>
      <div>{todo.data[0].title}</div>
    </main>
  );
}
