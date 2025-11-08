import { useState } from "react";
import { isValidPhoneNumber, formatNumber } from "libphonenumber-js";

const PhoneNumberExample = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [formattedNumber, setFormattedNumber] = useState("");

  const validatePhoneNumber = (value: string) => {
    setPhoneNumber(value);
    
    // Check if it's a valid phone number
    const valid = isValidPhoneNumber(value, "UZ"); // Assuming Uzbekistan numbers
    setIsValid(valid);
    
    // Format the phone number if valid
    if (valid) {
      try {
        const formatted = formatNumber(value, "UZ", "INTERNATIONAL");
        setFormattedNumber(formatted);
      } catch (error) {
        console.error("Error formatting phone number:", error);
      }
    } else {
      setFormattedNumber("");
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Telefon Raqam Tekshiruvchi</h2>
      
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Telefon raqamini kiriting:
        </label>
        <input
          id="phone"
          type="tel"
          value={phoneNumber}
          onChange={(e) => validatePhoneNumber(e.target.value)}
          placeholder="+998 90 123 45 67"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isValid !== null && (
        <div className={`p-3 rounded-md mb-4 ${isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {isValid ? "✅ To'g'ri telefon raqami" : "❌ Noto'g'ri telefon raqami"}
        </div>
      )}

      {formattedNumber && (
        <div className="p-3 bg-blue-100 text-blue-800 rounded-md">
          <p className="font-medium">Formatlangan raqam:</p>
          <p className="text-lg">{formattedNumber}</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>Misol: +998 90 123 45 67</p>
      </div>
    </div>
  );
};

export default PhoneNumberExample;