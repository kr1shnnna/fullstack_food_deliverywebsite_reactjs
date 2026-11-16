import ProfileModal from "../../components/ProfileModal/ProfileModal";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  return (
    <main className="flex justify-center py-12">
      <ProfileModal embedded heading="Edit Profile" onClose={() => navigate("/profile")} />
    </main>
  );
};

export default EditProfile;
