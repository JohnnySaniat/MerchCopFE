import { useEffect, useState } from 'react';
import ProfileCard from '../components/cards/ProfileCard';
import { useAuth } from '../utils/context/authContext';
import { getUserDetails } from '../api/userData';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const { user } = useAuth();

  const getAuthenticatedUser = () => {
    getUserDetails(user.uid).then(setUserDetails);
  };

  useEffect(() => {
    if (user) {
      getAuthenticatedUser();
    }
  }, [user]);

  return (
    <div className="home-container">
      <div className="h-screen">
        <div className="text-center my-4">
          <div className="d-flex flex-wrap">
            {userDetails && <ProfileCard userObj={userDetails} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
