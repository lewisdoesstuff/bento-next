
/**
 * Handle the differences in FontAwesome icon names
 * 
 * Returns an array of icon prefix and icon name if it's a brands icon
 * Returns the icon name as passed if not.
 * @param icon FontAwesome icon name
 * @returns `["fab",  icon name] | icon name` 
 */
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