import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/react';

import {INewMovie} from '@/interfaces';

interface IProps {
    isOpen: boolean,
    onOpenChange: () => void,
    setNewMovieFromForm: Dispatch<SetStateAction<INewMovie | null>>,
}

const NewMovieModalForm: FC<IProps> = ({isOpen, onOpenChange, setNewMovieFromForm}) => {

    const [titleValue, setTitleValue] = useState<string>('');
    const [descriptionValue, setDescriptionValue] = useState<string>('');

    const handleCloseModal = () => {
        setTitleValue('');
        setDescriptionValue('');
    }

    const isInvalid = React.useMemo(() => {
        return titleValue === '' || titleValue.length < 3;
    }, [titleValue])

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                onClose={handleCloseModal}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create New Movie</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    type={'text'}
                                    label="Title"
                                    placeholder="Enter a title"
                                    variant="bordered"
                                    value={titleValue}
                                    onValueChange={setTitleValue}
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    errorMessage={isInvalid && "Please enter a valid title"}
                                />
                                <Input
                                    type={'text'}
                                    label="Description"
                                    placeholder="Enter a description"
                                    variant="bordered"
                                    value={descriptionValue}
                                    onValueChange={setDescriptionValue}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary"
                                        onPress={() => {
                                            setNewMovieFromForm({
                                                title: titleValue,
                                                description: descriptionValue,
                                            });

                                            onClose();
                                        }}
                                        isDisabled={isInvalid}
                                >
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewMovieModalForm;