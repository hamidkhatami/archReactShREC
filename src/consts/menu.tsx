import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

export const menuItems = [
  {
    text: "داشبورد",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    text: "کاربران",
    icon: <PeopleIcon />,
    children: [
      {
        text: "لیست کاربران",
        icon: <PersonIcon />,
        path: "/users/list",
      },
      {
        text: "افزودن کاربر",
        icon: <AddIcon />,
        path: "/users/create",
      },
    ],
  },
  {
    text: "گزارشات",
    icon: <BarChartIcon />,
    children: [
      {
        text: "گزارش فروش",
        icon: <BarChartIcon />,
        path: "/reports/sales",
      },
    ],
  },
];
