'use client';

import { getDataFromTree } from '@apollo/client/react/ssr';
import React from 'react';
import Link from 'next/link';
import { Button, NextUIProvider } from '@nextui-org/react';
import { Card, CardBody, CardFooter } from '@nextui-org/card';

import withApollo from '../../lib/withApollo';
import { useCreateMovieMutation, useDeleteMovieMutation, useGetAllMoviesQuery } from '../../generated';
import { MOVIES_QUERY } from '../../graphql/queries';

function Home() {
  const { data, loading, error } = useGetAllMoviesQuery();
  const [createMovieMutation, {
    // data: newMovie,
    // error: newMovieError,
    // loading: newMovieLoading,
  }] = useCreateMovieMutation();
  const [deleteMovieMutation, {data: deletedMovie}] = useDeleteMovieMutation();

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
        },
      },
      refetchQueries: [{ query: MOVIES_QUERY }],
    });
  };

  const updateMovie = () => {

  };

  const deleteMovie = async (id: number) => {
    await deleteMovieMutation({
      variables: {
        id,
      },
      refetchQueries: [{ query: MOVIES_QUERY }],
    });
  };

  return (
    <NextUIProvider>
      <main
        className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="grid grid-cols-2 gap-4 font-mono text-sm">

          {data?.getAllMovies.map((movie) => (
            <Card
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
              shadow="sm"
              key={movie.id}
            >
              <CardBody>
                <Link href="/[id]" as={`/${movie.id}`}>
                  <div className="flex flex-col col-span-6 md:col-span-8 mb-20">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h3 className="font-semibold text-foreground/90">
                          {movie.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </CardBody>

              <CardFooter
                className="justify-end gap-5 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg"
                        size="sm" onClick={updateMovie}>
                  Edit
                </Button>
                <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg"
                        size="sm" onClick={() => deleteMovie(movie.id)}>
                  Delete
                </Button>
              </CardFooter>
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
