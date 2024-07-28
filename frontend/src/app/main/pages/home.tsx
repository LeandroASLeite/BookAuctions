"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
    const [books, setBooks] = useState([
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            image: "/placeholder.svg",
            offers: [
                {
                    id: 1,
                    price: 15.99,
                    buyer: "John Doe",
                    status: "pending",
                },
                {
                    id: 2,
                    price: 18.99,
                    buyer: "Jane Smith",
                    status: "pending",
                },
                {
                    id: 3,
                    price: 20.99,
                    buyer: "Michael Johnson",
                    status: "accepted",
                },
            ],
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Fiction",
            image: "/placeholder.svg",
            offers: [
                {
                    id: 1,
                    price: 12.99,
                    buyer: "Emily Davis",
                    status: "pending",
                },
                {
                    id: 2,
                    price: 14.99,
                    buyer: "David Wilson",
                    status: "declined",
                },
            ],
        },
        {
            id: 3,
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            genre: "Fiction",
            image: "/placeholder.svg",
            offers: [
                {
                    id: 1,
                    price: 10.99,
                    buyer: "Sarah Thompson",
                    status: "pending",
                },
                {
                    id: 2,
                    price: 13.99,
                    buyer: "Alex Nguyen",
                    status: "accepted",
                },
                {
                    id: 3,
                    price: 11.99,
                    buyer: "Olivia Gonzalez",
                    status: "pending",
                },
            ],
        },
    ])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchAuthor, setSearchAuthor] = useState("")
    const [searchGenre, setSearchGenre] = useState("")
    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
            book.author.toLowerCase().includes(searchAuthor.toLowerCase()) &&
            (searchGenre === "" || book.genre.toLowerCase() === searchGenre.toLowerCase()),
    )
    return (
        <div className="flex flex-col min-h-screen">
            
            <div className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground">Book Catalogue</h2>
                        <p className="mt-2 text-muted-foreground">Browse and search through our collection of books.</p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                                type="text"
                                placeholder="Search by title"
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Search by author"
                                value={searchAuthor}
                                onChange={(e) => setSearchAuthor(e.target.value)}
                            />
                            {/* <Select value={searchGenre} onValueChange={(e) => setSearchGenre(e.target.value)}> */}
                            <Select value={searchGenre} onValueChange={(e) => setSearchGenre(e)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Search by genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="fiction">Fiction</SelectItem>
                                    <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                                    <SelectItem value="biography">Biography</SelectItem>
                                    <SelectItem value="poetry">Poetry</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredBooks.map((book) => (
                            <Card key={book.id}>
                                <div className="relative h-48">
                                    <img src="/placeholder.svg" alt={book.title} className="rounded-t-md object-cover" />
                                </div>
                                <CardContent className="p-4">
                                    <div className="grid gap-2">
                                        <h3 className="text-lg font-semibold">{book.title}</h3>
                                        <p className="text-muted-foreground">{book.author}</p>
                                        <p className="text-muted-foreground">{book.genre}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
