import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "jotai";
import { useAtom } from "jotai";
import GallerySection from "../app/_components/GallerySection";
import { selectedPicAtom } from "../app/_store/users";
import { images } from "../app/_assests/images";

// Mock Atom Provider for Storybook
const MockProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setSelectedPic] = useAtom(selectedPicAtom);

  // Ensure the atom state is reset between story renders
  React.useEffect(() => {
    setSelectedPic(""); // Initialize with a blank selection
  }, [setSelectedPic]);

  return <Provider>{children}</Provider>;
};

const meta: Meta<typeof GallerySection> = {
  title: "Components/GallerySection",
  component: GallerySection,
  decorators: [
    (Story) => (
      <MockProvider>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <Story />
        </div>
      </MockProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GallerySection>;

export const Default: Story = {
  render: () => <GallerySection />,
};

export const WithSelectedImage: Story = {
  render: () => {
    const [, setSelectedPic] = useAtom(selectedPicAtom);

    React.useEffect(() => {
      setSelectedPic(images[4].src); // Pre-select the first image
    }, []);

    return <GallerySection />;
  },
};
