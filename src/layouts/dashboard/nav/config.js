// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Gestion des villes',
    path: '/dashboard/villes',
    icon: icon('building'),
  },
  {
    title: 'Gestion des zones',
    path: '/dashboard/zones',
    icon: icon('ic_blog'),
  },
  {
    title: 'Gestion des terrains',
    path: '/dashboard/terrain',
    icon: icon('terrain'),
  },
  {
    title: 'Gestion des clubs',
    path: '/dashboard/club',
    icon: icon('people'),
  },
  {
    title: 'Gestion des Packs',
    path: '/dashboard/packs',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
