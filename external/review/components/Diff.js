import { useEffect, useState, useRef } from "react";
import { green, red, grey as gray } from "@material-ui/core/colors";
import styled from "styled-components";
import { diffWordsWithSpace, diffChars } from "diff";

const Plain = styled.span`
  color: ${gray[700]};
`;

const Addition = styled.span`
  color: ${green[700]};
  background-color: ${green[100]};
`;

const Removal = styled.span`
  color: ${red[700]};
  background-color: ${red[100]};
  text-decoration: line-through;
`;

const safelyClearTimeout = (timeout) => {
  if (timeout) clearTimeout(timeout);
};

let uniqueKey = 0;
function getUniqueKey() {
  uniqueKey += 1;
  return uniqueKey;
}

const Diff = ({ before, after }) => {
  const timeoutRef = useRef(null);
  const [parts, setParts] = useState(null);

  if (before == null) before = "";
  if (after == null) after = "";

  useEffect(() => {
    safelyClearTimeout(timeoutRef.current);

    // For short text, immediately calculate the text diff
    if (before.length < 100 && after.length < 100) {
      setParts(diffChars(before, after));
    }
    // For longer text, calculate text diff after 1 second to keep application
    // running smooothly
    else {
      timeoutRef.current = setTimeout(
        () => setParts(diffWordsWithSpace(before, after)),
        500
      );
    }

    return () => safelyClearTimeout(timeoutRef.current);
  }, [before, after]);

  if (parts === null)
    return <Plain style={{ fontStyle: "italic" }}>Loading...</Plain>;

  return (
    <>
      {parts.length === 1 && parts[0].value === "" && (
        <Plain style={{ fontStyle: "italic" }}>No value</Plain>
      )}
      {/* {parts.map((part) => {
        const key = getUniqueKey();

        if (part.added) return <Addition key={key}>{part.value}</Addition>;
        if (part.removed) return <Removal key={key}>{part.value}</Removal>;

        return <Plain key={key}>{part.value}</Plain>;
      })} */}
    </>
  );
};

export default Diff;
