export function formatDate(strDate: string) {
  const date = new Date(strDate);
  const formatted = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;

  return formatted;
}
