import { Box, Drawer, Portal, useDisclosure, Flex, IconButton, Text } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import type { User } from '../types';

interface LayoutProps {
  user: User;
}

export const Layout = ({ user }: LayoutProps) => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="gray.50">
      <Sidebar onClose={() => onClose()} user={user} />

      <Drawer.Root
        open={open}
        placement="start"
        onOpenChange={(e) => !e.open && onClose()}
        size="full"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Sidebar onClose={onClose} user={user} />
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      <Flex
        display={{ base: 'flex', md: 'none' }}
        height="20"
        alignItems="center"
        bg="white"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
        justifyContent="flex-start"
        px="4"
      >
        <IconButton variant="outline" onClick={onOpen} aria-label="open menu">
          <FiMenu />
        </IconButton>
        <Text ml="4" fontSize="xl" fontFamily="sans-serif" fontWeight="900" letterSpacing="tight">
          Absense
        </Text>
      </Flex>

      <Box ml={{ base: 0, md: 60 }} p="8">
        <Outlet />
      </Box>
    </Box>
  );
};