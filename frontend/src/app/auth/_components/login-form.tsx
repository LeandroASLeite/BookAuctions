// "use client"
// import Link from "next/link"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useState } from "react"
// import Router from 'next/router';
// import Cookies from 'js-cookie';


// export default function LoginForm() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       const response = await fetch('http://localhost:3001/users');
//       const users = await response.json();
  
//       const user = users.find(user => user.email === email && user.password === password);
  
//       if (user) {
//         Cookies.set('user', JSON.stringify(user), { expires: 1 });
//         alert('Login successful!');
//         Router.push('/main');
//       } else {
//         alert('Invalid email or password.');
//       }
//     };
  

//     return (
//         <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
//             <div className="w-full max-w-md space-y-8">
//                 <div>
//                     <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-secondary-foreground">
//                         Sign in to your account
//                     </h2>
//                     <p className="mt-2 text-center text-sm text-muted-foreground">
//                         Or{" "}
//                         <Link href="/auth/register" className="font-medium text-primary hover:text-primary/70" prefetch={false}>
//                             register for a new account
//                         </Link>
//                     </p>
//                 </div>
               
//                 <form className="space-y-6" onSubmit={handleSubmit}>

//                     <div>
//                         <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
//                             Email address
//                         </Label>
//                         <div className="mt-1">
//                             <Input
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 autoComplete="email"
//                                 required
//                                 className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
//                                 placeholder="you@example.com"
//                             />
//                         </div>
//                     </div>
//                     <div>
//                         <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
//                             Password
//                         </Label>

//                         <div className="mt-1">
//                             <Input
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 autoComplete="current-password"
//                                 required
//                                 className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
//                                 placeholder="Password"
//                             />
//                         </div>
//                         <Link href="/auth/forgot" className="font-sm text-primary hover:text-primary/70" prefetch={false}>
//                             Forget your password?
//                         </Link>
//                     </div>
           
//                     <div>
//                         <Button type="submit" className="w-full text-white font-bold py-2 px-4  rounded">
//                             Sign in
//                         </Button>

                        
//                     </div>
//                 </form>
               
//             </div>
//         </div>
//     )
// }


"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Use useRouter hook

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/users');
        const users = await response.json();

        const user = users.find((user: { email: string; password: string }) => user.email === email && user.password === password);

        if (user) {
            Cookies.set('user', JSON.stringify(user), { expires: 1 });
            alert('Login successful!');
            router.push('/main'); // Use router.push instead of Router.push
        } else {
            alert('Invalid email or password.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-secondary-foreground">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Or{" "}
                        <Link href="/auth/register" className="font-medium text-primary hover:text-primary/70" prefetch={false}>
                            register for a new account
                        </Link>
                    </p>
                </div>
               
                <form className="space-y-6" onSubmit={handleSubmit}>

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
                                autoComplete="current-password"
                                required
                                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                        <Link href="/auth/forgot" className="font-sm text-primary hover:text-primary/70" prefetch={false}>
                            Forget your password?
                        </Link>
                    </div>
           
                    <div>
                        <Button type="submit" className="w-full text-white font-bold py-2 px-4 rounded">
                            Sign in
                        </Button>
                    </div>
                </form>
               
            </div>
        </div>
    );
}
