"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface Offer {
  id: number;
  price: number;
  buyer: string;
  status: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  image: string;
  description: string;
  offers: Offer[];
}

export default function MyOffers() {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      image: "/placeholder.svg",
      description: "A classic novel about the decadence and excess of the Roaring Twenties.",
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
      description: "A powerful story about racial injustice and the loss of innocence.",
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
      description: "A coming-of-age novel that explores themes of alienation and rebellion.",
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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [offerPrice, setOfferPrice] = useState("")

  const handleMakeOffer = () => {
    if (!selectedBook) return

    const newOffer: Offer = {
      id: selectedBook.offers.length + 1,
      price: parseFloat(offerPrice),
      buyer: "John Doe",
      status: "pending",
    }
    const updatedBook: Book = {
      ...selectedBook,
      offers: [...selectedBook.offers, newOffer],
    }
    const updatedBooks = books.map((book) => (book.id === selectedBook.id ? updatedBook : book))
    setBooks(updatedBooks)
    setSelectedBook(updatedBook)
    setOfferPrice("")
  }

  return (
    <div className="flex flex-col min-h-screen">      
      <div className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
        {selectedBook ? (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-80 md:h-full">
                <Image src="/placeholder.svg" alt={selectedBook.title} layout="fill" className="rounded-md object-cover" />
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
                    {selectedBook.offers
                      .filter((offer) => offer.buyer === "John Doe")
                      .map((offer) => (
                        <div
                          key={offer.id}
                          className={`rounded-md p-4 ${
                            offer.status === "pending"
                              ? "bg-muted"
                              : offer.status === "accepted"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{offer.buyer}</p>
                              <p className="text-muted-foreground">Offered ${offer.price}</p>
                            </div>
                            <div
                              className={`px-2 py-1 rounded-md text-xs font-medium ${
                                offer.status === "pending"
                                  ? "bg-muted-foreground text-muted"
                                  : offer.status === "accepted"
                                  ? "bg-green-500 text-green-900"
                                  : "bg-red-500 text-red-900"
                              }`}
                            >
                              {offer.status}
                            </div>
                          </div>
                        </div>
                      ))}
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
                {books
                  .flatMap((book) => book.offers.filter((offer) => offer.buyer === "John Doe"))
                  .map((offer) => (
                    <div
                      key={offer.id}
                      className={`rounded-md p-4 ${
                        offer.status === "pending"
                          ? "bg-muted"
                          : offer.status === "accepted"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{offer.buyer}</p>
                          <p className="text-muted-foreground">
                            {/* Offered ${offer.price} for `{books.find((book) => book.offers.some((o) => o.id === offer.id)).title}" */}
                          </p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-md text-xs font-medium ${
                            offer.status === "pending"
                              ? "bg-muted-foreground text-muted"
                              : offer.status === "accepted"
                              ? "bg-green-500 text-green-900"
                              : "bg-red-500 text-red-900"
                          }`}
                        >
                          {offer.status}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
