/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../../../utils/apiconfig";

interface Bid {
  id: number;
  createdAt: string;
  updatedAt: string;
  price: number;
  book?: Book;
  status: number;
}

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  imageURL: string;
  description: string;
  userId: number;
  bids?: Bid[];
}

export default function MyBids() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bidPrice, setBidPrice] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const booksResponse = await fetch(
          `${API_BASE_URL}/books/bids?userId=${
            JSON.parse(Cookies.get("user")!).id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: JSON.parse(Cookies.get("user")!).token,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const booksData: Book[] = await booksResponse.json();
        console.log(booksData);
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleMakeBid = () => {
    if (!selectedBook) return;

    const newBid = {
      price: parseFloat(bidPrice),
      status: 0,
    };

    const updatedBook: Book = {
      ...selectedBook,
    };

    const updatedBooks = books.map((book) =>
      book.id === selectedBook.id ? updatedBook : book
    );

    setBooks(updatedBooks);
    setSelectedBook(updatedBook);
    setBidPrice("");
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
                  <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">
                    {selectedBook.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    by {selectedBook.author}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-muted-foreground">
                    {selectedBook.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">My Bids</h3>
                  <div className="grid gap-4">
                    {selectedBook.bids!.length > 0 ? (
                      selectedBook.bids!.map((bid) => (
                        <div
                          key={bid.id}
                          className={`rounded-md p-4 ${
                            bid.status === 0
                              ? "bg-muted"
                              : bid.status === 2
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Bided ${bid.price}</p>
                              <p className="text-muted-foreground">
                                for "{bid.book!.title}"
                              </p>
                            </div>
                            <div
                              className={`px-2 py-1 rounded-md text-xs font-medium ${
                                bid.status === 0
                                  ? "bg-muted-foreground text-muted"
                                  : bid.status === 2
                                  ? "bg-green-500 text-green-900"
                                  : "bg-red-500 text-red-900"
                              }`}
                            >
                              {bid.status === 0
                                ? "pending"
                                : bid.status === 2
                                ? "accepted"
                                : "declined"}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        No bids available.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Make an Bid</h3>
                  <div className="grid gap-4">
                    <Input
                      type="number"
                      placeholder="Enter your bid price"
                      value={bidPrice}
                      onChange={(e) => setBidPrice(e.target.value)}
                    />
                    <Button onClick={handleMakeBid}>Submit Bid</Button>
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
              <h2 className="text-2xl font-bold">My Bids</h2>
              <div className="grid gap-4 mt-6">
                {books.length > 0 ? (
                  books.map((book) => {
                     
                    return book.bids!.map((bid) => (
                      <div
                        key={bid!.id}
                        className={`rounded-md p-4 ${
                          bid!.status === 0
                            ? "bg-muted"
                            : bid!.status === 2
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-muted-foreground">
                              Bided ${bid!.price} for "
                              {
                                book.title
                              }
                              "
                            </p>
                            <p className="text-muted-foreground">
                              {bid!.status === 0
                                ? "Pending"
                                : bid!.status === 2
                                ? "Accepted"
                                : "Declined"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ));
                  })
                ) : (
                  <p className="text-muted-foreground">No bids available.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
