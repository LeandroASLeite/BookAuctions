"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface Offer {
  id: string;
  price: number;
  userId: string;
  status: string;
  bookId: string | null;
}

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  imageURL: string;
  userId: string;
  description?: string; // Adicionando descrição opcional
  offers: Offer[]; // Adicionando lista de ofertas
}

export default function MyOffers() {
  const [books, setBooks] = useState<Book[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [offerPrice, setOfferPrice] = useState<string>("")
  const userName = "John Doe" // Nome do usuário que está logado

  useEffect(() => {
    // Função para buscar os livros e ofertas do backend
    const fetchBooksAndOffers = async () => {
      const booksResponse = await fetch('http://localhost:3001/books')
      const booksData: Book[] = await booksResponse.json()
      const offersResponse = await fetch('http://localhost:3001/bids')
      const offersData: Offer[] = await offersResponse.json()

      // Associe as ofertas aos livros
      setBooks(booksData)
      setOffers(offersData)
    }

    fetchBooksAndOffers()
  }, [])

  const handleMakeOffer = () => {
    if (!selectedBook) return

    const newOffer: Offer = {
      id: new Date().getTime().toString(), // Gerar um ID único
      price: parseFloat(offerPrice),
      userId: "c68d", // ID do usuário logado (substitua conforme necessário)
      status: "pending",
      bookId: selectedBook.id
    }

    // Atualizar oferta no backend
    fetch('http://localhost:3001/bids', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOffer),
    })
      .then(response => response.json())
      .then(data => {
        setOffers([...offers, data])
        setSelectedBook(prev => prev ? { ...prev, offers: [...prev.offers, data] } : null)
        setOfferPrice("")
      })
  }

  return (
    <div className="flex flex-col min-h-screen">      
      <div className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
        {selectedBook ? (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-80 md:h-full">
                <Image src={selectedBook.imageURL} alt={selectedBook.title} layout="fill" className="rounded-md object-cover" />
              </div>
              <div className="grid gap-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground">{selectedBook.title}</h2>
                  <p className="mt-2 text-muted-foreground">by {selectedBook.author}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-muted-foreground">{selectedBook.description || "No description available."}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">My Offers</h3>
                  <div className="grid gap-4">
                    {selectedBook.offers.map((offer) => (
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
                            <p className="font-medium">{userName}</p>
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
            <div className="bg-white px-4 py-6 text-secondary-foreground">
              <h2 className="text-2xl font-bold">My Offers</h2>
              <div className="grid gap-4 mt-6">
                {offers
                  .filter((offer) => offer.userId === "c68d") // Filtra ofertas do usuário atual
                  .map((offer) => {
                    const book = books.find((book) => book.id === offer.bookId)
                    return (
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
                            <p className="font-medium">
                              Offered ${offer.price} {book ? `for "${book.title}"` : ""}
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
                    )
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
