import { observer } from "mobx-react-lite";
import { Box } from "@material-ui/core";
import ReviewCheckbox from "../components/ReviewCheckbox";

const ConfirmBoolean = observer(({ step }) => (
  <Box marginY={1}>
    <ReviewCheckbox
      value={step.finalValue}
      color={step.status.color}
      label={step.label}
      disabled
    />
  </Box>
));

export { ConfirmBoolean };
