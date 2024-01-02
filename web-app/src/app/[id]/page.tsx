'use client';

import Link from 'next/link';
import withApollo from '../../../lib/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useCharacterQuery } from '../../../generated/index-old-rickandmortyapi';
import React from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { NextUIProvider } from '@nextui-org/react';

function SingleCharacter({ params }: { params: { id: string } }) {

  const { data, loading } = useCharacterQuery({
    variables: {
      id: params.id,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <NextUIProvider>
      <section className={'h-screen bg-gradient-to-r from-purple-500 to-pink-500'}>

        <div>
        <span
          className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              &lt;-
            </span>
          <Link href={'/'}>BACK</Link>
        </div>

        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <img
                  alt="Album cover"
                  className="object-cover rounded-2xl"
                  height={200}
                  src={data?.character?.image!}
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h3 className="font-semibold text-foreground/90">{data?.character?.name}</h3>
                    <p className="text-small text-foreground/80">{data?.character?.gender}</p>
                    <h3 className="text-large font-medium mt-2">{data?.character?.species}</h3>
                  </div>
                </div>
              </div>

            </div>
          </CardBody>
        </Card>

      </section>
    </NextUIProvider>
  );
}

export default withApollo(SingleCharacter, { getDataFromTree });