import {
  User,
  CreditCard,
  Star,
  Rocket,
  Check,
  ArrowLeft,
  Upload,
  ChevronRight,
  Building,
  Microscope,
  Stethoscope,
} from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const Icon = ({
  name,
  className = "",
  size = 20,
  strokeWidth,
}: IconProps) => {
  const props = { className, size, strokeWidth };

  switch (name) {
    case "user":
      return <User {...props} />;
    case "id-card":
      return <CreditCard {...props} />;
    case "star":
      return <Star {...props} />;
    case "rocket":
      return <Rocket {...props} />;
    case "check":
      return <Check {...props} />;
    case "arrow-left":
      return <ArrowLeft {...props} />;
    case "upload":
      return <Upload {...props} />;
    case "chevron-right":
      return <ChevronRight {...props} />;
    case "building":
      return <Building {...props} />;
    case "researcher":
      return <Microscope {...props} />;
    case "medical":
      return <Stethoscope {...props} />;
    default:
      return null;
  }
};
