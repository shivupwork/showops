import Link from "next/link";
import style from '../sidebar.module.css';
const LinkWithoutBox = ({
    active,
    children,
    href = "#",
    icon,
    customClass,
    legacyBehaviorProps=false,
    passHref=true,
    ...props
}: React.ComponentPropsWithoutRef<any> & { active?: boolean }) => (
    <Link className={style.Custom_Link} href={href} passHref={passHref} legacyBehavior={legacyBehaviorProps}>{children}</Link>
);
export default LinkWithoutBox;