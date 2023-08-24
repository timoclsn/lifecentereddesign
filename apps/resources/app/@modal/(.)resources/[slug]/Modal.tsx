'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from 'design-system';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface State {
  setPreventAccidentalClose: Dispatch<SetStateAction<boolean>>;
}

const initialState: State = {
  setPreventAccidentalClose: () => {},
};

const ModalContext = createContext<State>(initialState);

export const useModal = () => useContext(ModalContext);

interface Props {
  children: ReactNode;
}

export const Modal = ({ children }: Props) => {
  const [preventAccidentalClose, setPreventAccidentalClose] = useState(false);
  const [open, setOpen] = useState(true);
  const { back } = useRouter();
  const onOpenChange = (open: boolean) => {
    if (!open) {
      back();
      return;
    }
    setOpen(open);
  };
  return (
    <ModalContext.Provider
      value={{  setPreventAccidentalClose }}
    >
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent
            className="h-[80%]"
            onPointerDownOutside={
              preventAccidentalClose ? (e) => e.preventDefault() : undefined
            }
            onInteractOutside={
              preventAccidentalClose ? (e) => e.preventDefault() : undefined
            }
          >
            <DialogClose />
            {children}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </ModalContext.Provider>
  );
};
