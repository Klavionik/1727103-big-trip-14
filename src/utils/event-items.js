import {TYPES} from '../const';
import {compareByTitle} from './compare';

const filterNotSelectedOffers = (eventOffers, offersForType) => {
  const notSelected = [];

  for (const offer of offersForType) {
    const isSelected = eventOffers.some((eventOffer) => eventOffer.title === offer.title);
    if (!isSelected) {
      notSelected.push(offer);
    }
  }

  return notSelected;
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

const createOffersTemplate = (eventOffers, eventTypeOffers, disabled) => {
  const addOffers = (offers) => {
    return offers.map(({id, title, price, checked}) => {
      const name = generateInputNameFromTitle(title);
      return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="${name}_${id}" type="checkbox" name="${name}" ${checked ? 'checked' : ''} ${disabled}>
              <label class="event__offer-label" for="${name}_${id}">
                <span class="event__offer-title">${title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
            </div>`;
    }).join('');
  };

  const notSelectedOffers = filterNotSelectedOffers(eventOffers, eventTypeOffers);
  const allOffers = [
    ...eventOffers.map((value) => { return {...value, checked: true}; }),
    ...notSelectedOffers.map((value) => { return {...value, checked: false}; }),
  ].sort(compareByTitle);

  return allOffers.length
    ? `<section class="event__section  event__section--offers">
           <h3 class="event__section-title  event__section-title--offers">Offers</h3>
           <div class="event__available-offers">
             ${addOffers(allOffers)}
           </div>
         </section>`
    : '';
};

const createDestinationListTemplate = (destinations) => {
  return destinations.map((destination) => {
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

const createPhotosTemplate = (description) => {
  const addPhoto = (photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;

  return description
    ? `<div class="event__photos-container">
         <div class="event__photos-tape">${description.photos.map(addPhoto).join('')}</div>
       </div>`
    : '';
};

export {
  createEventTypesTemplate,
  createDestinationListTemplate,
  createOffersTemplate,
  createDescriptionTemplate,
  createPhotosTemplate
};
