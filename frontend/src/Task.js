/* jshint esversion: 9 */
import React, { Component } from "react";
import {Link} from 'react-router-dom';

const Task = ({task}) => {
    return (
        <div>
            <td>
                <input id="checkbox" type="checkbox" defaultChecked={task.checked} />
            </td>
            <td>
                {task.description}
            </td>
            <td>
                <Link to={"/tasks/" + task.id}>Edit</Link>
            </td>
        </div>
    )
}

export default Task