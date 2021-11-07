import { observer } from "mobx-react-lite";
import { Box, Button } from "@material-ui/core";

const ReviewActions = observer(({ step, continueToNextStep }) => (
  <Box paddingX={4} paddingY={2} display="flex" justifyContent="flex-end">
    {step.getActions(step.value).map(({ label, color, action }) => (
      <Box key={action} marginLeft={1}>
        <Button
          color="primary"
          variant="contained"
          style={{ background: color }}
          onClick={() => {
            step[action]();
            continueToNextStep();
          }}
        >
          {label}
        </Button>
      </Box>
    ))}
  </Box>
));

export default ReviewActions;
