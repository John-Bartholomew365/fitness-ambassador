"use client";

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/loaders/PageLoader';
import BookPage from '@/components/pages/BookPage';
import React from 'react';

const Page = () => {
  return (
    <PageLoader>
      <div>
        <Navbar />
        <BookPage />
        <Footer />
      </div>
    </PageLoader>
  );
};

export default Page;