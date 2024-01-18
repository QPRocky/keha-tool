import { Flex } from '@chakra-ui/react'
import Navigation from './Navigation';

const MainContainer = ({ children }) => {
  return (
    <Flex h="100vh">
      <Navigation />
      {children}
    </Flex>
  );
};

export default MainContainer;