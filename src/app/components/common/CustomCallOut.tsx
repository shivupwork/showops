import Link from "next/link";
import styles from "../header.module.css";
import stylesSidebar from '../sidebar.module.css';
import { Callout } from "@radix-ui/themes";
const CustomCallOut = ({
    children,
    icon=undefined,
    color = '',
    ...props
}: React.ComponentPropsWithoutRef<any> & { active?: boolean }) => (
    <Callout.Root color={color} size="1">
        {icon &&
            <Callout.Icon>
                {icon}
            </Callout.Icon>
        }
        <Callout.Text wrap={"pretty"}>
            {children}
        </Callout.Text>
    </Callout.Root>

);
export default CustomCallOut;