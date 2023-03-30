import { Outlet } from "react-router-dom";
import DashboardLayout from "layouts/Dashboard";

import { useCurrentState } from "context/global";

const BasicLayout = () => {
  const { globalState } = useCurrentState();
  const isLoggedin = globalState?.isLoggedin || false;

  if (isLoggedin) {
    return <DashboardLayout />;
  }

  return <Outlet />;
};

export default BasicLayout;
