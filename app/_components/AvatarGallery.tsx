"use client";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { selectedPicAtom, userFormAtom, dialogVisable } from "../_store/users";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GallerySection from "./GallerySection";

const AvatarGallery = () => {
  const [selectedPic, setSelectedPic] = useAtom(selectedPicAtom);
  const [formData, setFormData] = useAtom(userFormAtom);
  const [showDialog, setShowDialog] = useAtom(dialogVisable);

  const handleSet = () => {
    if (selectedPic !== "") {
      setFormData((prev) => ({ ...prev, avatar: selectedPic }));
    }
    setShowDialog(false);
  };

  const handleReset = () => {
    setShowDialog(false);
    setSelectedPic("");
  };

  const handleOpenChange = () => {
    if (formData?.avatar === "") {
      handleReset();
    }
    setShowDialog(showDialog ? false : true);
  };

  return (
    <Dialog open={showDialog} onOpenChange={handleOpenChange}>
      <DialogTrigger>Select Picture</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select your Profile Pic</DialogTitle>
          <DialogClose asChild>Hello</DialogClose>
        </DialogHeader>
        <GallerySection />
        <DialogFooter>
          <Button onClick={handleSet}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarGallery;
