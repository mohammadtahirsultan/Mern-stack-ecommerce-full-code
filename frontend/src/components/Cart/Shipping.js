import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import "./Shipping.css";
import { saveShippingInfo } from "../../redux/actions/cart";
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [address, setaddress] = useState(shippingInfo.address);
  const [country, setcountry] = useState(shippingInfo.country);
  const [state, setstate] = useState(shippingInfo.state);
  const [city, setcity] = useState(shippingInfo.city);
  const [pinCode, setpinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setphoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmitHandler = async (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({ address, country, state, city, pinCode, phoneNo })
    );
   

    navigate("/confirmorder");
  };

  useEffect(() => {
    JSON.parse(localStorage.getItem("shippingInfoEcommerce"));
  }, []);
  return (
    <>
    <MetaData title="Shipping Details --ECOMMERCE-MERN" />
    <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form className="shippingForm" onSubmit={shippingSubmitHandler}>
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={city}
                onChange={(e) => setcity(e.target.value)}
                required
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                required
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                name="pinCode"
                value={pinCode}
                onChange={(e) => setpinCode(e.target.value)}
                required
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setphoneNo(e.target.value)}
                required
                size={"11"}
              />
            </div>
            <div>
              <PublicIcon />
              <select
                value={country}
                onChange={(e) => setcountry(e.target.value)}
                required
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((i) => (
                    <option value={i.isoCode} key={i.isoCode}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                  required
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((i) => (
                      <option value={i.isoCode} key={i.isoCode}>
                        {i.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value={"Continue"}
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
