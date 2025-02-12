import { useColorModeValue } from '@/components/ui/color-mode';
import { Toaster, toaster } from '@/components/ui/toaster';
import { useProductStore } from '@/store/product';
import { Product } from '@/types/frontend';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    price: 0,
    image: '',
  });
  const { createProduct } = useProductStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.type === 'number' ? +e.target.value : e.target.value;
    setNewProduct({
      ...newProduct,
      [e.target.name]: value,
    });
  };

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    toaster.create({
      title: message,
      type: success ? 'success' : 'error',
    });
    if (success) {
      setNewProduct({
        name: '',
        price: 0,
        image: '',
      });
    }
  };

  return (
    <Container maxW='container.sm'>
      <Toaster />
      <VStack px={8} py={8}>
        <Heading as='h1' size='2xl' textAlign='center' mb={8}>
          Create New Product
        </Heading>
        <Box w='full' bg={useColorModeValue('white', 'gray.800')} p={6} rounded='lg' shadow='md'>
          <VStack px={4} py={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={handleChange}
              required
            />
            <Input
              placeholder='Price'
              name='price'
              type='number'
              min={0}
              value={newProduct.price === 0 ? '' : newProduct.price}
              onChange={handleChange}
              required
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={handleChange}
              required
            />
            <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
