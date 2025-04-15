
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Inbox, 
  Award, 
  BarChart3, 
  FileDown,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import LadybugLogo from '@/components/LadybugLogo';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Teams', icon: Users, path: '/teams' },
    { name: 'Bugs', icon: Inbox, path: '/bugs' },
    { name: 'Bounties', icon: Award, path: '/bounties' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
    { name: 'Export', icon: FileDown, path: '/export' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <LadybugLogo size={32} className="animate-bounce-soft" />
          <span className="text-xl font-bold text-charcoal">Bug Bounty</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-teal transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleMenu}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 top-16 z-50 bg-background md:hidden transition-transform transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col p-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-2 text-lg rounded-md hover:bg-muted"
              onClick={closeMenu}
            >
              <item.icon className="h-5 w-5 text-teal" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
