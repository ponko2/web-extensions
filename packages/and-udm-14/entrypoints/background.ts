import { storage } from "@wxt-dev/storage";

const updateRules = async (enabled: boolean) => {
  const rules = await browser.declarativeNetRequest.getDynamicRules();
  await browser.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map((rule) => rule.id),
    addRules: enabled
      ? [
          {
            id: 1,
            priority: 1,
            action: {
              type: browser.declarativeNetRequest.RuleActionType.REDIRECT,
              redirect: {
                transform: {
                  queryTransform: {
                    addOrReplaceParams: [
                      {
                        key: "udm",
                        value: "14",
                      },
                    ],
                  },
                },
              },
            },
            condition: {
              urlFilter: "||www.google.com/search^",
              resourceTypes: [browser.declarativeNetRequest.ResourceType.MAIN_FRAME],
            },
          },
        ]
      : [],
  });
};

const updateBadge = async (enabled: boolean) => {
  await browser.action.setBadgeText({ text: enabled ? "" : "OFF" });
  await browser.action.setBadgeBackgroundColor({ color: enabled ? [0, 0, 0, 0] : "#9e9e9e" });
};

export default defineBackground(
  () =>
    void (async () => {
      const enabled = storage.defineItem<boolean>("local:enabled", {
        fallback: true,
      });

      const initialValue = await enabled.getValue();
      await updateRules(initialValue);
      await updateBadge(initialValue);

      enabled.watch(
        (newValue, oldValue) =>
          void (async () => {
            if (newValue !== oldValue) {
              await updateRules(newValue);
              await updateBadge(newValue);
            }
          })(),
      );

      browser.action.onClicked.addListener(
        () =>
          void (async () => {
            const newValue = !(await enabled.getValue());
            await enabled.setValue(newValue);
          })(),
      );
    })(),
);
