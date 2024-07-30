import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Yu',
  subtitle: 'Blogs',
  lang: 'zh_CN',         // 'en', 'zh_CN', 'zh_TW', 'ja'
  themeColor: {
    hue: 250,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: 'assets/images/ff-banner.jpg',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'center', // Equivalent to object-position, defaults center
  },
  favicon: [    // Leave this array empty to use the default favicon
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    //{
      //name: 'GitHub',
      //url: 'https://github.com/saicaca/fuwari',     // Internal links should not include the base path, as it is automatically added
      //external: true,                               // Show an external link icon and will open in a new tab
    //},
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/ff.jpg',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: 'Ray',
  bio: 'Ciallo～(∠・ω< )⌒☆',
  links: [
    {
      name: 'Weixin',
      icon: 'fa6-brands:weixin',       // Visit https://icones.js.org/ for icon codes
                                        // You will need to install the corresponding icon set if it's not already included
                                        // `pnpm add @iconify-json/<icon-set-name>`
      url: 'https://raw.githubusercontent.com/yupai-pai/blog/main/src/assets/images/weixin.jpg',
    },
    {
      name: 'Steam',
      icon: 'fa6-brands:steam',
      url: 'https://steamcommunity.com/profiles/76561198379842906/',
    },
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/yupai-pai',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}

// vite.config.js 或 vite.config.ts
export default {
  // 其他配置...
  build: {
    assetsInclude: ['**/*.zip', '**/*.1'] // 包含.zip和.1文件
  }
}