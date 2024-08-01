import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";

const NoImageIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="3" x2="21" y2="21" />
    <line x1="3" y1="21" x2="21" y2="3" />
  </svg>
);

interface Book {
  title: string;
  authors: string[];
  categories: string[];
  imageLinks: string; // Atualizado para refletir a URL direta
  id: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  onSelectBook: (book: Book) => void;
}

const BookModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  books,
  onSelectBook,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4 py-6">
          <Dialog.Panel className="w-full max-w-lg p-6 mx-auto bg-white rounded shadow-lg">
            <Dialog.Title className="text-xl font-semibold">
              Select a Book
            </Dialog.Title>
            <div className="mt-4 max-h-80 overflow-y-auto">
              <ul className="space-y-4">
                {books.map((book) => (
                  <li
                    key={book.id}
                    className="flex items-center p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => onSelectBook(book)}
                  >
                    {book.imageLinks ? (
                      <Image
                        src={book.imageLinks}
                        alt={book.title}
                        width={64}
                        height={64}
                        className="rounded-md object-cover mr-4"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // Prevent infinite loop
                          currentTarget.src = "/no-image.jpg"; // Fallback image
                        }}
                      />
                    ) : (
                      <NoImageIcon className="w-16 h-16 mr-4 text-gray-400" />
                    )}
                    <div>
                      <h3 className="font-medium">{book.title}</h3>
                      <p className="text-sm text-gray-600">
                        {book.authors.join(", ")}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookModal;
