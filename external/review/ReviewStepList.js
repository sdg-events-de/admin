import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const ReviewStepListItem = ({
  label,
  isActive,
  onClick = null,
  Icon = () => null,
  color,
}) => {
  return (
    <Box
      bgcolor={isActive ? "primary.main" : null}
      color={isActive ? "primary.contrastText" : null}
      clone
    >
      <ListItem button={!isActive} onClick={onClick}>
        <ListItemIcon style={{ minWidth: 40 }}>
          <Box color={isActive ? "primary.contrastText" : color} clone>
            <Icon />
          </Box>
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    </Box>
  );
};

const ReviewStepList = ({
  steps,
  activeStep,
  setActiveStep,
  isReviewActive,
  continueToReview,
}) => (
  <List>
    {steps.map((step) => (
      <ReviewStepListItem
        key={step.field}
        label={step.label}
        Icon={step.status.icon}
        color={step.status.iconColor || step.status.color}
        isActive={activeStep === step}
        onClick={() => setActiveStep(step)}
      />
    ))}
    <Box marginY={1}>
      <Divider />
    </Box>
    <ReviewStepListItem
      label="Review"
      isActive={isReviewActive}
      onClick={continueToReview}
    />
  </List>
);

export default ReviewStepList;
