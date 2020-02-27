/* jshint esversion: 9 */
import React, {Component} from 'react';
import {Container, Table, Form, FormGroup, Input, Button} from 'reactstrap';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: {
                description: '',
                checked: false
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let task = {...this.state.task};
        task[name] = value;
        this.setState({task});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {task} = this.state;
    
        await fetch('/api/group', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task),
        });
    }

    render() {

        const {item} = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input type="text" name="description" id="description" defaultValue='New Task' onChange={this.handleChange} />
                        <Button color="primary" type="submit">Add</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default TaskForm;