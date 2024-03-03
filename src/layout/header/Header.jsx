import logoImg from "/divar.svg";
import { Link } from "react-router-dom";
import { LocationIcon } from "assets/icons/LocationIcon.jsx";
import { ChevronDownIcon } from "assets/icons/ChevronDownIcon.jsx";
import { useState } from "react";
import { UserIcon } from "assets/icons/UserIcon.jsx";
import { ChatIcon } from "assets/icons/ChatIcon.jsx";
import { SearchBar } from "components/ui/SearchBar.jsx";
import { LocationModal } from "components/ui/LocationModal.jsx";
import { e2p } from "utils/helpers.js";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "services/user.js";
import { SettingsIcon } from "assets/icons/SettingsIcon.jsx";
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState(["تهران", "مشهد", "اصفهان"]);
  const [isSelectLocation, setIsSelectLocation] = useState(false);

  const { data } = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  return (
    <>
      <header className={`header`}>
        <section className={`header-container`}>
          <div className={`header-sections`}>
            <Link to={`/`} className={`w-max h-10 px-4`}>
              <img
                src={`${logoImg}`}
                alt="divar logo"
                className={`header-sections-img`}
              />
            </Link>
            <span className={`header-sections-divider`}></span>
            <span
              className={`header-sections-img-container group`}
              onClick={() =>
                setIsSelectLocation((isSelectLocation) => !isSelectLocation)
              }
            >
              <LocationIcon
                style={`w-5 h-5 text-[#707070] group-hover:text-secondary`}
              />
              <p
                className={`header-section-text group-hover:text-secondary mr-2`}
              >
                {cities.length === 1 && cities[0]}
                {cities.length > 1 && e2p(cities.length) + " شهر"}
              </p>
            </span>
            {isSelectLocation && (
              <LocationModal
                cities={cities}
                setCities={setCities}
                isSelectLocation={isSelectLocation}
                setIsSelectLocation={setIsSelectLocation}
              />
            )}
            <span
              className={`header-sections-img-container group pl-2`}
              onClick={() => setIsOpen((isOpen) => !isOpen)}
            >
              <p className={`header-section-text group-hover:text-secondary`}>
                دسته ها
              </p>
              <ChevronDownIcon
                style={`w-5 h-5 text-[#707070] group-hover:text-secondary mr-1 ${
                  isOpen && "-rotate-180"
                } duration-300`}
              />
            </span>
            <SearchBar
              className={`header-search-bar`}
              text={`جستوجو در همه آگهی ها`}
            />
          </div>
          <div className={`header-sections`}>
            {data?.data.role === "ADMIN" && (
              <Link to={`/admin`} className={`header-sections-img-container`}>
                <SettingsIcon
                  style={`w-5 h-5 text-[#707070] group-hover:text-secondary`}
                />
                <p className={`header-section-text mr-1`}>پنل ادمین</p>
              </Link>
            )}
            <Link to={`/dashboard`} className={`header-sections-img-container`}>
              <UserIcon
                style={`w-5 h-5 text-[#707070] group-hover:text-secondary`}
              />
              <p className={`header-section-text mr-1`}>دیوار من</p>
            </Link>
            <Link to={`/support`} className={`header-sections-img-container`}>
              <ChatIcon
                style={`w-5 h-5 text-[#707070] group-hover:text-secondary`}
              />
              <p className={`header-section-text mr-1`}>چت</p>
            </Link>
            <Link to={`/support`} className={`header-sections-img-container`}>
              <p className={`header-section-text`}>پشتیبانی</p>
            </Link>
            <div className={`header-sections-button mr-4`}>ثبت آگهی</div>
          </div>
        </section>
      </header>
    </>
  );
};
