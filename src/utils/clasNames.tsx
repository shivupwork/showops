import { useTheme } from "next-themes";
export function classNames(...arr: unknown[]) {
    return arr.filter(Boolean).join(' ');
}
export function changeTheme(theme:any, systemTheme:any, setTheme:any){
    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    const newThemeMatchesSystem = newTheme === systemTheme;
    setTheme(newThemeMatchesSystem ? 'system' : newTheme);
}