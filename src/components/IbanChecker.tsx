import React, { useState } from "react";
import validateIBAN from "../services/ibanValidator";
import { countries, Country } from "../services/countries";

const IbanChecker: React.FC = () => {
  const [ibanInput, setIbanInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [countryFlagUrl, setCountryFlagUrl] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [copied, setCopied] = useState(false);

  // IBAN automatisch formatieren (Leerzeichen einfügen)
  const formatIBAN = (iban: string) => {
    return iban
      .replace(/\s+/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  // Aktualisiert das IBAN-Feld und die Flagge
  const handleIbanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/\s+/g, "");
    setIbanInput(formatIBAN(value));
    updateCountryFlag(value);
  };

  // Überprüft die IBAN und aktualisiert den Status
  const handleIbanCheck = () => {
    setIsValid(validateIBAN(ibanInput.replace(/\s+/g, "")));
  };

  // Setzt das IBAN-Präfix, wenn ein Land gewählt wird
  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedCountry(code);
    setIbanInput(formatIBAN(code));
    setCountryFlagUrl(`https://flagcdn.com/w160/${code.toLowerCase()}.png`);
  };

  // Kopiert die IBAN in die Zwischenablage
  const copyToClipboard = () => {
    navigator.clipboard.writeText(ibanInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Aktualisiert die Flagge basierend auf der IBAN
  const updateCountryFlag = (iban: string) => {
    const countryCode = iban.slice(0, 2).toUpperCase();
    const foundCountry: Country | undefined = countries.find(
      (c) => c.code === countryCode
    );
    setSelectedCountry(foundCountry ? foundCountry.code : "");
    setCountryFlagUrl(
      foundCountry
        ? `https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`
        : null
    );
  };

  return (
    <div className="container">
      <div className="card">
        <h1>IBAN Checker</h1>
        <p>Gib eine IBAN ein oder wähle ein Land.</p>

        <div className="iban-section">
          <input
            type="text"
            placeholder="IBAN eingeben..."
            value={ibanInput}
            onChange={handleIbanChange}
            className={`iban-input ${isValid === true ? "valid" : isValid === false ? "invalid" : ""}`}
          />
          <button onClick={handleIbanCheck} className="check-button">
            Prüfen
          </button>
          <button onClick={copyToClipboard} className="copy-button">
            📋 Kopieren
          </button>
        </div>

        {isValid !== null && (
          <p className={isValid ? "success-message" : "error-message"}>
            {isValid ? "✅ Gültige IBAN!" : "❌ Ungültige IBAN!"}
          </p>
        )}

        {copied && <p className="copy-success">✔️ IBAN kopiert!</p>}

        {countryFlagUrl && (
          <div className="flag-container">
            <img src={countryFlagUrl} alt="Flagge" className="flag-image" />
          </div>
        )}

        <hr />

        <div className="country-section">
          <h3>Manuelle Länderwahl</h3>
          <select
            value={selectedCountry}
            onChange={handleCountrySelect}
            className="country-select"
          >
            <option value="">-- Land auswählen --</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default IbanChecker;
