"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { API_BASE_URL } from "../../../../utils/apiconfig";
import Cookies from "js-cookie";

interface Bid {
  id: number;
  createdAt: string;
  updatedAt: string;
  price: string;
  book?: {
    id: number;
    title: string;
    author: string;
    genre: string;
    imageURL: string;
    userId: number;
  };
  status: number;
}

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  imageURL: string;
  bids?: Bid[];
  status: number;
}

const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch(
    `${API_BASE_URL}/books?userId=${JSON.parse(Cookies.get("user")!).id}&withBids=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(Cookies.get("user")!).token,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return response.json();
};

const updateBidStatus = async (bidId: number, status: number) => {
  await fetch(
    `${API_BASE_URL}/bids/${status == 2 ? "accept" : "reject"}/${bidId} `,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(Cookies.get("user")!).token,
      },
    }
  );
};

export default function ManageBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [bidToDecline, setBidToDecline] = useState<number | null>(null);
  const [bookIdForDecline, setBookIdForDecline] = useState<number | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const fetchedBooks = await fetchBooks();
    setBooks(fetchedBooks);
  };

  const handleEditBid = async (book: Book, bidId: number, status: number) => {
    if (status === 1) {
      setBookIdForDecline(book.id);
      setBidToDecline(bidId);
      setIsDeclineModalOpen(true);
    } else {
      await updateBidStatus(bidId, status);

      refreshData();
    }
  };

  const confirmDecline = () => {
    if (bidToDecline && bookIdForDecline) {
      updateBidStatus(bidToDecline, 1).then(() => {
        refreshData();
        setIsDeclineModalOpen(false);
        setBidToDecline(null);
        setBookIdForDecline(null);
      });
    }
  };

  const cancelDecline = () => {
    setIsDeclineModalOpen(false);
    setBidToDecline(null);
    setBookIdForDecline(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground">
              Registered Books
            </h2>
            <p className="mt-2 text-muted-foreground">
              View and manage the books you have registered.
            </p>
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
                      <h4 className="text-lg font-semibold">Bids</h4>
                      <div className="grid gap-2">
                        {book.bids
                          ? book.bids.map((bid) => (
                              <div
                                key={bid.id}
                                className="flex items-center justify-between"
                              >
                                <div>
                                  <p className="text-muted-foreground">
                                    ${bid.price}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  {bid.status === 0 && (
                                    <>
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          handleEditBid(book, bid.id, 2)
                                        }
                                      >
                                        Accept
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        onClick={() =>
                                          handleEditBid(book, bid.id, 1)
                                        }
                                      >
                                        Decline
                                      </Button>
                                    </>
                                  )}
                                  {bid.status === 2 && (
                                    <Badge variant="secondary">Accepted</Badge>
                                  )}
                                  {bid.status === 1 && (
                                    <Badge variant="destructive">
                                      Declined
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))
                          : ""}
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
              <DialogDescription>
                Are you sure you want to decline this bid?
              </DialogDescription>
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
