function initApp() {
  console.log("Pickmi Website App JS initialized.");
  
  // ==========================================
  // DATA AND STATE DEFINITIONS
  // ==========================================
  
  // Fleet Vehicle Details Database
  const fleetDatabase = {
    hatchback: {
      type: "Comfort & Savings",
      name: "Hatchback",
      desc: "Ideal for city drives, solo commuters, and quick budget-friendly weekend getaways. Sleek styling, easy parking, and high fuel efficiency.",
      seats: "4 Seats",
      luggage: "2 Bags (Medium)",
      price: "₹10",
      image: "images/hatchback-vector.png?v=99",
      btnText: "Select Hatchback"
    },
    sedan: {
      type: "Executive Comfort",
      name: "Sedan",
      desc: "Perfect for business trips, small family excursions, and comfortable highway cruising. Generous legroom, smooth ride, and quiet cabin.",
      seats: "4 Seats",
      luggage: "3 Bags (Medium)",
      price: "₹14",
      image: "images/car-vector.png",
      btnText: "Select Sedan"
    },
    suv: {
      type: "Family & Space",
      name: "SUV",
      desc: "Designed for rough terrains, family travel, and heavy luggage trips. Elevated seating, strong road presence, and supreme cabin comfort.",
      seats: "6-7 Seats",
      luggage: "4 Bags (Large)",
      price: "₹18",
      image: "images/suv-vector.png?v=99",
      btnText: "Select SUV"
    }
  };

  // Popular City Autocomplete Database (Expanded for major Indian hubs)
  const popularCities = [
    { city: "Bangalore", state: "Karnataka, India" },
    { city: "J. P. Nagar, Bangalore", state: "Karnataka, India" },
    { city: "Indiranagar, Bangalore", state: "Karnataka, India" },
    { city: "Koramangala, Bangalore", state: "Karnataka, India" },
    { city: "Mysore", state: "Karnataka, India" },
    { city: "Hubli", state: "Karnataka, India" },
    { city: "Mangalore", state: "Karnataka, India" },
    { city: "Belgaum", state: "Karnataka, India" },
    { city: "Mumbai", state: "Maharashtra, India" },
    { city: "Navi Mumbai", state: "Maharashtra, India" },
    { city: "Pune", state: "Maharashtra, India" },
    { city: "Nagpur", state: "Maharashtra, India" },
    { city: "Nashik", state: "Maharashtra, India" },
    { city: "Aurangabad", state: "Maharashtra, India" },
    { city: "Thane", state: "Maharashtra, India" },
    { city: "Lonavala", state: "Maharashtra, India" },
    { city: "Mahabaleshwar", state: "Maharashtra, India" },
    { city: "Shirdi", state: "Maharashtra, India" },
    { city: "New Delhi", state: "Delhi, India" },
    { city: "Delhi (NCR)", state: "Delhi, India" },
    { city: "Noida", state: "Uttar Pradesh, India" },
    { city: "Gurgaon", state: "Haryana, India" },
    { city: "Ghaziabad", state: "Uttar Pradesh, India" },
    { city: "Faridabad", state: "Haryana, India" },
    { city: "Hyderabad", state: "Telangana, India" },
    { city: "Secunderabad", state: "Telangana, India" },
    { city: "Warangal", state: "Telangana, India" },
    { city: "Vijayawada", state: "Andhra Pradesh, India" },
    { city: "Visakhapatnam", state: "Andhra Pradesh, India" },
    { city: "Tirupati", state: "Andhra Pradesh, India" },
    { city: "Chennai", state: "Tamil Nadu, India" },
    { city: "Coimbatore", state: "Tamil Nadu, India" },
    { city: "Madurai", state: "Tamil Nadu, India" },
    { city: "Trichy", state: "Tamil Nadu, India" },
    { city: "Ooty", state: "Tamil Nadu, India" },
    { city: "Tiruvannamalai", state: "Tamil Nadu, India" },
    { city: "Pondicherry", state: "Puducherry, India" },
    { city: "Ahmedabad", state: "Gujarat, India" },
    { city: "Surat", state: "Gujarat, India" },
    { city: "Vadodara", state: "Gujarat, India" },
    { city: "Rajkot", state: "Gujarat, India" },
    { city: "Gandhinagar", state: "Gujarat, India" },
    { city: "Kolkata", state: "West Bengal, India" },
    { city: "Howrah", state: "West Bengal, India" },
    { city: "Darjeeling", state: "West Bengal, India" },
    { city: "Siliguri", state: "West Bengal, India" },
    { city: "Jaipur", state: "Rajasthan, India" },
    { city: "Udaipur", state: "Rajasthan, India" },
    { city: "Jodhpur", state: "Rajasthan, India" },
    { city: "Kota", state: "Rajasthan, India" },
    { city: "Ajmer", state: "Rajasthan, India" },
    { city: "Lucknow", state: "Uttar Pradesh, India" },
    { city: "Kanpur", state: "Uttar Pradesh, India" },
    { city: "Agra", state: "Uttar Pradesh, India" },
    { city: "Varanasi", state: "Uttar Pradesh, India" },
    { city: "Allahabad", state: "Uttar Pradesh, India" },
    { city: "Mathura", state: "Uttar Pradesh, India" },
    { city: "Panaji, Goa", state: "Goa, India" },
    { city: "Calangute, Goa", state: "Goa, India" },
    { city: "Kochi", state: "Kerala, India" },
    { city: "Trivandrum", state: "Kerala, India" },
    { city: "Indore", state: "Madhya Pradesh, India" },
    { city: "Bhopal", state: "Madhya Pradesh, India" },
    { city: "Patna", state: "Bihar, India" },
    { city: "Chandigarh", state: "Punjab, India" },
    { city: "Ludhiana", state: "Punjab, India" },
    { city: "Amritsar", state: "Punjab, India" },
    { city: "Guwahati", state: "Assam, India" },
    { city: "Raipur", state: "Chhattisgarh, India" },
    { city: "Ranchi", state: "Jharkhand, India" },
    { city: "Bhubaneswar", state: "Odisha, India" },
    { city: "Dehradun", state: "Uttarakhand, India" }
  ];

  // ==========================================
  // MOBILE NAVIGATION & STICKY HEADER
  // ==========================================
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const backToTop = document.getElementById('backToTop');

  const handleScroll = () => {
    const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPos > 50) {
      if (header) header.classList.add('sticky');
      if (backToTop) backToTop.classList.add('active');
    } else {
      if (header) header.classList.remove('sticky');
      if (backToTop) backToTop.classList.remove('active');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu on clicking nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger) hamburger.classList.remove('active');
      if (navMenu) navMenu.classList.remove('active');
    });
  });

  // ==========================================
  // VEHICLE CATEGORY SWITCHER (HERO & FLEET)
  // ==========================================
  const vehicleTabs = document.querySelectorAll('.vehicle-tab');
  const fleetCarImg = document.getElementById('fleetCarImg');
  const specSeats = document.getElementById('specSeats');
  const specLuggage = document.getElementById('specLuggage');
  const farePriceVal = document.getElementById('farePriceVal');
  const fleetBottomTabs = document.querySelectorAll('.fleet-bottom-tab');

  function updateFleetShowcase(category) {
    const details = fleetDatabase[category];
    if (!details) return;

    const container = document.querySelector('.fleet-image-container');
    if (container) {
      container.style.opacity = '0';
      container.style.transform = 'scale(0.96)';
    }

    setTimeout(() => {
      if (fleetCarImg) {
        fleetCarImg.src = details.image;
        fleetCarImg.alt = details.name;
      }
      if (specSeats) specSeats.textContent = details.seats;
      if (specLuggage) specLuggage.textContent = details.luggage;
      if (farePriceVal) farePriceVal.textContent = details.price;

      if (container) {
        container.style.opacity = '1';
        container.style.transform = 'none';
      }
    }, 200);

    fleetBottomTabs.forEach(t => {
      if (t.dataset.fleetCategory === category) {
        t.classList.add('active');
        t.setAttribute('aria-selected', 'true');
      } else {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      }
    });
  }

  const switcherIndicator = document.getElementById('switcherIndicator');

  function updateSwitcherIndicator() {
    const activeTab = document.querySelector('.vehicle-tab.active');
    if (activeTab && switcherIndicator) {
      switcherIndicator.style.width = `${activeTab.offsetWidth}px`;
      switcherIndicator.style.left = `${activeTab.offsetLeft}px`;
    }
  }

  updateSwitcherIndicator();
  window.addEventListener('load', updateSwitcherIndicator);
  setTimeout(updateSwitcherIndicator, 50);
  setTimeout(updateSwitcherIndicator, 200);
  setTimeout(updateSwitcherIndicator, 500);
  window.addEventListener('resize', updateSwitcherIndicator);

  vehicleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      vehicleTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      updateSwitcherIndicator();

      const category = tab.dataset.category;
      if (category) updateFleetShowcase(category);
    });
  });

  if (fleetBottomTabs.length > 0) {
    fleetBottomTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.dataset.fleetCategory;
        const heroTab = document.querySelector(`.vehicle-tab[data-category="${category}"]`);
        if (heroTab && !heroTab.classList.contains('active')) {
          heroTab.click();
        } else {
          updateFleetShowcase(category);
        }
      });
    });
  }

  const fleetBookBtn = document.getElementById('fleetBookBtn');
  if (fleetBookBtn) {
    fleetBookBtn.addEventListener('click', () => {
      const activeTab = document.querySelector('.vehicle-tab.active');
      const activeCategory = (activeTab && activeTab.dataset.category) ? activeTab.dataset.category : 'hatchback';
      const activeVehicleName = fleetDatabase[activeCategory] ? fleetDatabase[activeCategory].name : 'Vehicle';
      alert(`Thank you for selecting ${activeVehicleName}! Please fill in the ride locations above to search for available drivers.`);
      
      const bookingCardEl = document.getElementById('bookingCard');
      if (bookingCardEl) bookingCardEl.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================
  // BOOKING TAB / RADIO CONTROLS (FORM TYPE)
  // ==========================================
  const bookingTypeRadios = document.querySelectorAll('input[name="booking-type"]');
  const returnDateInput = document.getElementById('returnDate');
  const returnDayLabel = document.getElementById('returnDay');

  bookingTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const type = e.target.value;
      if (!returnDateInput) return;

      if (type === 'roundtrip') {
        returnDateInput.disabled = false;
        returnDateInput.required = true;
        returnDateInput.style.opacity = '1';
        if (returnDayLabel) updateFormattedDay(returnDateInput, returnDayLabel);
      } else {
        returnDateInput.disabled = true;
        returnDateInput.required = false;
        returnDateInput.value = '';
        returnDateInput.style.opacity = '0.5';
        if (returnDayLabel) returnDayLabel.textContent = "Tap to add return date for bigger discounts";
      }
    });
  });

  const returnBlock = document.getElementById('returnBlock');
  if (returnBlock && returnDateInput) {
    returnBlock.addEventListener('click', () => {
      if (returnDateInput.disabled) {
        const roundTripRadio = document.getElementById('radio-roundtrip');
        if (roundTripRadio) {
          roundTripRadio.checked = true;
          roundTripRadio.dispatchEvent(new Event('change'));
          
          setTimeout(() => {
            try {
              if (returnDateInput.showPicker) returnDateInput.showPicker();
              else returnDateInput.focus();
            } catch (err) {
              returnDateInput.focus();
            }
          }, 150);
        }
      }
    });
  }

  // ==========================================
  // LOCATION SWAP FEATURE
  // ==========================================
  const swapBtn = document.getElementById('swapLocationsBtn');
  const fromInput = document.getElementById('fromLocation');
  const toInput = document.getElementById('toLocation');
  const fromStateSpan = document.getElementById('fromState');
  const toStateSpan = document.getElementById('toState');

  function getCityBase(val) {
    if (!val) return '';
    let clean = val.replace(/,\s*(karnataka|maharashtra|telangana|tamil nadu|delhi|gujarat|west bengal|rajasthan|uttar pradesh|goa|kerala|punjab|assam|chhattisgarh|jharkhand|odisha|uttarakhand|bihar|india)\s*/gi, '');
    clean = clean.replace(/,\s*india/gi, '');
    
    const parts = clean.split(',');
    if (parts.length > 0) {
      return parts[parts.length - 1].trim().toLowerCase();
    }
    return clean.trim().toLowerCase();
  }

  function autoDetectTripType() {
    if (!fromInput || !toInput) return;
    const fromVal = fromInput.value ? fromInput.value.trim().toLowerCase() : '';
    const toVal = toInput.value ? toInput.value.trim().toLowerCase() : '';
    
    if (!fromVal || !toVal) return;
    
    const incityRadio = document.getElementById('radio-oneway');
    const intercityRadio = document.getElementById('radio-intercity');
    const airportRadio = document.getElementById('radio-airport');
    
    if (fromVal.includes('airport') || toVal.includes('airport') || fromVal.includes('aiprot') || toVal.includes('aiprot')) {
      if (airportRadio && !airportRadio.checked) {
        airportRadio.checked = true;
        airportRadio.dispatchEvent(new Event('change'));
      }
      return;
    }
    
    const fromCity = getCityBase(fromVal);
    const toCity = getCityBase(toVal);
    
    if (fromCity === toCity || fromVal.includes(toCity) || toVal.includes(fromCity)) {
      if (incityRadio && !incityRadio.checked) {
        incityRadio.checked = true;
        incityRadio.dispatchEvent(new Event('change'));
      }
    } else {
      const activeRadio = document.querySelector('input[name="booking-type"]:checked');
      if (activeRadio && (activeRadio.value === 'incity' || activeRadio.value === 'airport')) {
        if (intercityRadio && !intercityRadio.checked) {
          intercityRadio.checked = true;
          intercityRadio.dispatchEvent(new Event('change'));
        }
      }
    }
  }

  if (swapBtn && fromInput && toInput) {
    swapBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      swapBtn.style.transform = swapBtn.style.transform === 'rotate(180deg)' ? 'rotate(360deg)' : 'rotate(180deg)';

      const tempVal = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = tempVal;

      if (fromStateSpan && toStateSpan) {
        const tempState = fromStateSpan.textContent;
        fromStateSpan.textContent = toStateSpan.textContent;
        toStateSpan.textContent = tempState;
      }

      const dynamicDestCity = document.getElementById('dynamicDestCity');
      if (dynamicDestCity && fromInput.value) {
        const cityName = fromInput.value.split(',')[0].trim();
        dynamicDestCity.textContent = cityName;
        updateDestinationsSlider(cityName);
      }

      autoDetectTripType();
    });
  }

  if (navigator.geolocation && fromInput) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`)
          .then(res => res.json())
          .then(data => {
            if (!fromInput) return;
            if (data && data.address) {
              const road = data.address.road || data.address.suburb || data.address.neighbourhood || '';
              const city = data.address.city || data.address.town || data.address.village || 'Current Location';
              const state = data.address.state || 'India';
              
              const displayName = road ? `${road}, ${city}` : city;
              fromInput.value = displayName;
              if (fromStateSpan) {
                fromStateSpan.textContent = `${state}, India`;
              }
              
              const dynamicDestCity = document.getElementById('dynamicDestCity');
              if (dynamicDestCity && city !== 'Current Location') {
                dynamicDestCity.textContent = city;
                updateDestinationsSlider(city);
              }
              
              autoDetectTripType();
            } else {
              fromInput.value = "Current Location";
              if (fromStateSpan) {
                fromStateSpan.textContent = "India";
              }
              autoDetectTripType();
            }
          })
          .catch(err => {
            console.error("Reverse geocoding error:", err);
            if (fromInput) fromInput.value = "Current Location";
            if (fromStateSpan) fromStateSpan.textContent = "India";
          });
      },
      (error) => {
        console.warn("Geolocation blocked or failed:", error);
        if (fromInput) fromInput.value = "";
        if (fromStateSpan) fromStateSpan.textContent = "Enter departure city";
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  } else {
    if (fromStateSpan) {
      fromStateSpan.textContent = "Enter departure city";
    }
  }

  // ==========================================
  // DATES & TIME INITIALIZATION & INTERACTIVITY
  // ==========================================
  const departureInput = document.getElementById('departureDate');
  const departureDayLabel = document.getElementById('departureDay');
  const pickupTimeInput = document.getElementById('pickupTime');
  const timePeriodLabel = document.getElementById('timePeriod');

  function formatDateString(dateObj) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[dateObj.getDay()];
    const dateNum = dateObj.getDate();
    const monthName = months[dateObj.getMonth()];
    const yearShort = dateObj.getFullYear().toString().substring(2);

    return `${dateNum} ${monthName}'${yearShort}, ${dayName}`;
  }

  function updateFormattedDay(inputEl, labelEl) {
    if (!inputEl || !labelEl) return;
    if (!inputEl.value) {
      labelEl.textContent = "Select date";
      return;
    }
    const selectedDate = new Date(inputEl.value);
    labelEl.textContent = formatDateString(selectedDate);
  }

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDateForInput = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  if (departureInput) {
    const minDateStr = formatDateForInput(today);
    departureInput.min = minDateStr;
    if (returnDateInput) returnDateInput.min = minDateStr;

    departureInput.value = formatDateForInput(tomorrow);
    if (departureDayLabel) {
      updateFormattedDay(departureInput, departureDayLabel);
    }

    departureInput.addEventListener('change', () => {
      if (departureDayLabel) {
        updateFormattedDay(departureInput, departureDayLabel);
      }
      
      if (returnDateInput) {
        returnDateInput.min = departureInput.value;
        if (returnDateInput.value && returnDateInput.value < departureInput.value) {
          returnDateInput.value = departureInput.value;
          if (returnDayLabel) {
            updateFormattedDay(returnDateInput, returnDayLabel);
          }
        }
      }
    });
  }

  if (returnDateInput) {
    returnDateInput.addEventListener('change', () => {
      if (returnDayLabel) {
        updateFormattedDay(returnDateInput, returnDayLabel);
      }
    });
  }

  if (pickupTimeInput) {
    function updateTimePeriod() {
      const timeVal = pickupTimeInput.value;
      if (!timeVal) return;
      const hours = parseInt(timeVal.split(':')[0]);
      if (timePeriodLabel) {
        timePeriodLabel.textContent = hours >= 12 ? 'Evening/Afternoon (PM)' : 'Morning (AM)';
      }
    }
    
    pickupTimeInput.addEventListener('change', updateTimePeriod);
    updateTimePeriod();
  }

  // ==========================================
  // AUTOCOMPLETE CITY SUGGESTIONS
  // ==========================================
  function setupAutocomplete(inputElement, suggestionsElement, stateElement) {
    if (!inputElement || !suggestionsElement) return;

    inputElement.addEventListener('focus', () => {
      renderSuggestions(inputElement.value);
    });

    inputElement.addEventListener('input', () => {
      renderSuggestions(inputElement.value);
    });

    let debounceTimer;

    function displaySuggestionsList(list) {
      if (!suggestionsElement) return;
      suggestionsElement.innerHTML = '';
      if (!list || list.length === 0) {
        suggestionsElement.style.display = 'none';
        return;
      }

      list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
          <span class="suggestion-city">${item.city}</span>
          <span class="suggestion-state">${item.state}</span>
        `;
        
        div.addEventListener('click', () => {
          inputElement.value = item.city;
          if (stateElement) stateElement.textContent = item.state;
          suggestionsElement.style.display = 'none';
          
          if (inputElement === fromInput) {
            const dynamicDestCity = document.getElementById('dynamicDestCity');
            if (dynamicDestCity) {
              const cityName = item.city.split(',')[0].trim();
              dynamicDestCity.textContent = cityName;
              updateDestinationsSlider(cityName);
            }
          }
          
          autoDetectTripType();
        });

        suggestionsElement.appendChild(div);
      });

      suggestionsElement.style.display = 'block';
    }

    function renderSuggestions(query) {
      const filterQuery = (query || '').toLowerCase().trim();
      
      const localMatches = popularCities.filter(item => 
        item.city.toLowerCase().includes(filterQuery) || 
        item.state.toLowerCase().includes(filterQuery)
      );

      displaySuggestionsList(localMatches);

      if (filterQuery.length >= 3) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1&countrycodes=in&accept-language=en`)
            .then(res => res.json())
            .then(results => {
              if (results && results.length > 0) {
                const apiMatches = results.map(res => {
                  const addr = res.address || {};
                  const cityName = res.name || '';
                  const stateName = addr.state || addr.state_district || addr.county || "India";
                  
                  return {
                    city: cityName,
                    state: stateName.endsWith(", India") ? stateName : `${stateName}, India`
                  };
                });

                const combined = [...localMatches];
                apiMatches.forEach(apiItem => {
                  if (apiItem.city && !combined.some(c => c.city.toLowerCase() === apiItem.city.toLowerCase())) {
                    combined.push(apiItem);
                  }
                });

                displaySuggestionsList(combined);
              }
            })
            .catch(err => {
              console.error("Nominatim dynamic search failed:", err);
            });
        }, 250);
      }
    }

    document.addEventListener('click', (e) => {
      if (inputElement && suggestionsElement && e.target !== inputElement && !suggestionsElement.contains(e.target)) {
        suggestionsElement.style.display = 'none';
      }
    });

    inputElement.addEventListener('blur', () => {
      setTimeout(() => {
        const val = inputElement.value ? inputElement.value.trim() : '';
        if (val === '') {
          if (stateElement) stateElement.textContent = inputElement === fromInput ? "Enter departure city" : "Select destination city";
          return;
        }

        const valLower = val.toLowerCase();
        const match = popularCities.find(c => c.city.toLowerCase() === valLower);
        if (match) {
          if (stateElement) stateElement.textContent = match.state;
          if (inputElement === fromInput) {
            const dynamicDestCity = document.getElementById('dynamicDestCity');
            if (dynamicDestCity) {
              dynamicDestCity.textContent = match.city;
              updateDestinationsSlider(match.city);
            }
          }
          autoDetectTripType();
        } else {
          fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&limit=1&addressdetails=1&countrycodes=in`)
            .then(res => res.json())
            .then(results => {
              if (results && results.length > 0) {
                const addr = results[0].address || {};
                const stateName = addr.state || addr.state_district || addr.county || addr.country || "India";
                if (stateElement) stateElement.textContent = stateName.endsWith(", India") ? stateName : `${stateName}, India`;
                
                if (inputElement === fromInput) {
                  const dynamicDestCity = document.getElementById('dynamicDestCity');
                  if (dynamicDestCity) {
                    const cityName = results[0].name;
                    dynamicDestCity.textContent = cityName;
                    updateDestinationsSlider(cityName);
                  }
                }
                
                autoDetectTripType();
              } else {
                if (stateElement) stateElement.textContent = "India";
              }
            })
            .catch(err => {
              console.error("Nominatim search failed:", err);
              if (stateElement) stateElement.textContent = "India";
            });
        }
      }, 250);
    });
  }

  if (fromInput && toInput) {
    setupAutocomplete(fromInput, document.getElementById('fromSuggestions'), fromStateSpan);
    setupAutocomplete(toInput, document.getElementById('toSuggestions'), toStateSpan);
  }

  // ==========================================
    // ==========================================
  // UNIVERSAL TRIP SEARCH & NAVIGATION HANDLER
  // ==========================================
  function handleTripSearch(e) {
    if (e) e.preventDefault();
    
    const fromEl = document.getElementById('fromLocation') || document.querySelector('input[name="from"]') || document.querySelectorAll('.location-text-input')[0];
    const toEl   = document.getElementById('toLocation')   || document.querySelector('input[name="to"]')   || document.querySelectorAll('.location-text-input')[1];
    
    const fromVal = fromEl && fromEl.value ? fromEl.value.trim() : 'Bangalore';
    const toVal   = toEl   && toEl.value   ? toEl.value.trim()   : 'Mysore';

    if (!fromVal || !toVal) {
      alert("Please enter both a departure (From) and destination (To) city.");
      return;
    }

    if (fromVal.toLowerCase() === toVal.toLowerCase()) {
      alert("Departure and destination cities cannot be the same.");
      return;
    }

    const searchBtns = document.querySelectorAll('#searchSubmitBtn, #searchCabBtn, .search-btn, .search-black-submit-btn');
    searchBtns.forEach(btn => {
      btn.disabled = true;
      btn.innerHTML = 'Searching Drivers...';
    });

    const activeVehicleTab = document.querySelector('.vehicle-tab.active');
    const vehicle = activeVehicleTab ? activeVehicleTab.textContent : 'Sedan';
    const checkedRadio = document.querySelector('input[name="booking-type"]:checked');
    const type = (checkedRadio && checkedRadio.parentElement) ? checkedRadio.parentElement.textContent.trim() : 'Outstation';

    const departureDateInput = document.getElementById('departureDate');
    const pickupTimeInput = document.getElementById('pickupTime');
    const depDateVal = departureDateInput ? departureDateInput.value : '';
    const pickupVal = pickupTimeInput ? pickupTimeInput.value : '10:00';

    try {
      localStorage.setItem('pickmi_active_search', JSON.stringify({
        from: fromVal,
        to: toVal,
        departure: depDateVal,
        time: pickupVal,
        type: type,
        vehicle: vehicle
      }));
    } catch (err) {}

    const searchParams = new URLSearchParams({
      from: fromVal,
      to: toVal,
      departure: depDateVal,
      time: pickupVal,
      type: type.toLowerCase(),
      vehicle: vehicle.toLowerCase()
    });

    setTimeout(() => {
      window.location.href = ;
    }, 300);
  }

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleTripSearch);
  }

  document.addEventListener('click', function(e) {
    const target = e.target;
    if (target && (target.id === 'searchSubmitBtn' || target.id === 'searchCabBtn' || target.classList.contains('search-btn') || target.classList.contains('search-black-submit-btn'))) {
      if (!bookingForm || target.id === 'searchCabBtn') {
        handleTripSearch(e);
      }
    }
  });


// ==========================================
  const bookingForm = document.getElementById('bookingForm');
  const searchBtn = document.getElementById('searchSubmitBtn');

  if (bookingForm && fromInput && toInput) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const fromVal = fromInput.value ? fromInput.value.trim() : '';
      const toVal = toInput.value ? toInput.value.trim() : '';

      if (!fromVal || !toVal) {
        alert("Please enter both a departure (From) and destination (To) city.");
        return;
      }

      if (fromVal.toLowerCase() === toVal.toLowerCase()) {
        alert("Departure and destination cities cannot be the same.");
        return;
      }

      const originalBtnHTML = searchBtn ? searchBtn.innerHTML : '';
      if (searchBtn) {
        searchBtn.disabled = true;
        searchBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
            <line x1="12" x2="12" y1="2" y2="6" />
            <line x1="12" x2="12" y1="18" y2="22" />
            <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
            <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
            <line x1="2" x2="6" y1="12" y2="12" />
            <line x1="18" x2="22" y1="12" y2="12" />
            <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
            <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
          </svg>
          Searching Drivers...
        `;
      }

      setTimeout(() => {
        if (searchBtn) {
          searchBtn.disabled = false;
          searchBtn.innerHTML = originalBtnHTML;
        }

        const activeVehicleTab = document.querySelector('.vehicle-tab.active');
        const vehicle = activeVehicleTab ? activeVehicleTab.textContent : 'Cab';
        
        const checkedRadio = document.querySelector('input[name="booking-type"]:checked');
        const type = (checkedRadio && checkedRadio.parentElement) ? checkedRadio.parentElement.textContent.trim() : 'Incity';
        
        const depDayText = departureDayLabel ? departureDayLabel.textContent : 'Selected Date';
        const pickupVal = pickupTimeInput ? pickupTimeInput.value : '10:00';
        const depDateVal = departureDateInput ? departureDateInput.value : '';

        // Store active trip in localStorage for seamless recovery across pages
        try {
          localStorage.setItem('pickmi_active_search', JSON.stringify({
            from: fromVal,
            to: toVal,
            departure: depDateVal,
            departureText: depDayText,
            time: pickupVal,
            type: type,
            vehicle: vehicle
          }));
        } catch (err) {}

        const searchParams = new URLSearchParams({
          from: fromVal,
          to: toVal,
          departure: depDateVal,
          time: pickupVal,
          type: type.toLowerCase(),
          vehicle: vehicle.toLowerCase()
        });

        // Redirect to results.html with live interactive map, dynamic pricing & booking
        window.location.href = `results.html?${searchParams.toString()}`;
      }, 500);
    });
  }

  // ==========================================
  // TESTIMONIALS SLIDER
  // ==========================================
  const track = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let autoplayTimer;

  function moveToSlide(index) {
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    if (dots && dots.length > 0) {
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }
    currentSlide = index;
  }

  if (dots && dots.length > 0) {
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const targetIndex = parseInt(e.target.dataset.index);
        moveToSlide(targetIndex);
        resetAutoplay();
      });
    });
  }

  function startAutoplay() {
    if (!track || !dots || dots.length === 0) return;
    autoplayTimer = setInterval(() => {
      let nextSlide = (currentSlide + 1) % dots.length;
      moveToSlide(nextSlide);
    }, 5000);
  }

  function resetAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();

  updateDestinationsSlider("Bangalore");

  function updateDestinationsSlider(currentCity) {
    if (!currentCity) return;
    const normalizedCurrent = currentCity.toLowerCase().trim();
    const cards = document.querySelectorAll('.destinations-scroll-container .destination-item-card');
    
    cards.forEach(card => {
      const cardNameEl = card.querySelector('.dest-card-name');
      if (cardNameEl) {
        const cardCity = cardNameEl.textContent.toLowerCase().trim();
        const isMatch = cardCity === normalizedCurrent || 
                        (normalizedCurrent.includes('bengaluru') && cardCity.includes('bangalore')) ||
                        (normalizedCurrent.includes('bangalore') && cardCity.includes('bengaluru')) ||
                        normalizedCurrent.includes(cardCity) || 
                        cardCity.includes(normalizedCurrent);
                        
        if (isMatch) {
          card.style.display = 'none';
        } else {
          card.style.display = 'block';
        }
      }
    });
  }

  // ============================================================
  // 3D WINDING DOTTED WAVE RIBBON ANIMATION
  // ============================================================
  (function initWaveRibbon() {
    function startCanvas() {
      const canvas = document.getElementById('waveRibbonCanvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      let animId;
      let t = 0;

      function resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      resize();
      window.addEventListener('resize', resize);

      function draw() {
        const dpr = window.devicePixelRatio || 1;
        const W = canvas.width / dpr;
        const H = canvas.height / dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);

        const numDots = 180;
        const points = [];

        const pitch = 0.36;
        const yaw = -0.34;
        const cosPitch = Math.cos(pitch);
        const sinPitch = Math.sin(pitch);
        const cosYaw = Math.cos(yaw);
        const sinYaw = Math.sin(yaw);

        const fov = 640;

        for (let i = 0; i < numDots; i++) {
          const u = i / (numDots - 1);

          const x3 = (u - 0.5) * 880;
          const z3 = Math.sin(u * Math.PI * 2.2 - 0.4) * 260;
          const waveHeight = Math.sin(u * Math.PI * 3.2 + t * 1.4) * 32;
          const y3 = waveHeight - (u - 0.5) * 40;

          const xr = x3 * cosYaw + z3 * sinYaw;
          const zr = -x3 * sinYaw + z3 * cosYaw;

          const yr = y3 * cosPitch - zr * sinPitch;
          const zr2 = y3 * sinPitch + zr * cosPitch;

          const depth = fov + zr2;
          const scale = fov / Math.max(100, depth);

          const sx = W * 0.5 + xr * scale;
          const sy = H * 0.52 + yr * scale;

          const edgeFade = Math.sin(Math.pow(u, 0.85) * Math.PI);
          const alpha = Math.min(1, Math.max(0, edgeFade * (scale * 0.95)));

          points.push({ sx, sy, scale, alpha, depth, u });
        }

        points.sort((a, b) => b.depth - a.depth);

        const floorY = H * 0.96;

        points.forEach(p => {
          if (p.alpha < 0.02) return;

          ctx.beginPath();
          ctx.moveTo(p.sx, p.sy);
          ctx.lineTo(p.sx, floorY);

          const lineAlpha = p.alpha * 0.40;
          ctx.strokeStyle = `rgba(0, 82, 255, ${lineAlpha})`;
          ctx.lineWidth = Math.max(0.4, 0.8 * p.scale);
          ctx.stroke();

          const r = Math.max(0.7, 1.8 * p.scale);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);

          const dotAlpha = Math.min(1, p.alpha * 1.15);
          ctx.fillStyle = `rgba(0, 82, 255, ${dotAlpha})`;
          ctx.fill();
        });

        t += 0.012;
        animId = requestAnimationFrame(draw);
      }

      draw();

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          cancelAnimationFrame(animId);
        } else {
          draw();
        }
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startCanvas);
    } else {
      startCanvas();
    }
  })();

  // Reviews / Wonders Carousel Navigation Arrows
  const reviewsTrack = document.getElementById('reviewsTrack');
  const reviewsPrevBtn = document.getElementById('reviewsPrevBtn');
  const reviewsNextBtn = document.getElementById('reviewsNextBtn');

  if (reviewsTrack && reviewsPrevBtn && reviewsNextBtn) {
    reviewsPrevBtn.addEventListener('click', () => {
      reviewsTrack.scrollBy({ left: -240, behavior: 'smooth' });
    });
    reviewsNextBtn.addEventListener('click', () => {
      reviewsTrack.scrollBy({ left: 240, behavior: 'smooth' });
    });
  }

  // Handpicked collections navigation
  const collectionsWrapper = document.querySelector('.collections-scroll-wrapper');
  const collPrev = document.getElementById('collPrev');
  const collNext = document.getElementById('collNext');

  if (collectionsWrapper && collPrev && collNext) {
    const scrollAmount = 216;
    collNext.addEventListener('click', () => {
      collectionsWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    collPrev.addEventListener('click', () => {
      collectionsWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }
}

// ==========================================
// 3-STEP AUTHENTICATION ENGINE (MOBILE -> OTP -> LOGIN / SIGN UP)
// ==========================================
// AUTH MODULE - ACCOUNT DROPDOWN (Uber-style)
// ==========================================
function initAuthModule() {

  // ---- Data helpers ----
  function getMockUsers() {
    try {
      const s = localStorage.getItem('pickmi_users');
      if (s) return JSON.parse(s);
    } catch(e) {}
    return {
      "9876543210": { name: "Karthik P",  email: "karthik@pickmi.com", gender: "Male" },
      "9999999999": { name: "Test User",   email: "test@pickmi.com",   gender: "Male" }
    };
  }

  function getUser() {
    try {
      if (sessionStorage.getItem('pickmi_logged_out') === '1') return null;
      const s = sessionStorage.getItem('pickmi_user') || localStorage.getItem('pickmi_user');
      if (s) { const u = JSON.parse(s); if (u && u.name) return u; }
    } catch(e) {}
    return null;
  }

  function saveUser(u) {
    try { sessionStorage.setItem('pickmi_user', JSON.stringify(u)); } catch(e) {}
    sessionStorage.removeItem('pickmi_logged_out');
  }

  function logout() {
    sessionStorage.setItem('pickmi_logged_out', '1');
    sessionStorage.removeItem('pickmi_user');
  }

  let currentMobile = '';

  // ---- Header "Hi, Name" update ----
  function updateHeader() {
    const u = getUser();
    document.querySelectorAll('#accountBtn, .account-nav-link, .city-nav-account').forEach(btn => {
      const span = btn.querySelector('span, .city-nav-name');
      const svg  = btn.querySelector('svg circle');
      if (u) {
        if (span) span.textContent = 'Hi, ' + u.name.split(' ')[0];
        if (svg)  svg.setAttribute('fill', '#0043DC');
      } else {
        if (span) span.textContent = 'Account';
        if (svg)  svg.setAttribute('fill', '#94a3b8');
      }
    });
  }

  updateHeader();

  // ---- Build the Uber-style dropdown (once) ----
  function buildDropdown() {
    if (document.getElementById('pm-dropdown')) return;
    const el = document.createElement('div');
    el.id = 'pm-dropdown';
    el.style.cssText = [
      'position:fixed',
      'top:72px',
      'right:24px',
      'width:340px',
      'background:#fff',
      'border-radius:12px',
      'padding:28px 24px 24px',
      'box-shadow:0 8px 40px rgba(0,0,0,0.15)',
      'border:1px solid rgba(0,0,0,0.08)',
      'z-index:9999999',
      'display:none',
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
      'color:#000'
    ].join(';');

    el.innerHTML = `
      <a href="account.html" id="pm-header-link" onclick="window.location.href='account.html'; return false;" style="display:flex;justify-content:space-between;align-items:flex-start;gap:48px;margin-bottom:18px;text-decoration:none;color:inherit;cursor:pointer;border-radius:12px;padding:4px;transition:background 0.15s" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
        <div>
          <h3 id="pm-name" style="margin:0 0 8px 0;font-size:24px;font-weight:800;letter-spacing:-0.5px;color:#0f172a"></h3>
          <div style="display:inline-flex;align-items:center;gap:5px;background:#f3f4f6;border-radius:9999px;padding:4px 10px;font-size:13px;font-weight:700">
            <span style="color:#f59e0b">★</span><span>4.93</span>
          </div>
        </div>
        <div style="width:54px;height:54px;border-radius:50%;overflow:hidden;border:1px solid rgba(0,0,0,0.08);flex-shrink:0;margin-top:4px">
          <img id="pm-avatar" src="images/avatar-uploaded.png" onerror="this.src='https://ui-avatars.com/api/?name=K+P&background=0052ff&color=fff'" style="width:100%;height:100%;object-fit:cover">
        </div>
      </a>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px">
        <a href="help.html" style="background:#f3f4f6;border-radius:12px;padding:15px 8px;display:flex;flex-direction:column;align-items:center;gap:8px;text-decoration:none;color:#000;font-weight:700;font-size:13px;transition:background 0.15s" onmouseover="this.style.background='#e9eaec'" onmouseout="this.style.background='#f3f4f6'">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Help
        </a>
        <a href="account.html#cotravellers" id="pm-activity" style="background:#f3f4f6;border-radius:12px;padding:15px 8px;display:flex;flex-direction:column;align-items:center;gap:8px;text-decoration:none;color:#000;font-weight:700;font-size:13px;transition:background 0.15s" onmouseover="this.style.background='#e9eaec'" onmouseout="this.style.background='#f3f4f6'">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Activity
        </a>
      </div>

      <div style="height:1px;background:#e5e7eb;margin:8px -20px"></div>

      <div style="display:flex;flex-direction:column;gap:2px;margin-top:6px">
        <a href="account.html" id="pm-manage" onclick="window.location.href='account.html'; return false;" style="display:flex;align-items:center;gap:12px;padding:11px 8px;border-radius:12px;font-size:15px;font-weight:600;color:#0f172a;text-decoration:none;transition:background 0.15s" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background=''">
          <span style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:#f3f4f6;border-radius:10px;flex-shrink:0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </span>
          Manage account
        </a>
        <a href="community.html" id="pm-business" style="display:flex;align-items:center;gap:12px;padding:11px 8px;border-radius:12px;font-size:15px;font-weight:600;color:#0f172a;text-decoration:none;transition:background 0.15s" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background=''">
          <span style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:#f3f4f6;border-radius:10px;flex-shrink:0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
          </span>
          Pickmi for Business
        </a>
      </div>

      <div style="margin-top:12px">
        <button id="pm-signout" style="width:100%;padding:13px;border-radius:12px;background:#f3f4f6;border:none;font-size:15px;font-weight:700;color:#e11d48;cursor:pointer;font-family:inherit;transition:background 0.15s" onmouseover="this.style.background='#fee2e2'" onmouseout="this.style.background='#f3f4f6'">
          Sign out
        </button>
      </div>
    `;
    document.body.appendChild(el);
  }

  buildDropdown();

  // ---- Show / hide dropdown ----
  function showDropdown(anchorEl) {
    const dd = document.getElementById('pm-dropdown');
    if (!dd) return;
    const u = getUser();
    const nameEl = document.getElementById('pm-name');
    if (nameEl && u) nameEl.textContent = u.name;

    if (anchorEl) {
      const r = anchorEl.getBoundingClientRect();
      dd.style.top   = (r.bottom + 16) + 'px';
      dd.style.right = Math.max(12, window.innerWidth - r.right) + 'px';
      dd.style.left  = 'auto';
    }

    dd.style.display = 'block';
    dd.style.opacity = '0';
    dd.style.transform = 'translateY(-8px) scale(0.97)';
    dd.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
    requestAnimationFrame(() => {
      dd.style.opacity = '1';
      dd.style.transform = 'translateY(0) scale(1)';
    });
    dd._open = true;
  }

  function hideDropdown() {
    const dd = document.getElementById('pm-dropdown');
    if (!dd) return;
    dd.style.display = 'none';
    dd._open = false;
  }

  // ---- Login modal (shown only when NOT logged in) ----
  function showLoginModal() {
    const overlay = document.getElementById('splitLoginModalOverlay') || document.getElementById('loginModalOverlay');
    if (!overlay) {
      window.location.href = 'login.html';
      return;
    }
    const stepMobile = document.getElementById('authStepMobile');
    const stepOtp    = document.getElementById('authStepOtp');
    const stepReg    = document.getElementById('authStepRegister');
    const stepIn     = document.getElementById('authStepLoggedIn');
    if (stepMobile) stepMobile.style.display = 'block';
    if (stepOtp)    stepOtp.style.display    = 'none';
    if (stepReg)    stepReg.style.display    = 'none';
    if (stepIn)     stepIn.style.display     = 'none';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { const i = document.getElementById('authMobileInput'); if(i) i.focus(); }, 150);
  }

  function hideLoginModal() {
    const overlay = document.getElementById('splitLoginModalOverlay') || document.getElementById('loginModalOverlay');
    if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
  }

  // ---- Unified click handler ----
  document.addEventListener('click', function(e) {
    const dd = document.getElementById('pm-dropdown');

    // Account button clicked
    const accBtn = e.target.closest('#accountBtn, .account-nav-link, .city-nav-account');
    if (accBtn) {
      e.preventDefault();
      e.stopPropagation();
      const u = getUser();
      if (u) {
        if (dd && dd._open) { hideDropdown(); }
        else { showDropdown(accBtn); }
      } else {
        showLoginModal();
      }
      return;
    }

    // Clicks inside dropdown
    if (dd && dd.contains(e.target)) {
      // Sign out
      if (e.target.closest('#pm-signout')) {
        e.preventDefault();
        logout(); updateHeader(); hideDropdown();
        return;
      }
      // Activity
      if (e.target.closest('#pm-activity')) {
        hideDropdown();
        window.location.href = 'account.html#cotravellers';
        return;
      }
      // Manage account & Header Profile link
      if (e.target.closest('#pm-manage, #pm-header-link')) {
        e.preventDefault();
        e.stopPropagation();
        hideDropdown();
        if (window.location.pathname.indexOf('account.html') !== -1) {
          window.location.hash = 'profile';
          window.location.reload();
        } else {
          window.location.href = 'account.html';
        }
        return;
      }
      return; // other links inside dropdown navigate normally
    }

    // Click outside – close dropdown
    if (dd && dd._open) { hideDropdown(); return; }

    // Close login modal when clicking overlay
    const overlay = document.getElementById('splitLoginModalOverlay') || document.getElementById('loginModalOverlay');
    if (overlay && overlay.contains(e.target) && !e.target.closest('.login-modal')) {
      hideLoginModal(); return;
    }

    // Close button
    if (e.target.closest('#splitLoginModalClose, .login-modal-close, #closeAuthModalBtn')) {
      hideLoginModal(); return;
    }

    // Old logout button (in modal)
    if (e.target.id === 'btnLogout') {
      e.preventDefault(); logout(); updateHeader(); hideLoginModal(); return;
    }

    // Back to mobile step
    if (e.target.id === 'btnBackToMobile') {
      const sM = document.getElementById('authStepMobile');
      const sO = document.getElementById('authStepOtp');
      if (sO) sO.style.display = 'none';
      if (sM) { sM.style.display = 'block'; const i = document.getElementById('authMobileInput'); if(i) i.focus(); }
    }

    // Resend OTP
    if (e.target.id === 'btnResendOtp') {
      alert('A new OTP code has been sent to your phone.');
      const i = document.getElementById('authOtpInput'); if(i) { i.value=''; i.focus(); }
    }
  });

  // ---- Form submit handler ----
  document.addEventListener('submit', function(e) {
    // Step 1 – mobile number
    if (e.target && (e.target.id === 'formStepMobile' || e.target.id === 'splitLoginForm')) {
      e.preventDefault();
      const inp = document.getElementById('authMobileInput') || e.target.querySelector('input[type="tel"]');
      const num = inp ? inp.value.trim() : '';
      if (num.length !== 10 || !/^\d+$/.test(num)) { alert('Please enter a valid 10-digit mobile number.'); return; }
      currentMobile = num;
      if (window.PickmiSupabase && window.PickmiSupabase.sendSmsOtp) { window.PickmiSupabase.sendSmsOtp(num).then(r => { if(r.sessionId) window.activeOtpSessionId = r.sessionId; }); } alert('OTP sent to +91 ' + num + '! Please check your phone for the verification code.');
      const sM = document.getElementById('authStepMobile');
      const sO = document.getElementById('authStepOtp');
      const st = document.getElementById('otpSubText');
      if (sM) sM.style.display = 'none';
      if (sO) { sO.style.display = 'block'; if(st) st.textContent = 'Enter OTP sent to +91 ' + num; setTimeout(()=>{const i=document.getElementById('authOtpInput');if(i)i.focus();},150); }
      return;
    }

    // Step 2 – OTP Verification
    if (e.target && e.target.id === 'formStepOtp') {
      e.preventDefault();
      const inp = document.getElementById('authOtpInput');
      const otp = inp ? inp.value.trim() : '';
      
      if (!otp || otp.length < 4) {
        alert('Please enter a valid OTP code sent to your phone.');
        return;
      }

      const proceedLogin = () => {
        const users = getMockUsers();
        const existing = users[currentMobile];
        if (existing) {
          const u = { ...existing, mobile: currentMobile };
          saveUser(u); updateHeader(); hideLoginModal();
          if (window.PickmiSupabase && window.PickmiSupabase.syncUserAccount) {
            window.PickmiSupabase.syncUserAccount(u);
          }
          alert('Welcome back, ' + u.name + '!');
        } else {
          const sO = document.getElementById('authStepOtp');
          const sR = document.getElementById('authStepRegister');
          if (sO) sO.style.display = 'none';
          if (sR) { sR.style.display = 'block'; const n = document.getElementById('authNameInput'); if(n) setTimeout(()=>n.focus(),150); }
        }
      };

      if (window.PickmiSupabase && window.PickmiSupabase.verifySmsOtp) {
        window.PickmiSupabase.verifySmsOtp(window.activeOtpSessionId, otp).then(res => {
          if (res && res.success) {
            proceedLogin();
          } else {
            alert(res.message || 'Invalid OTP code. Please try again.');
          }
        });
      } else {
        proceedLogin();
      }
      return;
    }

    // Step 3 – register
    if (e.target && e.target.id === 'formStepRegister') {
      e.preventDefault();
      const name   = (document.getElementById('authNameInput')   || {}).value?.trim() || '';
      const email  = (document.getElementById('authEmailInput')  || {}).value?.trim() || '';
      const gender = (document.getElementById('authGenderSelect')|| {}).value || '';
      if (!name)                         { alert('Please enter your full name.'); return; }
      if (!email || !email.includes('@')){ alert('Please enter a valid email.'); return; }
      if (!gender)                       { alert('Please select your gender.'); return; }
      const u = { name, email, gender, mobile: currentMobile };
      const users = getMockUsers(); users[currentMobile] = u;
      try { localStorage.setItem('pickmi_users', JSON.stringify(users)); } catch(_){}
      saveUser(u); updateHeader(); hideLoginModal();
      alert('Account created! Welcome to Pickmi, ' + name + '!');
      return;
    }
  });

  // Open dropdown or modal on #account hash
  if (window.location.hash === '#account') {
    setTimeout(() => {
      const u = getUser();
      const btn = document.querySelector('#accountBtn, .account-nav-link');
      if (u) showDropdown(btn); else showLoginModal();
    }, 350);
  }
}

  // ==========================================
  // GLOBAL TRANSLATION SYSTEM
  // ==========================================
  const GLOBAL_TRANSLATIONS = {
  en: {
    drivePartner: "Drive Partner",
    community: "Community",
    help: "Help",
    account: "Account",
    myAccountHeader: "My Account",
    myProfile: "My Profile",
    activity: "Activity",
    safety: "Safety",
    logout: "Logout",
    personalInfo: "Personal info",
    nameLabel: "Name",
    phoneLabel: "Phone number",
    emailLabel: "Email",
    languageLabel: "Language",
    updateDeviceLang: "English (US)",
    heroTitle: "Go anywhere with Pickmi",
    heroSub: "Request a ride, hop in, and go.",
    tabRide: "Ride",
    tabPackage: "Package",
    tabRental: "Rental",
    pickupPlaceholder: "Enter pickup location",
    dropPlaceholder: "Enter destination",
    seePricesBtn: "See prices",
    manageAccount: "Manage Account"
  },
  ta: {
    drivePartner: "டிரைவர் பார்ட்னர்",
    community: "சமூகம்",
    help: "உதவி",
    account: "கணக்கு",
    myAccountHeader: "என் கணக்கு",
    myProfile: "என் சுயவிவரம்",
    activity: "நடவடிக்கைகள்",
    safety: "பாதுகாப்பு",
    logout: "வெளியேறு",
    personalInfo: "தனிப்பட்ட விவரங்கள்",
    nameLabel: "பெயர்",
    phoneLabel: "தொலைபேசி எண்",
    emailLabel: "மின்னஞ்சல்",
    languageLabel: "மொழி",
    updateDeviceLang: "Tamil (தமிழ்)",
    heroTitle: "பிக்மி உடன் எங்கும் செல்லுங்கள்",
    heroSub: "சவாரி பதிவு செய்து, நிம்மதியாக பயணம் செய்யுங்கள்.",
    tabRide: "சவாரி",
    tabPackage: "பார்சல்",
    tabRental: "வாடகை",
    pickupPlaceholder: "புறப்படும் இடம் உள்ளிடவும்",
    dropPlaceholder: "சேருமிடம் உள்ளிடவும்",
    seePricesBtn: "கட்டணம் பார்க்க",
    manageAccount: "கணக்கு நிர்வாகம்"
  },
  hi: {
    drivePartner: "ड्राइव पार्टनर",
    community: "कम्युनिटी",
    help: "सहायता",
    account: "खाता",
    myAccountHeader: "मेरा खाता",
    myProfile: "मेरी प्रोफाइल",
    activity: "गतिविधियां",
    safety: "सुरक्षा",
    logout: "लॉग आउट",
    personalInfo: "व्यक्तिगत जानकारी",
    nameLabel: "नाम",
    phoneLabel: "फोन नंबर",
    emailLabel: "ईमेल",
    languageLabel: "भाषा",
    updateDeviceLang: "Hindi (हिन्दी)",
    heroTitle: "पिकमी के साथ कहीं भी जाएं",
    heroSub: "राइड बुक करें और आराम से यात्रा करें।",
    tabRide: "राइड",
    tabPackage: "पार्सल",
    tabRental: "रेंटल",
    pickupPlaceholder: "पिकअप स्थान दर्ज करें",
    dropPlaceholder: "गंतव्य दर्ज करें",
    seePricesBtn: "दरें देखें",
    manageAccount: "खाता प्रबंधित करें"
  },
  kn: {
    drivePartner: "ಡ್ರೈವ್ ಪಾಲುದಾರ",
    community: "ಸಮುದಾಯ",
    help: "ಸಹಾಯ",
    account: "ಖಾತೆ",
    myAccountHeader: "ನನ್ನ ಖಾತೆ",
    myProfile: "ನನ್ನ ಪ್ರೊಫೈಲ್",
    activity: "ಚಟುವಟಿಕೆ",
    safety: "ಸುರಕ್ಷತೆ",
    logout: "ಲಾಗ್ ಔಟ್",
    personalInfo: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
    nameLabel: "ಹೆಸರು",
    phoneLabel: "ಫೋನ್ ಸಂಖ್ಯೆ",
    emailLabel: "ಇಮೇಲ್",
    languageLabel: "ಭಾಷೆ",
    updateDeviceLang: "Kannada (ಕನ್ನಡ)",
    heroTitle: "ಪಿಕ್‌ಮಿ ಜೊತೆಗೆ ಎಲ್ಲಿಗೆ ಬೇಕಾದರೂ ಹೋಗಿ",
    heroSub: "ರೈಡ್ ಕಾಯ್ದಿರಿಸಿ ಮತ್ತು ಆರಾಮವಾಗಿ ಪ್ರಯಾಣಿಸಿ.",
    tabRide: "ಸವಾರಿ",
    tabPackage: "ಪಾರ್ಸಲ್",
    tabRental: "ರೆಂಟಲ್",
    pickupPlaceholder: "ಪಿಕ್‌ಅಪ್ ಸ್ಥಳ ನಮೂದಿಸಿ",
    dropPlaceholder: "ತಲುಪುವ ಸ್ಥಳ ನಮೂದಿಸಿ",
    seePricesBtn: "ದರಗಳನ್ನು ನೋಡಿ",
    manageAccount: "ಖಾತೆ ನಿರ್ವಹಣೆ"
  },
  ml: {
    drivePartner: "ഡ്രൈവ് പാർട്ണർ",
    community: "കമ്മ്യൂണിറ്റി",
    help: "സഹായം",
    account: "അക്കൗണ്ട്",
    myAccountHeader: "എന്റെ അക്കൗണ്ട്",
    myProfile: "എന്റെ പ്രൊഫൈൽ",
    activity: "പ്രവർത്തനങ്ങൾ",
    safety: "സുരക്ഷ",
    logout: "ലോഗ് ഔട്ട്",
    personalInfo: "വ്യക്തിഗത വിവരങ്ങൾ",
    nameLabel: "പേര്",
    phoneLabel: "ഫോൺ നമ്പർ",
    emailLabel: "ഇമെയിൽ",
    languageLabel: "ഭാഷ",
    updateDeviceLang: "Malayalam (മലയാളം)",
    heroTitle: "പിക്മി ഉപയോഗിച്ച് എവിടെ വേണമെങ്കിലും പോകാം",
    heroSub: "റൈഡ് ബുക്ക് ചെയ്ത് സുഖകരമായി യാത്ര ചെയ്യുക.",
    tabRide: "സവാരി",
    tabPackage: "പാഴ്സൽ",
    tabRental: "റെന്റൽ",
    pickupPlaceholder: "പിക്ക്അപ്പ് സ്ഥലം നൽകുക",
    dropPlaceholder: "ലക്ഷ്യസ്ഥാനം നൽകുക",
    seePricesBtn: "നിരക്കുകൾ കാണുക",
    manageAccount: "അക്കൗണ്ട് നിയന്ത്രിക്കുക"
  },
  te: {
    drivePartner: "డ్రైవ్ పార్టనర్",
    community: "కమ్యూనిటీ",
    help: "సహాయం",
    account: "ఖాతా",
    myAccountHeader: "నా ఖాతా",
    myProfile: "నా ప్రొఫైల్",
    activity: "కార్యకలాపాలు",
    loggedInDevices: "లాగిన్ అయిన పరికరాలు",
    logout: "లాగ్ అవుట్",
    personalInfo: "వ్యక్తిగత సమాచారం",
    nameLabel: "పేరు",
    phoneLabel: "ఫోన్ సంఖ్య",
    emailLabel: "ఈమెయిల్",
    languageLabel: "భాష",
    updateDeviceLang: "Telugu (తెలుగు)",
    heroTitle: "పిక్మితో ఎక్కడికైనా వెళ్లండి",
    heroSub: "రైడ్ బుక్ చేసుకోండి మరియు హాయిగా ప్రయాణించండి.",
    tabRide: "సవారీ",
    tabPackage: "పార్శిల్",
    tabRental: "రెంటల్",
    pickupPlaceholder: "పికప్ స్థానాన్ని నమోదు చేయండి",
    dropPlaceholder: "గమ్యస్థానాన్ని నమోదు చేయండి",
    seePricesBtn: "ధరలను చూడండి",
    manageAccount: "ఖాతా నిర్వహణ"
  }
};

function applyGlobalTranslations() {
  const langCode = sessionStorage.getItem('pickmi_lang') || localStorage.getItem('pickmi_lang') || 'en';
  const dict = GLOBAL_TRANSLATIONS[langCode] || GLOBAL_TRANSLATIONS['en'];

  // 1. Top Navigation Bar Links
  document.querySelectorAll('a[href="driver.html"], a[href="driver-landing.html"]').forEach(el => {
    el.textContent = dict.drivePartner;
  });
  document.querySelectorAll('a[href="community.html"]').forEach(el => {
    el.textContent = dict.community;
  });
  document.querySelectorAll('a[href="help.html"]').forEach(el => {
    el.textContent = dict.help;
  });

  // 2. Account Nav Button Text
  const accountBtnSpan = document.querySelector('#accountBtn span, #navAccountName');
  if (accountBtnSpan) {
    const currentTxt = accountBtnSpan.textContent || '';
    if (currentTxt.includes('Karthik') || currentTxt.includes('Hi,')) {
      const greeting = langCode === 'ta' ? 'வணக்கம், Karthik' :
                       langCode === 'hi' ? 'नमस्ते, Karthik' :
                       langCode === 'kn' ? 'ನಮಸ್ಕಾರ, Karthik' :
                       langCode === 'ml' ? 'ഹലോ, Karthik' :
                       langCode === 'te' ? 'నమస్కారం, Karthik' : 'Hi, Karthik';
      accountBtnSpan.textContent = greeting;
    } else {
      accountBtnSpan.textContent = dict.account;
    }
  }

  // 3. Left Sidebar Header & Items (account.html)
  const sidebarHeader = document.querySelector('.sidebar-header');
  if (sidebarHeader) sidebarHeader.textContent = dict.myAccountHeader;

  // Sidebar Profile Item
  const sidebarProfileWrap = document.querySelector('.sidebar-item[data-tab="tab-profile"] .sidebar-label-wrap');
  if (sidebarProfileWrap) {
    const redDot = sidebarProfileWrap.querySelector('.red-dot-indicator');
    sidebarProfileWrap.textContent = dict.myProfile + ' ';
    if (redDot) sidebarProfileWrap.appendChild(redDot);
  }

  // Sidebar Activity Item
  const sidebarActivityWrap = document.querySelector('.sidebar-item[data-tab="tab-activity"] .sidebar-label-wrap');
  if (sidebarActivityWrap) sidebarActivityWrap.textContent = dict.activity;

  // Sidebar Safety Item
  const sidebarSafetyWrap = document.querySelector('.sidebar-item[data-tab="tab-safety"] .sidebar-label-wrap');
  if (sidebarSafetyWrap) sidebarSafetyWrap.textContent = dict.safety;

  // Sidebar Logout CTA
  const sidebarLogoutWrap = document.querySelector('.logout-sidebar-cta .sidebar-label-wrap');
  if (sidebarLogoutWrap) sidebarLogoutWrap.textContent = dict.logout;

  // 4. Dropdown Menu Items
  const pmManageLabel = document.querySelector('#pm-manage .pm-dropdown-label');
  if (pmManageLabel) pmManageLabel.textContent = dict.manageAccount;

  const pmLogoutLabel = document.querySelector('#pm-logout .pm-dropdown-label');
  if (pmLogoutLabel) pmLogoutLabel.textContent = dict.logout;

  // 5. Main Content Headings & Labels
  const personalInfoTitle = document.querySelector('.personal-info-title');
  if (personalInfoTitle) personalInfoTitle.textContent = dict.personalInfo;

  const activityTitle = document.querySelector('.activity-main-title');
  if (activityTitle) activityTitle.textContent = dict.activity;

  const displayProfileLang = document.getElementById('displayProfileLang');
  if (displayProfileLang) displayProfileLang.textContent = dict.updateDeviceLang;

  const rowNameTitle = document.querySelector('#rowEditName .info-row-title');
  if (rowNameTitle) rowNameTitle.textContent = dict.nameLabel;

  const rowPhoneTitle = document.querySelector('#rowEditPhone .info-row-title');
  if (rowPhoneTitle) rowPhoneTitle.textContent = dict.phoneLabel;

  const rowEmailTitle = document.querySelector('#rowEditEmail .info-row-title');
  if (rowEmailTitle) rowEmailTitle.textContent = dict.emailLabel;

  const rowLangTitle = document.querySelector('#rowEditLanguage .info-row-title');
  if (rowLangTitle) rowLangTitle.textContent = dict.languageLabel;

  // 6. Homepage Hero & Booking Box Elements
  const heroH1 = document.querySelector('.hero-content h1, .hero-title');
  if (heroH1) heroH1.textContent = dict.heroTitle;

  const heroP = document.querySelector('.hero-content p, .hero-subtitle');
  if (heroP) heroP.textContent = dict.heroSub;

  const pickupInput = document.getElementById('pickupLocation');
  if (pickupInput) pickupInput.placeholder = dict.pickupPlaceholder;

  const dropInput = document.getElementById('dropLocation');
  if (dropInput) dropInput.placeholder = dict.dropPlaceholder;

  const priceBtn = document.querySelector('.btn-see-prices, .search-submit-btn');
  if (priceBtn) priceBtn.textContent = dict.seePricesBtn;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { 
    initApp(); 
    initAuthModule(); 
    applyGlobalTranslations();
  });
} else {
  initApp();
  initAuthModule();
  applyGlobalTranslations();
}
