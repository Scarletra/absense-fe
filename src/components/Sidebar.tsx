import { Box, Flex, Text, CloseButton, VStack, Icon, Link } from '@chakra-ui/react';
import { FiHome, FiUsers, FiLogOut } from 'react-icons/fi';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { User } from '../types';

interface SidebarProps {
  onClose: () => void;
  user: User;
}

export const Sidebar = ({ onClose, user }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();

  const NavItem = ({ icon, children, to }: { icon: any; children: string; to: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link asChild _focus={{ boxShadow: 'none' }} w="full">
        <RouterLink to={to} style={{ textDecoration: 'none' }}>
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            bg={isActive ? 'blue.400' : 'transparent'}
            color={isActive ? 'white' : 'gray.600'}
            _hover={{
              bg: 'blue.400',
              color: 'white',
            }}
          >
            <Icon mr="4" fontSize="16" as={icon} />
            {children}
          </Flex>
        </RouterLink>
      </Link>
    );
  };

  return (
    <Box
      transition="3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      display="flex"
      flexDirection="column"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="sans-serif" fontWeight="900" letterSpacing="tight">
          Absense
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack gap={2} align="stretch" mt={4}>
        <NavItem icon={FiHome} to="/">Daftar Absen</NavItem>
        {user.isHrd && (
          <NavItem icon={FiUsers} to="/karyawan">Daftar Karyawan</NavItem>
        )}
      </VStack>

      <Flex
        align="center"
        p="4"
        mx="4"
        mt="auto"
        mb="4"
        borderRadius="lg"
        cursor="pointer"
        color="gray.600"
        _hover={{
          bg: 'red.400',
          color: 'white',
        }}
        onClick={logout}
      >
        <Icon mr="4" fontSize="16" as={FiLogOut} />
        Logout
      </Flex>
    </Box>
  );
};