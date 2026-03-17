const rules = [
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
                key: "rh",
                value: "p_6:AN1VRQENFRJN5",
              },
            ],
          },
        },
      },
    },
    condition: {
      urlFilter: "||amazon.co.jp/s^",
      resourceTypes: [browser.declarativeNetRequest.ResourceType.MAIN_FRAME],
    },
  },
] satisfies Browser.declarativeNetRequest.Rule[];

export default defineBackground(() => {
  void browser.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map((rule) => rule.id),
    addRules: rules,
  });
});
