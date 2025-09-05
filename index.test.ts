import { Package } from ".";
import { describe, expect, it, beforeEach, afterEach, mock } from "bun:test";

// Mock package
const mockPackage = mock();

beforeEach(() => {
  // Mock a package, default is standard
  mockPackage.mockReturnValue(new Package(99, 99, 99, 10));
});
afterEach(() => {
  // Reset mock
  mockPackage.mockReset();
});
describe("Tests for sort()", () => {
  describe("standard", () => {
    it("low volume, low mass", () => {
      // Mock small package
      mockPackage.mockReturnValue(new Package(10, 10, 10, 2));
      const result = mockPackage().sort();
      expect(result).toBe("STANDARD");
    });
    it("medium volume, low medium mass", () => {
      // Use default mocked package (100cm x 100cm x 100cm, 10kg)
      const result = mockPackage().sort();
      expect(result).toBe("STANDARD");
    });
    it("high volume, high mass", () => {
      // Mock large package
      mockPackage.mockReturnValue(new Package(99, 99, 99, 19));
      const result = mockPackage().sort();
      expect(result).toBe("STANDARD");
    });
    it("long width", () => {
      // Mock normal sized package w/ long width
      mockPackage.mockReturnValue(new Package(149, 49, 49, 10));
      const result = mockPackage().sort();
      expect(result).toBe("STANDARD");
    });
    it("long height", () => {
      // Mock normal sized package w/ long height
      mockPackage.mockReturnValue(new Package(49, 149, 49, 10));
      const result = mockPackage().sort();
      expect(result).toBe("STANDARD");
    });
    it("long length", () => {
      // Mock normal sized package w/ long length
      mockPackage.mockReturnValue(new Package(49, 49, 149, 10));
      const result = mockPackage().sort();
      expect(result).toBe("STANDARD");
    });
  });
  describe("special", () => {
    it("bulky via width", () => {
      // Mock bulky package via long width
      mockPackage.mockReturnValue(new Package(150, 49, 49, 10));
      const result = mockPackage().sort();
      expect(result).toBe("SPECIAL");
    });
    it("bulky via height", () => {
      // Mock bulky package via long height
      mockPackage.mockReturnValue(new Package(49, 150, 49, 10));
      const result = mockPackage().sort();
      expect(result).toBe("SPECIAL");
    });
    it("bulky via length", () => {
      // Mock bulky package via long length
      mockPackage.mockReturnValue(new Package(49, 49, 150, 10));
      const result = mockPackage().sort();
      expect(result).toBe("SPECIAL");
    });
    it("bulky via volume", () => {
      // Mock bulky package via volume
      mockPackage.mockReturnValue(new Package(100, 100, 100, 10));
      const result = mockPackage().sort();
      expect(result).toBe("SPECIAL");
    });
    it("heavy", () => {
      // Mock bulky package via volume
      mockPackage.mockReturnValue(new Package(49, 49, 49, 20));
      const result = mockPackage().sort();
      expect(result).toBe("SPECIAL");
    });
  });
  describe("rejected", () => {
    it("bulky via width + heavy", () => {
      // Mock bulky package via long width
      mockPackage.mockReturnValue(new Package(150, 49, 49, 20));
      const result = mockPackage().sort();
      expect(result).toBe("REJECTED");
    });
    it("bulky via height + heavy", () => {
      // Mock bulky package via long height
      mockPackage.mockReturnValue(new Package(49, 150, 49, 20));
      const result = mockPackage().sort();
      expect(result).toBe("REJECTED");
    });
    it("bulky via length + heavy", () => {
      // Mock bulky package via long length
      mockPackage.mockReturnValue(new Package(49, 49, 150, 20));
      const result = mockPackage().sort();
      expect(result).toBe("REJECTED");
    });
    it("bulky via volume + heavy", () => {
      // Mock bulky package via volume
      mockPackage.mockReturnValue(new Package(100, 100, 100, 20));
      const result = mockPackage().sort();
      expect(result).toBe("REJECTED");
    });
  });
});
