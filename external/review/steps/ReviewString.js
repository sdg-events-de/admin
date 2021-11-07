import { observer } from "mobx-react-lite";
import { Box, Divider } from "@material-ui/core";
import ReviewTextField from "../components/ReviewTextField";
import ReviewOptionString from "../components/ReviewOptionString";

const ReviewString = observer(({ step }) => (
  <>
    <Box marginX={4} marginY={3}>
      <ReviewTextField
        label={step.label}
        value={step.value}
        onChange={(event) => step.setValue(event.target.value)}
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
      />
    ))}
  </>
));

export { ReviewString };
