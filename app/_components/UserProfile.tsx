"use client";
import { useAtomValue } from "jotai";
import { usersAtom } from "../_store/users";
import Image from "next/image";
import Link from "next/link";

interface UserProfileProps {
  id: string;
}

const UserProfile = ({ id }: UserProfileProps) => {
  const usersList = useAtomValue(usersAtom);
  const selectedUser = usersList.find((user) => user.id === id);

  return (
    <div className="my-4 border-4 border-slate-900 bg-slate-200 p-4 rounded-lg w-2/4">
      <div className="flex items-center">
        <Image
          className="rounded-full border-4 border-black mr-5"
          src={selectedUser?.avatar || "/images/defaultPic.png"}
          alt="profile pic image"
          height={100}
          width={100}
        />
        <h1 className="font-semibold text-3xl">{`${selectedUser?.firstName} ${selectedUser?.lastName}`}</h1>
      </div>
      <div className="body">
        <div className="info-container mt-4">
          <div className="line w-3/4 border-t border-slate-800 mx-auto my-5"></div>
          <div className="mb-3">
            <span className="font-semibold mr-1">Email:</span>
            <span>{selectedUser?.email}</span>
          </div>
          <div className="mb-3">
            <span className="font-semibold mr-1">Phone:</span>
            <span>{selectedUser?.phoneNumber}</span>
          </div>
        </div>

        <Link
          className="block text-center mt-10 font-semibold"
          href={`/edit-user/${selectedUser?.id}`}
        >
          Edit User Info
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
