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
  AlertCircle,
  X,
    Eye,
    EyeOff,
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
  size = 30,
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
    case "alert-circle":
      return <AlertCircle {...props} />;
    case "x":
      return <X {...props} />;
    case "eye":
      return <Eye {...props} />;
    case "eye-off":
      return <EyeOff {...props} />;
    default:
      return null;
  }
};
