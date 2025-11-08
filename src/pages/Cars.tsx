import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { carsApi, filtersApi, type Car, type Filters } from "@/lib/api";
import { Input } from "@/components/ui/input";

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState<Filters | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([50, 500]);
  const [selectedPassengers, setSelectedPassengers] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    loadData();
  }, []);

  // Filter cars when any filter changes (but only after filters are loaded)
  useEffect(() => {
    // Only filter if filters have been loaded
    if (filters) {
      filterCars();
    }
  }, [selectedCategory, selectedBrand, priceRange, selectedPassengers, sortBy, searchQuery, filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [carsResponse, filtersResponse] = await Promise.all([
        carsApi.getAll({ available: 'true' }), // Faqat mavjud mashinalarni yuklash
        filtersApi.get()
      ]);

      if (carsResponse.success && carsResponse.data) {
        setCars(carsResponse.data);
      }

      if (filtersResponse.success && filtersResponse.data) {
        setFilters(filtersResponse.data);
      }
    } catch (error) {
      console.error('Ma\'lumotlarni yuklashda xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCars = async () => {
    try {
      const params: any = {};
      if (selectedCategory && selectedCategory !== "all") params.category = selectedCategory;
      if (selectedBrand && selectedBrand !== "all") params.brand = selectedBrand;
      if (priceRange[0] > 50) params.minPrice = priceRange[0];
      if (priceRange[1] < 500) params.maxPrice = priceRange[1];
      if (selectedPassengers && selectedPassengers !== "all") {
        params.minPassengers = Number(selectedPassengers);
        console.log("Yo'lovchilar filtri:", selectedPassengers, "→", params.minPassengers);
      }

      // Add search query if present
      if (searchQuery) params.search = searchQuery;

      console.log("Filter parameters:", params); // Debug log

      const response = await carsApi.getAll(params);
      console.log("API response:", response); // Debug log
      console.log("Topilgan mashinalar:", response.data?.length);
      
      if (response.success && response.data) {
        // Apply client-side sorting
        let sortedCars = [...response.data];
        switch (sortBy) {
          case "price-low":
            sortedCars.sort((a, b) => a.price - b.price);
            break;
          case "price-high":
            sortedCars.sort((a, b) => b.price - a.price);
            break;
          case "newest":
            sortedCars.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case "rating":
            sortedCars.sort((a, b) => b.rating - a.rating);
            break;
          default:
            // Popular sorting (by rating then by year)
            sortedCars.sort((a, b) => {
              if (b.rating !== a.rating) {
                return b.rating - a.rating;
              }
              return b.year - a.year;
            });
        }
        setCars(sortedCars);
      }
    } catch (error) {
      console.error('Mashinalarni filtrlashda xatolik:', error);
    }
  };

  const handleBookingComplete = () => {
    // Refresh the cars list after a booking
    loadData();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 sm:pt-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
              Avtomobillar katalogi
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-primary-foreground/90">
              Premium va lux avtomobillarni tanlang
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
          <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-gray-200 dark:border-gray-700 lg:sticky lg:top-24">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Filtrlar</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="text-sm font-semibold mb-3 block">Kategoriya</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Barcha kategoriyalar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Barcha kategoriyalar</SelectItem>
                        {filters?.categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-3 block">Brend</label>
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger>
                        <SelectValue placeholder="Barcha brendlar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Barcha brendlar</SelectItem>
                        {filters?.brands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-3 block">
                      Narx: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider 
                      value={priceRange} 
                      onValueChange={setPriceRange}
                      max={500} 
                      min={50}
                      step={10} 
                      className="mt-2" 
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-3 block">Yo'lovchilar soni</label>
                    <Select value={selectedPassengers} onValueChange={setSelectedPassengers}>
                      <SelectTrigger>
                        <SelectValue placeholder="Barcha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Barcha</SelectItem>
                        <SelectItem value="2">Kamida 2 kishi</SelectItem>
                        <SelectItem value="4">Kamida 4 kishi</SelectItem>
                        <SelectItem value="5">Kamida 5 kishi</SelectItem>
                        <SelectItem value="7">Kamida 7 kishi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="search">Qidiruv</Label>
                    <Input
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Mashina, brend yoki model..."
                    />
                  </div>

                  <Button 
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedBrand("all");
                      setPriceRange([50, 500]);
                      setSelectedPassengers("all");
                      setSearchQuery("");
                    }}
                    className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  >
                    Filtrlarni tozalash
                  </Button>
                </div>
              </div>
            </div>

            {/* Cars Grid */}
            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6 md:mb-8">
                <p className="text-sm sm:text-base text-muted-foreground">
                  <span className="font-semibold text-foreground">{cars.length}</span> ta avtomobil topildi
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Mashhur</SelectItem>
                    <SelectItem value="price-low">Narxi: Pastdan yuqoriga</SelectItem>
                    <SelectItem value="price-high">Narxi: Yuqoridan pastga</SelectItem>
                    <SelectItem value="rating">Reytingi bo'yicha</SelectItem>
                    <SelectItem value="year">Yil bo'yicha</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border-2 border-gray-200 dark:border-gray-700">
                      <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-xl mb-4 animate-pulse"></div>
                      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4 animate-pulse"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        <div className="h-10 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : cars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {cars.map((car) => (
                    <CarCard 
                      key={car._id} 
                      id={car._id}
                      name={car.name}
                      image={car.image}
                      price={car.price}
                      passengers={car.passengers}
                      transmission={car.transmission}
                      fuel={car.fuel}
                      rating={car.rating}
                      brand={car.brand}
                      model={car.model}
                      year={car.year}
                      engine={car.engine}
                      color={car.color}
                      mileage={car.mileage}
                      location={car.location}
                      features={car.features}
                      category={car.category}
                      onBookingComplete={handleBookingComplete}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-xl font-semibold mb-2">Avtomobil topilmadi</h3>
                  <p className="text-muted-foreground">Filtrlarni o'zgartirib qaytadan urinib ko'ring</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;