import { NavBarItemType } from "../components/atoms/sidebar";
import CategoryIcon from "@mui/icons-material/Category";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HomeIcon from "@mui/icons-material/Home";

/**
 * Usage - This component act as a nav items array which will be used in the admin side bar.
 *
 * Description - The component is build based on custom components
 *
 */

export const NavItems: NavBarItemType[] = [
  {
    name: "Home",
    icon: <HomeIcon />,
    ridirectRoute: "/admin",
  },
  {
    name: "Craft Categories Management",
    icon: <CategoryIcon />,
    ridirectRoute: "/admin/craft-category-management/",
  },
  {
    name: "Craft Management",
    icon: <DesignServicesIcon />,
    ridirectRoute: "/admin/craft-management/",
  },
  {
    name: "User Management",
    icon: <PeopleAltIcon />,
    ridirectRoute: "/admin/user-management",
  },
  {
    name: "Order Management",
    icon: <ReceiptIcon />,
    ridirectRoute: "/admin/order-management",
  },
];
