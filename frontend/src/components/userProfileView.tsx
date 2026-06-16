import { useState, type MouseEvent } from "react";

interface User {
  id: number;
  email: string;
  name: string | null;
  gender?: string | null;
  description?: string | null;
}

interface ProfileViewProps {
  user: User | undefined;
  onClose: () => void;
}

const ProfileView = ({ user, onClose }: ProfileViewProps) => {
  console.log(user);
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Change password request");

    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordSection(false);
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={handleModalClick}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Profile</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-medium block">Email</label>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          <div>
            <label className="font-medium block">Username</label>
            <p className="text-gray-600">{user?.name ?? "Not set"}</p>
          </div>

          <div>
            <label className="font-medium block">Gender</label>
            <p className="text-gray-600">{user?.gender ?? "Not specified"}</p>
          </div>

          <div>
            <label className="font-medium block">Description</label>
            <p className="text-gray-600">
              {user?.description ?? "No description"}
            </p>
          </div>

          <div>
            <label className="font-medium block mb-2">Profile Picture</label>

            <input type="file" accept="image/*" />
          </div>

          <hr />

          <button
            onClick={() => setShowPasswordSection((current) => !current)}
            className="bg-orange-500 text-white px-4 py-2 rounded-md"
          >
            Change Password
          </button>

          {showPasswordSection && (
            <div className="space-y-3 mt-4">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded-md p-2"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-md p-2"
              />

              <button
                onClick={handlePasswordChange}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
