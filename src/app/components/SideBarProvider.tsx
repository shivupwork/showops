import { ReactNode, useState } from "react";
import { SidebarContext } from "./SidebarContext";

type Props = {
    children: ReactNode;
};

export function SideBarProvider({ children }: Props) {
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

    const open = () => {
        console.log(isOpenDrawer);
        setIsOpenDrawer((isOpenDrawer)?false:true);
    };

    const value = {
        isOpenDrawer,
        open,
    };
    return (
        <>
            <SidebarContext.Provider value={value}>
                {children}
            </SidebarContext.Provider>
        </>
    );
}
