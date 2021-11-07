import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Box, Divider, Typography } from "@material-ui/core";
import LoadingButton from "./components/LoadingButton";

const ReviewConfirmation = observer(({ onSubmit, steps }) => {
  const [loading, setLoading] = useState(false);

  const changes = steps
    .filter((step) => step.isCommitted)
    .map((step) => ({
      field: step.field,
      value: step.committed,
    }));

  return (
    <Box flexGrow={1}>
      <Box display="flex" flexDirection="column" height={1}>
        <Box flexGrow="1" style={{ overflowY: "auto" }}>
          <Box padding={4}>
            <Typography variant="h2" gutterBottom>
              Review
            </Typography>
            {steps.map((step) => (
              <step.ConfirmationComponent step={step} />
            ))}
          </Box>
        </Box>
        <Divider />
        <Box paddingX={4} paddingY={2} display="flex" justifyContent="flex-end">
          <Box marginLeft={1} clone>
            <LoadingButton
              color="primary"
              variant="contained"
              loading={loading}
              onClick={() => {
                setLoading(true);
                Promise.resolve(onSubmit(changes))
                  .catch((message) => alert(message))
                  .finally(() => setLoading(false));
              }}
            >
              Confirm
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default ReviewConfirmation;
