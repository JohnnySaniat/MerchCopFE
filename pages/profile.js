import { useEffect, useState } from 'react';
import UserCard from '../components/cards/UserCard';
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
    <div className="h-screen">
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {userDetails && <UserCard userObj={userDetails} />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
