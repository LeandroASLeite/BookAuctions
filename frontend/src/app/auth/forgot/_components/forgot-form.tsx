'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"


export default function ForgetPasswordForm() {
  const form = useForm()
  const handleSubmit= form.handleSubmit(async(data)=>{
    console.log(data)
    
    
    
  })
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-secondary-foreground">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Enter your email to reset your password.</p>
        </div>
        {/* <form className="space-y-6" action="#" method="POST"> */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
              Email address
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="you@example.com"
                {...form.register('email')}
              />
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}