import React from 'react'

export const DisplayBoard = ({numberOfItems, getAllItems}) => {

    
    return(
        <div style={{backgroundColor:'green'}} className="display-board">
            <h4 style={{color: 'white'}}>Count</h4>
            <div className="number">
            {numberOfItems}
            </div>
            <div className="btn">
                <button type="button" onClick={(e) => getAllItems()} className="btn btn-warning">Get Items List</button>
            </div>
        </div>
    )
}