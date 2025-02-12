import ProductCard from '@/components/ProductCard';
import { useProductStore } from '@/store/product';
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW='container.xl'>
      <VStack px={8} py={2}>
        <Text
          as='h2'
          fontSize={{ base: '5xl', smDown: 'lg' }}
          fontWeight='bold'
          bgGradient='to-r'
          gradientFrom='cyan.400'
          gradientTo='blue.500'
          bgClip='text'
          textAlign='center'
        >
          Products
        </Text>
        {products.length === 0 ? (
          <VStack>
            <Text fontSize='xl' textAlign='center' fontWeight='bold' color='gray.500'>
              No products found
            </Text>
            <Link to='/create'>
              <Text as='span' color='blue.500' _hover={{ textDecoration: 'underline' }}>
                Create a product
              </Text>
            </Link>
          </VStack>
        ) : (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            px={10}
            py={2}
            w='full'
          >
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};
export default HomePage;
