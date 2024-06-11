import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card  glass text-white mt-8">
        <img src="https://i.ibb.co/X2ZPdLv/Merch-Cop2.png" alt="Merch Cop" className="mx-auto mb-4" style={{ width: '600px' }} />
        <div className="card-body flex flex-col items-center">
          <Button type="button" size="lg" className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-800" onClick={signIn}>
            ENTER
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
