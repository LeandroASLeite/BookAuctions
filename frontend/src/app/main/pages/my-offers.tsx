/* eslint-disable react/no-unescaped-entities */
"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
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
                            Bided ${bid!.price} for "{book.title}"
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
      </div>
    </div>
  );
}
