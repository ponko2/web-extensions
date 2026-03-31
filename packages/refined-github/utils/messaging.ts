import type { Message } from "@webext-core/messaging";
import { defineExtensionMessaging } from "@webext-core/messaging";

export interface ProtocolMap {
  invokeMenuItemFunction(data: { menuItemId: number | string }): void;
  toggleMenuItemVisibility(data: { menuItemId: number | string; visible: boolean }): void;
}

export type MessageOf<TType extends keyof ProtocolMap> = Message<ProtocolMap, TType>;

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
