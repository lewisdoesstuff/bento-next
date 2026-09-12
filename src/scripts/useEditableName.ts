import { ref } from 'vue';
import { config } from '../../config';

/**
 * The editable display name, persisted per-user in local storage. Shared by the
 * greeter and the editorial layout. `nameBox` is the editable element to blur on save.
 */
export const useEditableName = () => {
  const name = ref(localStorage.getItem('name') || config.name);
  const nameBox = ref<HTMLElement | null>(null);

  const save = () => {
    if (nameBox.value) nameBox.value.blur();
    if (name.value === '') localStorage.removeItem('name');
    else localStorage.setItem('name', name.value);
    name.value = localStorage.getItem('name') || config.name;
  };

  return { name, nameBox, save };
};
