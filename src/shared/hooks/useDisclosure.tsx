import { useState, useId, useCallback, useRef } from 'react';

interface IProps {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onClose?(): void; // Function to set false value for `isOpen` parameter
  onOpen?(): void; // Function to set truthy value for `isOpen` parameter
  id?: string;
}

type HTMLProps = React.HTMLAttributes<HTMLElement>;

/**
 * `useDisclosure` is a custom hook used to help handle common open, close, or toggle scenarios.
 * It can be used to control feedback component such as `Dialog`, `Drawer`, etc.
 *
 */
function useDisclosure(props: IProps = {}) {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    isOpen: isOpenProp,
    id: idProp,
  } = props;

  const handleOpen = useRef(onOpenProp);
  const handleClose = useRef(onCloseProp);

  const [isOpenState, setIsOpen] = useState(props.defaultIsOpen || false);

  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;

  const isControlled = isOpenProp !== undefined;

  const uid = useId();
  const id = idProp ?? `disclosure-${uid}`;

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    handleClose.current?.();
  }, [isControlled, handleClose]);

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    handleOpen.current?.();
  }, [isControlled, handleOpen]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);

  function getButtonProps(buttonProps: HTMLProps = {}): HTMLProps {
    return {
      ...buttonProps,
      'aria-expanded': isOpen,
      'aria-controls': id,
      onClick(event) {
        buttonProps.onClick?.(event);
        onToggle();
      },
    };
  }

  function getDisclosureProps(disclosureProps: HTMLProps = {}): HTMLProps {
    return {
      ...disclosureProps,
      hidden: !isOpen,
      id,
    };
  }

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps,
    getDisclosureProps,
  };
}

export default useDisclosure;
