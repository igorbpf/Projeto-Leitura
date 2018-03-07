import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import PostPage from './PostPage';
import PostFormPage from './PostFormPage';
import PageNotFound from './PageNotFound';


const Main = () => (
    <div className='main col-md-9 col-sm-9'>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/:category' component={Category} />
                <Route path='/post/create' component={PostFormPage} />
                <Route path='/:category/:postId' component={PostPage} />
                <Route path='*' component={PageNotFound} />
            </Switch>
    </div>
)

export default Main;
