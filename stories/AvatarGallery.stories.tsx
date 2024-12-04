import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Provider, useAtom } from "jotai";
import AvatarGallery from "../app/_components/AvatarGallery";
import {
  selectedPicAtom,
  userFormAtom,
  dialogVisable,
} from "../app/_store/users";
import { images } from "../app/_assests/images";

// Mock Provider for Jotai State Management
const MockProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPic, setSelectedPic] = useAtom(selectedPicAtom);
  const [, setFormData] = useAtom(userFormAtom);
  const [, setShowDialog] = useAtom(dialogVisable);

  // Reset state between stories
  React.useEffect(() => {
    setSelectedPic(""); // Clear selected picture
    setFormData((prev) => ({
      ...prev,
      avatar: selectedPic,
    }));
    setShowDialog(false); // Ensure dialog is closed
  }, [selectedPic, setSelectedPic, setFormData, setShowDialog]);

  return <Provider>{children}</Provider>;
};

const meta: Meta<typeof AvatarGallery> = {
  title: "Components/AvatarGallery",
  component: AvatarGallery,
  decorators: [
    (Story) => (
      <MockProvider>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Story />
        </div>
      </MockProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AvatarGallery>;

export const Default: Story = {
  render: () => <AvatarGallery />,
};

export const DialogOpen: Story = {
  render: () => {
    const [, setShowDialog] = useAtom(dialogVisable);

    React.useEffect(() => {
      setShowDialog(true); // Open the dialog by default
    }, []);

    return <AvatarGallery />;
  },
};

export const WithSelectedPicture: Story = {
  render: () => {
    const [, setSelectedPic] = useAtom(selectedPicAtom);
    const [, setShowDialog] = useAtom(dialogVisable);

    React.useEffect(() => {
      setSelectedPic(images[8].src); // Preselect a picture
      setShowDialog(true); // Open the dialog
    }, []);

    return <AvatarGallery />;
  },
};
