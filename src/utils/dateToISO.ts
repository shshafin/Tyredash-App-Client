interface IDate {
  calender: {
    identifier: string;
  };
  day: number;
  era: string;
  month: number;
  year: number;
}
export const dateToISO = (date: IDate) => {
  if (!date) {
    return new Date().toISOString();
  }
  return new Date(`${date.month}-${date.day}-${date.year}`).toISOString();
};
