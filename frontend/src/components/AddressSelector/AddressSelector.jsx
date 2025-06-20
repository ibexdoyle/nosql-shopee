import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, List, ListItem, ListItemButton, ClickAwayListener} from "@mui/material";
import locationData from "./vn-location.json";

const AddressSelector = ({ onSelect, resetSignal }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [openSelector, setOpenSelector] = useState(false);

  useEffect(() => {
    setTabIndex(0);
    setSearchText("");
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
  }, [resetSignal]);

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setTabIndex(1);
    setSearchText("");
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedWard(null);
    setTabIndex(2);
    setSearchText("");
  };

  const handleWardSelect = (ward) => {
    setSelectedWard(ward);
    onSelect({
      city: selectedProvince?.Name,
      district: selectedDistrict?.Name,
      ward: ward?.Name,
    });
    setOpenSelector(false);
  };

  const getList = () => {
    if (tabIndex === 0) {
      return locationData.filter((p) =>
        p.Name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (tabIndex === 1 && selectedProvince) {
      return selectedProvince.Districts.filter((d) =>
        d.Name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (tabIndex === 2 && selectedDistrict) {
      return selectedDistrict.Wards.filter((w) =>
        w.Name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return [];
  };

  const selectedText = [selectedProvince?.Name, selectedDistrict?.Name]
    .concat(selectedWard?.Name || [])
    .filter(Boolean)
    .join(", ");

  const handleClear = () => {
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setTabIndex(0);
    setSearchText("");
    onSelect({ city: "", district: "", ward: "" });
  };

  return (
    <ClickAwayListener onClickAway={() => setOpenSelector(false)}>
      <Box className="relative">
          <input
            type="text"
            readOnly
            value={selectedText}
            placeholder="Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã"
            onFocus={() => setOpenSelector(true)}
            className="border border-smoke w-full px-3 py-2 rounded text-sm"
          />
          {selectedText && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-smoke hover:text-black"
            >
              ×
            </button>
          )}

        {openSelector && (
          <Box className="absolute mt-1 z-50 w-full border rounded-lg bg-white shadow-lg">
            <Tabs
              value={tabIndex}
              onChange={(_, newIndex) => setTabIndex(newIndex)}
              variant="fullWidth"
              className="bg-grey"
              slotProps={{
                indicator: {
                  sx: {
                    backgroundColor: '#0A3C30',
                  },
                },
              }}
            >
              <Tab label="Tỉnh/Thành phố" className="text-mint"/>
              <Tab label="Quận/Huyện" disabled={!selectedProvince} className="text-mint"/>
              <Tab label="Phường/Xã" disabled={!selectedDistrict} className="text-mint"/>
            </Tabs>

            <List className="h-64 overflow-y-auto">
              {getList().map((item) => (
                <ListItem key={item.Id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (tabIndex === 0) handleProvinceSelect(item);
                      else if (tabIndex === 1) handleDistrictSelect(item);
                      else if (tabIndex === 2) handleWardSelect(item);
                    }}
                  >
                    {item.Name}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}

export default AddressSelector;