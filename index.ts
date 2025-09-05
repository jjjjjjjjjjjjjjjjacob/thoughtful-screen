type Stack = "STANDARD" | "SPECIAL" | "REJECTED";

export const sort = (
  width: number,
  height: number,
  length: number,
  mass: number,
): Stack => {
  // Set bulky to false, assume not bulky
  let isBulky = false;

  // Mark heavy if mass threshold is met
  let isHeavy = mass >= 20;

  // Calculate volume
  const volume = width * height * length;

  // Check if package is bulky
  if (volume >= 1_000_000 || width >= 150 || height >= 150 || length >= 150) {
    isBulky = true;
  }

  // Sort the package based on size & weight
  if (isBulky && isHeavy) {
    return "REJECTED";
  } else if (isBulky || isHeavy) {
    return "SPECIAL";
  }
  return "STANDARD";
};

export class Package {
  width: number;
  height: number;
  length: number;
  mass: number;

  /**
   * Create a new Package.
   *
   * @param width - Width in centimeters (cm).
   * @param height - Height in centimeters (cm).
   * @param length - Length in centimeters (cm).
   * @param mass - Mass in kilograms (kg).
   */
  constructor(width: number, height: number, length: number, mass: number) {
    this.width = width;
    this.height = height;
    this.length = length;
    this.mass = mass;
  }

  sort() {
    return sort(this.width, this.height, this.length, this.mass);
  }
}
