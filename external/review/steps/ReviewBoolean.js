import { observer } from "mobx-react-lite";
import { Box, Divider } from "@material-ui/core";
import ReviewCheckbox from "../components/ReviewCheckbox";

import ReviewOptionString from "../components/ReviewOptionString";

const ReviewBoolean = observer(({ step }) => (
  <>
    <Box marginX={4} marginY={3}>
      <ReviewCheckbox
        label={step.label}
        value={step.value}
        onChange={(event) => step.setValue(event.target.checked)}
        color={step.getColor(step.value)}
      />
    </Box>
    <Divider />
    {step.options.map((option) => (
      <ReviewOptionString
        key={`${step.field}-${option.label}`}
        label={option.label}
        currentValue={step.value}
        optionValue={option.value}
        color={step.getColor(option.value)}
        onSelect={() => step.setValue(option.value)}
        disableDiff
      />
    ))}
  </>
));

export { ReviewBoolean };
