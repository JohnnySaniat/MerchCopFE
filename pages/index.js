/* eslint-disable react-hooks/exhaustive-deps */
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
      router.push('/staging.js');
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
    <>
      {authUser?.uid === user?.uid ? (
        <div className="home-container">
          <h1 className="greeting">Hello {user?.fbUser?.displayName}!</h1>
          {!bypass && (
            <div className="countdown-container">
              <h2>Countdown: {countdown}s</h2>
              <Form onSubmit={(e) => { e.preventDefault(); handleSecretCodeSubmit(); }}>
                <Form.Group controlId="secretCode">
                  <Form.Label>Enter Secret Code to Bypass Countdown</Form.Label>
                  <Form.Control
                    type="text"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    className="secret-code-input"
                  />
                </Form.Group>
                <Button variant="danger" type="submit" className="submit-button">
                  Submit
                </Button>
              </Form>
            </div>
          )}
        </div>
      ) : (
        <RegisterForm user={user} onUpdate={onUpdate} />
      )}
    </>
  );
}

export default Home;
