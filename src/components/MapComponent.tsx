import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MapComponentProps {
  address: string;
  onClose: () => void;
}

const MapComponent = ({ address, onClose }: MapComponentProps) => {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    // Create a Google Maps URL with the address
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyB3w5MGjJ8Uuwhj5R8K0KZQL6kL4bZ1XQc&q=${encodedAddress}`;
    setMapUrl(url);
  }, [address]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Manzil: {address}</h3>
        </div>
        
        <div className="h-[60vh] w-full">
          {mapUrl ? (
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Manzil xaritasi"
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p>Xarita yuklanmoqda...</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t text-sm text-muted-foreground">
          <p>Google Maps orqali ochilgan xarita</p>
        </div>
      </Card>
    </div>
  );
};

export default MapComponent;