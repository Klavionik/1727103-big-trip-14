import {DESTINATIONS, TYPES} from '../const';

const getOffersForType = (eventType, offers) => {
  return eventType
    ? Object.values(offers).find(({type}) => {
      return eventType === type;
    }).offers
    : [];
};

const generateInputNameFromTitle = (title) => {
  return title.toLowerCase().replaceAll(' ', '-');
};

const createDescriptionTemplate = (description) => {
  return description
    ? `<section class="event__section  event__section--destination">
         <h3 class="event__section-title  event__section-title--destination">Destination</h3>
         <p class="event__destination-description">${description.text}</p>
       </section>`
    : '';
};

const createOffersTemplate = (eventOffers, offersForType) => {
  const addOffers = (offers, checked = true) => {
    return offers.map(({title, price}) => {
      const name = generateInputNameFromTitle(title);
      return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="${name}-1" type="checkbox" name="${name}" ${checked ? 'checked' : ''}>
              <label class="event__offer-label" for="${name}-1">
                <span class="event__offer-title">${title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
            </div>`;
    }).join('');
  };

  const hasOffers = eventOffers.length || offersForType.length;

  return hasOffers
    ? `<section class="event__section  event__section--offers">
           <h3 class="event__section-title  event__section-title--offers">Offers</h3>
           <div class="event__available-offers">
             ${eventOffers.length ? addOffers(eventOffers): ''}
             ${offersForType.length ? addOffers(offersForType, false) : ''}
           </div>
         </section>`
    : '';
};

const createDestinationListTemplate = () => {
  return DESTINATIONS.map((destination) => {
    return `<option value="${destination}"></option>`;
  });
};

const createEventTypesTemplate = (currentType) => {
  return TYPES.map((type) => {
    const checked = currentType === type ? 'checked' : '';
    return `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
             value="${type}" ${checked}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`;
  }).join('');
};

export {
  createEventTypesTemplate,
  createDestinationListTemplate,
  createOffersTemplate,
  createDescriptionTemplate,
  getOffersForType
};
