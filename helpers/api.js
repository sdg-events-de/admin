import urlJoin from "url-join";

// Get the full URL for the given endpoint
const endpoint = (path) => urlJoin(process.env.NEXT_PUBLIC_API_URL, path);

// Fetch the given URL and extract the JSON response within
const fetchJson = (url) => fetch(url).then((res) => res.json());

// Fetch all events
export const fetchEvents = () => fetchJson(endpoint("/events"));

// Fetch event for review
export const fetchEventReview = ({ id }) =>
  fetchJson(endpoint(`/events/review/${id}`));

// Submit review for event
export const submitEventReview = ({ id, review }) =>
  fetch(endpoint(`/events/review/${id}`), {
    body: JSON.stringify(review),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  });

// Fetch all events that need to be reviewed
export const fetchEventsNeedingReview = () =>
  fetchJson(endpoint("/events/review"));

// Fetch all logs
export const fetchLogs = () => fetchJson(endpoint("/logs"));

// Fetch one log
export const fetchLog = ({ id }) => fetchJson(endpoint(`/logs/${id}`));
