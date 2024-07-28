import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function BookRegistration() {
    return (
        <div className="flex flex-col min-h-screen">
            
            <div className="flex min-h-[calc(100vh_-_theme(spacing.12))] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-secondary-foreground">Add New Book</h2>
                        <p className="mt-2 text-center text-sm text-muted-foreground">Fill out the form to add a new book.</p>
                    </div>
                    <form className="space-y-6" action="#" method="POST">
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
                                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    placeholder="Enter the book genre"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="image" className="block text-sm font-medium text-muted-foreground">
                                Book Image
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    required
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
        </div>
    )
}
