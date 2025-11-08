import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Car, Users, DollarSign, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { carsApi, statsApi, type Car as CarType, type Stats } from "@/lib/api";
import AddCarModal from "@/components/AddCarModal";
import EditCarModal from "@/components/EditCarModal";
import { isAdminAuthenticated, clearAdminSession } from "@/utils/auth";

const Admin = () => {
  const navigate = useNavigate();

  // Admin autentifikatsiyasini tekshirish
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      toast.error("Admin panelga kirish uchun avval tizimga kiring!", {
        position: "top-center",
        duration: 3000,
      });
      navigate("/");
    } else {
      // Admin panelga kirgandan keyin avtomatik chiqish
      clearAdminSession();
    }
  }, [navigate]);
  const [cars, setCars] = useState<CarType[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [carsLoading, setCarsLoading] = useState(false);
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [bookings] = useState([
    { id: 1, customer: "Alisher Rahimov", car: "BMW X7", date: "2024-11-15", status: "Faol" },
    { id: 2, customer: "Nodira Karimova", car: "Mercedes S-Class", date: "2024-11-18", status: "Kutilmoqda" },
  ]);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Admin uchun barcha mashinalarni olish (parametrsiz)
      const carsResponse = await carsApi.getAll();
      const statsResponse = await statsApi.get();

      if (carsResponse.success && carsResponse.data) {
        setCars(carsResponse.data);
      }

      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }
    } catch (error) {
      console.error('Ma\'lumotlarni yuklashda xatolik:', error);
      toast.error('Ma\'lumotlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const statsCards = stats ? [
    { icon: Car, label: "Jami avtomobillar", value: stats.totalCars.toString(), color: "from-blue-500 to-blue-600" },
    { icon: Users, label: "Mavjud avtomobillar", value: stats.availableCars.toString(), color: "from-green-500 to-green-600" },
    { icon: DollarSign, label: "O'rtacha narx", value: `$${Math.round(stats.avgPrice)}`, color: "from-purple-500 to-purple-600" },
    { icon: Calendar, label: "Ijaradagi avtomobillar", value: stats.rentedCars.toString(), color: "from-orange-500 to-orange-600" },
  ] : [];

  const handleEditCar = (car: CarType) => {
    setEditingCar(car);
    setEditModalOpen(true);
  };

  const handleDeleteCar = async (id: string) => {
    try {
      setCarsLoading(true);
      const response = await carsApi.delete(id);
      
      if (response.success) {
        toast.success("Avtomobil muvaffaqiyatli o'chirildi");
        await loadData(); // Reload data
      } else {
        toast.error(response.message || "Avtomobilni o'chirishda xatolik");
      }
    } catch (error) {
      console.error('Avtomobilni o\'chirishda xatolik:', error);
      toast.error("Avtomobilni o'chirishda xatolik yuz berdi");
    } finally {
      setCarsLoading(false);
    }
  };

  const toggleCarAvailability = async (id: string, currentStatus: boolean) => {
    try {
      setCarsLoading(true);
      const response = await carsApi.update(id, { available: !currentStatus });
      
      if (response.success) {
        toast.success(`Avtomobil holati ${!currentStatus ? "mavjud" : "ijarada"} ga o'zgartirildi`);
        await loadData(); // Reload data to update the UI
      } else {
        toast.error(response.message || "Avtomobil holatini o'zgartirishda xatolik");
      }
    } catch (error) {
      console.error('Avtomobil holatini o\'zgartirishda xatolik:', error);
      toast.error("Avtomobil holatini o'zgartirishda xatolik yuz berdi");
    } finally {
      setCarsLoading(false);
    }
  };

  const handleResetAllCars = async () => {
    const rentedCount = cars.filter(car => !car.available).length;
    
    if (!confirm(`${rentedCount} ta avtomobilni qaytarishni tasdiqlaysizmi?`)) {
      return;
    }

    try {
      setCarsLoading(true);
      const response = await fetch('http://localhost:5000/api/cars/reset-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`${data.count} ta avtomobil muvaffaqiyatli qaytarildi!`, {
          position: "top-center",
          duration: 4000,
        });
        await loadData(); // Reload data
      } else {
        toast.error(data.message || "Avtomobillarni qaytarishda xatolik");
      }
    } catch (error) {
      console.error('Avtomobillarni qaytarishda xatolik:', error);
      toast.error("Avtomobillarni qaytarishda xatolik yuz berdi");
    } finally {
      setCarsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 sm:pt-20">
        <div className="bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Admin Panel</h1>
            <p className="text-sm sm:text-base text-primary-foreground/90">Tizimni boshqarish va nazorat qilish</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 animate-pulse"></div>
                      <div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    </div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse"></div>
                  </div>
                </Card>
              ))
            ) : (
              statsCards.map((stat, index) => (
                <Card key={index} className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 font-medium">{stat.label}</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 sm:p-4 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
                      <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Main Content */}
          <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl">
            <Tabs defaultValue="cars" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6">
                <TabsTrigger value="cars" className="text-xs sm:text-sm">Avtomobillar</TabsTrigger>
                <TabsTrigger value="bookings" className="text-xs sm:text-sm">Bandlovlar</TabsTrigger>
                <TabsTrigger value="settings" className="text-xs sm:text-sm">Sozlamalar</TabsTrigger>
              </TabsList>

              <TabsContent value="cars" className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold">Avtomobillar ro'yxati</h2>
                  <AddCarModal onCarAdded={loadData} />
                </div>

                <div className="border rounded-lg overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[150px]">Nomi</TableHead>
                        <TableHead className="min-w-[100px]">Brend</TableHead>
                        <TableHead className="min-w-[60px]">Yil</TableHead>
                        <TableHead className="min-w-[100px]">Narx (kuniga)</TableHead>
                        <TableHead className="min-w-[120px]">Kategoriya</TableHead>
                        <TableHead className="min-w-[80px]">Holat</TableHead>
                        <TableHead className="min-w-[100px]">Joylashuv</TableHead>
                        <TableHead className="text-right min-w-[100px]">Amallar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading || carsLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <TableRow key={index}>
                            <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                          </TableRow>
                        ))
                      ) : cars.length > 0 ? (
                        cars.map((car) => (
                          <TableRow key={car._id}>
                            <TableCell className="font-medium">{car.name}</TableCell>
                            <TableCell>{car.brand}</TableCell>
                            <TableCell>{car.year}</TableCell>
                            <TableCell>${car.price}</TableCell>
                            <TableCell>{car.category}</TableCell>
                            <TableCell>
                              <button
                                onClick={() => toggleCarAvailability(car._id, car.available)}
                                className="p-0 bg-transparent border-0 cursor-pointer"
                                disabled={carsLoading}
                              >
                                <span
                                  className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                                    car.available
                                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                                      : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                  } ${carsLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                  {car.available ? "Mavjud" : "Ijarada"}
                                </span>
                              </button>
                            </TableCell>
                            <TableCell>{car.location}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                onClick={() => handleEditCar(car)}
                                disabled={carsLoading}
                                className="p-2 h-8 w-8 bg-transparent hover:bg-accent"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => handleDeleteCar(car._id)}
                                disabled={carsLoading}
                                className="p-2 h-8 w-8 bg-transparent hover:bg-accent"
                              >
                                {carsLoading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            Hech qanday avtomobil topilmadi
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">Band qilingan avtomobillar</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Jami: {cars.filter(car => !car.available).length} ta
                    </p>
                  </div>
                  {cars.filter(car => !car.available).length > 0 && (
                    <Button
                      onClick={handleResetAllCars}
                      disabled={carsLoading}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {carsLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Qaytarilmoqda...
                        </>
                      ) : (
                        <>
                          ✓ Barchasini qaytarish
                        </>
                      )}
                    </Button>
                  )}
                </div>
                
                {loading || carsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Card key={index} className="p-4 sm:p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 animate-pulse"></div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : cars.filter(car => !car.available).length > 0 ? (
                  <div className="grid gap-4">
                    {cars.filter(car => !car.available).map((car) => (
                      <Card key={car._id} className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-700 hover:shadow-lg transition-all">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <img 
                            src={car.image} 
                            alt={car.name}
                            className="w-full sm:w-24 h-20 sm:h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{car.name}</h3>
                                <p className="text-sm text-muted-foreground">{car.brand} {car.model} • {car.year}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 rounded-full text-xs font-medium">
                                  🚗 Ijarada
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span>💰 ${car.price}/kun</span>
                              <span>👥 {car.passengers} kishi</span>
                              <span>📍 {car.location}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 w-full sm:w-auto">
                            <Button
                              onClick={() => toggleCarAvailability(car._id, car.available)}
                              disabled={carsLoading}
                              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
                            >
                              {carsLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Qaytarilmoqda...
                                </>
                              ) : (
                                <>
                                  ✓ Qaytarildi
                                </>
                              )}
                            </Button>
                            <Button
                              onClick={() => handleEditCar(car)}
                              disabled={carsLoading}
                              variant="outline"
                              className="w-full sm:w-auto"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Tahrirlash
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 sm:p-12 text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-xl font-semibold mb-2">Barcha avtomobillar mavjud!</h3>
                    <p className="text-muted-foreground">Hozircha hech qanday avtomobil ijarada emas</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Sozlamalar</h2>
                <div className="space-y-4 max-w-full sm:max-w-2xl">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Kompaniya nomi
                    </label>
                    <Input defaultValue="LuxRent" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Email
                    </label>
                    <Input type="email" defaultValue="info@luxrent.uz" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Telefon
                    </label>
                    <Input defaultValue="+998 90 123 45 67" />
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Saqlash
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Edit Car Modal */}
      <EditCarModal
        car={editingCar}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onCarUpdated={loadData}
      />
    </div>
  );
};

export default Admin;