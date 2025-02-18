import { describe, it, expect } from "vitest";
import validateIBAN from "../services/ibanValidator";

describe("IBAN Validator", () => {
  it("should validate a correct German IBAN", () => {
    expect(validateIBAN("DE89370400440532013000")).toBe(true);
  });

  it("should fail on incorrect German IBAN", () => {
    expect(validateIBAN("DE00370400440532013000")).toBe(false);
  });

  it("should validate a correct French IBAN", () => {
    expect(validateIBAN("FR1420041010050500013M02606")).toBe(true);
  });

  it("should validate a correct Spanish IBAN", () => {
    expect(validateIBAN("ES7921000813610123456789")).toBe(true);
  });

  it("should validate a correct UK IBAN", () => {
    expect(validateIBAN("GB29NWBK60161331926819")).toBe(true);
  });

  it("should validate a correct Italian IBAN", () => {
    expect(validateIBAN("IT60X0542811101000000123456")).toBe(true);
  });

  it("should validate a correct Dutch IBAN", () => {
    expect(validateIBAN("NL91ABNA0417164300")).toBe(true);
  });

  it("should fail on too short IBAN", () => {
    expect(validateIBAN("DE12 3456")).toBe(false);
  });

  it("should fail on IBAN with invalid characters", () => {
    expect(validateIBAN("DE89@7040$0440532013000")).toBe(false);
  });

  it("should fail on IBAN with spaces in between", () => {
    expect(validateIBAN("DE89 3704 0044 0532 0130 00")).toBe(true);
  });

  it("should fail on IBAN with too many characters", () => {
    expect(validateIBAN("DE8937040044053201300000000000000")).toBe(false);
  });

  it("should fail on empty string", () => {
    expect(validateIBAN("")).toBe(false);
  });
});
