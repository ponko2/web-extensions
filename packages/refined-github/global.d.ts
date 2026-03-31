import type {
  ExtensionMessage,
  ExtensionMessagingConfig,
  ExtensionMessenger,
  ExtensionSendMessageArgs,
  GetDataType,
  GetReturnType,
  MaybePromise,
  Message,
  RemoveListenerCallback,
} from "@webext-core/messaging";

// NOTE: Workaround for https://github.com/aklinker1/webext-core/issues/82
declare module "@webext-core/messaging" {
  function defineExtensionMessaging<TProtocolMap extends Record<string, any>>(
    config?: ExtensionMessagingConfig,
  ): Omit<ExtensionMessenger<TProtocolMap>, "sendMessage" | "onMessage"> & {
    sendMessage<TType extends keyof TProtocolMap>(
      this: void,
      type: TType,
      ...args: GetDataType<TProtocolMap[TType]> extends undefined
        ? [data?: undefined, ...args: ExtensionSendMessageArgs]
        : never
    ): Promise<GetReturnType<TProtocolMap[TType]>>;
    sendMessage<TType extends keyof TProtocolMap>(
      this: void,
      type: TType,
      data: GetDataType<TProtocolMap[TType]>,
      ...args: ExtensionSendMessageArgs
    ): Promise<GetReturnType<TProtocolMap[TType]>>;
    onMessage<TType extends keyof TProtocolMap>(
      this: void,
      type: TType,
      onReceived: (
        message: Message<TProtocolMap, TType> & ExtensionMessage,
      ) => void | MaybePromise<GetReturnType<TProtocolMap[TType]>>,
    ): RemoveListenerCallback;
  };
}
