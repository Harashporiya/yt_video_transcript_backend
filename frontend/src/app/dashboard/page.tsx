"use client"
import React, { Suspense, useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { VideoProcessor } from "@/components/dashboard/video-processor"
import { VideoChat } from "@/components/dashboard/video-chat"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { 
    YoutubeLogoIcon, 
    SpinnerGapIcon,
} from "@phosphor-icons/react"
import { useSearchParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { isTokenValid } from "@/lib/utils"

function DashboardContent() {
    const searchParams = useSearchParams()
    const activeVideoId = searchParams.get("v")

    return (
        <SidebarInset className="bg-black text-white flex flex-col h-screen overflow-hidden">
            <header className="flex h-14 shrink-0 items-center justify-between gap-2 px-4 bg-black border-b border-white/10">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="text-white hover:bg-white/5 hover:text-white" />
                    <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 hover:text-white rounded-lg cursor-pointer transition-colors text-lg font-semibold text-white/90">
                        <YoutubeLogoIcon size={24} className="text-white" weight="fill" />
                        <span>Transcripter</span>
                    </div>
                </div>
            </header>
            
            {!activeVideoId ? (
                <VideoProcessor />
            ) : (
                <VideoChat activeVideoId={activeVideoId} />
            )}
        </SidebarInset>
    )
}

export default function Page() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        let validToken = false;
        
        if (token) {
            if (isTokenValid(token)) {
                validToken = true;
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }

        if (validToken) {
            setIsAuthenticated(true);
        } else if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            setIsAuthenticated(true);
        }
    }, [status, router]);

    if (!isAuthenticated) {
        return <div className="bg-black text-white w-full h-screen flex items-center justify-center"><SpinnerGapIcon className="animate-spin" size={32}/></div>
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <Suspense fallback={<div className="bg-black text-white w-full h-screen flex items-center justify-center"><SpinnerGapIcon className="animate-spin" size={32}/></div>}>
                <DashboardContent />
            </Suspense>
        </SidebarProvider>
    )
}
