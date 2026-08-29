import type { SCRIPT_STARTED_EVENT_TYPE, ScriptStartedEvent } from "~/events";

declare global {
  interface DocumentEventMap {
    [SCRIPT_STARTED_EVENT_TYPE]: ScriptStartedEvent;
  }
}
