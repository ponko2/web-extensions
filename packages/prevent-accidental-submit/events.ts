export const SCRIPT_STARTED_EVENT_TYPE = "prevent-accidental-submit:started";

export type ScriptStartedEvent = CustomEvent<{ eventId: string }>;
