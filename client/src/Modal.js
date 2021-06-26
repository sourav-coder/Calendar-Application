import React from "react";

import { Link, Switch, Route } from "react-router-dom";

import Items from "./Items";

export default function Modal(props) {
  console.log(props.slot);

  
  
  
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <nav class="navbar navbar-expand-lg ">
                <div class="container-fluid">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <Link class="nav-link active" to="/Year">
                        Year
                      </Link>
                    </li>
                    
                    <li class="nav-item">
                      <Link class="nav-link " to="/Month">
                        Month
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link active" to="/Day">
                        Day
                      </Link>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </nav>

              <Switch>
                <Route path="/Year">
                  <Items type="Year" date={props.slot}/>
                </Route>
                <Route path="/Month">
                  <Items type="Month" date={props.slot} />
                </Route>
                <Route path="/Day">
                  <Items type="Day" date={props.slot}  />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
