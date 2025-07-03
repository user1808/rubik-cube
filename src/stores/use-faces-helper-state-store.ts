import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useFacesHelperPrivateState = defineStore(
  'faces-helper-private',
  () => {
    const isShowFacesHelperToggleVisible = ref<boolean>(false);
    const isFacesHelperVisible = ref<boolean>(false);

    return {
      isShowFacesHelperToggleVisible,
      isFacesHelperVisible,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['isShowFacesHelperToggleVisible', 'isFacesHelperVisible'],
    },
  },
);

export const useFacesHelperStateStore = defineStore('faces-helper-state', () => {
  const changeFlag = ref<boolean>(false);

  const privateState = useFacesHelperPrivateState();

  const getIsShowFacesHelperToggleVisible = computed<boolean>(() => {
    return privateState.isShowFacesHelperToggleVisible;
  });
  const getIsFacesHelperVisible = computed<boolean>(() => {
    return privateState.isFacesHelperVisible;
  });

  const toggleIsShowFacesHelperToggleVisible = () => {
    privateState.isShowFacesHelperToggleVisible = !privateState.isShowFacesHelperToggleVisible;
    if (!privateState.isShowFacesHelperToggleVisible) {
      privateState.isFacesHelperVisible = false;
      changeFlag.value = !changeFlag.value;
    }
  };

  const toggleIsFacesHelperVisible = () => {
    privateState.isFacesHelperVisible = !privateState.isFacesHelperVisible;
    changeFlag.value = !changeFlag.value;
  };

  return {
    changeFlag,
    getIsShowFacesHelperToggleVisible,
    getIsFacesHelperVisible,
    toggleIsShowFacesHelperToggleVisible,
    toggleIsFacesHelperVisible,
  };
});
