import { FC } from 'react';

import styles from './TemplateName.module.scss';

interface TemplateNameProps {}

const TemplateName: FC<TemplateNameProps> = () => {
  return <div className={styles.container}>TemplateName</div>;
};

export default TemplateName;
