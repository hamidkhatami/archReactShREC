export function isJalaliLeap(year: number): boolean {
  return [1,5,9,13,17,22,26,30].includes(year % 33);
}

export function validateJalaliDate(dateStr: string): boolean {
    
      if (typeof dateStr !== "string") return false;

   
    const jalaliDateRegex = /^(13|14)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/
  const match = dateStr.match(jalaliDateRegex);

  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (month < 1 || month > 12) return false;

  const daysInMonth = [
    31, 31, 31, 31, 31, 31,
    30, 30, 30, 30, 30,
    isJalaliLeap(year) ? 30 : 29
  ][month - 1];

  return day >= 1 && day <= daysInMonth;
}
