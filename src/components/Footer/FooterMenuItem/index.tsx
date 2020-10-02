import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
// Styles
import styles from './style.module.scss';

type FooterLink = {
  label: string;
  link: (() => void) | string | null;
};

export type FooterMenuItemProps = {
  title: string;
  links: FooterLink[];
};

export const FooterMenuItem: FC<FooterMenuItemProps> = ({
  title,
  links,
}: FooterMenuItemProps): ReactElement => {
  return (
    <div className={styles.menu}>
      <h3 className={styles.title}>{title}</h3>
      {links && links.length
        ? links.map(({ label, link }) => {
            if (link === null) {
              return (
                <p key={label} className={styles.text}>
                  {label}
                </p>
              );
            }
            if (typeof link === 'string') {
              return (
                <Link key={label} to={link} className={styles.activeLink}>
                  <p className={styles.linkText}>{label}</p>
                </Link>
              );
            }
            return (
              <p key={label} className={styles.activeLink} onClick={link}>
                {label}
              </p>
            );
          })
        : null}
    </div>
  );
};
