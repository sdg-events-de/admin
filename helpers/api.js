import urlJoin from "url-join";

// Get the full URL for the given endpoint
const endpoint = (path) => urlJoin(process.env.NEXT_PUBLIC_API_URL, path);

// Fetch the given URL and extract the JSON response within
const fetchJson = (url) => fetch(url).then((res) => res.json());

// Fetch all events
export const fetchEvents = () => fetchJson(endpoint("/events"));
