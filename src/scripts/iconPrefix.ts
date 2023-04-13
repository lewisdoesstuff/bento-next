
export const prefixedIcon = (icon?: string) => {
  if (!icon) return "";
  if (icon.startsWith("fab-")) {
    const fabless = icon.split("fab-");
    if (fabless.length > 1) {
      return [`fab`, fabless[1]];
    }
  }
  return icon
};