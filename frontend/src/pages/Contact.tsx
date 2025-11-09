import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import PhoneInput9Digits from "@/components/PhoneInput9Digits";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { contactApi } from "@/lib/api";

const Contact = () => {
  const [showMap, setShowMap] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const contactInfo = [
    {
      icon: MapPin,
      title: "Manzil",
      content: "Toshkent sh., Amir Temur ko'chasi 108",
      showMap: true,
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "+998 90 123 45 67",
    },
    {
      icon: Phone,
      title: "Admin telefon raqamlari",
      content: [
        "Admin 1: +998 90 123 45 67",
        "Admin 2: +998 91 234 56 78",
        "Admin 3: +998 92 345 67 89"
      ],
    },
    {
      icon: Clock,
      title: "Ish vaqti",
      content: "Dush-Yak: 24/7",
    },
  ];

  const openMap = (address: string) => {
    setSelectedAddress(address);
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
    setSelectedAddress("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.subject || !formData.message) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      
      const response = await contactApi.send(formData);

      if (response.success) {
        toast.success("Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.", {
          position: "top-center",
          duration: 4000,
        });
        
        // Formani tozalash
        setFormData({
          name: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        toast.error(response.message || "Xabar yuborishda xatolik", {
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error('Xabar yuborishda xatolik:', error);
      const errorMessage = error.response?.data?.message || error.message || "Xabar yuborishda xatolik yuz berdi";
      toast.error(errorMessage, {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 sm:pt-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Biz bilan bog'laning
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Savollaringiz bormi? Biz doim yordam berishga tayyormiz!
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Contact Form */}
            <div>
              <Card className="p-4 sm:p-6 md:p-8 border-2 border-blue-500">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Xabar yuboring</h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Ismingiz *
                      </label>
                      <Input 
                        placeholder="Ismingizni kiriting" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Telefon *
                      </label>
                      <PhoneInput9Digits
                        value={formData.phone}
                        onChange={(value) => setFormData({...formData, phone: value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Mavzu *
                    </label>
                    <Input 
                      placeholder="Xabar mavzusi" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Xabar *
                    </label>
                    <Textarea
                      placeholder="Xabaringizni yozing..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Yuborilmoqda...
                      </>
                    ) : (
                      "Xabar yuborish"
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Info */}
            <div>
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border-2 border-blue-500"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-primary to-accent rounded-lg sm:rounded-xl flex-shrink-0">
                        <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base mb-1">{info.title}</h3>
                        {Array.isArray(info.content) ? (
                          <ul className="text-muted-foreground text-xs sm:text-sm list-disc pl-4 sm:pl-5 space-y-1">
                            {info.content.map((item, itemIndex) => (
                              <li key={itemIndex} className="break-words">{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-muted-foreground text-xs sm:text-sm break-words">{info.content}</p>
                        )}
                        {info.showMap && typeof info.content === 'string' && (
                          <button 
                            className="mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm font-medium"
                            onClick={() => openMap(info.content as string)}
                          >
                            Xaritada ko'rish
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>


            </div>
          </div>
        </div>
      </div>
      
      {showMap && selectedAddress && (
        <MapComponent 
          address={selectedAddress} 
          onClose={closeMap} 
        />
      )}
    </div>
  );
};

export default Contact;
