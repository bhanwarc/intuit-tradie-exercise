import * as React from "react";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

export type ItemProps = {
  title: string;
  path: string;
  icon: React.ReactElement<SvgIconProps>;
  info?: string;
  children?: ItemProps[];
};

export type MenuItemProps = {
  item: ItemProps;
  active: (path: string) => boolean;
};

export type MenuProps = {
  navConfig: ItemProps[];
};
