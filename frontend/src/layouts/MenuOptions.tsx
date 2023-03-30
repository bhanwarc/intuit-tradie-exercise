import { ItemProps } from "typings/Menu";
import pages from "enums/pages";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EngineeringIcon from "@mui/icons-material/Engineering";
import GradingIcon from "@mui/icons-material/Grading";

const MenuOptions = (isClient: boolean) => {
  let menuOptions: ItemProps[] = [];

  if (isClient) {
    menuOptions = [
      {
        title: "Profile",
        path: pages.CLIENT_PROFILE,
        icon: <AccountCircleIcon />,
      },
      {
        title: "My Projects",
        path: pages.CLIENT_JOBS,
        icon: <EngineeringIcon />,
      },
    ];
  } else {
    menuOptions = [
      {
        title: "Profile",
        path: pages.TALENT_PROFILE,
        icon: <AccountCircleIcon />,
      },
      {
        title: "Projects",
        path: pages.JOBS,
        icon: <EngineeringIcon />,
      },
      {
        title: "My Bids",
        path: pages.MY_BIDS,
        icon: <GradingIcon />,
      },
    ];
  }

  return menuOptions;
};

export default MenuOptions;
