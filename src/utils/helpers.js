const deleteAllCityForm = (event, setCitiesForm) => {
  event.preventDefault();
  setCitiesForm([]);
};
// header > location > location-modal > delete-city-button
const deleteCityForm = (cities, setCitiesForm, setCities, city) => {
  const newCities = cities.filter((item) => item !== city);
  setCitiesForm(newCities);
};

// header > location > location-modal > submit-button
const submitCitiesChecker = (cities, citiesForm) => {
  if (!citiesForm.length) return false;
  return !cities.every((city) => !!citiesForm.includes(city));
};

const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
export { deleteAllCityForm, deleteCityForm, submitCitiesChecker, e2p };
