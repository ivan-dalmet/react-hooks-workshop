import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/core';
import { Formiz, useForm } from '@formiz/core';
import { Header } from '../components/Header';
import { FieldUploader } from '../components/Fields/FieldUploader';
import { useAddCat } from './useQuery';

export const NewCat = () => {
  const form = useForm()
  const [addCat, { isLoading }] = useAddCat()

  const handleSubmit = (values) => {
    addCat(values)
  }

  return (
    <>
      <Header title="New Cat">
        <Button
          as={Link}
          to="/"
          variantColor="brand"
          variant="ghost"
        >
          Back to list
        </Button>
      </Header>

      <Formiz
        connect={form}
        onValidSubmit={handleSubmit}
        autoForm
      >
        <FieldUploader
          name="catImage"
          label="Cat image"
          required="Image is required"
        />
        <Button type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </Formiz>
    </>
  );
};