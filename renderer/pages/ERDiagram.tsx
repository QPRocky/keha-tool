import { Flex } from '@chakra-ui/react';
import Navigation from '../components/Navigation';
import { NextPage } from 'next';

const ERDiagramPage: NextPage = () => {
  return (
    <Flex h="100vh">
      <Navigation />
      <p>ERDiagramPage</p>
    </Flex>
  );
}

export default ERDiagramPage;
