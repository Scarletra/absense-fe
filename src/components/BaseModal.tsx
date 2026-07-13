import type { ReactNode } from 'react';
import {
  Dialog,
  Portal,
} from '@chakra-ui/react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const BaseModal = ({ isOpen, onClose, title, children, footer }: BaseModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="md">
            <Dialog.Header fontFamily="sans-serif" fontWeight="800">
              <Dialog.Title color="gray.600">{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              {children}
            </Dialog.Body>
            {footer && (
              <Dialog.Footer>
                {footer}
              </Dialog.Footer>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};