export const setBaseSlotName = (slotName: string | undefined): string => {
  if (!slotName) return '';
  return `base${slotName?.charAt(0).toUpperCase() + slotName?.slice(1)}`;
};
