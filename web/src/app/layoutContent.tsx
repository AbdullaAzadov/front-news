'use client';
import Header from '@/widgets/header/ui/header';
import React, { Suspense } from 'react';
import AppProvider from './providers/appProvider';

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Header />
      </Suspense>
      <main className="container mx-auto px-[5vw] md:px-0">
        <AppProvider>{children}</AppProvider>
      </main>
    </>
  );
};

export default LayoutContent;
