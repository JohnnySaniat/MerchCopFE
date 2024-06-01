import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserDetails } from '../../api/userData';
import UpdateUserForm from '../../components/forms/UpdateUserForm';

function EditUser() {
  const [editUser, setEditUser] = useState(null);
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {
    if (uid) {
      getUserDetails(uid)
        .then((userData) => {
          setEditUser(userData);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [uid]);

  if (!editUser) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <div className="h-screen">
      <div className="update-user-form"> Products </div>
      <UpdateUserForm userObj={editUser} />
    </div>
  );
}

export default EditUser;
