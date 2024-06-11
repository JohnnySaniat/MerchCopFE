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

  const handleBack = () => {
    router.push('/admin'); // Adjust the route as needed
  };

  if (!editUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Back to Admin"
        className="back-button"
      >
        <img
          src="https://i.ibb.co/N3MSnrR/arrow-carrot-left.png"
          alt="Back"
          className="back-image pt-16 mt-8"
        />
      </button>
      <div className="update-user-form text-white"> Edit Profile </div>
      <UpdateUserForm userObj={editUser} />
    </div>
  );
}

export default EditUser;
