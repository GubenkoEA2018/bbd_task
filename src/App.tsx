// Core
import React, { FC, ReactElement } from 'react';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RootDialog } from './dialogs/RootDialog';

// Hooks
import { useScrollToTop, useInit } from './hooks';

// Config
import { configureToast } from './services/toast';
import { Backdrop } from './components/ui/Backdrop';
import CatalogPage from "./pages/CatalogPage";

configureToast();

export const App: FC = (): ReactElement => {
  useScrollToTop();
  // Init store data from localstorage
  const { loading, isInit } = useInit();

  return (
    <>
      <Header />

     <CatalogPage />

      <Footer />

      <RootDialog />

      <Backdrop open={Boolean(loading)} />
    </>
  );
};
