import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContextDefinition";

const Profile = () => {
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${url}/api/user/profile`, {
          headers: { token },
        });

        if (!response.data.success) {
          setError(response.data.message);
          return;
        }

        setProfile(response.data.data);
      } catch {
        setError("Unable to load your profile.");
      }
    };

    fetchProfile();
  }, [token, url]);

  if (error) {
    return <p className="py-16 text-center text-red-600">{error}</p>;
  }

  if (!profile) {
    return <p className="py-16 text-center text-[#777]">Loading profile...</p>;
  }

  return (
    <main className="mx-auto w-full max-w-[760px] py-12">
      <section className="rounded-xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.08)] sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-[#eee] pb-5">
          <div>
            <h1 className="text-3xl font-semibold text-[#333]">My Profile</h1>
            <p className="mt-1 text-[#777]">View your personal information</p>
          </div>
          <button
            type="button"
            className="cursor-pointer rounded bg-[tomato] px-4 py-2.5 font-medium text-white hover:opacity-90"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-[#777]">Full name</p>
            <p className="mt-1 font-medium">{profile.name || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-[#777]">Email</p>
            <p className="mt-1 font-medium">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm text-[#777]">Gender</p>
            <p className="mt-1 font-medium">{profile.gender || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-[#777]">Contact number</p>
            <p className="mt-1 font-medium">{profile.phone || "Not provided"}</p>
          </div>
        </div>

        <h2 className="mb-4 mt-8 border-b border-[#eee] pb-3 text-xl font-medium">Address</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {Object.entries(profile.address || {}).map(([field, value]) => (
            <div key={field}>
              <p className="text-sm capitalize text-[#777]">{field}</p>
              <p className="mt-1 font-medium">{value || "Not provided"}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Profile;
