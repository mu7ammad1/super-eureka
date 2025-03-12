"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { CoinsIcon, X } from "lucide-react"
import Link from "next/link"


export function SearchAndmenu() {

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className="rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[1.5] " style={{ scale: 1.3 }}><path d="M3 5L19 5" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round"></path><path d="M3 12H7" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round"></path><circle cx="16" cy="15" r="4" stroke="currentColor"></circle><path d="M19 18L21 20" stroke="currentColor" strokeLinecap="square"></path><path d="M3 19H7" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round"></path></svg>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh] w-full">
                <div className="mx-auto w-full h- flex flex-col max-w-md gap-0 p-4">
                    <DrawerHeader>
                        <DrawerTitle className="flex justify-normal items-start gap-2"><CoinsIcon className="w-4 h-4" /> 0/50 coins free</DrawerTitle>
                        <DrawerDescription className="flex justify-normal items-start">Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-0 sm:hidden flex justify-normal items-start flex-col">
                        <Button variant={"ghost"} size={"default"} className={`rounded-full`}>
                            <Link href='/generate'>Generate</Link>
                        </Button>
                        <Button variant={"ghost"} size={"default"} className={`rounded-full`}>
                            <Link href='/explore'>Explore</Link>
                        </Button>
                        <Button variant={"ghost"} size={"default"} className={`rounded-full`}>
                            <Link href='/pricing'>Pricing</Link>
                        </Button>
                        <Button variant={"ghost"} size={"default"} className={`rounded-full`}>
                            <Link href='/pricing'>Donload app</Link>
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
