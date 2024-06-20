/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileCard from '../components/cards/ProfileCard';
import { useAuth } from '../utils/context/authContext';
import { getUserDetails } from '../api/userData';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  const getAuthenticatedUser = () => {
    getUserDetails(user.uid).then(setUserDetails);
  };

  useEffect(() => {
    if (user) {
      getAuthenticatedUser();
    }
  }, [user]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      router.push('/');
    }
  };

  return (
    <div className="home-container">
      <div className="h-screen">
        <div className="text-center">
          <div>
            <button
              type="button"
              onClick={() => router.push('/')}
              onKeyDown={handleKeyDown}
              aria-label="Back to Home"
              style={{ border: 'none', background: 'none', padding: 0 }}
            >
              <img
                src="https://i.ibb.co/N3MSnrR/arrow-carrot-left.png"
                alt="Back"
                style={{ cursor: 'pointer', width: '75px' }}
              />
            </button>
          </div>
          <div className="d-flex flex-wrap">
            {userDetails && <ProfileCard userObj={userDetails} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
