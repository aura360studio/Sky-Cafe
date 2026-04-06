import nightLifeData from '../data/nightLifeData.json';
import eventsData from '../data/events.json';

export const getHeroContent = () => {
  return nightLifeData.hero;
};

export const getServices = () => {
  return nightLifeData.services;
};

export const getAreas = () => {
  return nightLifeData.areas;
};

export const getEvents = () => {
  return eventsData;
};

export const getServiceById = (id) => {
  return nightLifeData.services.find(s => s.id === id);
};
