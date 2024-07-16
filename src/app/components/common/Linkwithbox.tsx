import Link from "next/link";
import styles from "../header.module.css";
import stylesSidebar from '../sidebar.module.css';
const LinkWithBox = ({
    active,
    children,
    href = "",
    icon,
    ...props
  }: React.ComponentPropsWithoutRef<any> & { active?: boolean }) => (
    <Link passHref href={href} legacyBehavior className={styles.HeaderProductLink}>
        <a className={active ? stylesSidebar.Link_With_Box+' '+stylesSidebar.active+' active' : stylesSidebar.Link_With_Box+' inactive'} href={href}>
        {icon} <span>{children}</span>
        </a>
    </Link>
  );
export default LinkWithBox;