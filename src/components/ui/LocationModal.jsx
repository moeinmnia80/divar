import { useState } from "react";
import { useHideScrollbar } from "hooks/useHideScrollbar.js";
import useClickOutside from "hooks/useClickOutside.js";
import provinces from "constants/provinces.json";
import citiesProvinces from "constants/cities.json";
import {
  deleteAllCityForm,
  deleteCityForm,
  submitCitiesChecker,
} from "utils/helpers.js";
import { SearchBar } from "components/ui/SearchBar.jsx";
import { XIcon } from "assets/icons/XIcon.jsx";
import { ChevronLeftIcon } from "assets/icons/ChevronLeftIcon.jsx";
import { RightArrow } from "assets/icons/RightArrow.jsx";

export const LocationModal = ({
  cities,
  setCities,
  isSelectLocation,
  setIsSelectLocation,
}) => {
  const [citiesForm, setCitiesForm] = useState(cities);
  const [isOpen, setIsOpen] = useState(false);
  const [provinceId, setProvinceId] = useState("");
  useHideScrollbar(isSelectLocation);
  const refuseChangeLocation = (event) => {
    event.preventDefault();
    setIsSelectLocation(false);
  };

  const selectProvince = (province) => {
    setProvinceId(province.id);
    setIsOpen(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!!citiesForm.length) setCities(citiesForm);
    setIsSelectLocation(false);
  };

  const domeNode = useClickOutside(() => setIsSelectLocation(false));
  return (
    <>
      <section className={`location-modal`}>
        <form
          onSubmit={formSubmitHandler}
          className={`location-modal-form`}
          id={`form`}
          ref={domeNode}
        >
          <section className={`location-modal-form-header`}>
            <div className={`flex justify-between items-center w-full h-max`}>
              <p className={`location-modal-form-text`}>انتخاب شهر</p>
              <button
                className={`location-modal-form-button`}
                onClick={(event) => deleteAllCityForm(event, setCitiesForm)}
              >
                حذف همه
              </button>
            </div>
            <div className={`flex flex-wrap gap-2 w-full my-6`}>
              {!citiesForm.length && (
                <span className={`text-sm text-gray-400`}>
                  حداقل یک شهر را انتخاب کنید.
                </span>
              )}
              {citiesForm.map((city) => (
                <span key={city} className={`location-modal-form-cities`}>
                  {city}
                  <XIcon
                    style={`w-5 h-5 font-bold mr-3 p-1 rounded-full hover:bg-third cursor-pointer`}
                    onClick={() =>
                      deleteCityForm(citiesForm, setCitiesForm, setCities, city)
                    }
                  />
                </span>
              ))}
            </div>
            <SearchBar
              className={`location-modal-search-bar`}
              text={`جستوجو در شهرها`}
            />
          </section>
          <section className={`location-modal-form-main`}>
            {!isOpen &&
              provinces.map((province) => (
                <div
                  key={province.id}
                  className={`flex items-center justify-between border-b-1 odd:border-[#ccc] py-4 cursor-pointer`}
                  onClick={() => selectProvince(province)}
                >
                  <p>{province.name}</p>
                  <ChevronLeftIcon style={`w-4 h-4 text-[#bbb]`} />
                </div>
              ))}
            {isOpen && (
              <>
                <div
                  className={`relative flex items-center border-b-1 odd:border-[#ccc] py-4 cursor-pointer`}
                  onClick={() => setIsOpen(false)}
                >
                  <RightArrow style={`w-5 h-5`} />
                  <p className={`mr-3`}>همه شهرها</p>
                </div>
                {citiesProvinces.map(
                  (city) =>
                    city.province_id === provinceId && (
                      <div
                        key={city.id}
                        className={`relative flex items-center border-b-1 odd:border-[#ccc] py-4 cursor-pointer`}
                      >
                        <label htmlFor={city.id} className={`w-full`}>
                          {city.name}
                        </label>
                        <input
                          type="checkbox"
                          id={city.id}
                          className={`w-5 h-5 allCarsSelectedState`}
                        />
                      </div>
                    ),
                )}
              </>
            )}
          </section>
          <section className={`location-modal-form-footer`}>
            <button
              className={`location-modal-button border-1 border-[#858585] hover:bg-[#f5f5f5] duration-300`}
              onClick={(event) => refuseChangeLocation(event)}
            >
              انصراف
            </button>
            <button
              className={`location-modal-button ${
                submitCitiesChecker(cities, citiesForm)
                  ? `bg-primary text-white`
                  : `bg-[#f5f5f5] cursor-no-drop`
              }`}
              disabled={!submitCitiesChecker(cities, citiesForm)}
              type={"submit"}
            >
              تایید
            </button>
          </section>
        </form>
      </section>
    </>
  );
};
