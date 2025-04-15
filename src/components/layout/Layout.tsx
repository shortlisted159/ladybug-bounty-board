
import React from 'react';
import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
      <footer className="py-4 border-t bg-light-grey">
        <div className="container text-center text-sm text-muted-foreground">
          Bug Bounty © {new Date().getFullYear()} - Track and reward bug fixes
        </div>
      </footer>
    </div>
  );
};

export default Layout;
