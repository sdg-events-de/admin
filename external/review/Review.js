import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Box, Divider } from "@material-ui/core";
import ReviewStepList from "./ReviewStepList";
import useSteps from "./useSteps";
import ReviewStep from "./ReviewStep";
import ReviewConfirmation from "./ReviewConfirmation";

const Review = observer(
  ({ steps: definitions, current, suggestion, revision, onSubmit }) => {
    const steps = useSteps({ definitions, current, suggestion, revision });

    const [activeStep, setActiveStep] = useState(
      steps.find((step) => step.needsReview)
    );

    const isReviewActive = activeStep == null;
    const continueToReview = () => setActiveStep(null);
    const continueToNextStep = () => {
      const nextStep = steps
        .slice(steps.indexOf(activeStep) + 1)
        .find((step) => step.needsReview);

      setActiveStep(nextStep);
    };

    return (
      <Box display="flex" flexDirection="row" height={1}>
        <Box width={240} minWidth={240}>
          <ReviewStepList
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            continueToReview={continueToReview}
            isReviewActive={isReviewActive}
          />
        </Box>
        <Divider orientation="vertical" />
        {activeStep && (
          <ReviewStep
            step={activeStep}
            continueToNextStep={continueToNextStep}
          />
        )}
        {isReviewActive && (
          <ReviewConfirmation steps={steps} onSubmit={onSubmit} />
        )}
      </Box>
    );
  }
);

export default Review;
