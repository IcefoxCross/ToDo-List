/* jshint esversion: 9 */
import React, { Component } from "react";
import {Container, Table, Form, FormGroup, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Task from './Task';
import TaskForm from './TaskForm';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {tasks: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/tasks')
            .then(response => response.json())
            .then(data => this.setState({tasks: data, isLoading: false}));
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async remove(id) {
        await fetch(`/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTasks = [...this.state.tasks].filter(i => i.id !== id);
            this.setState({tasks: updatedTasks});
        });
    }

    render() {
        const {tasks, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const taskList = tasks.map(task => {
            return <tr key={task.id}>
                <Task key={task.id} task={task} />
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <h3>To-Do List</h3>
                    <Table className="mt-4">
                        <tbody>
                            {taskList}
                        </tbody>
                    </Table>
                    <TaskForm/>
                </Container>
            </div>
        );
    }
}

export default TaskList;