"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";
import { initialUserFormData, userFormAtom } from "../_store/users";
import { useSetAtom } from "jotai";

interface BackButtonProps {
  isOnForm?: boolean;
}

const BackButton = ({ isOnForm = true }: BackButtonProps) => {
  const setFormData = useSetAtom(userFormAtom);
  const router = useRouter();

  const handleOnGoBack = () => {
    if (isOnForm) {
      setFormData(initialUserFormData);
    }
    router.back();
  };

  return (
    <Button className="flex items-center mr-2" onClick={handleOnGoBack}>
      <ArrowLeftCircle className="mr-1" /> Go Back
    </Button>
  );
};

export default BackButton;
