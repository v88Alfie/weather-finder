import { useQuery } from "@tanstack/react-query";

export const useFetchCityWeather = (city: string, temperature: boolean) => {
  const units = temperature ? "imperial" : "metrics";

  console.log(units, "units");

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`;

  const cityWeather = useQuery({
    queryKey: ["weather", city, temperature],
    queryFn: async () => {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return cityWeather;
};

export const useFetchCityForecast = (city: string, temperature: boolean) => {
  const units = temperature ? "imperial" : "metrics";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`;
  const timeTaken = "12:00:00";
  const dateToday = new Date().toISOString().split("T")[0];

  const cityForecast = useQuery({
    queryKey: ["forecast", city, temperature],
    queryFn: async () => {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const forecastItems: any[] = [];

  cityForecast?.data?.list.forEach((forecastWeather: any) => {
    if (
      forecastWeather.dt_txt.includes(timeTaken) &&
      !forecastWeather.dt_txt.includes(dateToday)
    ) {
      forecastItems.push(forecastWeather);
    }
  });

  return forecastItems;
};
