import React from 'react';
import Main from './Main';
import Header from './Header';
import CategoryPanel from './CategoryPanel';
import Footer from './Footer';


const App = () => (
    <div className='fill'>
        <Header/>
        <div className='container-fluid fill page-body'>
            <div className='row fill'>
                <Main />
                <CategoryPanel />
            </div>
        </div>
        {/* <Footer /> */}
    </div>
)

export default App;
