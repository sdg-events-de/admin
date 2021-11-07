import { observer } from "mobx-react-lite";
import { Box, Typography, Divider } from "@material-ui/core";
import ReviewActions from "./ReviewActions";

const ReviewStep = observer(({ step, continueToNextStep }) => (
  <Box flexGrow={1}>
    <Box display="flex" flexDirection="column" height={1}>
      <Box flexGrow="1" style={{ overflowY: "auto" }}>
        <Box marginX={4} marginTop={4} marginBottom={3}>
          <Typography variant="h2" gutterBottom>
            {step.label}
          </Typography>
        </Box>
        <step.ReviewComponent step={step} />
      </Box>
      <Divider />
      <ReviewActions step={step} continueToNextStep={continueToNextStep} />
    </Box>
  </Box>
));

export default ReviewStep;
