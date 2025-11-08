import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Users, Fuel, Settings, Star } from "lucide-react";
import BookingModal from "./BookingModal";
import CarDetailModal from "./CarDetailModal";
import { Car } from "@/lib/api"; // Import the Car type

interface CarCardProps extends Omit<Car, '_id' | 'available' | 'createdAt' | 'updatedAt'> {
  id: string;
  onBookingComplete?: () => void;
}

const CarCard = ({ 
  id, 
  name, 
  image, 
  price, 
  passengers, 
  transmission, 
  fuel, 
  rating,
  brand,
  model,
  year,
  engine,
  color,
  mileage,
  location,
  features,
  category,
  onBookingComplete 
}: CarCardProps) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // Fallback image URL for when the primary image fails to load
  const fallbackImageUrl = "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80";
  
  const carData = {
    id,
    name,
    image,
    price,
    passengers,
    transmission,
    fuel,
    rating,
    brand,
    model,
    year,
    engine,
    color,
    mileage,
    location,
    features,
    category
  };
  
  return (
    <>
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 hover:border-primary/50">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
          <img
            src={image}
            alt={name}
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              // If the primary image fails to load, use the fallback image
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackImageUrl) {
                target.src = fallbackImageUrl;
              }
            }}
          />
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white dark:bg-gray-800 px-2 py-1 sm:px-3 rounded-full flex items-center gap-1 shadow-lg border border-blue-200 dark:border-blue-300">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">{rating}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-4 sm:p-6 bg-white dark:bg-gray-800">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{name}</h3>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 truncate">{brand} {model}</span>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{year}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-300">
              <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs sm:text-sm font-medium">{passengers}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-300">
              <div className="p-1.5 sm:p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Settings className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs sm:text-sm font-medium truncate">{transmission}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-300">
              <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Fuel className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs sm:text-sm font-medium">{fuel}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t-2 border-blue-100 dark:border-blue-300">
            <div>
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${price}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">kuniga</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowDetailModal(true)}
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                Batafsil
              </Button>
              <BookingModal 
                car={{
                  id,
                  name,
                  price,
                  image
                }}
                onBookingComplete={onBookingComplete}
              />
            </div>
          </div>
        </div>
      </Card>
      
      {showDetailModal && (
        <CarDetailModal 
          car={carData}
          onClose={() => setShowDetailModal(false)}
          onBookingComplete={onBookingComplete}
        />
      )}
    </>
  );
};

export default CarCard;