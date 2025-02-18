function validateIBAN(iban: string): boolean {
  if (!iban) return false;

  // Leerzeichen entfernen und uppercase
  const trimmedIban = iban.replace(/\s+/g, "").toUpperCase();

  // Minimale Länge checken (15) und maximale Länge (34)
  if (trimmedIban.length < 15 || trimmedIban.length > 34) {
    return false;
  }

  // Die ersten 4 Zeichen ans Ende
  const rearranged = trimmedIban.slice(4) + trimmedIban.slice(0, 4);

  // Buchstaben -> Zahlen (A=10, B=11, ...)
  let numericString = "";
  for (let i = 0; i < rearranged.length; i++) {
    const char = rearranged[i];
    if (/[A-Z]/.test(char)) {
      numericString += (char.charCodeAt(0) - 55).toString();
    } else {
      numericString += char;
    }
  }

  // mod 97 in "Chunks" berechnen
  let remainder = 0;
  let block = "";

  for (const digit of numericString) {
    block = remainder.toString() + digit;
    remainder = parseInt(block, 10) % 97;
  }

  return remainder === 1;
}

export default validateIBAN;
