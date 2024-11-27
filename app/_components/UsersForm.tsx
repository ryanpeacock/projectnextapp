"use client";

import { useAtom, useSetAtom } from "jotai";
import {
  userFormAtom,
  usersAtom,
  formErrorsAtom,
  initialUserFormData,
  selectedPicAtom,
} from "../_store/users";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import AvatarSelector from "./AvatarSelector";
import { useRouter } from "next/navigation";
import { User, UserFormData } from "../_types/users";
import { useEffect } from "react";

export const userFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(
      /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,4}){1,3}$/,
      "Phone number must be in a valid format, e.g., +123 456 7890, (123) 456-7890, 123-456-7890"
    ),
});

interface UsersFormProps {
  editUser?: string;
}

const UsersForm = ({ editUser }: UsersFormProps) => {
  const [formData, setFormData] = useAtom(userFormAtom);
  const [usersData, setUsersData] = useAtom(usersAtom);
  const setSelectedPic = useSetAtom(selectedPicAtom);
  const [formErrors, setFormErrors] = useAtom(formErrorsAtom);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const result = userFormSchema.safeParse(formData);
    if (!result.success) {
      // Map errors to a key-value format
      const errors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          errors[error.path[0]] = error.message;
        }
      });
      setFormErrors(errors);
      return;
    }

    // Clear errors on successful validation
    setFormErrors({});
    if (editUser) {
      const newUsersData = usersData.map((user) => {
        if (user.id === editUser) {
          return {
            id: user.id,
            ...formData,
          };
        }
        return {
          ...user,
        };
      });
      setUsersData(newUsersData);
    } else {
      const newUser = {
        id: uuidv4(),
        ...formData,
      };
      setUsersData((prev) => [newUser, ...prev]);
    }
    setFormData(initialUserFormData);
    setSelectedPic("");
    router.push("/");
  };

  useEffect(() => {
    if (editUser) {
      const selectedUser: User | undefined = usersData.find(
        (user) => user.id === editUser
      );
      const userData: UserFormData = {
        avatar: selectedUser?.avatar || "/images/defaultPic.jpg",
        firstName: selectedUser?.firstName || "",
        lastName: selectedUser?.lastName || "",
        email: selectedUser?.email || "",
        phoneNumber: selectedUser?.phoneNumber || "",
      };
      setFormData(userData);
    }
  }, [setFormData, editUser]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto my-4">
      <div className="group flex items-center">
        <div className="w-full mr-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {formErrors.firstName && (
            <p className="text-red-500 text-sm">{formErrors.firstName}</p>
          )}
        </div>
        <div className="w-full">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {formErrors.lastName && (
            <p className="text-red-500 text-sm">{formErrors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm">{formErrors.email}</p>
        )}
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {formErrors.phoneNumber && (
          <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>
        )}
      </div>
      <AvatarSelector />
      <Button className="w-full" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default UsersForm;
