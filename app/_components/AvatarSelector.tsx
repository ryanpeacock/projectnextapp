"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { userFormAtom } from "../_store/users";

import AvatarGallery from "./AvatarGallery";
import { X } from "lucide-react";

const AvatarSelector = () => {
  const [formData, setFormData] = useAtom(userFormAtom);
  const imgSrc = formData?.avatar || "/images/defaultPic.png";

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, avatar: "" }));
  };
  return (
    <div>
      <span className="text-md mb-5">Avatar: </span>
      <div className="flex items-center w-1/2  mx-auto">
        <div className="image-container relative">
          {formData?.avatar !== "" ? (
            <div
              onClick={handleRemoveImage}
              className="absolute top-0 right-3 border border-black bg-red-400 h-6 w-6 rounded-full flex justify-center items-center cursor-pointer"
            >
              <X size={20} className=" text-white font-bold" />
            </div>
          ) : null}
          <Image
            src={imgSrc}
            alt="Avatar picture"
            width={75}
            height={75}
            className="rounded-full mr-4 border-2 border-black object-cover"
          />
        </div>
        <AvatarGallery />
      </div>
    </div>
  );
};

export default AvatarSelector;
