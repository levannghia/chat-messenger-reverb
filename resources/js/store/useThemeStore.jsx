import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const applyTheme = (theme) => {
    const html = document.documentElement;
    html.classList.remove('dark', 'light');
    if(theme == 'system') {
        theme =  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    html.classList.add(theme);
    localStorage.setItem('theme', theme);
}

export const useThemeStore = create(
    persist(
        (set) => ({
            theme: "system",
            setTheme: (theme) => {
                applyTheme(theme);
                set({ theme });
            },
        }),
        {
            name: 'theme-storage',
            getStorage: () => localStorage
        }
    )
)