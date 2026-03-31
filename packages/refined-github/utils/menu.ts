const menuItemIds = [
  "toggleResolvedDetails",
  "openResolvedDetails",
  "closeResolvedDetails",
  "toggleFilesToReviewed",
  "changeFilesToReviewed",
  "changeFilesToUnreviewed",
  "loadDiffs",
] as const;

export type MenuItemId = (typeof menuItemIds)[number];

export const isMenuItemId = (menuItemId: string | number): menuItemId is MenuItemId =>
  menuItemIds.some((id) => id === menuItemId);
