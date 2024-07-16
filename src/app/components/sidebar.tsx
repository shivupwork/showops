"use client"
import LayoutPropsInterface from '@/interfaces/layoutInterface';

import { ScrollArea, Heading, Section, Box, Card, Flex, Avatar, Text, Switch } from '@radix-ui/themes';
import LinkWithBox from './common/Linkwithbox';
import { DashboardIcon, CalendarIcon, BookmarkIcon, BackpackIcon, MixerHorizontalIcon, GearIcon } from '@radix-ui/react-icons'
import { changeTheme } from '@/utils/clasNames';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import style from './sidebar.module.css'
import LinkWithoutBox from './common/LinkWithoutBox';
import { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from "next/link";
import { endpoint } from '@/utils/data';
import { SidebarContext } from './SidebarContext';
import { SideBarProvider } from './SideBarProvider';
import Emitter from '@/utils/EventEmitter';
const Sidebar = ({ data }: LayoutPropsInterface) => {
    const { theme, systemTheme, setTheme } = useTheme();
    const [isOpenDrawer,setIsOpenDrawer] = useState(false);
    let [themeState, setThemeState] = useState((theme !== 'dark') ? false : true);
    const [eventData, setEventData]: any = useState(undefined);
    const router = usePathname();
    async function getAllTodaysEvent() {
        const data = await fetch(`${endpoint}/api/events`);
        if (!data.ok) {
            throw new Error('Failed to fetch data')
        }
        data.json().then((response) => {
            setEventData(response?.data);
        })
    }
    useEffect(() => {
        getAllTodaysEvent();
            const handleStateUpdate = (newState:any) => {
                console.log(newState)
                setIsOpenDrawer(newState);
            };
            Emitter.on("menu", handleStateUpdate);
            return () => {
        
                Emitter.off("menu", handleStateUpdate);
        
            };
    }, [])
    return (
        <>
            <SideBarProvider>
                <div className='SidebarArea'>
                    <ScrollArea type="always" scrollbars="vertical" className={(isOpenDrawer)?'d-block':''}>
                        <div style={{ paddingTop: 10, paddingBottom: 15 }}>
                            <div style={{ paddingLeft: 16, paddingRight: 16, marginBottom: 10 }}>
                                <NextLink href="/" passHref legacyBehavior>
                                    <Flex align="center"><GearIcon width={26} height={26} /><span style={{ marginLeft: '0.5rem', fontSize: '26px' }}>ShowOps</span></Flex>
                                </NextLink>
                            </div>

                            <div>
                                <div>
                                    <LinkWithBox href='/' active={(router === '/') ? true : false} icon={<DashboardIcon />}>Dashboard</LinkWithBox>
                                </div>
                                <div>
                                    <LinkWithBox href='#' active={(router === '/calender') ? true : false} icon={<CalendarIcon />}>Calender</LinkWithBox>
                                </div>
                                <div>
                                    <LinkWithBox href='#' active={(router === '/create-event') ? true : false} icon={<BookmarkIcon />}>Events</LinkWithBox>
                                </div>
                                <div>
                                    <LinkWithBox href='#' active={false} icon={<BackpackIcon />}>Offers & Deals</LinkWithBox>
                                </div>
                                <div>
                                    <LinkWithBox href='#' active={false} icon={<MixerHorizontalIcon />}>Settings</LinkWithBox>
                                </div>
                                <Section style={{ padding: '1rem' }}>
                                    <Heading as="h6" color="gray" style={{ marginBottom: '1rem' }}>Today&apos;s event</Heading>
                                    {eventData?.map((item: any, index: number) => {
                                        return <Box style={{ '--card-border-width': '0' } as any} mb="3" key={index}>
                                            <Card style={{ '--card-border-width': '0' } as any} variant='ghost'>
                                                <Flex gap="3" align="center">
                                                    <Avatar
                                                        size="3"
                                                        src={item?.image}
                                                        fallback="A"
                                                    />
                                                    <Box>
                                                        <Text as="div" size="2" color="gray">
                                                            {item?.name}
                                                        </Text>
                                                        <Text as="div" size="2" weight="bold">
                                                            {item?.description}
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                            </Card>
                                        </Box>
                                    })}
                                </Section>
                            </div>
                            <Section pt={"1"} pb={"1"} pl={"5"} position={"absolute"} bottom="5" left="0" width={"100%"}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                    <Switch onCheckedChange={() => { changeTheme(theme, systemTheme, setTheme); setThemeState((themeState) ? false : true) }} color={"indigo"} />
                                    <label className="Label" htmlFor="airplane-mode" style={{ paddingLeft: 15 }}>
                                        Dark mode
                                    </label>
                                </div>
                                <div>
                                    <LinkWithoutBox passHref={false} legacyBehaviorProps={false} href={"#"} customClass="testing">Terms of Use</LinkWithoutBox>
                                    <Link style={{ display: 'block' }} href={"#"} passHref legacyBehavior>
                                        <a className={style.Custom_Link} style={{ display: 'block' }} href={"#"}>Privacy Policy</a>
                                    </Link>
                                </div>
                            </Section>
                        </div>
                    </ScrollArea>
                </div>
            </SideBarProvider>
        </>
    );
}
export default Sidebar;