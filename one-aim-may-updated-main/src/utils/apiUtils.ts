import axios, { AxiosRequestConfig } from "axios";

export const fetchData = async <T>(
  endpoint: string,
  customConfig?: AxiosRequestConfig
): Promise<T | undefined> => {
  const defaultConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    },
  };

  const config = { ...defaultConfig, ...customConfig };

  try {
    const response = await axios.get<T>(
      `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
      config
    );
    return response.data;
  } catch (err) {
    console.error(`Error fetching data from ${endpoint}:`, err);
  }
};
