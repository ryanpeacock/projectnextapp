"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usersAtom } from "../_store/users";
import { UsersArray } from "../_types/users";

interface UsersTableProps {
  users: UsersArray;
}

const UsersTable = ({ users }: UsersTableProps) => {
  const router = useRouter();
  const [usersList, setUsersList] = useAtom(usersAtom);

  useEffect(() => {
    if (users && usersList.length === 0) {
      setUsersList((prev) => [...prev, ...users]);
    }
  }, [setUsersList, users, usersList.length]);

  const handleNaviate = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Avatar</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersList?.map((user) => {
          return (
            <TableRow
              className="cursor-pointer"
              key={user.id}
              onClick={() => handleNaviate(user.id)}
            >
              <TableCell>
                <Image
                  src={user.avatar || "/images/defaultPic.png"}
                  alt="users avatar image"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
