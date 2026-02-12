import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import index from "@/pages/dashboard/index";
import MakeReport from "@/pages/dashboard/MakeReport";
import { t } from "i18next";
import { MenuItemType } from "@/types/menuItems";
import Login from "@/pages/Login";
import FeeSetting from "@/pages/fee/FeeSetting";
import SettingsIcon from '@mui/icons-material/Settings';



export const menuItems: MenuItemType[] = [
  {
    title: t("menus.dashboard"),
    icon: <DashboardIcon />,
    path: "/dashboard",
    component: index,
  },
  {
    title: t("menus.uploadFile"),
    icon: <PersonIcon />,
    path: "/makeReport",
    component: MakeReport,
  },
 {
    title: "",
    icon: <></>,
    path: "/login",
    component: Login,
  },
  {
    title: t("menus.feeSetting"),
    icon: <SettingsIcon  />,
    path: "/FeeSetting",
    component: FeeSetting,
  },
  
];
