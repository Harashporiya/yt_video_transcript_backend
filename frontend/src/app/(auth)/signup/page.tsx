import { YoutubeLogoIcon } from "@phosphor-icons/react/dist/ssr"
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-black">
      <div className="flex w-full max-w-[400px] flex-col items-center gap-8 px-8 sm:px-0">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center rounded-lg p-2 bg-red-500/10">
            <YoutubeLogoIcon size={40} className="text-red-500" weight="fill" />
          </div>
          <h1 className="text-3xl font-bold text-white">Create your account</h1>
        </div>
        <div className="w-full">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
