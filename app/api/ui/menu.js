import { HOME, ORDERS, CHAT } from '../../utils/routes';

const routes = [{
  key: 'shop',
  name: 'Магазин',
  icon: 'ion-ios-home-outline',
  linkParent: HOME,
}, {
  key: 'orders',
  name: 'Заказы',
  icon: 'ion-ios-flag-outline',
  linkParent: ORDERS,
}, {
  key: 'chat',
  name: 'Чат',
  icon: 'ion-ios-color-wand-outline',
  linkParent: CHAT,
}];

export default routes;
