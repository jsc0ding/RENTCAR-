import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, Phone, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { carsApi, type Car } from "@/lib/api";
import PhoneInput9Digits from "@/components/PhoneInput9Digits";

interface BookingModalProps {
  car: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  onBookingComplete?: () => void; // Add this prop to refresh car lists
}

const BookingModal = ({ car, onBookingComplete }: BookingModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    startDate: "",
    endDate: "",
    pickupLocation: "Toshkent shahri",
    notes: ""
  });

  // Bugungi sanani olish (YYYY-MM-DD formatida)
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Sanani o'zbekcha formatlash
  const formatDateUzbek = (dateString: string) => {
    if (!dateString) return "";
    
    try {
      // YYYY-MM-DD formatidan Date obyektini yaratish (timezone muammosini oldini olish)
      const [yearStr, monthStr, dayStr] = dateString.split('-');
      const year = parseInt(yearStr);
      const month = parseInt(monthStr);
      const day = parseInt(dayStr);
      
      // Date obyektini yaratish (month 0-11 oralig'ida)
      const date = new Date(year, month - 1, day);
      
      const months = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
        "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
      ];
      const weekDays = [
        "Yakshanba", "Dushanba", "Seshanba", "Chorshanba", 
        "Payshanba", "Juma", "Shanba"
      ];
      
      const monthName = months[date.getMonth()];
      const weekDay = weekDays[date.getDay()];
      
      return `${day} ${monthName} ${year}, ${weekDay}`;
    } catch (error) {
      console.error('Sanani formatlashda xatolik:', error);
      return dateString;
    }
  };

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate + 'T00:00:00');
      const end = new Date(formData.endDate + 'T00:00:00');
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    return 1;
  };

  const totalPrice = calculateDays() * car.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.startDate || !formData.endDate) {
      toast.error("Iltimos, barcha majburiy maydonlarni to'ldiring", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    // Telefon raqam validatsiyasi
    if (formData.phone.length !== 9) {
      toast.error("Telefon raqami 9 ta raqamdan iborat bo'lishi kerak", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    // Sana validatsiyasi
    const startDate = new Date(formData.startDate + 'T00:00:00');
    const endDate = new Date(formData.endDate + 'T00:00:00');
    
    if (startDate > endDate) {
      toast.error("Tugash sanasi boshlanish sanasidan oldin bo'lishi mumkin emas", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    
    if (calculateDays() < 1) {
      toast.error("Kamida 1 kunlik ijara bo'lishi kerak", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      
      // Update car availability to false (rented)
      const response = await carsApi.update(car.id, { available: false });
      
      if (response.success) {
        toast.success(`${car.name} muvaffaqiyatli ijaraga olindi! Jami: $${totalPrice}`, {
          position: "top-center",
          duration: 5000,
        });
        setOpen(false);
        setFormData({
          fullName: "",
          phone: "",
          startDate: "",
          endDate: "",
          pickupLocation: "Tashkent",
          notes: ""
        });
        
        // Call the callback to refresh car lists
        if (onBookingComplete) {
          onBookingComplete();
        }
        
        // In a real app, you would also create a booking record
        console.log('Booking data:', {
          car,
          customer: formData,
          totalPrice,
          days: calculateDays()
        });
      } else {
        toast.error(response.message || "Ijaraga olishda xatolik", {
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Ijaraga olishda xatolik:', error);
      toast.error("Ijaraga olishda xatolik yuz berdi", {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity flex-1 sm:flex-none text-xs sm:text-sm">
          Ijaraga olish
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ijaraga olish</DialogTitle>
        </DialogHeader>
        
        {/* Car Info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-3 sm:p-4 rounded-lg mb-4 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src={car.image} alt={car.name} className="w-12 h-10 sm:w-16 sm:h-12 object-cover rounded" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{car.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">${car.price}/kun</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">To'liq ism *</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="Ismingizni kiriting"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Telefon raqam *
            </Label>
            <PhoneInput9Digits
              id="phone"
              value={formData.phone}
              onChange={(value) => setFormData({...formData, phone: value})}
              required
            />
          </div>

          <div className="space-y-4">
            <div>
              <Label 
                htmlFor="startDate" 
                className="text-sm font-semibold flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                onClick={() => {
                  const input = document.getElementById('startDate') as HTMLInputElement;
                  if (input && typeof input.showPicker === 'function') {
                    input.showPicker();
                  } else {
                    input?.focus();
                  }
                }}
              >
                <Calendar className="h-4 w-4 text-primary" />
                Qaysi kundan boshlab olmoqchisiz? *
              </Label>
              <div className="relative">
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => {
                    const newStartDate = e.target.value;
                    setFormData({
                      ...formData, 
                      startDate: newStartDate,
                      // Agar tugash sanasi boshlanish sanasidan oldin bo'lsa, uni tozalash
                      endDate: formData.endDate && newStartDate > formData.endDate ? "" : formData.endDate
                    });
                  }}
                  onKeyPress={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  min={getTodayDate()}
                  required
                  className="text-sm mt-2 cursor-pointer"
                  lang="uz-UZ"
                />
                <div 
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                >
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              {formData.startDate && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                  ✓ Tanlangan: {formatDateUzbek(formData.startDate)}
                </p>
              )}
            </div>
            <div>
              <Label 
                htmlFor="endDate" 
                className="text-sm font-semibold flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                onClick={() => {
                  if (formData.startDate) {
                    const input = document.getElementById('endDate') as HTMLInputElement;
                    if (input && typeof input.showPicker === 'function') {
                      input.showPicker();
                    } else {
                      input?.focus();
                    }
                  }
                }}
              >
                <Calendar className="h-4 w-4 text-primary" />
                Qaysi kungacha foydalanasiz? *
              </Label>
              <div className="relative">
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  onKeyPress={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  min={formData.startDate || getTodayDate()}
                  disabled={!formData.startDate}
                  required
                  className="text-sm mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  lang="uz-UZ"
                />
                <div 
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                >
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              {!formData.startDate && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  ⚠️ Avval boshlanish sanasini tanlang
                </p>
              )}
              {formData.endDate && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                  ✓ Tanlangan: {formatDateUzbek(formData.endDate)}
                </p>
              )}
            </div>
            {formData.startDate && formData.endDate && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  📅 Ijara muddati: {calculateDays()} kun
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  {formatDateUzbek(formData.startDate)} dan {formatDateUzbek(formData.endDate)} gacha
                </p>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="pickupLocation" className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Mashinani qayerdan olib ketasiz?
            </Label>
            <Select value={formData.pickupLocation} onValueChange={(value) => setFormData({...formData, pickupLocation: value})}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Viloyatni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Toshkent shahri">Toshkent shahri</SelectItem>
                <SelectItem value="Toshkent viloyati">Toshkent viloyati</SelectItem>
                <SelectItem value="Andijon">Andijon</SelectItem>
                <SelectItem value="Buxoro">Buxoro</SelectItem>
                <SelectItem value="Farg'ona">Farg'ona</SelectItem>
                <SelectItem value="Jizzax">Jizzax</SelectItem>
                <SelectItem value="Xorazm">Xorazm</SelectItem>
                <SelectItem value="Namangan">Namangan</SelectItem>
                <SelectItem value="Navoiy">Navoiy</SelectItem>
                <SelectItem value="Qashqadaryo">Qashqadaryo</SelectItem>
                <SelectItem value="Qoraqalpog'iston">Qoraqalpog'iston Respublikasi</SelectItem>
                <SelectItem value="Samarqand">Samarqand</SelectItem>
                <SelectItem value="Sirdaryo">Sirdaryo</SelectItem>
                <SelectItem value="Surxondaryo">Surxondaryo</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Biz mashinani tanlangan viloyatga yetkazib beramiz
            </p>
          </div>

          <div>
            <Label htmlFor="notes" className="text-sm font-semibold">
              Qo'shimcha izoh (ixtiyoriy)
            </Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Maxsus talablar yoki izohlar..."
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Agar maxsus talablaringiz bo'lsa, bu yerda yozing
            </p>
          </div>

          {/* Price Summary */}
          {formData.startDate && formData.endDate && calculateDays() > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border-2 border-green-200 dark:border-green-700">
              <h3 className="font-semibold text-sm mb-3 text-green-900 dark:text-green-100">
                💰 To'lov hisob-kitobi
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Kunlar soni:</span>
                  <span className="font-semibold">{calculateDays()} kun</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Kunlik narx:</span>
                  <span className="font-semibold">${car.price}</span>
                </div>
                <div className="border-t-2 border-green-200 dark:border-green-700 pt-2 flex justify-between items-center">
                  <span className="font-bold text-base">Jami to'lov:</span>
                  <span className="font-bold text-xl text-primary">${totalPrice}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2 pt-4">
            <Button type="button" onClick={() => setOpen(false)} className="border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full sm:w-auto">
              Bekor qilish
            </Button>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Tasdiqlanmoqda...
                </>
              ) : (
                "Tasdiqlash"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;