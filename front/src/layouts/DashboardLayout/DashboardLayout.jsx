import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './DashboardLayout.module.scss';
import Head from 'next/head';
const DashboardLayout = ({ children }) => {
  return <>
    <Head>

    </Head>
    <div className={styles.container}>
      <Sidebar>
        <div className={styles.content}> {children}</div>
      </Sidebar>
    </div>
  </>
}
export default DashboardLayout;