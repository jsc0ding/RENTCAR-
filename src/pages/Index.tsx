import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Award } from "lucide-react";
import heroImage from "@/assets/hero-car.jpg";
import { carsApi, type Car } from "@/lib/api";
import { NavLink } from "react-router-dom";

const Index = () => {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedCars();
  }, []);

  const loadFeaturedCars = async () => {
    try {
      const response = await carsApi.getAll();
      if (response.success && response.data) {
        // Get top 3 highest rated available cars
        const topCars = response.data
          .filter(car => car.available)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setFeaturedCars(topCars);
      }
    } catch (error) {
      console.error('Mashhur mashinalarni yuklashda xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingComplete = () => {
    // Refresh the featured cars list after a booking
    loadFeaturedCars();
  };

  const features = [
    {
      icon: Shield,
      title: "Xavfsiz to'lov",
      description: "100% himoyalangan to'lov tizimi",
    },
    {
      icon: Clock,
      title: "24/7 qo'llab-quvvatlash",
      description: "Har doim sizning xizmatingizdamiz",
    },
    {
      icon: Award,
      title: "Eng yaxshi narxlar",
      description: "Bozordagi eng qulay tariflar",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Orzuingizdagi avtomobilni ijaraga oling
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-primary-foreground/90">
              Premium avtomobillar eng qulay narxlarda. Istalgan vaqt, istalgan joy.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Mashhur avtomobillar
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Eng zo'r takliflarimiz bilan tanishing
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {featuredCars.map((car) => (
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
                  onBookingComplete={handleBookingComplete}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <NavLink to="/cars">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm sm:text-base"
              >
                Barcha avtomobillarni ko'rish
              </Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Nima uchun bizni tanlaysiz?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-primary to-accent rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Bugun safarga chiqishga tayyormisiz?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Bizning keng tanlangan avtomobillarimiz orqali unutilmas sayohat qiling
          </p>
          <NavLink to="/cars">
            <Button
              size="lg"
              className="bg-card text-primary hover:bg-card/90 text-base sm:text-lg px-6 py-5 sm:px-8 sm:py-6"
            >
              Hoziroq boshlash
            </Button>
          </NavLink>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                LuxRent
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Premium avtomobillar ijarasi xizmati
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Xizmatlar</h4>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>Avtomobil ijarasi</li>
                <li>Haydovchi xizmati</li>
                <li>Uzoq muddatli ijara</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Kompaniya</h4>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>Biz haqimizda</li>
                <li>Aloqa</li>
                <li>Hamkorlik</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Aloqa</h4>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>+998 90 123 45 67</li>
                <li>info@luxrent.uz</li>
                <li>Toshkent, O'zbekiston</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base text-muted-foreground">
            <p>&copy; 2024 LuxRent. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;