import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

const Layout = ({ children, modal }: Props) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default Layout;
