import React, { FC, ReactElement } from 'react';
// Styles
import styles from './styles.module.scss';
// Components
import { LoadingMenu } from './LoadingMenu';
import { CertificateMenu } from './CertificateMenu';
import { SocialLinksMenu } from './SocialLinksMenu';
import { Copyright } from './Copyright';
import { FooterMenuItem, FooterMenuItemProps } from './FooterMenuItem';
import { useModalManage } from '../../dialogs/hooks';
import { Modals } from '../../store/types/modal';
import { useSecurity } from '../../hooks';

export const Footer: FC = (): ReactElement => {
  const { apikey, userId } = useSecurity();
  const { open } = useModalManage();

  const profileMenu: FooterMenuItemProps =
    apikey !== null && userId !== null
      ? {
          title: 'Personal Area',
          links: [
            {
              link: '/profile',
              label: 'Profile',
            },
          ],
        }
      : {
          title: 'Person Area',
          links: [
            {
              link: (): void => {
                open(Modals.Login);
              },
              label: 'Log in',
            },
          ],
        };

  const menuItemList: FooterMenuItemProps[] = [
    profileMenu,
    {
      title: 'Service',
      links: [
        {
          link: '/order',
          label: 'Orders',
        },
        {
          link: '/delivery',
          label: 'Delivery and payment',
        },
      ],
    },
    {
      title: 'Contacts',
      links: [
        {
          link: null,
          label: 'City, Street, House',
        },
        {
          link: '/contacts',
          label: 'Look for a map',
        },
        {
          link: null,
          label: '+(xxx) xx-xxx-xxxx',
        },
        {
          link: null,
          label: '24/7',
        },
        {
          link: null,
          label: 'xxx@xxxxx.xxx',
        },
      ],
    },
  ];
  return (
    <footer className={styles.wrap}>
      <div className={`${styles.container} container`}>
        <div className={styles.row}>
          {menuItemList.map(({ title, links }) => {
            return <FooterMenuItem key={title} title={title} links={links} />;
          })}

          <LoadingMenu />
          <CertificateMenu />
        </div>
        <SocialLinksMenu />
        <Copyright />
      </div>
    </footer>
  );
};
