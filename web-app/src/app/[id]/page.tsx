'use client';

import React from 'react';
import Link from 'next/link';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { NextUIProvider } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/card';

import withApollo from '../../../lib/withApollo';
import { useGetMovieByIdQuery } from '../../../generated';

function SingleMovie({ params }: { params: { id: string } }) {

  const { data, loading } = useGetMovieByIdQuery({
    variables: {
      id: Number(params.id),
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <NextUIProvider>
      <section
        className={'h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-col'}>

        <div className={'absolute left-5 top-2'}>
          <Link href={'/'}>
            <span
              className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">&lt;-</span>
            BACK
          </Link>
        </div>

        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-[70%]"
          shadow="sm"
        >
          <CardBody>
            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">{data?.getMovieById.title}</h3>
                  <p className="text-small text-foreground/80">{data?.getMovieById.description}</p>

                  <ul className={'mt-5 text-small text-foreground/80'}>Comments:
                    {
                      data?.getMovieById.movieComment.map(item => <li key={item.id}
                                                                      className={'text-xs my-2'}>{item.description}</li>)
                    }
                  </ul>

                </div>
              </div>
            </div>
          </CardBody>
        </Card>

      </section>
    </NextUIProvider>
  );
}

export default withApollo(SingleMovie, { getDataFromTree });