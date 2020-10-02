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
          title: 'Личный кабинет',
          links: [
            {
              link: '/profile',
              label: 'Личный кабинет',
            },
          ],
        }
      : {
          title: 'Личный кабинет',
          links: [
            {
              link: (): void => {
                open(Modals.Login);
              },
              label: 'Войти',
            },
          ],
        };

  const menuItemList: FooterMenuItemProps[] = [
    profileMenu,
    {
      title: 'Покупательский сервис',
      links: [
        {
          link: '/order',
          label: 'Заказы',
        },
        {
          link: '/delivery',
          label: 'Доставка и оплата',
        },
      ],
    },
    {
      title: 'Контакты',
      links: [
        {
          link: null,
          label: 'г. Москва, ул. Дубининская д.61',
        },
        {
          link: '/contacts',
          label: 'Посмотреть на карте',
        },
        {
          link: null,
          label: '+7 (495)114-5555',
        },
        {
          link: null,
          label: 'Пн-Вс 9.00 - 18.00',
        },
        {
          link: null,
          label: 'sokolov@kingswater.ru',
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
