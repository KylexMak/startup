import React from 'react';
import './selection.css';

export function Selection() {
    fetch('https://api.api-ninjas.com/v1/quotes?category=food', {
      headers: {"X-Api-Key": "caCA71eRKvvseR5VWyFlsA==ioyhOOJ5bfExL29G"}
    })
      .then((response) => response.json())
      .then((data) => {
        const quoteEl = document.querySelector(".quoteBody");
        const authorEl = document.querySelector(".author");

        quoteEl.textContent = data[0].quote;
        authorEl.textContent = data[0].author;

        console.log(data);
      });
    
    return (
        <body>
            <h1>Users:</h1>
            <div>
                <div className="card-position">
                    <div className="card" style="width: 18rem;">
                        <img src="Generic Profile.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Johnathan Pierce</h5>
                            <a href="foodRecipes.html" className="btn btn-primary">Recipes</a>
                        </div>
                    </div>
                    <div className="card" style="width: 18rem;">
                        <img src="Generic Profile.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Nathan Green</h5>
                            <a href="foodRecipes.html" className="btn btn-primary">Recipes</a>
                        </div>
                    </div>
                    <div className="card" style="width: 18rem;">
                        <img src="Generic Profile.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Timmy Turner</h5>
                            <a href="foodRecipes.html" className="btn btn-primary">Recipes</a>
                        </div>
                    </div>
                </div>
                <div className="card-position-2">
                    <div className="card" style="width: 18rem;">
                        <img src="Generic Profile.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Josh Crandall</h5>
                            <a href="foodRecipes.html" className="btn btn-primary">Recipes</a>
                        </div>
                    </div>
                    <div className="card" style="width: 18rem;">
                        <img src="Generic Profile.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Mark Cube</h5>
                            <a href="foodRecipes.html" className="btn btn-primary">Recipes</a>
                        </div>
                    </div>
                    <div className="card" style="width: 18rem;">
                        <img src="Generic Profile.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Slad Craee</h5>
                            <a href="foodRecipes.html" className="btn btn-primary">Recipes</a>
                        </div>
                    </div>
                </div>
                <div>
                </div>
                <div className="text">
                    <div className="text-container">
                        <span className="quote">
                            <p className="quoteBody"></p>
                            <p className="author"></p>
                        </span>
                    </div>
                </div>
            </div>
        </body>
    );
}