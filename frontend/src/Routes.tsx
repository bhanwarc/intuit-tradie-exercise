import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Home from "./pages/home/home";
import ClientAuth from "./pages/client/auth";
import TalenAuth from "./pages/talent/auth";
import ClientJobs from "./pages/jobs/clientJobs";
import Jobs from "./pages/jobs/jobs";
import ClientProfile from "./pages/profile/client";
import TalentProfile from "./pages/profile/talent";
import CreateJob from "./pages/jobs/create";
import JobDetails from "components/Job/JobDetail";
import TalentBids from "components/Bid/TalentBids";
import JobBids from "components/Bid/JobBids";
import Layout from "./layouts/Layout";

import pages from "enums/pages";

import { useCurrentState } from "context/global";

const Router = () => {
  const { globalState } = useCurrentState();

  const isLoggedin = globalState?.isLoggedin || false;
  const isClient = globalState?.isClient || false;

  let routes: RouteObject[] = [
    {
      path: pages.HOME_PAGE,
      element: <Home />,
    },
    {
      path: pages.CLIENT_AUTH,
      element:
        isLoggedin && isClient ? <Navigate to={pages.CLIENT_JOBS} /> : <ClientAuth />,
    },
    {
      path: pages.TALENT_AUTH,
      element: isLoggedin && !isClient ? <Navigate to={pages.JOBS} /> : <TalenAuth />,
    },
  ];

  if (isLoggedin) {
    if (isClient) {
      routes.push(
        ...[
          {
            path: pages.HOME_PAGE,
            element: <Layout />,
            children: [
              {
                path: pages.CLIENT_PROFILE,
                element: <ClientProfile />,
              },
              {
                path: pages.CLIENT_JOBS,
                element: <ClientJobs />,
              },
              {
                path: pages.CLIENT_JOB,
                element: <CreateJob />,
              },
              {
                path: pages.JOB_BIDS,
                element: <JobBids />,
              },
            ],
          },
        ],
      );
    } else {
      routes.push(
        ...[
          {
            path: pages.HOME_PAGE,
            element: <Layout />,
            children: [
              {
                path: pages.JOBS,
                element: <Jobs />,
              },
              {
                path: pages.TALENT_PROFILE,
                element: <TalentProfile />,
              },
              {
                path: pages.JOB,
                element: <JobDetails />,
              },
              {
                path: pages.MY_BIDS,
                element: <TalentBids />,
              },
            ],
          },
        ],
      );
    }
  }

  return useRoutes(routes);
};

export default Router;
