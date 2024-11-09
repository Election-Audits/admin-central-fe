// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  // title: 'Utilities',
  type: 'group',
  children: [
    // {
    //   id: 'util-home',
    //   title: 'Home',
    //   type: 'item',
    //   url: '/home',
    //   icon: icons.FontSizeOutlined
    // },
    // {
    //   id: 'util-tasks',
    //   title: 'Tasks',
    //   type: 'item',
    //   url: '/tasks',
    //   icon: icons.BgColorsOutlined
    // },
    {
      id: 'util-political-parties',
      title: 'Political Parties',
      type: 'item',
      url: '/political-parties',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'util-polling-station',
      title: 'Polling Station',
      type: 'item',
      url: '/polling-station',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'util-elections',
      title: 'Elections',
      type: 'item',
      url: '/elections',
      icon: icons.BarcodeOutlined
    }
  ]
};

export default utilities;
