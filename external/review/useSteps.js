import { useLocalObservable } from "mobx-react-lite";
import { ACCEPT, REJECT, MODIFY, KEEP, SKIP, PENDING, IGNORE } from "./actions";

const useSteps = ({ definitions, current, suggestion, revision }) =>
  definitions.map((definition) =>
    useStep({
      ...definition,
      current: current[definition.field],
      suggestion: suggestion[definition.field],
      revision: revision[definition.field],
    })
  );

const useStep = ({ current, suggestion, revision, ...definition }) => {
  const { field, label, ReviewComponent, ConfirmationComponent } = definition;
  const recommendation = current === revision ? suggestion : current;

  return useLocalObservable(() => ({
    field,
    label,
    ReviewComponent,
    ConfirmationComponent,
    isSkipped: false,
    committed: undefined,
    value: recommendation,
    setValue(value) {
      this.value = value;
    },
    get options() {
      return [
        { label: "Current", value: current },
        { label: "Suggested", value: suggestion },
      ];
    },
    get isCommitted() {
      return this.committed !== undefined;
    },
    get needsReview() {
      return revision != suggestion;
    },
    get finalValue() {
      return this.isCommitted ? this.committed : current;
    },
    get status() {
      if (this.isCommitted) return this.getActions(this.committed)[0];
      if (this.isSkipped) return SKIP;
      if (this.needsReview) return PENDING;
      if (!this.needsReview) return IGNORE;
    },
    skip() {
      this.isSkipped = true;
      this.committed = undefined;
      this.value = recommendation;
    },
    commit(value) {
      this.committed = value;
      this.value = value;
      this.isSkipped = false;
    },
    accept() {
      this.commit(suggestion);
    },
    reject() {
      this.commit(revision);
    },
    save() {
      this.commit(this.value);
    },
    keep() {
      this.commit(current);
    },
    ignore() {
      // no-op
    },
    getColor(value) {
      return this.getActions(value)[0].color;
    },
    getActions(value) {
      const isSuggestion = value === suggestion;
      const isRevision = value === revision;
      const isCurrent = value === current;

      if (isSuggestion && isRevision && isCurrent) return [IGNORE];
      if (isSuggestion && isCurrent) return [ACCEPT, SKIP];
      if (isSuggestion) return [ACCEPT, REJECT, SKIP];
      if (isRevision && isCurrent) return [REJECT, SKIP];
      if (isCurrent) return [KEEP, SKIP];

      return [MODIFY, SKIP];
    },
  }));
};

export default useSteps;
