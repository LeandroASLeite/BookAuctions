"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../../utils/apiconfig";

export default function ViewRegisteredBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [bookToDelete, setBookToDelete] = useState<any>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `${API_BASE_URL}/books?userId=${JSON.parse(Cookies.get("user")!).id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("user")!).token,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const handleEdit = (book: any) => {
    setEditingBook(book);
    setIsEditModalOpen(true);
  };

  const handleDelete = (book: any) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (bookToDelete) {
      await fetch(`${API_BASE_URL}/books/${bookToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(Cookies.get("user")!).token,
          "Access-Control-Allow-Origin": "*",
        },
      });
      setBooks(books.filter((book) => book.id !== bookToDelete.id));
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
      toast.success("Book deleted successfully!");
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setBookToDelete(null);
  };

  const handleSaveBook = async (updatedBook: any) => {
    await fetch(`${API_BASE_URL}/books/${updatedBook.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(Cookies.get("user")!).token,
      },
      body: JSON.stringify(updatedBook),
    });
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setIsEditModalOpen(false);
    setEditingBook(null);
    toast.success("Book updated successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground">
              Your Registered Books
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
                <CardFooter className="flex items-center justify-between p-4 border-t">
                  <Button variant="outline" onClick={() => handleEdit(book)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(book)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Book</DialogTitle>
              <DialogDescription>
                Make changes to the book details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={editingBook?.title || ""}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="author" className="text-right">
                  Author
                </Label>
                <Input
                  id="author"
                  value={editingBook?.author || ""}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, author: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="genre" className="text-right">
                  Genre
                </Label>
                <Input
                  id="genre"
                  value={editingBook?.genre || ""}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, genre: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => handleSaveBook(editingBook)}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {isDeleteModalOpen && (
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this book?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
