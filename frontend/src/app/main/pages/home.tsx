import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../../utils/apiconfig";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  imageURL: string;
  createdAt?: string;
  updatedAt?: string;
  status?: number;
  userId: number;
  bids?: Bid[];
}

interface Bid {
  id: number;
  bookId: number;
  createdAt: string;
  updatedAt: string;
  price: string;
  book: Book;
  status: number;
}

export default function Component() {
  const [books, setBooks] = useState<Book[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bidPrice, setBidPrice] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const booksResponse = await fetch(`${API_BASE_URL}/books`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("user")!).token,
          },
        });
        const booksData = await booksResponse.json();
        setBooks(booksData);

        const bidsResponse = await fetch(
          `${API_BASE_URL}/bids?userId=${JSON.parse(Cookies.get("user")!).id}`,

          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: JSON.parse(Cookies.get("user")!).token,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        const bidsData = await bidsResponse.json();
        setBids(bidsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleBookDetails = (book: Book) => {
    setSelectedBook(book);
  };

  const fetchBook = async (book: Book) => {
    const bookResponse = await fetch(
      `${API_BASE_URL}/books/bids?userId=${
        JSON.parse(Cookies.get("user")!).id
      }&bookId=${book.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(Cookies.get("user")!).token,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setSelectedBook(await bookResponse.json());
  };

  const handleMakeBid = async () => {
    if (!selectedBook) return;
    const price = parseFloat(bidPrice);
    if (isNaN(price) || price <= 0) {
      alert("O preço da oferta deve ser maior que zero.");
      return;
    }

    const newBid = {
      price: bidPrice,
      bookId: selectedBook.id,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/bids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(Cookies.get("user")!).token,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newBid),
      });

      if (response.ok) {
        toast.success("Oferta enviada com sucesso!");
        setBidPrice("");
        setSelectedBook(null);
      } else {
        console.error("Error posting bid:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting bid:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
        {selectedBook ? (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-80 md:h-80">
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
                  <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground">
                    {selectedBook.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    by {selectedBook.author}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-muted-foreground">
                    Descrição não disponível.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">My Bids</h3>
                  <div className="grid gap-4">
                    {selectedBook.bids
                      ? selectedBook.bids.map((bid) => (
                          <div
                            key={bid.id}
                            className={`rounded-md p-4 ${
                              bid.status === 0
                                ? "bg-muted"
                                : bid.status === 1
                                ? "bg-green-100"
                                : "bg-red-100"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">
                                  User {JSON.parse(Cookies.get("user")!).name}
                                </p>
                                <p className="text-muted-foreground">
                                  Bided ${bid.price}
                                </p>
                              </div>
                              <div
                                className={`px-2 py-1 rounded-md text-xs font-medium ${
                                  bid.status === 0
                                    ? "bg-muted-foreground text-muted"
                                    : bid.status === 1
                                    ? "bg-green-500 text-green-900"
                                    : "bg-red-500 text-red-900"
                                }`}
                              >
                                {bid.status === 0
                                  ? "pending"
                                  : bid.status === 1
                                  ? "accepted"
                                  : "declined"}
                              </div>
                            </div>
                          </div>
                        ))
                      : ""}
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
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground">
                Book Catalogue
              </h2>
              <p className="mt-2 text-muted-foreground">
                Browse and search through our collection of books.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <Card key={book.id} onClick={() => fetchBook(book)}>
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
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
