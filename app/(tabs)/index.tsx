import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useDebouncedCallback } from "use-debounce";
import {
  useFetchCityWeather,
  useFetchCityForecast,
} from "@/hooks/useFetchCityWeather";
import { Switch } from "react-native-paper";
import moment from "moment";

const index = () => {
  const [searchQuery, setSearchQuery] = React.useState("Manila");
  const [temperature, setTemperature] = React.useState<boolean>(false);

  const fetchCityWeather = useFetchCityWeather(searchQuery, temperature);
  const fetchCityForecast = useFetchCityForecast(searchQuery, temperature);

  const debounced = useDebouncedCallback((value) => {
    setSearchQuery(value);
  }, 1000);

  if (fetchCityWeather.isLoading) {
    console.log("LOADING...");
  }

  const onToggleTemperatureSwitch = () => setTemperature(!temperature);

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <ImageBackground
        blurRadius={100}
        source={require("../../assets/images/mountain_bg.jpg")}
        className="absolute h-full w-full"
      >
        <SafeAreaView className="flex flex-1">
          <View style={{ height: "7%" }} className="mx-8 relative z-50">
            <View
              className="flex-row justify-end items-center rounded-full"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
            >
              <TextInput
                placeholder="Search City"
                placeholderTextColor={"gray"}
                className="pl-6 pb-1 h-10 flex-1 text-base text-gray-600"
                onChangeText={debounced}
              />
              <TouchableOpacity
                style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                className="rounded-full p-3 m-1"
              >
                <Entypo name="magnifying-glass" size={25} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="mx-8 flex gap-10 justify-around mb-2 mt-8">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <FontAwesome name="map-marker" size={20} color="gray" />
                <Text className="text-gray-600 text-2xl font-bold">
                  {fetchCityWeather?.data?.name},{" "}
                  {fetchCityWeather?.data?.sys.country}
                </Text>
              </View>
              <Text className="text-gray-600 text-2xl font-bold">
                {moment(new Date()).format("ddd, MMM D YY")}
              </Text>
            </View>
            {/* weather image */}
            <View className="flex-row items-center justify-center">
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${fetchCityWeather?.data?.weather[0].icon}@4x.png`,
                }}
                className="w-52 h-52"
              />
              <View className="space-y-2">
                <Text className="text-center font-bold text-gray-600 text-6xl ml-5">
                  {Math.round(fetchCityWeather?.data?.main.temp)}&#176;
                </Text>
                <Text className="text-center font-bold text-gray-600 text-xl tracking-widest">
                  {fetchCityWeather?.data?.weather[0].main}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between mx-4">
              <View className="flex-row gap-4 space-x-2 items-center">
                <FontAwesome6 name="droplet" size={36} color="white" />
                <View>
                  <Text className="text-gray-600 font-semibold text-2xl">
                    Humidity
                  </Text>
                  <Text className="text-gray-600 font-semibold text-2xl">
                    {fetchCityWeather?.data?.main.humidity}%
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-4 space-x-2 items-center">
                <Feather name="wind" size={36} color="white" />
                <View>
                  <Text className="text-gray-600 font-semibold text-2xl">
                    Wind Speed
                  </Text>
                  <Text className="text-gray-600 font-semibold text-2xl">
                    {fetchCityWeather?.data?.wind.speed} km/h
                  </Text>
                </View>
              </View>
            </View>

            {/* forecast for 5 days */}
            <View>
              <View className="flex-row items-center mx-5 gap-5 space-x-2 mb-4">
                <FontAwesome name="calendar" size={22} color="gray" />
                <Text className="text-gray-600 font-semibold text-2xl">
                  Daily Forecast
                </Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {fetchCityForecast.map((forecast, index) => (
                  <View
                    key={index}
                    className="flex justify-center items-center gap-2 w-28 rounded-3xl py-3 mr-4 bg-white/30"
                  >
                    <Text className="text-white">
                      {moment(forecast.dt_txt).format("ddd, MMM D")}
                    </Text>
                    <Image
                      source={{
                        uri: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
                      }}
                      className="w-20 h-20"
                    />
                    <Text className="text-white">
                      {forecast?.weather[0].main}
                    </Text>
                    <Text className="text-white">
                      {forecast.main.temp}&#176;
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View className="flex-row justify-between mx-5 mt-4">
              <View>
                <Text className="text-white font-semibold text-2xl mb-2">
                  Temperatures
                </Text>
                <View className="flex-row gap-2">
                  <Text className="text-white font-semibold text-2xl">°C</Text>
                  <Switch
                    color="#234D91"
                    value={temperature}
                    onValueChange={onToggleTemperatureSwitch}
                  />
                  <Text className="text-white font-semibold text-2xl">°F</Text>
                </View>
              </View>
              <Text>Add to Favorites</Text>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
