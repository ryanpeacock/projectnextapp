import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Cat } from "lucide-react";

// Default export to configure the story
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered", // Center the component in the canvas
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The visual style of the button.",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button.",
    },
    asChild: {
      control: "boolean",
      description:
        "Render the button as a custom component (e.g., using Radix Slot).",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button.",
    },
    children: {
      control: "text",
      description: "The content inside the button.",
    },
  },
  args: {
    variant: "default",
    size: "default",
    children: "Button Text",
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories
export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Default Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="icon" aria-label="Icon Button">
        <Cat />
      </Button>
    </div>
  ),
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <a href="#">Link Styled as Button</a>,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};
