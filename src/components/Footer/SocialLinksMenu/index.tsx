// Core
import React, { FC, ReactElement } from 'react';

// Styles
import styles from './styles.module.scss';

// Icons
import { ReactComponent as InstagramIcon } from '../../../assets/icons/footer/social-links-menu/instagram 1.svg';
import { ReactComponent as YouTubeIcon } from '../../../assets/icons/footer/social-links-menu/youtube 1.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/icons/footer/social-links-menu/facebook 1.svg';
import { ReactComponent as VKIcon } from '../../../assets/icons/footer/social-links-menu/vkicon.svg';
import { ReactComponent as PIcon } from '../../../assets/icons/footer/social-links-menu/picon.svg';

export const SocialLinksMenu: FC = (): ReactElement => {
  return (
    <div className={styles.menu}>
      <a
        href="https://www.instagram.com/kingswater.official/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <InstagramIcon className={styles.icons} />
      </a>
      <a
        href="https://www.youtube.com/channel/UCUlr7GFsQvsZ3S94PMY1EQg"
        target="_blank"
        rel="noreferrer noopener"
      >
        <YouTubeIcon className={styles.icons} />
      </a>
      <a
        href="https://www.facebook.com/kingswaterru/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FacebookIcon className={styles.icons} />
      </a>
      <a
        href="https://vk.com/kingswater.official"
        target="_blank"
        rel="noreferrer noopener"
      >
        <VKIcon className={styles.icons} />
      </a>
      <a
        href="https://www.pinterest.ru/kingswaterofficial/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <PIcon className={styles.icons} />
      </a>
    </div>
  );
};
