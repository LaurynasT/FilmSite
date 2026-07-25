import React, { useState } from "react";
import Avatar from "../Icons/Avatar.png";
import UpdateUsernameModal from "../dashboard/UpdateUsernameModal";
import type { User } from "../../interfaces/user/User";

type Props = {
  user: User;
}
const UserProfile = ({ user }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-row items-center bg-gray-800 p-6 rounded flex-1">
      <img src={Avatar} alt={user.name} className="w-20 h-20 rounded-full" />
      <div className="ml-6 flex flex-col gap-1">
        <p className="text-gray-300 text-sm font-bold">Username</p>
        <p className="text-white text-lg font-bold">{user.name}</p>
        <div className="h-px bg-gray-600 my-2" />
        <p className="text-gray-300 text-sm font-bold">Email</p>
        <p className="text-gray-300 text-sm">{user.email}</p>
        <button
          onClick={() => setModalOpen(true)}
          className="mt-3 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded transition"
        >
          Change Username
        </button>
      </div>

      {modalOpen && <UpdateUsernameModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default UserProfile;
