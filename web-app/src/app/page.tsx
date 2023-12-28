'use client';

import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

import { CHARACTERS_QUERY } from '../../graphql/queries';
import withApollo from '../../lib/withApollo';

function Home() {
  const { data, error, loading } = useQuery(CHARACTERS_QUERY);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {JSON.stringify(data)}


{/*        {characters.map((character) => (
          <div key={character.id}>
            <Image
              src={character.image}
              alt={character.name}
              width="200px"
              height="200px"
            />
            <Link href="/characters/[id]" as={`/characters/${character.id}`}>
              {character.name}
            </Link>
          </div>
        ))}*/}

      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span
              className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>
      </div>
    </main>
  );
};

export default withApollo(Home, { getDataFromTree });
