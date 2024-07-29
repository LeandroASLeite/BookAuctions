// import { useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { FormEvent } from "react";
// import { toast } from 'react-toastify';
// import BookModal from "./_components/modal";

// export default function BookRegistration() {
//     const [title, setTitle] = useState('');
//     const [author, setAuthor] = useState('');
//     const [genre, setGenre] = useState('');
//     const [image, setImage] = useState<File | null>(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [searchResults, setSearchResults] = useState<any[]>([]);
//     const [selectedBook, setSelectedBook] = useState<any | null>(null);

//     const handleSearch = async () => {
//         const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
//         const data = await response.json();

//         if (data.items && data.items.length > 0) {
//             setSearchResults(data.items.map((item: any) => ({
//                 title: item.volumeInfo.title,
//                 authors: item.volumeInfo.authors || [],
//                 categories: item.volumeInfo.categories || [],
//                 imageLinks: item.volumeInfo.imageLinks || {},
//                 id: item.id
//             })));
//             setIsModalOpen(true);
//         } else {
//             toast.error('No book found.');
//         }
//     };

//     const handleBookSelect = (book: any) => {
//         setTitle(book.title);
//         setAuthor(book.authors.join(', '));
//         setGenre(book.categories.join(', '));
//         setImage(book.imageLinks.thumbnail || null);
//         setIsModalOpen(false);
//     };

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const imageURL = image instanceof File ? URL.createObjectURL(image) : image || '';

//         const book = {
//             title,
//             author,
//             genre,
//             imageURL,
//             userId: "currentUserId", // Substitua pelo método real de obter o ID do usuário
//         };

//         const response = await fetch('http://localhost:3001/books', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(book),
//         });

//         if (response.ok) {
//             toast.success('Book registered successfully!');
//             setTitle('');
//             setAuthor('');
//             setGenre('');
//             setImage(null);
//             setSearchQuery('');
//         } else {
//             toast.error('Failed to register book.');
//         }
//     };

//     return (
//         <div className="flex flex-col min-h-screen">
//             <div className="flex min-h-[calc(100vh_-_theme(spacing.12))] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
//                 <div className="w-full max-w-md space-y-8">
//                     <div>
//                         <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-secondary-foreground">Add New Book</h2>
//                         <p className="mt-2 text-center text-sm text-muted-foreground">Fill out the form to add a new book.</p>
//                     </div>
//                     <form className="space-y-6" onSubmit={handleSubmit}>
//                         <div>
//                             <Label htmlFor="search" className="block text-sm font-medium text-muted-foreground">
//                                 Search for Book
//                             </Label>
//                             <div className="mt-1 flex">
//                                 <Input
//                                     id="search"
//                                     name="search"
//                                     type="text"
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
//                                     placeholder="Search by title, author, or ISBN"
//                                 />
//                                 <Button type="button" onClick={handleSearch} className="ml-2">
//                                     Search
//                                 </Button>
//                             </div>
//                         </div>
//                         <div>
//                             <Label htmlFor="title" className="block text-sm font-medium text-muted-foreground">
//                                 Title
//                             </Label>
//                             <div className="mt-1">
//                                 <Input
//                                     id="title"
//                                     name="title"
//                                     type="text"
//                                     required
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
//                                     placeholder="Enter the book title"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <Label htmlFor="author" className="block text-sm font-medium text-muted-foreground">
//                                 Author
//                             </Label>
//                             <div className="mt-1">
//                                 <Input
//                                     id="author"
//                                     name="author"
//                                     type="text"
//                                     required
//                                     value={author}
//                                     onChange={(e) => setAuthor(e.target.value)}
//                                     className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
//                                     placeholder="Enter the author's name"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <Label htmlFor="genre" className="block text-sm font-medium text-muted-foreground">
//                                 Genre
//                             </Label>
//                             <div className="mt-1">
//                                 <Input
//                                     id="genre"
//                                     name="genre"
//                                     type="text"
//                                     required
//                                     value={genre}
//                                     onChange={(e) => setGenre(e.target.value)}
//                                     className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
//                                     placeholder="Enter the book genre"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <Label htmlFor="image" className="block text-sm font-medium text-muted-foreground">
//                                 Book Image (optional)
//                             </Label>
//                             <div className="mt-1">
//                                 <Input
//                                     id="image"
//                                     name="image"
//                                     type="file"
//                                     onChange={(e) => {
//                                         if (e.target.files && e.target.files[0]) {
//                                             setImage(e.target.files[0]);
//                                         }
//                                     }}
//                                     className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <Button type="submit" className="w-full">
//                                 Add Book
//                             </Button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             <BookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} books={searchResults} onSelectBook={handleBookSelect} />
//         </div>
//     );
// }

import { useState, FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import BookModal from "./_components/modal";

export default function BookRegistration() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedBook, setSelectedBook] = useState<any | null>(null);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
            const data = await response.json();

            console.log('Fetched Data:', data);

            if (data.items && data.items.length > 0) {
                const getLargestImage = (imageLinks: any): string => {
                    console.log('Image Links:', imageLinks);
                    const sizes = ['extraLarge', 'large', 'medium', 'small', 'thumbnail'];
                    for (const size of sizes) {
                        if (imageLinks && imageLinks[size]) {
                            return imageLinks[size];
                        }
                    }
                    return '/no-image.jpg';
                };

                setSearchResults(data.items.map((item: any) => ({
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors || [],
                    categories: item.volumeInfo.categories || [],
                    imageLinks: getLargestImage(item.volumeInfo.imageLinks),
                    id: item.id
                })));
                setIsModalOpen(true);
            } else {
                toast.error('No book found.');
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            toast.error('Error fetching books.');
        }
    };

    const handleBookSelect = (book: any) => {
        setTitle(book.title);
        setAuthor(book.authors.join(', '));
        setGenre(book.categories.join(', '));
        setImage(book.imageLinks || null);
        setIsModalOpen(false);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const imageURL = image instanceof File ? URL.createObjectURL(image) : image || '';

        const book = {
            title,
            author,
            genre,
            imageURL,
            userId: "currentUserId", // Substitua pelo método real de obter o ID do usuário
        };

        try {
            const response = await fetch('http://localhost:3001/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (response.ok) {
                toast.success('Book registered successfully!');
                setTitle('');
                setAuthor('');
                setGenre('');
                setImage(null);
                setSearchQuery('');
            } else {
                toast.error('Failed to register book.');
            }
        } catch (error) {
            console.error("Error registering book:", error);
            toast.error('Failed to register book.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex min-h-[calc(100vh_-_theme(spacing.12))] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-secondary-foreground">Add New Book</h2>
                        <p className="mt-2 text-center text-sm text-muted-foreground">Fill out the form to add a new book.</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="search" className="block text-sm font-medium text-muted-foreground">
                                Search for Book
                            </Label>
                            <div className="mt-1 flex">
                                <Input
                                    id="search"
                                    name="search"
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    placeholder="Search by title, author, or ISBN"
                                />
                                <Button type="button" onClick={handleSearch} className="ml-2">
                                    Search
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="title" className="block text-sm font-medium text-muted-foreground">
                                Title
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    placeholder="Enter the book title"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="author" className="block text-sm font-medium text-muted-foreground">
                                Author
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="author"
                                    name="author"
                                    type="text"
                                    required
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    placeholder="Enter the author's name"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="genre" className="block text-sm font-medium text-muted-foreground">
                                Genre
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="genre"
                                    name="genre"
                                    type="text"
                                    required
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    placeholder="Enter the book genre"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="image" className="block text-sm font-medium text-muted-foreground">
                                Book Image (optional)
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setImage(e.target.files[0]);
                                        }
                                    }}
                                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <Button type="submit" className="w-full">
                                Add Book
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <BookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} books={searchResults} onSelectBook={handleBookSelect} />
        </div>
    );
}
