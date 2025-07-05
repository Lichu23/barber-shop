
export function formatDate(bookingDate : Date | null) {
  return bookingDate ? bookingDate.toISOString().substring(0, 10) : '';

}

//modificar formateo