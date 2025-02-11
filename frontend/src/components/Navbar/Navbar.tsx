import { Container, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { LuSquarePlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { ColorModeButton } from '../ui/color-mode';
import './Navbar.css';

const Navbar = () => (
  <Container maxW='1140px' px={4} py={4}>
    <Flex h={16} alignItems='center' justifyContent='space-between' flexDir='row'>
      <Text
        fontSize={{ base: '6xl', smDown: 'xl' }}
        fontWeight='bold'
        textTransform='uppercase'
        textAlign='center'
        bgGradient='to-r'
        gradientFrom='cyan.400'
        gradientTo='blue.500'
        bgClip='text'
      >
        <Link to='/'>MERN Market 🛒</Link>
      </Text>
      <HStack spaceX={2} alignItems='center'>
        <Link to='/create'>
          <IconButton
            variant='subtle'
            aria-label='Create product'
            size={{ base: '2xl', smDown: 'sm' }}
          >
            <LuSquarePlus />
          </IconButton>
        </Link>
        <ColorModeButton variant='subtle' size={{ base: '2xl', smDown: 'sm' }} />
      </HStack>
    </Flex>
  </Container>
);

export default Navbar;
