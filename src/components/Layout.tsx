import Head from 'next/head'
import styles from './layout.module.css'

const Layout = (props) => {
    return(
        <div className={styles.layoutWrapin}>
            <Head>
                <title>{props.title}</title>
            </Head>
            <meta />
            <div>
                {props.children}
            </div>
        </div>
    )
};


export default Layout