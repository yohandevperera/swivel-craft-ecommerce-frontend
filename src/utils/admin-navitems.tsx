import { NavBarItemType } from "../components/atoms/sidebar";
import CategoryIcon from "@mui/icons-material/Category";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReceiptIcon from "@mui/icons-material/Receipt";

export const NavItems: NavBarItemType[] = [
  {
    name: "Craft Categories Management",
    icon: <CategoryIcon />,
    ridirectRoute: "",
  },
  {
    name: "Craft Management",
    icon: <DesignServicesIcon />,
    ridirectRoute: "",
  },
  {
    name: "User Management",
    icon: <PeopleAltIcon />,
    ridirectRoute: "",
  },
  {
    name: "Order Management",
    icon: <ReceiptIcon />,
    ridirectRoute: "",
  },
];