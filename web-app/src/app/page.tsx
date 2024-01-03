'use client';

import { getDataFromTree } from '@apollo/client/react/ssr';
import React from 'react';
import Link from 'next/link';
import { Button, NextUIProvider } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/card';
import { useRouter } from 'next/navigation';

import withApollo from '../../lib/withApollo';
import { useCreateMovieMutation, useGetAllMoviesQuery } from '../../generated';

function Home() {
  const { data, loading, error } = useGetAllMoviesQuery();
  const [createMovieMutation, {
    data: newMovie,
    error: newMovieError,
    loading: newMovieLoading,
  }] = useCreateMovieMutation();

  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="min-h-screen items-center justify-center p-24 bg-gradient-to-r from-purple-500 to-pink-500">
      <p>{JSON.stringify(error)}</p>
    </div>;
  }


  const addNewMovie = async () => {
   await createMovieMutation({
      variables: {
        movie: {
          title: '555',
          description: '*** **** ***',
        }
      }
    });

    router.refresh();
  };



  return (
    <NextUIProvider>
      <main
        className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="grid grid-cols-2 gap-4 font-mono text-sm">

          {data?.getAllMovies.map((movie) => (
            <Card
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] h-20"
              shadow="sm"
              key={movie.id}
            >
              <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">

                  <div className="flex flex-col col-span-6 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h3 className="font-semibold text-foreground/90">
                          <Link href="/[id]" as={`/${movie.id}`}>
                            {movie.title}
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}

          <Button color="primary" variant="shadow" onClick={addNewMovie}>
            + Add
          </Button>

        </div>

      </main>
    </NextUIProvider>
  );
}

export default withApollo(Home, { getDataFromTree });
