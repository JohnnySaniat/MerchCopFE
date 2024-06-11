import React from 'react';
import { useRouter } from 'next/router';

function UnauthorizedPage() {
  const router = useRouter();

  const handleGoToHomePage = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">You are not authorized to view this page.</h1>
      <p className="text-lg mb-4">Please go back to the home page or contact an administrator for assistance.</p>
      <button type="button" onClick={handleGoToHomePage} className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer">
        Go to Home Page
      </button>
    </div>
  );
}

export default UnauthorizedPage;
