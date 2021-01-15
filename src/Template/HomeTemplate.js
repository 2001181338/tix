import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../container/Home/Home/Footer';

// import { Container } from './styles';

function HomeTemplate({ Component, ...props }) {
    return <Route {...props}
        render={propsComponent => (
            <div>
                <Navbar />
                <Component {...propsComponent} />
                <Footer/>
            </div>
        )}>

    </Route>
}

export default HomeTemplate;