'use client';

import { getDataFromTree } from '@apollo/client/react/ssr';
import React from 'react';
import Link from 'next/link';
import { NextUIProvider } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/card';

import withApollo from '../../lib/withApollo';
import { useCharactersQuery } from '../../generated';

function Home() {
  // const { data, error, loading } = useQuery(CHARACTERS_QUERY);
  const { data, loading } = useCharactersQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <NextUIProvider>
      <main
        className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="z-10 max-w-5xl w-full flex flex-col gap-5 font-mono text-sm">

          {data?.characters?.results?.map((character) => (

            /*           <div key={character?.id}>

                         <img
                           src={character?.image!}
                           alt={character?.name!}
                           width="200px"
                           height="200px"
                         />
                         <Link href="/[id]" as={`/${character?.id}`}>
                           {character?.name}
                         </Link>
                       </div>*/


            <Card
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
              shadow="sm"
              key={character?.id}
            >
              <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                  <div className="relative col-span-6 md:col-span-4">
                    <img
                      src={character?.image!}
                      alt={character?.name!}
                      className="object-cover rounded-2xl"
                      height={200}
                      width="100%"
                    />
                  </div>

                  <div className="flex flex-col col-span-6 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h3 className="font-semibold text-foreground/90">
                          <Link href="/[id]" as={`/${character?.id}`}>
                            {character?.name}
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>

                </div>
              </CardBody>
            </Card>


          ))}

        </div>

      </main>
    </NextUIProvider>
  );
}

export default withApollo(Home, { getDataFromTree });
