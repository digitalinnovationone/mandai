/**
 * Money VO — wraps integer cents to prevent float arithmetic bugs.
 *
 * Didactic: illustrates a Value Object that enforces invariants (non-negative)
 * and provides formatting behaviour. No identity — equality is by value.
 */
export class Money {
  private readonly _cents: number;

  constructor(cents: number) {
    if (!Number.isInteger(cents) || cents < 0) {
      throw new Error(`Money must be a non-negative integer (cents). Received: ${cents}`);
    }
    this._cents = cents;
  }

  get cents(): number {
    return this._cents;
  }

  /** Formats as Brazilian Real: "R$ 12,90" */
  format(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this._cents / 100);
  }

  add(other: Money): Money {
    return new Money(this._cents + other._cents);
  }

  subtract(other: Money): Money {
    const result = this._cents - other._cents;
    if (result < 0) {
      throw new Error(`Money subtraction resulted in negative value: ${result}`);
    }
    return new Money(result);
  }

  equals(other: Money): boolean {
    return this._cents === other._cents;
  }

  static zero(): Money {
    return new Money(0);
  }
}
