/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from 'next/image';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from 'js-cookie';

interface Offer {
  id: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  book: {
    id: string;
    title: string;
    author: string;
    genre: string;
    imageURL: string;
    userId: string;
  };
  status: 0 | 1 | 2; // 0: pending, 1: accepted, 2: declined
}

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  imageURL: string;
  description: string;
  userId: string;
  offers: Offer[];
}

export default function MyOffers() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [offerPrice, setOfferPrice] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const booksResponse = await fetch(`http://localhost:3001/books/bids?userId=${JSON.parse(Cookies.get('user')!).token}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": JSON.parse(Cookies.get('user')!).token,
            }
          }
        );
        const booksData: Book[] = await booksResponse.json();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleMakeOffer = () => {
    if (!selectedBook) return;

    const newOffer: Offer = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      price: parseFloat(offerPrice),
      book: {
        id: selectedBook.id,
        title: selectedBook.title,
        author: selectedBook.author,
        genre: selectedBook.genre,
        imageURL: selectedBook.imageURL,
        userId: selectedBook.userId,
      },
      status: 0,
    };

    const updatedBook: Book = {
      ...selectedBook,
      offers: [...selectedBook.offers, newOffer],
    };

    const updatedBooks = books.map((book) =>
      book.id === selectedBook.id ? updatedBook : book
    );

    setBooks(updatedBooks);
    setSelectedBook(updatedBook);
    setOfferPrice("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
        {selectedBook ? (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-80 md:h-full">
                <Image
                  src={selectedBook.imageURL || "/no-image.jpg"}
                  alt={selectedBook.title}
                  layout="fill"
                  className="rounded-md object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="grid gap-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">{selectedBook.title}</h2>
                  <p className="mt-2 text-muted-foreground">by {selectedBook.author}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-muted-foreground">{selectedBook.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">My Offers</h3>
                  <div className="grid gap-4">
                    {selectedBook.offers.length > 0 ? (
                      selectedBook.offers.map((offer) => (
                        <div
                          key={offer.id}
                          className={`rounded-md p-4 ${offer.status === 0
                              ? "bg-muted"
                              : offer.status === 1
                                ? "bg-green-100"
                                : "bg-red-100"
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Offered ${offer.price}</p>
                              <p className="text-muted-foreground">for "{offer.book.title}"</p>
                            </div>
                            <div
                              className={`px-2 py-1 rounded-md text-xs font-medium ${offer.status === 0
                                  ? "bg-muted-foreground text-muted"
                                  : offer.status === 1
                                    ? "bg-green-500 text-green-900"
                                    : "bg-red-500 text-red-900"
                                }`}
                            >
                              {offer.status === 0 ? "pending" : offer.status === 1 ? "accepted" : "declined"}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No offers available.</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Make an Offer</h3>
                  <div className="grid gap-4">
                    <Input
                      type="number"
                      placeholder="Enter your offer price"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                    />
                    <Button onClick={handleMakeOffer}>Submit Offer</Button>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={() => setSelectedBook(null)}>
              Back to Catalogue
            </Button>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="bg-primary px-4 py-6 text-primary-foreground">
              <h2 className="text-2xl font-bold">My Offers</h2>
              <div className="grid gap-4 mt-6">
                {books.flatMap((book) => book.offers).length > 0 ? (
                  books
                    .flatMap((book) => book.offers)
                    .map((offer) => (
                      <div
                        key={offer.id}
                        className={`rounded-md p-4 ${offer.status === 0
                            ? "bg-muted"
                            : offer.status === 1
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-muted-foreground">
                              Offered ${offer.price} for "{books.find((book) => book.id === offer.book.id)?.title}"
                            </p>
                            <p className="text-muted-foreground">
                              {offer.status === 0 ? "Pending" : offer.status === 1 ? "Accepted" : "Declined"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-muted-foreground">No offers available.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
