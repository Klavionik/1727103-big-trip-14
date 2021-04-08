import {
  createMenuTemplate,
  createTripInfoTemplate,
  createFiltersTemplate,
  createSortingTemplate,
  createEventItemTemplate,
  createEventEditFormTemplate
} from './view';
import {generateEventItem} from './mock/event-item';
import {calculateTripInfo} from './view/utils';
import {generateAvailableOffers} from './mock/utils';

const EVENT_ITEMS_COUNT = 8;

const availableOffers = generateAvailableOffers();
const eventItems = new Array(EVENT_ITEMS_COUNT).fill().map(generateEventItem);

const render = (container, template, position = 'beforeend') => {
  container.insertAdjacentHTML(position, template);
};

const createEvents = (eventsList) => {
  eventItems.slice(1).forEach((event) => {
    const eventItem = createEventItemTemplate(event);
    render(eventsList, eventItem);
  });
};

const navigationElement = document.querySelector('.trip-controls__navigation');
const tripMainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(navigationElement, createMenuTemplate());

const tripInfo = calculateTripInfo(eventItems.slice(1));
render(tripMainElement, createTripInfoTemplate(tripInfo), 'afterbegin');
render(filtersElement, createFiltersTemplate());
render(tripEventsElement, createSortingTemplate());

const tripEventsListElement = document.querySelector('.trip-events__list');

render(tripEventsListElement, createEventEditFormTemplate(eventItems[0], availableOffers));
createEvents(tripEventsListElement);
// по условию задачи рендерить форму новой точки маршрута не нужно?
// render(tripEventsListElement, createEventNewFormTemplate(eventItems[0]), availableOffers);

