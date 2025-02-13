import { useProductStore } from '@/store/product';
import { Product } from '@/types/frontend';
import { Box, Button, Card, IconButton, Image, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import { useColorModeValue } from '../ui/color-mode';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '../ui/dialog';
import { toaster, Toaster } from '../ui/toaster';
import './ProductCard.css';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { deleteProduct, updateProduct } = useProductStore();
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === 'price' ? +e.target.value : e.target.value;
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: value,
    });
  };

  const handleDeleteProduct = async () => {
    setDeleteDialogOpen(false);
    if (!updatedProduct._id) {
      toaster.create({
        title: 'Product ID not found',
        type: 'error',
      });
      return;
    }
    const { success, message } = await deleteProduct(updatedProduct._id);
    toaster.create({
      title: message,
      type: success ? 'success' : 'error',
    });
  };

  const handleUpdateProduct = async () => {
    if (!updatedProduct._id) {
      toaster.create({
        title: 'Product ID not found',
        type: 'error',
      });
      return;
    }
    const { success, message } = await updateProduct(updatedProduct._id, updatedProduct);
    toaster.create({
      title: message,
      type: success ? 'success' : 'error',
    });
    if (success) {
      setUpdateDialogOpen(false);
    }
  };

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
      m={4}
    >
      <Toaster />
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
      <Card.Root p={4}>
        <Card.Title mb={2}>{product.name}</Card.Title>
        <Card.Description fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          ${product.price}
        </Card.Description>
        <Card.Footer justifyContent='flex-end'>
          <IconButton onClick={() => setUpdateDialogOpen(true)} bgColor='blue.500' color='white'>
            <LuPencil />
          </IconButton>
          <IconButton onClick={() => setDeleteDialogOpen(true)} bgColor='red.500' color='white'>
            <LuTrash2 />
          </IconButton>
        </Card.Footer>
      </Card.Root>

      <DialogRoot open={deleteDialogOpen} onEscapeKeyDown={() => setDeleteDialogOpen(false)}>
        <DialogContent>
          <DialogCloseTrigger onClick={() => setDeleteDialogOpen(false)} />
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogBody>
            This action cannot be undone. This will permanently remove the product data from our
            systems.
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant='outline' onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button colorPalette='red' onClick={() => handleDeleteProduct()}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      <DialogRoot open={updateDialogOpen} onEscapeKeyDown={() => setUpdateDialogOpen(false)}>
        <DialogContent>
          <DialogCloseTrigger onClick={() => setUpdateDialogOpen(false)} />
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack py={4}>
              <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={handleChange}
                required
              />
              <Input
                placeholder='Price'
                name='price'
                value={+updatedProduct.price === 0 ? '' : +updatedProduct.price}
                onChange={handleChange}
                required
              />
              <Input
                placeholder='Image URL'
                name='image'
                value={updatedProduct.image}
                onChange={handleChange}
                required
              />
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant='ghost' onClick={() => setUpdateDialogOpen(false)}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button colorPalette='blue' mr={3} onClick={() => handleUpdateProduct()}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default ProductCard;
