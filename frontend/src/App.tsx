import Navbar from '@/components/Navbar';
import { useColorModeValue } from '@/components/ui/color-mode';
import CreatePage from '@/pages/CreatePage';
import HomePage from '@/pages/HomePage';
import { Box } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => (
  <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')} px={4} py={4}>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/create' element={<CreatePage />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  </Box>
);

export default App;
