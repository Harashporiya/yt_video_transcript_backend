"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"

interface VideoContextType {
  videos: any[]
  refreshVideos: () => Promise<void>
  isLoading: boolean
  successMessage: string | null
  setSuccessMessage: (msg: string | null) => void
}

const VideoContext = createContext<VideoContextType | null>(null)

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [videos, setVideos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const refreshVideos = useCallback(async () => {
    const token =
      (session as any)?.backendToken ||
      (typeof window !== "undefined" ? localStorage.getItem("token") : null)
    if (!token) return

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/videos`,
        { headers: { Authorization: token } }
      )
      if (res.data.success) {
        setVideos(res.data.videos)
      }
    } catch (err) {
      console.error("Failed to refresh videos:", err)
    } finally {
      setIsLoading(false)
    }
  }, [session])

  return (
    <VideoContext.Provider
      value={{ videos, refreshVideos, isLoading, successMessage, setSuccessMessage }}
    >
      {children}
    </VideoContext.Provider>
  )
}

export function useVideoContext() {
  const ctx = useContext(VideoContext)
  if (!ctx) throw new Error("useVideoContext must be used inside VideoProvider")
  return ctx
}
