import React, { useMemo, useRef, useState } from 'react';
import ConfirmationModal from 'shared/components/modals/ConfirmationModal';

export interface IConfirmationModalContent {
  title: string;
  content: string | JSX.Element;
}

interface IConfirmationModalContext {
  openConfirmationModal: (content: IConfirmationModalContent) => any;
  isSubmitting: boolean;
  changeSubmittingStatus: (newStatus: boolean) => void;
}

// Confirmation Modal Context
const ConfirmationModalContext =
  React.createContext<IConfirmationModalContext | null>(null);

// Provider for the Confirmation Modal Context
export function ConfirmationModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalContent, setModalContent] = useState<IConfirmationModalContent>({
    title: '',
    content: '',
  });
  // Use strict typing for the ref
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolver = useRef<any>();

  const handleConfirm = () => {
    if (resolver.current) {
      resolver.current(true);
    }
  };

  const handleCancel = () => {
    if (resolver.current) {
      resolver.current(false);
    }
    setIsModalOpen(false);
    setModalContent({
      title: '',
      content: '',
    });
  };

  const value = useMemo(() => {
    const openConfirmationModal = (content: IConfirmationModalContent) => {
      setIsModalOpen(true);
      setModalContent(content);

      return new Promise((resolve) => {
        resolver.current = resolve;
      });
    };

    const changeSubmittingStatus = (newStatus: boolean) => {
      setIsSubmitting(newStatus);
      if (!newStatus) {
        setIsModalOpen(false);
      }
    };

    return {
      openConfirmationModal,
      isSubmitting,
      changeSubmittingStatus,
    };
  }, [isSubmitting]);

  return (
    <ConfirmationModalContext.Provider value={value}>
      {children}
      <ConfirmationModal
        isOpen={isModalOpen}
        isSubmitting={isSubmitting}
        modalContent={modalContent.content}
        modalTitle={modalContent.title}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </ConfirmationModalContext.Provider>
  );
}

// Selectors
// ConfirmationModalContext should be accessible only with selectors defined here
export function useConfirmationModal() {
  return React.useContext(ConfirmationModalContext);
}

export default ConfirmationModalProvider;
