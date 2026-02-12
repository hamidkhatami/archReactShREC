import { create } from 'zustand';

export interface DashboardState {
    // --- فیلدهای فرم (لحظه‌ای) ---
    enFileName: string;
    faFileName: string;
    status: string;
    createDate: string;
    user: string;

    // اکشن‌ها
    setEnFileName: (value: string) => void;
    setFaFileName: (value: string) => void;
    setStatus: (value: string) => void;
    setCreateDate: (value: string) => void;
    setUser: (value: string) => void;

    submitAll: () => {
        enFileName: string;
        faFileName: string;
        status: string;
        createDate: string;
        user: string;
    };
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
    enFileName: '',
    faFileName: '',
    status: '',
    createDate: '',
    user: '',

    setEnFileName: (value) => set({ enFileName: value }),
    setFaFileName: (value) => set({ faFileName: value }),
    setStatus: (value) => set({ status: value }),
    setCreateDate: (value) => set({ createDate: value }),
    setUser: (value) => set({ user: value }),

    submitAll: () => {
        const state = get();
        return {
            enFileName: state.enFileName,
            faFileName: state.faFileName,
            status: state.status,
            createDate: state.createDate,
            user: state.user,
        };
    },
}));
