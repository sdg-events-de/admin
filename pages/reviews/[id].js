import { useRouter } from "next/router";
import { Box, Button, Card, Typography } from "@material-ui/core";
import FullScreenLayout from "layouts/FullScreenLayout";
import Review from "external/review/Review";
import { ReviewString, ReviewText, ReviewBoolean } from "external/review/steps";
import {
  ConfirmString,
  ConfirmText,
  ConfirmBoolean,
} from "external/review/confirmations";
import { submitEventReview } from "helpers/api";

const REVIEW_STEPS = [
  {
    field: "url",
    label: "URL",
    ReviewComponent: ReviewString,
    ConfirmationComponent: ConfirmString,
  },
  {
    field: "status",
    label: "Status",
    ReviewComponent: ReviewString,
    ConfirmationComponent: ConfirmString,
  },
  {
    field: "status_note",
    label: "Status note",
    ReviewComponent: ReviewString,
    ConfirmationComponent: ConfirmString,
  },
  {
    field: "title",
    label: "Title",
    ReviewComponent: ReviewString,
    ConfirmationComponent: ConfirmString,
  },
  {
    field: "summary",
    label: "Summary",
    ReviewComponent: ReviewString,
    ConfirmationComponent: ConfirmString,
  },
  {
    field: "description",
    label: "Description",
    ReviewComponent: ReviewText,
    ConfirmationComponent: ConfirmText,
  },
  {
    field: "starts_at",
    label: "Starts at",
    ReviewComponent: ReviewString,
    ConfirmationComponent: ConfirmString,
  },
  {
    field: "ends_at",
    label: "Ends at",
    ReviewComponent: ReviewString,
    ConfirmationComponent: ConfirmString,
  },
  {
    field: "address",
    label: "Address",
    ReviewComponent: ReviewString,
    ConfirmationComponent: ConfirmString,
  },
  {
    field: "is_online",
    label: "Is Online",
    ReviewComponent: ReviewBoolean,
    ConfirmationComponent: ConfirmBoolean,
  },
];

const ReviewEventPage = ({ event, suggestion, revision }) => {
  const router = useRouter();

  const submitReview = async (changes) => {
    const res = await submitEventReview({
      id: event.id,
      review: Object.fromEntries(
        changes.map((change) => [change.field, change.value])
      ),
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw `An error has occurred: ${error.message}`;
    }

    // Navigate to back to review page
    router.push("/reviews");
  };

  return (
    <FullScreenLayout>
      <Typography variant="h1">Review Event #{event.id}</Typography>
      <Box marginBottom={1}>
        <Button
          href={event.url}
          target="_blank"
          size="small"
          variant="outlined"
        >
          Visit Website
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" flexGrow={1} clone>
        <Card>
          <Review
            steps={REVIEW_STEPS}
            current={event}
            suggestion={suggestion}
            revision={revision}
            onSubmit={submitReview}
          />
        </Card>
      </Box>
    </FullScreenLayout>
  );
};

import { fetchEventReview } from "helpers/api";

ReviewEventPage.getInitialProps = async ({ query }) => {
  const event = await fetchEventReview({ id: query.id });

  return { event, suggestion: event.suggestion, revision: event.revision };
};

export default ReviewEventPage;
