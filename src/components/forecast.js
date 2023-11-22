import React, { usestate } from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion"
import "./forecast.css"
const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thuersday", "Friday", "Saturday", "Sunday"]
const dayInAWeek = new Date().getDay();
const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
const Forecast = ({ data }) => {
console.log(data);
  return (
    <div className='forecast_container'>
      {data.list && <label className='title'/>}
      {<Accordion allowZeroExpanded className="accordion">
        {data.list && data.list.slice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather"/>
                  <label className="day">{forecastDays[index]}</label> 
                  <label className="description">{item.weather[0]["description"]}</label>
                  <label className="min-max">{Math.round(item.main.temp_max - 273.5)}°C /{Math.round(item.main.temp_min - 273.5)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Feels like: </label>
                  <label>{item.main.feels_like}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Grnd level: </label>
                  <label>{item.main.grnd_level}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity: </label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Pressure: </label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level: </label>
                  <label>{item.main.sea_level}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind_speed: </label>
                  <label>{item.wind.speed}</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>

        )
        )
        }

      </Accordion>}
    </div>
  )


}
export default Forecast;