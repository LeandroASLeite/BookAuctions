"use client"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter
export default function RegisterForm() {
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Initialize useRouter

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, password }),
          });
      
          if (response.ok) {
            router.push('/');
            alert('User registered successfully!');
          } else {
            
            alert('Failed to register user.');
          }
        };


    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-secondary-foreground">
                        Register for a new account
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Or{" "}
                        <Link href="/" className="font-medium text-primary hover:text-primary/90" prefetch={false}>
                            sign in to your existing account
                        </Link>
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                            Name
                        </Label>
                        <div className="mt-1">
                            <Input
                                onChange={(e) => setName(e.target.value)}
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                placeholder="Your name"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                            Email address
                        </Label>
                        <div className="mt-1">
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                            Password
                        </Label>
                        <div className="mt-1">
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}