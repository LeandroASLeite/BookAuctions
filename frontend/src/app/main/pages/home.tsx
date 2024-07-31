import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../../utils/apiconfig";
import Cookies from 'js-cookie';



interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  imageURL: string;
  createdAt?: string;
  updatedAt?: string;
  status?: number;
  userId: string;
}

interface Offer {
  id: string;
  createdAt: string;
  updatedAt: string;
  price: string;
  book: Book; 
  status: number; 
}

export default function Component() {
  const [books, setBooks] = useState<Book[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [offerPrice, setOfferPrice] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const booksResponse = await fetch(`${API_BASE_URL}/books`,{
          method:'GET',
          headers:{
            "Content-Type": "application/json",
            "Authorization": JSON.parse(Cookies.get('user')!).token
          }
        },
        );
        const booksData = await booksResponse.json();
        setBooks(booksData);

        const offersResponse = await fetch(`${API_BASE_URL}/bids?userId=${JSON.parse(Cookies.get('user')!).id}`,

          {
            method:'GET',
            headers:{
              "Content-Type": "application/json",
              "Authorization": JSON.parse(Cookies.get('user')!).token,

            }
          },

        );
      
        const offersData = await offersResponse.json();
        setOffers(offersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleBookDetails = (book: Book) => {
    setSelectedBook(book);
  };

  const handleMakeOffer = async () => {
    if (!selectedBook) return;
    const price = parseFloat(offerPrice);
    if (isNaN(price) || price <= 0) {
      alert("O preço da oferta deve ser maior que zero.");
      return;
    }

    const newOffer: Offer = {
      id: Date.now().toString(), 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
      price: offerPrice,
      book: {
        id: selectedBook.id,
        createdAt: selectedBook.createdAt,
        updatedAt: selectedBook.updatedAt,
        title: selectedBook.title,
        author: selectedBook.author,
        genre: selectedBook.genre,
        imageURL: selectedBook.imageURL,
        status: selectedBook.status,
        userId: selectedBook.userId,
      },
      status: 0, // Status inicial como pendente
    };

    try {
      const response = await fetch(`${API_BASE_URL}/bids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOffer),
      });

      if (response.ok) {
        const updatedOffers = [...offers, newOffer];
        setOffers(updatedOffers);
        toast.success("Oferta enviada com sucesso!");
        setOfferPrice("");
        setSelectedBook(null);
      } else {
        console.error("Error posting offer:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting offer:", error);
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
                  <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground">{selectedBook.title}</h2>
                  <p className="mt-2 text-muted-foreground">by {selectedBook.author}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-muted-foreground">Descrição não disponível.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">My Offers</h3>
                  <div className="grid gap-4">
                    {offers
                      .filter((offer) => {
                        return offer.book && offer.book.id === selectedBook.id;
                      })
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
                              <p className="font-medium">Usuário {offer.id}</p>
                              <p className="text-muted-foreground">Offered ${offer.price}</p>
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
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground">Book Catalogue</h2>
              <p className="mt-2 text-muted-foreground">Browse and search through our collection of books.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <Card key={book.id} onClick={() => handleBookDetails(book)}>
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
