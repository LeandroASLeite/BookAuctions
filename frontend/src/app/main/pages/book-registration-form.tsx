"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { toast } from 'react-toastify';

export default function BookRegistration() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState<File | null>(null);

    // Aqui, substitua pelo método real de obter o ID do usuário
    const userId = "currentUserId"; // Exemplo, substitua com seu método de autenticação

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simule a geração de uma URL de imagem para o JSON Server
        const imageURL = image ? URL.createObjectURL(image) : ''; // Aqui você deve ajustar para um URL real

        const book = {
            title,
            author,
            genre,
            imageURL,
            userId, // Inclua o ID do usuário
        };

        const response = await fetch('http://localhost:3001/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });

        if (response.ok) {
            toast.success('Book registered successfully!');
            // Limpar o formulário
            setTitle('');
            setAuthor('');
            setGenre('');
            setImage(null);
        } else {
            toast.error('Failed to register book.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex min-h-[calc(100vh_-_theme(spacing.12))] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-secondary-foreground">Add New Book</h2>
                        <p className="mt-2 text-center text-sm text-muted-foreground">Fill out the form to add a new book.</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="title" className="block text-sm font-medium text-muted-foreground">
                                Title
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    placeholder="Enter the book title"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="author" className="block text-sm font-medium text-muted-foreground">
                                Author
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="author"
                                    name="author"
                                    type="text"
                                    required
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    placeholder="Enter the author's name"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="genre" className="block text-sm font-medium text-muted-foreground">
                                Genre
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="genre"
                                    name="genre"
                                    type="text"
                                    required
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    placeholder="Enter the book genre"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="image" className="block text-sm font-medium text-muted-foreground">
                                Book Image (optional)
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setImage(e.target.files[0]);
                                        }
                                    }}
                                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <Button type="submit" className="w-full">
                                Add Book
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
