'use client';

import {getDataFromTree} from '@apollo/client/react/ssr';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {Button, NextUIProvider, useDisclosure} from '@nextui-org/react';
import {Card, CardBody, CardFooter} from '@nextui-org/card';
import {Alert, Snackbar} from '@mui/material';
import {signal} from '@preact/signals-react';

import withApollo from '../../lib/withApollo';
import {useCreateMovieMutation, useDeleteMovieMutation, useGetAllMoviesQuery} from '../../generated';
import {MOVIES_QUERY} from '../../graphql/queries';
import NewMovieModalForm from '@/components/NewMovieModalForm/NewMovieModalForm';
import {INewMovie} from '@/interfaces';

export const isCreateSig = signal<boolean>(true);

function Home() {
    const {data, loading, error} = useGetAllMoviesQuery();
    const [createMovieMutation, {
        data: newMovie,
    }] = useCreateMovieMutation();
    const [deleteMovieMutation, {data: deletedMovie}] = useDeleteMovieMutation();

    const [addSnackOpen, setAddSnackOpen] = useState<boolean>(false);
    const [deleteSnackOpen, setDeleteSnackOpen] = useState<boolean>(false);
    const [newMovieFromForm, setNewMovieFromForm] = useState<INewMovie | null>(null);
    const [movieForForm, setMovieForForm] = useState<INewMovie | null>(null);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        if (newMovieFromForm) {


            if (isCreateSig.value) {
                createMovieMutation({
                    variables: {
                        movie: {
                            title: newMovieFromForm.title,
                            description: newMovieFromForm.description,
                        },
                    },
                    refetchQueries: [{query: MOVIES_QUERY}],
                }).then(value => console.log(value));

                setAddSnackOpen(true);
            } else {
                console.log(newMovieFromForm)
            }


        }
    }, [newMovieFromForm, createMovieMutation]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div
            className="min-h-screen items-center justify-center p-24 bg-gradient-to-r from-purple-500 to-pink-500">
            <p>{JSON.stringify(error)}</p>
        </div>;
    }

    const createMovie = () => {
        isCreateSig.value = true;
        onOpen();
    };

    const updateMovie = (movie: INewMovie) => {
        isCreateSig.value = false;
        setMovieForForm({
            id: movie.id,
            title: movie.title,
            description: movie.description,
        });
        onOpen();
    };

    const deleteMovie = async (id: number) => {
        await deleteMovieMutation({
            variables: {
                id,
            },
            refetchQueries: [{query: MOVIES_QUERY}],
        });

        setDeleteSnackOpen(true);
    };

    const handleAddSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setAddSnackOpen(false);
    };

    const handleDeleteSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setDeleteSnackOpen(false);
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
                                <Link href={`/${movie.id}`}>
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
                                <Button className="text-tiny text-white bg-black/20" variant="flat" color="default"
                                        radius="lg"
                                        size="sm" onClick={() => updateMovie(movie as INewMovie)}>
                                    Edit
                                </Button>
                                <Button className="text-tiny text-white bg-black/20" variant="flat" color="default"
                                        radius="lg"
                                        size="sm" onClick={() => deleteMovie(movie.id)}>
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                    <Button color="primary" variant="shadow" onClick={createMovie}>
                        + Add
                    </Button>

                </div>

                <NewMovieModalForm isOpen={isOpen} onOpenChange={onOpenChange}
                                   setNewMovieFromForm={setNewMovieFromForm}
                                   movieForForm={movieForForm}/>

                <Snackbar
                    open={addSnackOpen}
                    autoHideDuration={2000}
                    onClose={handleAddSnackClose}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                >
                    <Alert severity="success" sx={{width: '100%'}}> Movie {newMovie?.createMovie.title} is successfully
                        added! </Alert>
                </Snackbar>

                <Snackbar
                    open={deleteSnackOpen}
                    autoHideDuration={2000}
                    onClose={handleDeleteSnackClose}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                >
                    <Alert severity="warning" sx={{width: '100%'}}> Movie {deletedMovie?.deleteMovie.title} is
                        successfully
                        deleted! </Alert>
                </Snackbar>

            </main>
        </NextUIProvider>
    );
}

export default withApollo(Home, {getDataFromTree});
