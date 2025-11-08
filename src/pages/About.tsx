import Navbar from "@/components/Navbar";
import { Shield, Award, Users, Target } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Ishonch",
      description: "Mijozlarimizning ishonchi bizning asosiy qadriyatimiz",
    },
    {
      icon: Award,
      title: "Sifat",
      description: "Faqat yuqori sifatli avtomobillar va xizmatlar",
    },
    {
      icon: Users,
      title: "Mijoz yo'naltirilganligi",
      description: "Har bir mijoz biz uchun muhim",
    },
    {
      icon: Target,
      title: "Professionallik",
      description: "Sohadagi tajribali mutaxassislar",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Biz haqimizda
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              O'zbekistondagi yetakchi premium avtomobil ijarasi xizmati
            </p>
          </div>
        </div>

        {/* Story Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Bizning hikoyamiz</h2>
              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-muted-foreground">
                <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                  LuxRent 2020-yilda O'zbekiston bozorida premium avtomobil ijarasi xizmatini taqdim etish maqsadida tashkil etilgan. Bizning maqsadimiz - mijozlarimizga yuqori sifatli, qulay va ishonchli transport xizmatlarini taklif etish.
                </p>
                <p className="mb-4">
                  Bugungi kunda biz 100 dan ortiq premium va lux sinf avtomobillarga ega bo'lib, har kuni minglab mijozlarimizga xizmat ko'rsatamiz. Bizning jamoamiz har doim siz uchun eng yaxshi xizmatni taqdim etishga tayyor.
                </p>
                <p>
                  Biz faqat avtomobil ijarasi emas, balki unutilmas tajriba va mukammal xizmat ko'rsatishga intilamiz. Har bir mijoz biz uchun alohida ahamiyatga ega.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Bizning qadriyatlarimiz</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-blue-500 p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex p-3 sm:p-4 bg-blue-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
                    <value.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">{value.title}</h3>
                  <p className="text-sm sm:text-base text-white/90">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
              <div className="p-4 sm:p-6 bg-blue-500 rounded-xl sm:rounded-2xl">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                  100+
                </div>
                <p className="text-xs sm:text-sm md:text-base text-white/90">Premium avtomobillar</p>
              </div>
              <div className="p-4 sm:p-6 bg-blue-500 rounded-xl sm:rounded-2xl">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                  5000+
                </div>
                <p className="text-xs sm:text-sm md:text-base text-white/90">Xursand mijozlar</p>
              </div>
              <div className="p-4 sm:p-6 bg-blue-500 rounded-xl sm:rounded-2xl">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                  24/7
                </div>
                <p className="text-xs sm:text-sm md:text-base text-white/90">Qo'llab-quvvatlash</p>
              </div>
              <div className="p-4 sm:p-6 bg-blue-500 rounded-xl sm:rounded-2xl">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                  4.9★
                </div>
                <p className="text-xs sm:text-sm md:text-base text-white/90">O'rtacha reyting</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
