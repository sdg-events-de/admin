import {
  green,
  orange,
  red,
  blue,
  grey as gray,
} from "@material-ui/core/colors";
import {
  CheckBold,
  CloseThick,
  Circle,
  LeadPencil,
  Percent,
  SkipNext,
} from "mdi-material-ui";

export const ACCEPT = {
  action: "accept",
  label: "Accept",
  color: green[600],
  icon: CheckBold,
};

export const REJECT = {
  action: "reject",
  label: "Reject",
  color: red[700],
  icon: CloseThick,
};

export const MODIFY = {
  action: "save",
  label: "Save",
  color: orange[600],
  icon: LeadPencil,
};

export const KEEP = {
  action: "keep",
  label: "Keep modification",
  color: blue[500],
  icon: CheckBold,
};

export const SKIP = {
  action: "skip",
  label: "Skip",
  color: gray[500],
  icon: SkipNext,
};

export const PENDING = {
  color: gray[500],
  icon: Circle,
};

export const IGNORE = {
  color: gray[300],
  icon: Percent,
};
