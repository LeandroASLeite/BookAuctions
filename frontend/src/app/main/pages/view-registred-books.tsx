// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from 'react-toastify';
// import Image from "next/image"

// export default function ViewRegisteredBooks() {
//     const [books, setBooks] = useState<any[]>([]);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [editingBook, setEditingBook] = useState<any>(null);
//     const [bookToDelete, setBookToDelete] = useState<any>(null);

//     useEffect(() => {
//         // Fetch books from the API
//         const fetchBooks = async () => {
//             const response = await fetch('http://localhost:3001/books');
//             const data = await response.json();
//             setBooks(data);
//         };
//         fetchBooks();
//     }, []);

//     const handleEdit = (book: any) => {
//         setEditingBook(book);
//         setIsEditModalOpen(true);
//     };

//     const handleDelete = (book: any) => {
//         setBookToDelete(book);
//         setIsDeleteModalOpen(true);
//     };

//     const confirmDelete = async () => {
//         if (bookToDelete) {
//             await fetch(`http://localhost:3001/books/${bookToDelete.id}`, {
//                 method: 'DELETE',
//             });
//             setBooks(books.filter((book) => book.id !== bookToDelete.id));
//             setIsDeleteModalOpen(false);
//             setBookToDelete(null);
//             toast.success('Book deleted successfully!');
//         }
//     };

//     const cancelDelete = () => {
//         setIsDeleteModalOpen(false);
//         setBookToDelete(null);
//     };

//     const handleSaveBook = async (updatedBook: any) => {
//         await fetch(`http://localhost:3001/books/${updatedBook.id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedBook),
//         });
//         setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
//         setIsEditModalOpen(false);
//         setEditingBook(null);
//         toast.success('Book updated successfully!');
//     };

//     return (
//         <div className="flex flex-col min-h-screen">
//             <div className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
//                 <div className="mx-auto max-w-4xl space-y-8">
//                     <div>
//                         <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground">Your Registered Books</h2>
//                         <p className="mt-2 text-muted-foreground">View and manage the books you have registered.</p>
//                     </div>
//                     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                         {books.map((book) => (
//                             <Card key={book.id}>
//                                 <div className="relative h-48">
//                                     {/* <img src={book.imageURL} alt={book.title} className="rounded-t-md object-cover w-full h-full" /> */}
//                                     <Image
//   src={book.imageURL}
//   alt={book.title}
//   layout="fill" // ou "responsive", "intrinsic", "fixed" conforme sua necessidade
//   className="rounded-t-md object-cover"
// />
//                                 </div>
//                                 <CardContent className="p-4">
//                                     <div className="grid gap-2">
//                                         <h3 className="text-lg font-semibold">{book.title}</h3>
//                                         <p className="text-muted-foreground">{book.author}</p>
//                                         <p className="text-muted-foreground">{book.genre}</p>
//                                     </div>
//                                 </CardContent>
//                                 <CardFooter className="flex items-center justify-between p-4 border-t">
//                                     <Button variant="outline" onClick={() => handleEdit(book)}>
//                                         Edit
//                                     </Button>
//                                     <Button variant="destructive" onClick={() => handleDelete(book)}>
//                                         Delete
//                                     </Button>
//                                 </CardFooter>
//                             </Card>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Edit Book Modal */}
//             {isEditModalOpen && (
//                 <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//                     <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                             <DialogTitle>Edit Book</DialogTitle>
//                             <DialogDescription>Make changes to the book details.</DialogDescription>
//                         </DialogHeader>
//                         <div className="grid gap-4 py-4">
//                             <div className="grid items-center grid-cols-4 gap-4">
//                                 <Label htmlFor="title" className="text-right">
//                                     Title
//                                 </Label>
//                                 <Input
//                                     id="title"
//                                     value={editingBook?.title || ""}
//                                     onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className="grid items-center grid-cols-4 gap-4">
//                                 <Label htmlFor="author" className="text-right">
//                                     Author
//                                 </Label>
//                                 <Input
//                                     id="author"
//                                     value={editingBook?.author || ""}
//                                     onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className="grid items-center grid-cols-4 gap-4">
//                                 <Label htmlFor="genre" className="text-right">
//                                     Genre
//                                 </Label>
//                                 <Input
//                                     id="genre"
//                                     value={editingBook?.genre || ""}
//                                     onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className="grid items-center grid-cols-4 gap-4">
//                                 <Label htmlFor="description" className="text-right">
//                                     Description
//                                 </Label>
//                                 <Textarea
//                                     id="description"
//                                     value={editingBook?.description || ""}
//                                     onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                         </div>
//                         <DialogFooter>
//                             <Button type="submit" onClick={() => handleSaveBook(editingBook)}>
//                                 Save changes
//                             </Button>
//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>
//             )}

//             {/* Delete Confirmation Modal */}
//             {isDeleteModalOpen && (
//                 <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
//                     <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                             <DialogTitle>Confirm Deletion</DialogTitle>
//                             <DialogDescription>Are you sure you want to delete this book?</DialogDescription>
//                         </DialogHeader>
//                         <DialogFooter>
//                             <Button variant="outline" onClick={cancelDelete}>
//                                 Cancel
//                             </Button>
//                             <Button variant="destructive" onClick={confirmDelete}>
//                                 Confirm
//                             </Button>
//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>
//             )}
//         </div>
//     )
// }

"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'react-toastify';
import Image from "next/image";

export default function ViewRegisteredBooks() {
    const [books, setBooks] = useState<any[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<any>(null);
    const [bookToDelete, setBookToDelete] = useState<any>(null);

    useEffect(() => {
        // Fetch books from the API
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:3001/books');
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
            await fetch(`http://localhost:3001/books/${bookToDelete.id}`, {
                method: 'DELETE',
            });
            setBooks(books.filter((book) => book.id !== bookToDelete.id));
            setIsDeleteModalOpen(false);
            setBookToDelete(null);
            toast.success('Book deleted successfully!');
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setBookToDelete(null);
    };

    const handleSaveBook = async (updatedBook: any) => {
        await fetch(`http://localhost:3001/books/${updatedBook.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        });
        setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
        setIsEditModalOpen(false);
        setEditingBook(null);
        toast.success('Book updated successfully!');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground">Your Registered Books</h2>
                        <p className="mt-2 text-muted-foreground">View and manage the books you have registered.</p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {books.map((book) => (
                            <Card key={book.id}>
                                <div className="relative h-48">
                                    <Image
                                        src={book.imageURL || "/no-image.jpg"} // Usa a imagem padrão se a URL estiver vazia
                                        alt={book.title}
                                        layout="fill" // ou "responsive", "intrinsic", "fixed" conforme sua necessidade
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
                                    <Button variant="destructive" onClick={() => handleDelete(book)}>
                                        Delete
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Edit Book Modal */}
            {isEditModalOpen && (
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Book</DialogTitle>
                            <DialogDescription>Make changes to the book details.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid items-center grid-cols-4 gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    value={editingBook?.title || ""}
                                    onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
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
                                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
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
                                    onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })}
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

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>Are you sure you want to delete this book?</DialogDescription>
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
