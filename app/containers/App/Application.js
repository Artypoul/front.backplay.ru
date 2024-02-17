import { PropTypes } from 'prop-types';
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import {
  Accordion,
  AdvancedTable,
  Analytics,
  AppLayout,
  AreaCharts,
  AreaFilledChart,
  Autocomplete,
  Avatars,
  Badges,
  BarCharts,
  BarDirection,
  BlankPage,
  BotPage,
  Breadcrumbs,
  Buttons,
  Calendar,
  Cards,
  Chat,
  CheckboxRadio,
  CheckoutPage,
  CompossedCharts,
  Contact,
  CrmDashboard, CryptoDashboard,
  DateTimePicker,
  DialButton,
  DialogModal,
  Dividers,
  DoughnutCharts,
  DrawerMenu,
  Ecommerce,
  EditableCell,
  Email,
  Error,
  Grid,
  HelpSupport,
  Icons,
  ImageGrid,
  InfoUpdates,
  Infographics,
  Invoice,
  IonIcons,
  LineCharts,
  LineScatterChart,
  List,
  MapDirection,
  MapMarker,
  MiniApps,
  NotFound,
  Paginations,
  Parent,
  Photos,
  PieCharts,
  PopoverTooltip,
  Pricing,
  ProductPage,
  Profile,
  Progress,
  RadarCharts,
  RadarPolarCharts,
  Rating,
  ReduxForm,
  Responsive,
  ScatterCharts,
  SearchMap,
  Selectbox,
  Settings,
  SimpleTable,
  SliderCarousel,
  SliderRange,
  Snackbar,
  Status,
  Steppers,
  StreetViewMap,
  Switches,
  TablePlayground,
  Tabs,
  Tags,
  TaskBoard,
  TextEditor,
  Textbox,
  Timeline,
  ToggleButton,
  TrafficIndicator,
  TreeTable,
  Typography,
  Upload,
} from '../pageListAsync';
import { ThemeContext } from './ThemeWrapper';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        { /* Home */ }
        {/* <Route exact path="/app" component={PersonalDashboard} /> */}
        <Route exact path="/shop" component={Photos} />
        <Route path="/app/dashboard/sales-marketing" component={CrmDashboard} />
        <Route path="/app/dashboard/cryptocurrency" component={CryptoDashboard} />
        { /* Widgets */ }
        <Route path="/app/widgets/infographics" component={Infographics} />
        <Route path="/app/widgets/status" component={Status} />
        <Route path="/app/widgets/mini-apps" component={MiniApps} />
        <Route path="/app/widgets/analytics" component={Analytics} />
        <Route path="/app/widgets/info-updates" component={InfoUpdates} />
        { /* Layout */ }
        <Route exact path="/app/layouts" component={Parent} />
        <Route path="/app/layouts/grid" component={Grid} />
        <Route path="/app/layouts/app-layout" component={AppLayout} />
        <Route path="/app/layouts/responsive" component={Responsive} />
        { /* Table */ }
        <Route exact path="/app/tables" component={Parent} />
        <Route path="/shop/tables/basic-table" component={SimpleTable} />
        <Route path="/shop/orders" component={AdvancedTable} />
        <Route path="/app/tables/table-playground" component={TablePlayground} />
        <Route path="/app/tables/tree-table" component={TreeTable} />
        <Route path="/app/tables/editable-cell" component={EditableCell} />
        { /* Form & Button */ }
        <Route exact path="/app/forms" component={Parent} />
        <Route path="/app/forms/reduxform" component={ReduxForm} />
        <Route path="/app/forms/date-time-picker" component={DateTimePicker} />
        <Route path="/app/forms/checkbox-radio" component={CheckboxRadio} />
        <Route path="/app/forms/switches" component={Switches} />
        <Route path="/app/forms/selectbox" component={Selectbox} />
        <Route path="/app/forms/ratting" component={Rating} />
        <Route path="/app/forms/slider-range" component={SliderRange} />
        <Route path="/app/forms/buttons" component={Buttons} />
        <Route path="/app/forms/toggle-button" component={ToggleButton} />
        <Route path="/app/forms/dial-button" component={DialButton} />
        <Route path="/app/forms/textfields" component={Textbox} />
        <Route path="/app/forms/autocomplete" component={Autocomplete} />
        <Route path="/app/forms/upload" component={Upload} />
        <Route path="/app/forms/wysiwyg-editor" component={TextEditor} />
        { /* Ui Components */}
        <Route exact path="/app/ui" component={Parent} />
        <Route path="/app/ui/avatars" component={Avatars} />
        <Route path="/app/ui/accordion" component={Accordion} />
        <Route path="/app/ui/badges" component={Badges} />
        <Route path="/app/ui/list" component={List} />
        <Route path="/app/ui/popover-tooltip" component={PopoverTooltip} />
        <Route path="/app/ui/snackbar" component={Snackbar} />
        <Route path="/app/ui/typography" component={Typography} />
        <Route path="/app/ui/tabs" component={Tabs} />
        <Route path="/app/ui/card-papper" component={Cards} />
        <Route path="/app/ui/image-grid" component={ImageGrid} />
        <Route path="/app/ui/progress" component={Progress} />
        <Route path="/app/ui/dialog-modal" component={DialogModal} />
        <Route path="/app/ui/steppers" component={Steppers} />
        <Route path="/app/ui/paginations" component={Paginations} />
        <Route path="/app/ui/drawer-menu" component={DrawerMenu} />
        <Route path="/app/ui/breadcrumbs" component={Breadcrumbs} />
        <Route path="/app/ui/icons" component={Icons} />
        <Route path="/app/ui/ionicons" component={IonIcons} />
        <Route path="/app/ui/slider-carousel" component={SliderCarousel} />
        <Route path="/app/ui/tags" component={Tags} />
        <Route path="/app/ui/dividers" component={Dividers} />
        { /* Chart */ }
        <Route exact path="/app/charts" component={Parent} />
        <Route path="/app/charts/line-charts" component={LineCharts} />
        <Route path="/app/charts/bar-charts" component={BarCharts} />
        <Route path="/app/charts/area-charts" component={AreaCharts} />
        <Route path="/app/charts/pie-charts" component={PieCharts} />
        <Route path="/app/charts/radar-charts" component={RadarCharts} />
        <Route path="/app/charts/scatter-charts" component={ScatterCharts} />
        <Route path="/app/charts/compossed-chart" component={CompossedCharts} />
        <Route path="/app/charts/doughnut-pie-charts" component={DoughnutCharts} />
        <Route path="/app/charts/bar-direction-charts" component={BarDirection} />
        <Route path="/app/charts/line-scatter-charts" component={LineScatterChart} />
        <Route path="/app/charts/area-filled-charts" component={AreaFilledChart} />
        <Route path="/app/charts/radar-polar-chart" component={RadarPolarCharts} />
        { /* Sample Apps */ }
        <Route path="/shop/checkout" component={CheckoutPage} />
        <Route path="/shop/pages/product-detail" component={ProductPage} />
        <Route path="/shop/projects/:id" component={ProductPage} />
        {/* <Route path="/shop/projects/details" component={ProductPage} /> */}
        <Route path="/shop/projects/create" component={ProductPage} />
        <Route path="/shop/projects/:id/edit" component={ProductPage} />
        <Route path="/app/pages/invoice" component={Invoice} />
        <Route path="/app/pages/taskboard" component={TaskBoard} />
        <Route path="/app/pages/calendar" component={Calendar} />
        <Route path="/shop/chat" component={Chat} />
        <Route path="/shop/pages/contact" component={Contact} />
        <Route path="/shop/pages/ecommerce" component={Ecommerce} />
        <Route path="/shop/pages/timeline" component={Timeline} />
        <Route path="/shop/pages/email" component={Email} />
        { /* Pages */ }
        <Route exact path="/app/pages" component={Parent} />
        <Route path="/shop/profile" component={Profile} />
        <Route path="/shop/pages/blank-page" component={BlankPage} />
        <Route path="/shop/blank-single" component={BlankPage} />
        <Route path="/app/pages/photo-gallery" component={Photos} />
        <Route path="/shop/pages/pricing" component={Pricing} />
        <Route path="/app/pages/not-found" component={NotFound} />
        <Route path="/app/pages/error" component={Error} />
        <Route path="/shop/pages/settings" component={Settings} />
        <Route path="/shop/pages/help-support" component={HelpSupport} />
        {/* <Route path="/shop/bot" component={BotPage} /> */}
        {/* <Route path="/shop/bot/:projectID" component={BotPage} /> */}
        <Route path="/shop/bot/:projectId/:type" component={BotPage} />
        <Route path="/shop/order/:orderId" component={BotPage} />
        { /* Map */ }
        <Route exact path="/app/maps" component={Parent} />
        <Route path="/shop/maps/map-marker" component={MapMarker} />
        <Route path="/app/maps/map-direction" component={MapDirection} />
        <Route path="/app/maps/map-searchbox" component={SearchMap} />
        <Route path="/app/maps/map-traffic" component={TrafficIndicator} />
        <Route path="/app/maps/street-view" component={StreetViewMap} />
        { /* Default */ }
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
