import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

/**
 * Bu komponent turli ekran o'lchamlari uchun misol
 * Loyihangizda kerak bo'lgan joylarda ishlatishingiz mumkin
 */
const ResponsiveExample = () => {
  const { isMobile, isTablet, isDesktop, isSmallMobile } = useMediaQuery();

  return (
    <div className="p-4 bg-card rounded-lg border-2 border-primary">
      <h3 className="text-lg font-bold mb-4">Ekran turi:</h3>
      
      {isSmallMobile && (
        <div className="flex items-center gap-2 text-orange-600">
          <Smartphone className="h-5 w-5" />
          <span>Kichik telefon (374px dan kichik)</span>
        </div>
      )}
      
      {isMobile && !isSmallMobile && (
        <div className="flex items-center gap-2 text-blue-600">
          <Smartphone className="h-5 w-5" />
          <span>Telefon (640px gacha)</span>
        </div>
      )}
      
      {isTablet && (
        <div className="flex items-center gap-2 text-green-600">
          <Tablet className="h-5 w-5" />
          <span>Planshet (640px - 1024px)</span>
        </div>
      )}
      
      {isDesktop && (
        <div className="flex items-center gap-2 text-purple-600">
          <Monitor className="h-5 w-5" />
          <span>Desktop (1024px dan katta)</span>
        </div>
      )}

      <div className="mt-4 p-3 bg-secondary rounded text-sm">
        <p className="font-semibold mb-2">Foydalanish:</p>
        <code className="text-xs">
          const &#123; isMobile, isTablet, isDesktop &#125; = useMediaQuery();
        </code>
      </div>
    </div>
  );
};

export default ResponsiveExample;
