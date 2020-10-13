import React from 'react';
import { render } from 'react-dom';

const styles = {
  fontFamliy: 'sans-serif',
  textAlign: 'center',
};

let id = 0;

const Todo = props => {
  <li>
    <input type="checkbox" checked={props.todos.checked}/>
    <button onClick={props.onDelete}>delete</button>
    <span>{props.todos.text}</span>
  </li>
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      toDos: [],
    }
  }

  addTodo() {
    const text = prompt("Input new task");
    this.setState({
      // ... copies pulls out all values of array and clones them
      toDos: [
        ...this.state.toDos, 
        {id: id++, text: text checked: false}],
    })
  }

  removeToDo(id) {
    this.setState({
      toDos: [...this.state.toDos.filter(todo => todo.id != id)]
    })
  }

  render() {
    return (
      <div>
        <button onClick={() => this.addTodo}>Add TODO</button>
        <ul>
          {/* capital Todo outlines a React component, which is defined above */}
          {this.state.toDos.map(todo => (
          <Todo 
            onDelete={()=> this.removeToDo(todo.id)}
            todo={todo} 
           />
          ))}
        </ul>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));