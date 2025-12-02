export function toEnglishDigits(str: string): string {
  return str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
}

export function isJalaliLeap(year: number): boolean {
  return [1, 5, 9, 13, 17, 22, 26, 30].includes(year % 33)
}