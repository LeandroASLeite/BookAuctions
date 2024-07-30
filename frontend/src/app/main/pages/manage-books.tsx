
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import Image from 'next/image';

interface Offer {
    id: string;
    createdAt: string;
    updatedAt: string;
    price: string;
    book: {
        id: string;
        title: string;
        author: string;
        genre: string;
        imageURL: string;
        userId: string;
    };
    status: number;
}

interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    imageURL: string;
    offers?: Offer[];
}

const fetchBooks = async (): Promise<Book[]> => {
    const response = await fetch('http://localhost:3001/books');
    return response.json();
}

const fetchBids = async (): Promise<Offer[]> => {
    const response = await fetch('http://localhost:3001/bids');
    return response.json();
}

const updateOfferStatus = async (offerId: string, status: number) => {
    await fetch(`http://localhost:3001/bids/${offerId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });
}

const deleteBook = async (bookId: string) => {
    await fetch(`http://localhost:3001/books/${bookId}`, {
        method: 'DELETE',
    });
}

export default function ManageBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [bids, setBids] = useState<Offer[]>([]);
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
    const [offerToDecline, setOfferToDecline] = useState<string | null>(null);
    const [bookIdForDecline, setBookIdForDecline] = useState<string | null>(null);

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = async () => {
        const fetchedBooks = await fetchBooks();
        const fetchedBids = await fetchBids();
        setBooks(fetchedBooks);
        setBids(fetchedBids);
    }

    const handleEditOffer = async (bookId: string, offerId: string, status: number) => {
        if (status === 2) { 
            setBookIdForDecline(bookId);
            setOfferToDecline(offerId);
            setIsDeclineModalOpen(true);
        } else {
            
            if (status === 1) {
                const relatedBids = bids.filter(bid => bid.book.id === bookId && bid.id !== offerId);
                await Promise.all(relatedBids.map(bid => updateOfferStatus(bid.id, 2)));
            }
            
            await updateOfferStatus(offerId, status);
            
           
            refreshData();
        }
    }

    const confirmDecline = () => {
        if (offerToDecline && bookIdForDecline) {
            updateOfferStatus(offerToDecline, 2) 
                .then(() => {
                    
                    refreshData();
                    setIsDeclineModalOpen(false);
                    setOfferToDecline(null);
                    setBookIdForDecline(null);
                });
        }
    }

    const cancelDecline = () => {
        setIsDeclineModalOpen(false);
        setOfferToDecline(null);
        setBookIdForDecline(null);
    }

    const handleDelete = (id: string) => {
        deleteBook(id)
            .then(() => {
          
                refreshData();
            });
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
                                    <Image
                                        src={book.imageURL || "/no-image.jpg"}
                                        alt={book.title}
                                        layout="fill"
                                        className="rounded-t-md object-cover"
                                    />
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
                                                {(bids.filter(bid => bid.book.id === book.id) || []).map((bid) => (
                                                    <div key={bid.id} className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-muted-foreground">${bid.price}</p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {bid.status === 0 && (
                                                                <>
                                                                    <Button
                                                                        variant="outline"
                                                                        onClick={() => handleEditOffer(book.id, bid.id, 1)}
                                                                    >
                                                                        Accept
                                                                    </Button>
                                                                    <Button
                                                                        variant="destructive"
                                                                        onClick={() => handleEditOffer(book.id, bid.id, 2)}
                                                                    >
                                                                        Decline
                                                                    </Button>
                                                                </>
                                                            )}
                                                            {bid.status === 1 && <Badge variant="secondary">Accepted</Badge>}
                                                            {bid.status === 2 && <Badge variant="destructive">Declined</Badge>}
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
    );
}
