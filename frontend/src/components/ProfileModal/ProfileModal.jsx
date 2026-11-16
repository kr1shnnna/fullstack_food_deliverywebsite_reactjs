import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContextDefinition";

const emptyAddress = {
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
};

const ProfileModal = ({ onClose, embedded = false, heading = "Edit Profile" }) => {
  const { url, token } = useContext(StoreContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    address: emptyAddress,
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${url}/api/user/profile`, {
          headers: { token },
        });

        if (!response.data.success) {
          setStatus({ type: "error", message: response.data.message });
          return;
        }

        setProfile({
          name: response.data.data.name || "",
          email: response.data.data.email || "",
          gender: response.data.data.gender || "",
          phone: response.data.data.phone || "",
          address: { ...emptyAddress, ...(response.data.data.address || {}) },
        });
      } catch {
        setStatus({ type: "error", message: "Unable to load your profile." });
      }
    };

    fetchProfile();
  }, [token, url]);

  const onChange = (event) => {
    const { name, value } = event.target;

    if (name in emptyAddress) {
      setProfile((current) => ({
        ...current,
        address: { ...current.address, [name]: value },
      }));
      return;
    }

    setProfile((current) => ({ ...current, [name]: value }));
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.put(`${url}/api/user/profile`, profile, {
        headers: { token },
      });

      if (!response.data.success) {
        setStatus({ type: "error", message: response.data.message });
        return;
      }

      setStatus({ type: "success", message: "Profile updated successfully." });
    } catch {
      setStatus({ type: "error", message: "Unable to update your profile." });
    }
  };

  const inputClass =
    "w-full rounded border border-[#c9c9c9] px-3 py-2.5 text-sm outline-none focus:border-[tomato]";

  const form = (
      <form
        onSubmit={saveProfile}
        className={`w-full max-w-[620px] overflow-y-auto rounded-xl bg-white p-6 text-[#333] shadow-xl sm:p-8 ${embedded ? "" : "max-h-[90vh]"}`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{heading}</h2>
            <p className="mt-1 text-sm text-[#777]">Manage your personal information</p>
          </div>
          <button
            type="button"
            className="cursor-pointer border-none bg-transparent text-3xl leading-none text-[#555]"
            onClick={onClose}
            aria-label="Close profile"
          >
            ×
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Full name
            <input className={`${inputClass} mt-1.5`} name="name" value={profile.name} onChange={onChange} required />
          </label>
          <label className="text-sm font-medium">
            Email
            <input className={`${inputClass} mt-1.5 bg-[#f5f5f5]`} value={profile.email} readOnly />
          </label>
          <label className="text-sm font-medium">
            Gender
            <select className={`${inputClass} mt-1.5 bg-white`} name="gender" value={profile.gender} onChange={onChange}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>
          <label className="text-sm font-medium">
            Contact number
            <input className={`${inputClass} mt-1.5`} name="phone" type="tel" value={profile.phone} onChange={onChange} placeholder="Your phone number" />
          </label>
        </div>

        <h3 className="mb-3 mt-6 text-lg font-medium">Address</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium sm:col-span-2">
            Street
            <input className={`${inputClass} mt-1.5`} name="street" value={profile.address.street} onChange={onChange} />
          </label>
          <label className="text-sm font-medium">
            City
            <input className={`${inputClass} mt-1.5`} name="city" value={profile.address.city} onChange={onChange} />
          </label>
          <label className="text-sm font-medium">
            State
            <input className={`${inputClass} mt-1.5`} name="state" value={profile.address.state} onChange={onChange} />
          </label>
          <label className="text-sm font-medium">
            Zip code
            <input className={`${inputClass} mt-1.5`} name="zipcode" value={profile.address.zipcode} onChange={onChange} />
          </label>
          <label className="text-sm font-medium">
            Country
            <input className={`${inputClass} mt-1.5`} name="country" value={profile.address.country} onChange={onChange} />
          </label>
        </div>

        {status.message && (
          <p className={`mt-4 text-sm ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>
            {status.message}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className="cursor-pointer rounded border border-[#ccc] bg-white px-5 py-2.5 text-[#555]" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="cursor-pointer rounded bg-[tomato] px-5 py-2.5 font-medium text-white hover:opacity-90">
            Save Changes
          </button>
        </div>
      </form>
  );

  if (embedded) {
    return form;
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 px-4 py-6">
      {form}
    </div>
  );
};

export default ProfileModal;
