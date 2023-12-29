'use client';

import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

import { CHARACTERS_QUERY } from '../../graphql/queries';
import withApollo from '../../lib/withApollo';
import { Character, useCharactersQuery } from '../../generated';
import React from 'react';
import Link from 'next/link';

function Home() {
  // const { data, error, loading } = useQuery(CHARACTERS_QUERY);
  const { data, error, loading } = useCharactersQuery();

  if (loading) {return <div>Loading...</div>}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full flex flex-col gap-5 font-mono text-sm">

        {data?.characters?.results?.map((character) => (
          <div key={character?.id}>

            <img
              src={character?.image!}
              alt={character?.name!}
              width="200px"
              height="200px"
            />
            <Link href="/[id]" as={`/${character?.id}`}>
              {character?.name}
            </Link>
          </div>
        ))}

      </div>

    </main>
  );
};

export default withApollo(Home, { getDataFromTree });
