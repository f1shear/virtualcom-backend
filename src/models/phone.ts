const phoneNumbers: Record<number, null> = {};

/* special numbers */
phoneNumbers[9000000000] = null;
phoneNumbers[9999999999] = null;

const generateNumber = (digitCount: number): number => {
  const minm = 9 * digitCount ** 9;
  const maxm = digitCount ** 10 - 1;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
};

export const registerNumber = (): number => {
  while (true) {
    const n = generateNumber(10);
    if (n in phoneNumbers) continue;
    else {
      phoneNumbers[n] = null;
      return n;
    }
  }
};

export const phoneExists = (phone: number): boolean => {
  return Boolean(phoneNumbers[phone] !== undefined);
};

export const listPhones = (): number[] => {
  return Object.keys(phoneNumbers).map((x) => parseInt(x, 10));
};
