import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { carsApi, type Car } from "@/lib/api";

interface EditCarModalProps {
  car: Car | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCarUpdated: () => void;
}

const EditCarModal = ({ car, open, onOpenChange, onCarUpdated }: EditCarModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 100,
    category: "",
    passengers: 2,
    transmission: "Automatic",
    fuel: "Gasoline",
    engine: "",
    color: "",
    mileage: 0,
    features: "",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80",
    available: true,
    rating: 4.5,
    location: "Tashkent"
  });

  // Brand-specific images
  const brandImages: Record<string, string> = {
    "BMW": "https://images.unsplash.com/photo-1595341895297-3f393d3a5c9a?auto=format&fit=crop&w=800&q=80",
    "Mercedes-Benz": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    "Audi": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    "Porsche": "https://images.unsplash.com/photo-1595341895297-3f393d3a5c9a?auto=format&fit=crop&w=800&q=80",
    "Ferrari": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80",
    "Lamborghini": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80",
    "Rolls-Royce": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80",
    "Bentley": "https://images.unsplash.com/photo-1549399542-7e6f8c3f6a4c?auto=format&fit=crop&w=800&q=80",
    "Tesla": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    "Jaguar": "https://images.unsplash.com/photo-1595341895297-3f393d3a5c9a?auto=format&fit=crop&w=800&q=80",
    "Aston Martin": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80",
    "Maserati": "https://images.unsplash.com/photo-1549399542-7e6f8c3f6a4c?auto=format&fit=crop&w=800&q=80",
    "Lexus": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    "Genesis": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    "Cadillac": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    "Lincoln": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    "Infiniti": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    "McLaren": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80",
    "Land Rover": "https://images.unsplash.com/photo-1595341895297-3f393d3a5c9a?auto=format&fit=crop&w=800&q=80",
    "default": "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80"
  };

  const categories = [
    "Luxury Sedan",
    "Luxury SUV", 
    "Sports Car",
    "Supercar",
    "Ultra Luxury",
    "Electric Luxury",
    "Hybrid Supercar",
    "Luxury Coupe",
    "Grand Tourer"
  ];

  const locations = [
    "Tashkent",
    "Samarkand", 
    "Bukhara",
    "Nukus",
    "Fergana",
    "Andijan",
    "Namangan",
    "Qarshi"
  ];

  // Update image when brand changes
  const handleBrandChange = (brand: string) => {
    const image = brandImages[brand] || brandImages.default;
    setFormData({
      ...formData,
      brand,
      image
    });
  };

  useEffect(() => {
    if (car) {
      setFormData({
        name: car.name,
        brand: car.brand,
        model: car.model,
        year: car.year,
        price: car.price,
        category: car.category,
        passengers: car.passengers,
        transmission: car.transmission,
        fuel: car.fuel,
        engine: car.engine,
        color: car.color,
        mileage: car.mileage,
        features: car.features.join(', '),
        image: car.image,
        available: car.available,
        rating: car.rating,
        location: car.location
      });
    }
  }, [car]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!car || !formData.name || !formData.brand || !formData.model) {
      toast.error("Iltimos, barcha majburiy maydonlarni to'ldiring");
      return;
    }

    try {
      setLoading(true);
      
      const carData = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f)
      };

      const response = await carsApi.update(car._id, carData);
      
      if (response.success) {
        toast.success("Mashina muvaffaqiyatli yangilandi!");
        onOpenChange(false);
        onCarUpdated();
      } else {
        toast.error(response.message || "Mashina yangilashda xatolik");
      }
    } catch (error) {
      console.error('Mashina yangilashda xatolik:', error);
      toast.error("Mashina yangilashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  if (!car) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mashinani tahrirlash</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Mashina nomi *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Mercedes-Benz S-Class"
                required
              />
            </div>
            <div>
              <Label htmlFor="brand">Brend *</Label>
              <Select value={formData.brand} onValueChange={handleBrandChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Brend tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Aston Martin", "Audi", "BMW", "Bentley", "Cadillac", "Ferrari", 
                    "Genesis", "Infiniti", "Jaguar", "Lamborghini", "Land Rover", 
                    "Lexus", "Lincoln", "Maserati", "McLaren", "Mercedes-Benz", 
                    "Porsche", "Rolls-Royce", "Tesla"
                  ].map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
                placeholder="S-Class"
                required
              />
            </div>
            <div>
              <Label htmlFor="year">Yil</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                min="2015"
                max="2025"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Narx (kuniga) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                min="50"
                max="1000"
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Kategoriya *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategoriya tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="passengers">Yo'lovchilar</Label>
              <Select value={formData.passengers.toString()} onValueChange={(value) => setFormData({...formData, passengers: parseInt(value)})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="transmission">Transmissiya</Label>
              <Select value={formData.transmission} onValueChange={(value) => setFormData({...formData, transmission: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fuel">Yoqilg'i</Label>
              <Select value={formData.fuel} onValueChange={(value) => setFormData({...formData, fuel: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gasoline">Gasoline</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="engine">Dvigatel</Label>
              <Input
                id="engine"
                value={formData.engine}
                onChange={(e) => setFormData({...formData, engine: e.target.value})}
                placeholder="3.0L V6 Turbo"
              />
            </div>
            <div>
              <Label htmlFor="color">Rang</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                placeholder="Black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mileage">Probeg (km)</Label>
              <Input
                id="mileage"
                type="number"
                value={formData.mileage}
                onChange={(e) => setFormData({...formData, mileage: parseInt(e.target.value)})}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="location">Joylashuv</Label>
              <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="image">Rasm URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="https://example.com/car-image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="features">Xususiyatlar (vergul bilan ajrating)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({...formData, features: e.target.value})}
              placeholder="Leather Seats, Sunroof, GPS Navigation, Bluetooth"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="available"
              checked={formData.available}
              onCheckedChange={(checked) => setFormData({...formData, available: checked})}
            />
            <Label htmlFor="available">Mavjud</Label>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2 pt-4">
            <Button type="button" onClick={() => onOpenChange(false)} className="border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full sm:w-auto">
              Bekor qilish
            </Button>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saqlanmoqda...
                </>
              ) : (
                "Saqlash"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCarModal;