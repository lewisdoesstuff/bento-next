import { ref } from "vue";

export const theme = ref("");
export const updateTheme = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("notransition");
    document.documentElement.classList.add("dark");
    theme.value = "dark";
    document.body.classList.remove("notransition");
  } else {
    document.documentElement.classList.remove("dark");
    theme.value = "light";
  }
};
