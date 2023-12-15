import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Selection } from './selection/selection';
import { FoodRecipes } from './foodRecipes/foodRecipes';
import { Instructions } from './instructions/instructions';
import { Form } from './form/form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <header className='container-fluid'>
                    <nav className='navbar fixed-top navbar-dark'>
                        <div className='navbar-brand'>
                            Family Secrets
                        </div>
                        <menu className='navbar-nav'>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to=''>
                                    Login
                                </NavLink>
                            </li>
                            {authState === AuthState.Authenticated && (
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='selection'>
                                        Users
                                    </NavLink>
                                </li>
                            )}
                            {authState === AuthState.Authenticated && (
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='foodRecipes'>
                                        Recipes
                                    </NavLink>
                                </li>
                            )}
                            {authState === AuthState.Authenticated && (
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='instructions'>
                                        Cooking Steps
                                    </NavLink>
                                </li>
                            )}
                            {authState === AuthState.Authenticated && (
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='form'>
                                        Add A Recipe
                                    </NavLink>
                                </li>
                            )}
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='about'>
                                    About
                                </NavLink>
                            </li>
                        </menu>
                    </nav>
                </header>

                <Routes>
                    <Route
                        path='/'
                        element={
                            <Login
                                userName={userName}
                                authState={authState}
                                onAuthChange={(userName, authState) => {
                                    setAuthState(authState);
                                    setUserName(userName);
                                }}
                            />
                        }
                        exact
                    />
                    <Route path='/selection' element={<Selection userName={userName} />} />
                    <Route path='/foodRecipes' element={<FoodRecipes />} />
                    <Route path='/instructions' element={<Instructions />} />
                    <Route path='/form' element={<Form />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className='bg-dark text-dark text-muted'>
                    <div className='container-fluid'>
                        <span className='text-reset'>Author Name(s)</span>
                        <a className='text-reset' href='https://github.com/KylexMak/startup.git'>
                            Source
                        </a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App();