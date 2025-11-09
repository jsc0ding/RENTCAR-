import { Input } from "@/components/ui/input";

interface PhoneInput9DigitsProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

const PhoneInput9Digits = ({ 
  value, 
  onChange, 
  placeholder = "90 123 45 67",
  required = false,
  className = "",
  id
}: PhoneInput9DigitsProps) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Faqat raqamlarni qoldirish
    const digitsOnly = input.replace(/\D/g, '');
    
    // 9 ta raqamgacha cheklash
    const limitedDigits = digitsOnly.slice(0, 9);
    
    onChange(limitedDigits);
  };

  // Formatlangan ko'rinish (90 123 45 67)
  const formatPhoneNumber = (phone: string) => {
    if (phone.length <= 2) return phone;
    if (phone.length <= 5) return `${phone.slice(0, 2)} ${phone.slice(2)}`;
    if (phone.length <= 7) return `${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5)}`;
    return `${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 7)} ${phone.slice(7)}`;
  };

  const isValid = value.length === 9;
  const hasError = value.length > 0 && value.length < 9;

  return (
    <div className="space-y-1">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
          +998
        </span>
        <Input
          id={id}
          type="tel"
          value={formatPhoneNumber(value)}
          onChange={handleInputChange}
          placeholder={placeholder}
          required={required}
          className={`pl-16 ${className}`}
          maxLength={12} // 9 raqam + 3 ta bo'sh joy
        />
      </div>
      
      {hasError && (
        <p className="text-xs text-red-600 dark:text-red-400">
          ⚠️ Telefon raqami 9 ta raqamdan iborat bo'lishi kerak
        </p>
      )}
      
      {isValid && (
        <p className="text-xs text-green-600 dark:text-green-400 font-medium">
          ✓ To'g'ri kiritildi: +998 {formatPhoneNumber(value)}
        </p>
      )}
      
      {!value && (
        <p className="text-xs text-muted-foreground">
          9 ta raqam kiriting (masalan: 901234567)
        </p>
      )}
    </div>
  );
};

export default PhoneInput9Digits;