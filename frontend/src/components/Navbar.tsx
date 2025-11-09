import { useState, useRef } from "react";
import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { Menu, X, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAdminSession, verifyAdminPassword, clearAdminSession, isAdminAuthenticated } from "@/utils/auth";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Bosh sahifa", path: "/" },
    { name: "Avtomobillar", path: "/cars" },
    { name: "Biz haqimizda", path: "/about" },
    { name: "Aloqa", path: "/contact" },
    // Admin link yashirilgan
  ];

  // Logo'ni 3 marta bosish uchun handler
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    clickCountRef.current += 1;

    // Agar timer mavjud bo'lsa, uni bekor qilish
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    // 3 marta bosilganini tekshirish
    if (clickCountRef.current === 3) {
      clickCountRef.current = 0;
      
      // Agar admin panelda bo'lsa, bosh sahifaga qaytarish
      if (location.pathname === '/admin') {
        clearAdminSession();
        toast.success("Bosh sahifaga qaytdingiz", {
          position: "top-center",
          duration: 2000,
        });
        navigate("/");
        return;
      }
      
      // Aks holda parol so'rash
      setShowPasswordDialog(true);
      return;
    }

    // 2 soniya ichida 3 marta bosilmasa, hisoblagichni qayta boshlash
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);
  };

  // Parolni tekshirish
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verifyAdminPassword(password)) {
      setAdminSession();
      toast.success("Admin panelga xush kelibsiz!", {
        position: "top-center",
        duration: 2000,
      });
      setShowPasswordDialog(false);
      setPassword("");
      navigate("/admin");
    } else {
      toast.error("Parol noto'g'ri!", {
        position: "top-center",
        duration: 3000,
      });
      setPassword("");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - 3 marta bosish uchun */}
            <div 
              onClick={handleLogoClick}
              className="flex items-center gap-2 text-primary font-bold text-xl cursor-pointer select-none"
            >
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                LuxRent
              </span>
            </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="px-4 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-all"
                activeClassName="text-primary bg-secondary font-medium"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-all"
                activeClassName="text-primary bg-secondary font-medium"
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>

    {/* Parol Dialog */}
    <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
      <DialogContent className="max-w-md w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Admin Panel</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <Label htmlFor="admin-password" className="text-sm font-semibold">
              Parolni kiriting
            </Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parolni kiriting..."
              className="mt-2"
              autoFocus
              required
            />
            <p className="text-xs text-muted-foreground mt-2">
              Admin paneliga kirish uchun parolni kiriting
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2 pt-4">
            <Button
              type="button"
              onClick={() => {
                setShowPasswordDialog(false);
                setPassword("");
              }}
              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full sm:w-auto"
            >
              Bekor qilish
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Kirish
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default Navbar;
