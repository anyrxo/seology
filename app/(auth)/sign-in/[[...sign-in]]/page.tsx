import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl',
            },
          }}
        />
      </div>
    </div>
  )
}
