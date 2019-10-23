import React from 'react';
import { Link, useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { Button} from '@chakra-ui/core';
import { CatCard } from '../components/CatCard';
import { useQuery } from '@apollo/react-hooks';
import { Header } from '../components/Header';
import { MoreCats } from '../components/MoreCats';

const catQuery = gql`
  query cat($id: UUID!) {
    cat(id: $id) @rest(type: "Cat", path: "images/{args.id}") {
      id
      url
    }
  }
`;

export const Cat = () => {
  const { catId } = useParams();
  const { data, loading, error } = useQuery(catQuery, { variables: { id: catId } })
  const { cat } = data || {};

  return (
    <>
      <Header title="Cat">
        <Button
          as={Link}
          to='/'
          variantColor="brand"
          variant="ghost"
        >
          Back to list
        </Button>
      </Header>
      <CatCard
        cat={cat}
        isLoading={loading}
        isError={error}
      />
      {!loading && !error && cat && <MoreCats currentId={cat && cat.id} />}
    </>
  );
};
