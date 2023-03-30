import { AlertColor } from "@mui/material";

export type ObjectType = { [key: any]: any };

export type GlobalState = {
  isLoggedin: boolean;
  isClient: boolean;
};

export type AlertType = { show: boolean; type: AlertColor; text: string };
