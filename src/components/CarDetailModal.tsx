import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Users, Fuel, Settings, Star, Calendar, MapPin, Palette, Car } from "lucide-react";
import BookingModal from "@/components/BookingModal";

interface CarDetailModalProps {
  car: {
    id: string;
    name: string;
    image: string;
    price: number;
    passengers: number;
    transmission: string;
    fuel: string;
    rating: number;
    brand: string;
    model: string;
    year: number;
    engine: string;
    color: string;
    mileage: number;
    location: string;
    features: string[];
    category: string;
  };
  onClose: () => void;
  onBookingComplete?: () => void;
}

const CarDetailModal = ({ car, onClose, onBookingComplete }: CarDetailModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const fallbackImageUrl = "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80";

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallbackImageUrl) {
      target.src = fallbackImageUrl;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8 border-2 border-blue-500 dark:border-blue-400 max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="relative h-48 md:h-64 overflow-hidden">
            <img
              src={car.image}
              alt={car.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            )}
            <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{car.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-1">{car.name}</h2>
              <p className="text-base md:text-lg text-blue-600 dark:text-blue-400 font-medium">{car.brand} {car.model} ({car.year})</p>
              <p className="text-sm text-muted-foreground">{car.category}</p>
            </div>
            
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">${car.price}</p>
              <p className="text-sm text-muted-foreground">kuniga</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs text-muted-foreground">Yo'lovchilar</p>
                <p className="font-semibold text-sm">{car.passengers}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Settings className="h-4 w-4 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-muted-foreground">Transmissiya</p>
                <p className="font-semibold text-sm">{car.transmission}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Fuel className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-xs text-muted-foreground">Yoqilg'i</p>
                <p className="font-semibold text-sm">{car.fuel}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <Car className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <div>
                <p className="text-xs text-muted-foreground">Kategoriya</p>
                <p className="font-semibold text-sm">{car.category}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold">Texnik xususiyatlari</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Yili: {car.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Rangi: {car.color}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm">Dvigatel: {car.engine}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm">Yurgan: {car.mileage} km</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-base font-semibold">Joylashuv</h3>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{car.location}</span>
              </div>
              
              <h3 className="text-base font-semibold mt-2">Xususiyatlari</h3>
              <div className="flex flex-wrap gap-1">
                {car.features && car.features.length > 0 ? (
                  car.features.map((feature, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Xususiyatlar mavjud emas</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 text-sm"
              size="sm"
            >
              Yopish
            </Button>
            <BookingModal 
              car={{
                id: car.id,
                name: car.name,
                price: car.price,
                image: car.image
              }}
              onBookingComplete={() => {
                if (onBookingComplete) onBookingComplete();
                onClose();
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CarDetailModal;