import { objectValues } from "ts-extras";

const menuItems: Record<
  MenuItemId,
  { id: MenuItemId } & Omit<Browser.contextMenus.CreateProperties, "id">
> = {
  toggleResolvedDetails: {
    id: "toggleResolvedDetails",
    title: "解決済コメントの開閉状態を切り替え",
    documentUrlPatterns: ["https://github.com/*/pull/*"],
  },
  openResolvedDetails: {
    parentId: "toggleResolvedDetails",
    id: "openResolvedDetails",
    title: "全て開く",
    documentUrlPatterns: ["https://github.com/*/pull/*"],
  },
  closeResolvedDetails: {
    parentId: "toggleResolvedDetails",
    id: "closeResolvedDetails",
    title: "全て閉じる",
    documentUrlPatterns: ["https://github.com/*/pull/*"],
  },
  toggleFilesToReviewed: {
    id: "toggleFilesToReviewed",
    title: "ファイルの確認状態を切り替え",
    documentUrlPatterns: [
      "https://github.com/*/pull/*/changes",
      "https://github.com/*/pull/*/files",
      "https://github.com/*/pull/*/files?*",
    ],
  },
  changeFilesToReviewed: {
    parentId: "toggleFilesToReviewed",
    id: "changeFilesToReviewed",
    title: "全て確認済みに変更",
    documentUrlPatterns: [
      "https://github.com/*/pull/*/changes",
      "https://github.com/*/pull/*/files",
      "https://github.com/*/pull/*/files?*",
    ],
  },
  changeFilesToUnreviewed: {
    parentId: "toggleFilesToReviewed",
    id: "changeFilesToUnreviewed",
    title: "全て未確認に変更",
    documentUrlPatterns: [
      "https://github.com/*/pull/*/changes",
      "https://github.com/*/pull/*/files",
      "https://github.com/*/pull/*/files?*",
    ],
  },
  loadDiffs: {
    id: "loadDiffs",
    title: "差分を全て読み込む",
    documentUrlPatterns: [
      "https://github.com/*/commit/*",
      "https://github.com/*/pull/*/changes",
      "https://github.com/*/pull/*/commits/*",
      "https://github.com/*/pull/*/files",
      "https://github.com/*/pull/*/files?*",
    ],
  },
};

// コンテキストメニューを作成
export const createContextMenus = () => {
  for (const createProperties of objectValues(menuItems)) {
    browser.contextMenus.create(
      { ...createProperties, visible: false },
      () => browser.runtime.lastError,
    );
  }
};

// コンテキストメニューに対応する関数を実行
export const handleContextMenuItemClick = (
  { menuItemId }: Browser.contextMenus.OnClickData,
  tab: Browser.tabs.Tab | undefined,
) => {
  if (tab?.id !== undefined) {
    void sendMessage("invokeMenuItemFunction", { menuItemId }, { tabId: tab.id });
  }
};

// 不要なコンテキストメニューを非表示化
export const onToggleMenuItemVisibility = ({
  data: { menuItemId, visible },
}: MessageOf<"toggleMenuItemVisibility">) => {
  void browser.contextMenus.update(menuItemId, { visible });
};
