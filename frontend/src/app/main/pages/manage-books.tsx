"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function ManageBooks() {
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

    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false)
    const [offerToDecline, setOfferToDecline] = useState<any>(null)
    const [bookIdForDecline, setBookIdForDecline] = useState<any>(null)

    const handleEditOffer = (bookId: any, offerId: any, status: any) => {
        if (status === "declined") {
            setBookIdForDecline(bookId)
            setOfferToDecline(offerId)
            setIsDeclineModalOpen(true)
        } else {
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === bookId
                        ? {
                            ...book,
                            offers: book.offers.map((offer) => (offer.id === offerId ? { ...offer, status } : offer)),
                        }
                        : book,
                ),
            )
        }
    }

    const confirmDecline = () => {
        if (offerToDecline !== null && bookIdForDecline !== null) {
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === bookIdForDecline
                        ? {
                            ...book,
                            offers: book.offers.map((offer) =>
                                offer.id === offerToDecline ? { ...offer, status: "declined" } : offer
                            ),
                        }
                        : book
                )
            )
            setIsDeclineModalOpen(false)
            setOfferToDecline(null)
            setBookIdForDecline(null)
        }
    }

    const cancelDecline = () => {
        setIsDeclineModalOpen(false)
        setOfferToDecline(null)
        setBookIdForDecline(null)
    }

    const handleDelete = (id: any) => {
        setBooks(books.filter((book) => book.id !== id))
    }

    const handleEdit = (id: any) => {
        console.log('deu certo')
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground">Registered Books</h2>
                        <p className="mt-2 text-muted-foreground">View and manage the books you have registered.</p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {books.map((book) => (
                            <Card key={book.id}>
                                <div className="relative h-48">
                                    <img src={book.image} alt={book.title} className="rounded-t-md object-cover" />
                                </div>
                                <CardContent className="p-4">
                                    <div className="grid gap-2">
                                        <h3 className="text-lg font-semibold">{book.title}</h3>
                                        <p className="text-muted-foreground">{book.author}</p>
                                        <p className="text-muted-foreground">{book.genre}</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 border-t">
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <h4 className="text-lg font-semibold">Offers</h4>
                                            <div className="grid gap-2">
                                                {book.offers.map((offer) => (
                                                    <div key={offer.id} className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium">{offer.buyer}</p>
                                                            <p className="text-muted-foreground">${offer.price}</p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {offer.status === "pending" && (
                                                                <>
                                                                    <Button
                                                                        variant="outline"
                                                                        onClick={() => handleEditOffer(book.id, offer.id, "accepted")}
                                                                    >
                                                                        Accept
                                                                    </Button>
                                                                    <Button
                                                                        variant="destructive"
                                                                        onClick={() => handleEditOffer(book.id, offer.id, "declined")}
                                                                    >
                                                                        Decline
                                                                    </Button>
                                                                </>
                                                            )}
                                                            {offer.status === "accepted" && <Badge variant="secondary">Accepted</Badge>}
                                                            {offer.status === "declined" && <Badge variant="destructive">Declined</Badge>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decline Confirmation Modal */}
            {isDeclineModalOpen && (
                <Dialog open={isDeclineModalOpen} onOpenChange={setIsDeclineModalOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Confirm Decline</DialogTitle>
                            <DialogDescription>Are you sure you want to decline this offer?</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={cancelDecline}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={confirmDecline}>
                                Confirm
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}
