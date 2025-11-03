import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-200 p-4">
      <div className="container-default w-full" style={{ maxWidth: '500px' }}>
        <div className="card pd-32px---24px">
          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none border-0 bg-transparent p-0',
                headerTitle: 'text-500 bold',
                headerSubtitle: 'text-200',
                formButtonPrimary: 'btn-primary large',
                formFieldLabel: 'text-100 medium',
                footerActionLink: 'text-accent--primary-1',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
