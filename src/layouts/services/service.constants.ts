import React from 'react';

import { GPortalIcon } from '@icons/g-portal.icon';
import { GozleDiskIcon } from '@icons/gozle-disk.icon';
import { GozleFilmIcon } from '@icons/gozle-film.icon';
import { GozleGameIcon } from '@icons/gozle-game.icon';
import { GozleNewsIcon } from '@icons/gozle-news.icon';
import { GozleSoftIcon } from '@icons/gozle-soft.icon';
import { GozleTaxiIcon } from '@icons/gozle-taxi.icon';
import { GozleIcon } from '@icons/gozle.icon';
import { LogoTextIcon } from '@icons/logo-text.icon';
import { StoreIcon } from '@icons/store.icon';
import { VideoIcon } from '@icons/video.icon';

export interface Service {
  Icon: React.FC;
  background: string;
  color?: string;
  to: string;
}

export const services: Service[] = [
  { Icon: GozleFilmIcon, background: '#00BA98', to: '' },
  { Icon: StoreIcon, background: '#FFFFFF', to: 'https://store.gozle.com.tm' },
  {
    Icon: GozleNewsIcon,
    background: '#00ACEE',
    to: 'https://gozle.com.tm/news',
  },
  {
    Icon: GozleGameIcon,
    background: '#000000',
    to: 'https://store.gozle.com.tm',
  },
  {
    Icon: GozleSoftIcon,
    background: '#000000',
    to: 'https://store.gozle.com.tm',
  },
  {
    Icon: LogoTextIcon,
    background: '#FFFFFF',
    color: '#00ACEE',
    to: 'https://id.gozle.com.tm',
  },
  {
    Icon: GozleIcon,
    background: '#FFFFFF',
    color: '#00ACEE',
    to: 'https://gozle.com.tm',
  },
  {
    Icon: GPortalIcon,
    background: '#038346',
    to: 'https://portal.gozle.com.tm',
  },
  {
    Icon: GozleDiskIcon,
    background: '#00ACEE',
    to: 'https://disk.gozle.com.tm',
  },
  { Icon: GozleTaxiIcon, background: '#E9EE00', to: '' },
  {
    Icon: VideoIcon,
    background: '#FFFFFF',
    to: 'https://v.gozle.com.tm',
  },
];
