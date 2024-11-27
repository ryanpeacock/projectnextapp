"use client";

import { useAtom, atom } from "jotai";
import { usersAtom } from "../_store/users";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const alertOpenState = atom(false);

interface DeleteModalProps {
  id: string;
}

const DeleteModal = ({ id }: DeleteModalProps) => {
  const route = useRouter();
  const [usersList, setUsersList] = useAtom(usersAtom);
  const selectedUser = usersList.find((user) => user.id === id);
  const [isAlertOpen, setIsAlertOpen] = useAtom(alertOpenState);

  const toggleOpen = () => {
    setIsAlertOpen(!isAlertOpen);
  };

  const handleOnDelete = () => {
    if (selectedUser) {
      const newUsersList = usersList.filter((user) => {
        return user.id !== id;
      });
      setUsersList(newUsersList);
    }
    route.push("/");
    toggleOpen();
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={toggleOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete User</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleOnDelete} variant="destructive">
            Delete User
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
