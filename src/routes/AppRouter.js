import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import React from 'react';



import LeftArea from '../components/LeftArea'
import MainArea from '../components/MainArea';
import BottomArea from '../components/BottomArea';
import Browse from '../components/Browse';
import Radio from '../components/Radio';
import AlbumPage from '../components/AlbumPage';
import ArtistPage from '../components/ArtistPage';
import ArtistsPage from '../components/ArtistsPage';
import AlbumsPage from '../components/AlbumsPage';





const AppRouter = () => (
    <BrowserRouter>

        <div>
            <div className="mainTopContainer">
                <LeftArea />

                <Switch>

                    <Route
                        exact path='/'
                        render={(props) => (
                        <MainArea {...props} type="main"  />
                        
                        )}
                    />


                    <Route path="/browse" component={Browse} exact={true} />
                    <Route path="/radio" component={Radio} exact={true} />
                    <Route path="/artists" component={ArtistsPage} exact={true} />
                    <Route path="/albums" component={AlbumsPage} exact={true} />
     

                    <Route
                        exact path='/liked'
                        render={(props) => (
                        <MainArea {...props} type="liked" />
                        )}
                    />



                    <Route path="/album/:album_name" component={AlbumPage} />
                    <Route path="/artist/:artist_name" component={ArtistPage} />

                </Switch>
            </div>

            <BottomArea />
        </div>

        
    </BrowserRouter>
)

export default AppRouter;

