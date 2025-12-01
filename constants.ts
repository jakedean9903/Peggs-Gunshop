import { BusinessInfo, GunImage } from './types';

export const BUSINESS_INFO: BusinessInfo = {
  name: "Peggs Gun Shop",
  address: "3053 Old Hollow Road",
  city: "Walkertown",
  state: "NC",
  zip: "27051",
  phone: "(336) 772-1789",
  email: "Peggsgunshop@yahoo.com",
  // Using a generic map embed for the address provided
  mapEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3228.324391234567!2d-80.1784!3d36.1425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8853a5c6d4b5b5b5%3A0x1234567890abcdef!2s3053%20Old%20Hollow%20Rd%2C%20Walkertown%2C%20NC%2027051!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
};

export const IMAGES = {
  logo: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/PeggsLogo.jpg",
  sign: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/PeggsBuildingSign.jpg",
  hero: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/PeggsInsideBuilding.jpg",
  ammo: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/AmmoBox.jpg",
  pistol1: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/Pistol.jpg",
  pistolDisplay: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/Pistoldisplay.jpg",
  pistolExtended: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/PistolDisplayExtended.jpg",
  shotguns: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/Shotguns.jpg",
  remington: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/RemingtonShotgun.jpg",
  shotgunRack: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/ShotgunRack.jpg",
  rifleScope: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/Riflewithscope.jpg",
  winchester: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/Winchesterrifle.jpg",
  handhelds: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/handhelds.jpg",
  xp9pro: "https://raw.githubusercontent.com/jakedean9903/PeggsGunShop/main/xp9pro.jpg",
};

export const GALLERY_ITEMS: GunImage[] = [
  {
    id: 'p1',
    category: 'pistol',
    src: IMAGES.xp9pro,
    title: 'XP9 Pro',
    description: 'Reliable compact 9mm, perfect for concealed carry.',
  },
  {
    id: 'p2',
    category: 'pistol',
    src: IMAGES.pistol1,
    title: 'Classic Revolver',
    description: 'Timeless design with robust performance.',
  },
  {
    id: 'p3',
    category: 'pistol',
    src: IMAGES.pistolDisplay,
    title: 'Display Case Selection',
    description: 'Come see our rotating stock of handguns.',
  },
  {
    id: 's1',
    category: 'shotgun',
    src: IMAGES.remington,
    title: 'Remington Pump Action',
    description: 'The standard for reliability in the field.',
  },
  {
    id: 's2',
    category: 'shotgun',
    src: IMAGES.shotguns,
    title: 'Hunting Shotguns',
    description: 'Various gauges available for waterfowl and game.',
  },
  {
    id: 's3',
    category: 'shotgun',
    src: IMAGES.shotgunRack,
    title: 'Tactical & Defense',
    description: 'Home defense solutions.',
  },
  {
    id: 'r1',
    category: 'rifle',
    src: IMAGES.winchester,
    title: 'Winchester Lever Action',
    description: 'Classic western style meets modern precision.',
  },
  {
    id: 'r2',
    category: 'rifle',
    src: IMAGES.rifleScope,
    title: 'Precision Scoped Rifle',
    description: 'Long-range accuracy for the serious marksman.',
  },
  {
    id: 'a1',
    category: 'ammo',
    src: IMAGES.ammo,
    title: 'Ammunition Stock',
    description: 'Wide variety of calibers in stock.',
  },
  {
    id: 'ac1',
    category: 'accessory',
    src: IMAGES.handhelds,
    title: 'Optics & Accessories',
    description: 'Scopes, holsters, and cleaning kits.',
  },
];