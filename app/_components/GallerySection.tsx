"use client";
import Image from "next/image";
import { useAtom } from "jotai";
import { selectedPicAtom } from "../_store/users";
import { images } from "../_assests/images";

const GallerySection = () => {
  const [selectedPic, setSelectedPic] = useAtom(selectedPicAtom);

  const handleSelectPic = (src: string) => {
    setSelectedPic(src);
  };

  return (
    <div className="flex flex-wrap justify-center my-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={`cursor-pointer border-4 border-solid rounded-lg p-1 ${
            selectedPic === image.src
              ? " border-green-400"
              : "border-transparent"
          }`}
          onClick={() => handleSelectPic(image.src)}
        >
          <Image
            src={image.src || "/images/defaultPic.png"}
            alt={image.alt}
            width={75}
            height={75}
            className="m-1 rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default GallerySection;
