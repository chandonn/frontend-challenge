import React from 'react';
import styles from './styles.module.scss';

/* TODO:
1. Center h1 and p elements, both horizontally and vertically. Use provided "styles" object.
2. Make the font sizes of both elements smaller on devices with screen width less than 768px.
*/

const Home = () => {
  return (
    <section className={styles.homeSection}>
      <h1>WellTheory</h1>
      <p>Complete the TODOs placed throughout the codebase.</p>
    </section>
  );
}

export default Home;
