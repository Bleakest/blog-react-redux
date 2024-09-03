import { useEffect, useState } from "react";
import styled from "styled-components";

const FooterContainer = ({ className }) => {
  const [city, setCity] = useState("");
  const [temperature, setTepmperature] = useState("");
  const [weather, setWeather] = useState("");
  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Krasnodar&units=metric&lang=ru&appid=41eeb9403842f4f0ce68767c1a186c40"
    )
      .then((response) => response.json())
      .then(({ main, name, weather }) => {
        setCity(name);
        setTepmperature(Math.round(main.temp));
        setWeather(weather[0].description);
      });
  }, []);

  return (
    <div className={className}>
      <div>
        <div>Блог веб-разработчика </div>
        <div>webdeveloper.ru</div>
      </div>
      <div>
        <div>
          {city}{" "}
          {new Date().toLocaleDateString("ru", {
            day: "numeric",
            month: "long",
          })}
        </div>
        <div>
          {temperature} Градусов, {weather}
        </div>
      </div>
    </div>
  );
};

export const Footer = styled(FooterContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  box-shadow: rgb(0, 0, 0) 0px 2px 17px;
  padding: 20px 40px;
  background-color: rgb(255, 255, 255);
  font-weight: bold;
`;
