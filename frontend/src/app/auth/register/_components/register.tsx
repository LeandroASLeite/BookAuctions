"use client"
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import generateToken from '../../../../../utils/generatetolken';
import { API_BASE_URL } from "../../../../../utils/apiconfig";


export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const [token, setToken] = useState('');


    const router = useRouter();

    const validatePassword = (password: string) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return 'Password must be at least 8 characters long.';
        }
        if (!hasUpperCase) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!hasLowerCase) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (!hasNumber) {
            return 'Password must contain at least one number.';
        }
        if (!hasSpecialChar) {
            return 'Password must contain at least one special character.';
        }
        return '';
    };

    const calculatePasswordStrength = (password: string) => {
        const minLength = 8;
        let strength = 0;

        if (password.length >= minLength) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

        if (strength <= 2) {
            setPasswordStrength('weak');
        } else if (strength <= 4) {
            setPasswordStrength('medium');
        } else {
            setPasswordStrength('strong');
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = { name, email, password };
        const newToken = generateToken(user);

        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        } else {
            setPasswordError('');
        }

        if (password !== retypePassword) {
            setPasswordMatchError('Passwords do not match.');
            return;
        } else {
            setPasswordMatchError('');
        }
        setToken(newToken);
        const userWithToken = { ...user, token: newToken };

        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userWithToken),
        });

        if (response.ok) {
            router.push('/');
            toast.success('User registered successfully!');
        } else {
            toast.error('Failed to register user.');
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
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    calculatePasswordStrength(e.target.value);
                                }}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                placeholder="Password"
                            />
                            {passwordError && (
                                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                            )}
                        </div>
                        <div className="mt-2">
                            <div className="h-2 w-full bg-gray-200 rounded">
                                <div className={`h-full ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'medium' ? 'bg-yellow-500' : passwordStrength === 'strong' ? 'bg-green-500' : ''}`} style={{ width: `${passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : passwordStrength === 'strong' ? '100%' : '0%'}` }}></div>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {passwordStrength === 'weak' ? 'Weak' : passwordStrength === 'medium' ? 'Medium' : passwordStrength === 'strong' ? 'Strong' : ''}
                            </p>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="retype-password" className="block text-sm font-medium text-muted-foreground">
                            Retype Password
                        </Label>
                        <div className="mt-1">
                            <Input
                                onChange={(e) => setRetypePassword(e.target.value)}
                                id="retype-password"
                                name="retype-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                placeholder="Retype Password"
                            />
                            {passwordMatchError && (
                                <p className="mt-2 text-sm text-red-600">{passwordMatchError}</p>
                            )}
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
    );
}
