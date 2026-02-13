import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import logoImg from '../assets/logo-main.png';
import './VmixTestimony.css';

const VmixTestimony = () => {
    const [searchParams] = useSearchParams();
    const show = searchParams.get('show') !== 'false';

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    if (!show) return null;

    return (
        <div className="vmix-container">
            <div className="testimony-card">
                <div className="logo-container">
                    <img src={logoImg} alt="Church Logo" className="church-logo" />
                </div>
                <div className="text-content">
                    <h1 className="main-title">TESTIMONIES</h1>
                    <p className="sub-title">IT IS TIME TO SHARE</p>
                </div>
            </div>
        </div>
    );
};

export default VmixTestimony;
