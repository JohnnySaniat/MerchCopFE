import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/forms/RegisterForm';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();
  const [countdown, setCountdown] = useState(1000);
  const [secretCode, setSecretCode] = useState('');
  const [bypass, setBypass] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  }, []);

  useEffect(() => {
    let timer;
    if (countdown > 0 && !bypass) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      router.push('/staging');
    }
    return () => clearTimeout(timer);
  }, [countdown, bypass]);

  const handleSecretCodeSubmit = () => {
    if (secretCode === '@CasualBlaine') {
      setBypass(true);
      router.push('/staging');
    }
  };

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  return (
    <div className="flex justify-center items-center mt-8 w-100 h-100">
      {authUser?.uid === user?.uid ? (
        <div className="card w-96 glass text-white">
          <img src="https://i.ibb.co/X2ZPdLv/Merch-Cop2.png" alt="Merch Cop" className="mb-4" style={{ width: '400px' }} />
          <div className="card-body flex flex-col items-center">
            <h2 className="card-title text-2xl mb-2 greeting">Hello {user?.fbUser?.displayName}!</h2>
            {!bypass && (
              <div className="flex flex-col items-center">
                <h3 className="mb-4">Countdown: {countdown}s</h3>
                <Form onSubmit={(e) => { e.preventDefault(); handleSecretCodeSubmit(); }} className="flex flex-col items-center">
                  <Form.Group controlId="secretCode" className="mb-4">
                    <Form.Label className="mb-2">Enter Secret Code to Bypass Countdown</Form.Label>
                    <Form.Control
                      type="text"
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                      className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                    />
                  </Form.Group>
                  <Button variant="danger" type="submit" className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Submit
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </div>
      ) : (
        <RegisterForm user={user} onUpdate={onUpdate} />
      )}
    </div>
  );
}

export default Home;
