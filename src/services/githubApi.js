
import axios from "axios";
import { getStartDate } from "../utils/dateUtils";

const BASE_URL = "https://api.github.com";

export const fetchRepositories = async (period, page = 1) => {
  const date = getStartDate(period);

  const response = await axios.get(
    `${BASE_URL}/search/repositories`,
    {
      params: {
        q: `created:>${date}`,
        sort: "stars",
        order: "desc",
        page,
        per_page: 30,
      },
    }
  );

  return response.data;
};
