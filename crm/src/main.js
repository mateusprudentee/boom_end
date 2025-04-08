import { createApp } from 'vue';
import Navbar from './components/Navbar.vue'; // Importando o Navbar como layout principal
import router from './router'; // Importar as rotas configuradas
import { Quasar, Dialog, Notify } from 'quasar'; // Plugins do Quasar
import 'quasar/src/css/index.sass'; // Estilos do Quasar
import '@quasar/extras/material-icons/material-icons.css'; // Adicionando o pacote de ícones
import VueApexCharts from 'vue3-apexcharts';
import 'quasar/dist/quasar.css'; // Certifique-se de importar o CSS do Quasar

// Importar os componentes do Quasar que serão utilizados
import {
  QBtn,
  QCard,
  Qrcode,
  QInnerLoading,
  Qbreadcrumbs,
  QTabs,
  CardItem,
  QTooltip,
  QBadge,
  QCardSection,
  QCardActions,
  QSelect,
  QDialog,
  QToggle,
  QTab,
  QTabPanels,
  QRadio,
  QGutter,
  QLinearProgress,
  QSeparator,
  QForm,
  QInput,
  QItemSection,
  QIcon,
  QTable, // Importando o componente de tabela
  QTh,
  QToolbar,
  QItem,
  QExpansionItem,
  QTr,
  QTd,
  QAvatar,
  QSpinner,
  QDate,
  QLoading,
  QClose,
  QItemLabel,
  QMenu,
  QChip,
  QCloseDialog,
  QUploader,
  QToolbarTitle,
  QStepperNavigation,
    QStep,
  QStepper,
  QPopupProxy,
  QOptionGroup,
  QClosePopup,
  QTabPanel,
  QSkeleton, // Importando o componente Skeleton
  QCarousel, // Importando o componente QCarousel
  QCarouselSlide, // Importando o componente QCarouselSlide
  QFile, // Importando o componente de arquivo (upload)
  QBtnDropdown, // Importando o componente QBtnDropdown
  QCheckbox, // Importando o componente QCheckbox
  QSlider,   // Importando o componente QSlider
} from 'quasar';

const app = createApp(Navbar); // Usando Navbar como layout principal

// Configuração do Quasar
app.use(Quasar, {
  plugins: {
    Dialog,
    Notify,
  },
  components: {
    QCardSection,
  QCardActions,
  QChip,
  QTooltip,
  QInnerLoading,
  QLoading,
  Qbreadcrumbs,
  QTabPanel,
    QBtn,
  QOptionGroup,
    QLinearProgress,
    QStepper,
    Qrcode,
    QSpinner,
    QStepperNavigation,
    QStep,
    QUploader,
    QMenu,
    QDialog,
    QClose,
    QToolbar,
    QCloseDialog,
    QClosePopup,
    QDate,
    QRadio,
    QPopupProxy,
    QGutter,
    QToolbarTitle,
    QBadge,
    QItemSection,
    QItemLabel,
    QCard,
    QExpansionItem,
    QInput,
    QAvatar,
    QToggle,
    QTabs,
    QForm,
    QTab,
    QTabPanels,
    QSelect,
    QSeparator,
    QItem,
    QIcon,
    QTable, // Registrando o componente de tabela
    QTh,
    QTr,
    QTd,
    CardItem,
    QSkeleton, // Registrando o componente Skeleton
    QCarousel, // Registrando o componente QCarousel
    QCarouselSlide, // Registrando o componente QCarouselSlide
    QFile, // Registrando o componente de arquivo
    QBtnDropdown, // Registrando o componente QBtnDropdown
    QCheckbox, // Registrando o componente QCheckbox
    QSlider,   // Registrando o componente QSlider
  },
});

// Usar o roteador
app.use(router);
app.use(VueApexCharts);

// Montar a aplicação
app.mount('#app');
