import React from 'react'

export const Items = ({items}) => {

    console.log('users length:::', items.length)
    if (items.length === 0) return null

    const UserRow = (item,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{index + 1}</td>
                  <td>{item.first}</td>
                  <td>{item.last}</td>
              </tr>
          )
    }

    const itemTable = items.map((item,index) => UserRow(item,index))

    return(
        <div className="container">
            <h2>Items</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>First</th>
                    <th>Last</th>
                </tr>
                </thead>
                <tbody>
                    {itemTable}
                </tbody>
            </table>
        </div>
    )
}