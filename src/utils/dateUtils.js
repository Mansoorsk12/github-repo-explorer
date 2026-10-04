
export const getStartDate = (period) => {
  const date = new Date();

  switch (period) {
    case "1week":
      date.setDate(date.getDate() - 7);
      break;

    case "2weeks":
      date.setDate(date.getDate() - 14);
      break;

    case "1month":
      date.setMonth(date.getMonth() - 1);
      break;

    default:
      date.setMonth(date.getMonth() - 1);
  }

  return date.toISOString().split("T")[0];
};
