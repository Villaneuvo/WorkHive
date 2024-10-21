import Image from 'next/image';
import styles from './page.module.css';
import Header from '@/components/section/header/Header';

export default function Home() {
    return (
        <>
            <Header />
            <h1>Hello World</h1>
        </>
    );
}
