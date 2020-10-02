// Core
import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
// Styles
import styles from './styles.module.scss';
// Components
import { Breadcrumbs } from '../ui/Breadcrumbs';

type PageTitleLink = {
  link: string;
  label: string;
};

type PageTitleProps = {
  links?: PageTitleLink[];
  current: string;
  title?: string;
};

export const PageTitle: FC<PageTitleProps> = ({
  links,
  current,
  title,
}: PageTitleProps): ReactElement => {
  return (
    <div>
      <div>
        <Breadcrumbs>
          <Link to="/" className={styles.TdUnderline}>
            <p>Main Page</p>
          </Link>

          {links && links.length
            ? links.map(({ link, label }) => (
                <Link key={link} to={link} className={styles.TdUnderline}>
                  <p>{label}</p>
                </Link>
              ))
            : null}

          <p>{current}</p>
        </Breadcrumbs>
      </div>

      {title !== undefined ? (
        <h2 className={styles.PageTitle}>{title}</h2>
      ) : null}
    </div>
  );
};
