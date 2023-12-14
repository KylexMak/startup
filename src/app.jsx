import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className='body bg-dark text-light'>
      <header className='container-fluid'>
        <nav className='navbar fixed-top navbar-dark'>
          <div className='navbar-brand'>
            Family Secrets
          </div>
          <menu className='navbar-nav'>
            <li className='nav-item'>
              <a className='nav-link' href='login.html'>
                Login
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='selection.html'>
                Users
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='foodRecipes.html'>
                Recipes
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='instructions.html'>
                Cooking Steps
              </a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='form.html'>
                    Add A Recipe
                </a>
            </li>
          </menu>
        </nav>
      </header>

      <main>App components go here</main>

      <footer className='bg-dark text-white-50'>
        <div className='container-fluid'>
          <span className='text-reset'>Author Name(s)</span>
          <a className='text-reset' href='https://github.com/KylexMak/startup.git'>
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}