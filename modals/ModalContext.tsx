import React, { createContext, useContext, useState } from "react";
// import { Modal } from ...

interface ProviderProps {
  children: React.ReactNode;
}

interface ModalContextType {
  modalOpen: boolean;
  openModal: (options: { content: React.ReactNode; heading?: string }) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [heading, setHeading] = useState<string>("");

  const openModal = ({
    content,
    heading = "",
  }: {
    content: React.ReactNode;
    heading?: string;
  }) => {
    setModalContent(content);
    setHeading(heading);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
    setHeading("");
  };

  const value = {
    modalOpen,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal visible={modalOpen} onClose={closeModal} heading={heading}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error(
      "useModalContext must be used within a ModalContextProvider"
    );
  }

  return context;
};
