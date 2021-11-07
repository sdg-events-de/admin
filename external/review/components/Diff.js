import { useEffect, useState, useRef } from "react";
import { green, red, grey as gray } from "@material-ui/core/colors";
import styled from "styled-components";
import { diffWordsWithSpace, diffChars } from "diff";

const StyledSpan = styled.span`
  color: ${({ styled }) => {
    if (styled?.isAdded) return green[700];
    if (styled?.isRemoved) return red[700];
    return gray[700];
  }};

  text-decoration: ${({ styled }) =>
    styled?.isRemoved ? "line-through" : "none"};
`;

const safelyClearTimeout = (timeout) => {
  if (timeout) clearTimeout(timeout);
};

let uniqueId = 0;
function getUniqueId() {
  uniqueId += 1;
  return uniqueId;
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
        1000
      );
    }

    return () => safelyClearTimeout(timeoutRef.current);
  }, [before, after]);

  if (parts === null)
    return <StyledSpan style={{ fontStyle: "italic" }}>Loading...</StyledSpan>;

  return (
    <>
      {parts.length === 1 && parts[0].value === "" && (
        <StyledSpan style={{ fontStyle: "italic" }}>No value</StyledSpan>
      )}
      {parts.map((part) => (
        <StyledSpan
          key={getUniqueId()}
          styled={{ isAdded: part.added, isRemoved: part.removed }}
        >
          {part.value}
        </StyledSpan>
      ))}
    </>
  );
};

export default Diff;
