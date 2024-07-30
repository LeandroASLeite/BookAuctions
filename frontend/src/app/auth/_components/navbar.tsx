import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Navbar = ({ setActivePage }: any) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const handleLogout = () => {
    setModalOpen(true); 
  };

  const confirmLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    router.push('/');
    setModalOpen(false); 
  };

  const handleCloseModal = () => {
    setModalOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
      <div className="flex items-center gap-4">
        <h1 className="font-bold">Book Auction</h1>
        <nav className="hidden md:flex items-center gap-4">
          <button onClick={() => setActivePage('home')} className="hover:underline">
            Home
          </button>
          <button onClick={() => setActivePage('book-registration')} className="hover:underline">
            Register a Book
          </button>
          <button onClick={() => setActivePage('view-registered-books')} className="hover:underline">
            View Registered Books
          </button>
          <button onClick={() => setActivePage('manage-books')} className="hover:underline">
            Manage Books
          </button>
          <button onClick={() => setActivePage('my-offers')} className="hover:underline">
            My Offers
          </button>
        </nav>
        <div className="md:hidden flex items-center gap-4 relative">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute ml-2 top-full right-0 mt-2 w-48 bg-primary shadow-lg rounded-lg border border-gray-200 z-10"
            >
              <button
                onClick={() => { setActivePage('home'); setDropdownOpen(false); }}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => { setActivePage('book-registration'); setDropdownOpen(false); }}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                Register a Book
              </button>
              <button
                onClick={() => { setActivePage('view-registered-books'); setDropdownOpen(false); }}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                View Registered Books
              </button>
              <button
                onClick={() => { setActivePage('manage-books'); setDropdownOpen(false); }}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                Manage Books
              </button>
              <button
                onClick={() => { setActivePage('my-offers'); setDropdownOpen(false); }}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                My Offers
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="hidden md:block">
              <span className="font-medium">Welcome, {user.name}</span>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={handleLogout}>
              <LogOutIcon className="h-6 w-6" />
              <span className="sr-only">Logout</span>
            </Button>
          </>
        ) : (
          <button onClick={() => router.push('/login')} className="hover:underline">
            Login
          </button>
        )}
      </div>

   
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-secondary-foreground">Confirm Logout</h2>
            <p className="mt-2 text-gray-600">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={handleCloseModal} className='text-secondary-foreground'>Cancel</Button>
              <Button onClick={confirmLogout}>Logout</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );

  function MenuIcon(props: any) {
    return (
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
        <line x1="3" x2="21" y1="12" y2="12" />
        <line x1="3" x2="21" y1="6" y2="6" />
        <line x1="3" x2="21" y1="18" y2="18" />
      </svg>
    );
  }

  function LogOutIcon(props: any) {
    return (
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
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
      </svg>
    );
  }
};

export default Navbar;
