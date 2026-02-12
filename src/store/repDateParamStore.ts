import { ProcessDateParam } from "@/types/inteface";
import { create } from "zustand";

export const useRepParamStore = create<ProcessDateParam>((set, get) => ({
  processDate: '',

  setProcessDate: (processDate) => set({ processDate }),

  submitAll: () => {

    const currentState = get();

    set({
      processDate: currentState.processDate,
    });
  },
}));