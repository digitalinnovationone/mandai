export class MenuItem {
  constructor(
    public readonly id: string,
    public readonly sectionId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly priceCents: number,
    public readonly imageUrl: string,
    public readonly available: boolean,
  ) {}

  /** Business rule: unavailable items cannot be added to orders. */
  ensureAvailable(): void {
    if (!this.available) {
      throw new Error(`Menu item "${this.name}" is currently unavailable.`);
    }
  }
}
