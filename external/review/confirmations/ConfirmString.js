import { observer } from "mobx-react-lite";
import { Box } from "@material-ui/core";
import ReviewTextField from "../components/ReviewTextField";

const ConfirmString = observer(({ step }) => (
  <Box marginY={1}>
    <ReviewTextField
      value={step.finalValue}
      color={step.status.color}
      label={step.label}
      disabled
    />
  </Box>
));

export { ConfirmString };
