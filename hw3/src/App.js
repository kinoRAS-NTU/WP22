// import './App.scss';
import { Component } from 'react'
import removeIcon from './assets/remove.png'
import './init.scss'

class App extends Component {
    constructor () {
        super();
        this.state = {
            todos: [],
            currPage: 'all',
        }
        this.handleAddTodo = this.handleAddTodo.bind(this)
        this.handleRemoveTodo = this.handleRemoveTodo.bind(this)
        this.handleRemoveDoneTodo = this.handleRemoveDoneTodo.bind(this)
        this.handleTodoDoneChange = this.handleTodoDoneChange.bind(this)
        this.handleChangeView = this.handleChangeView.bind(this)
        this.getRandomIdentifier = this.getRandomIdentifier.bind(this)
    }

    render () {
        return (
            <div id="root" className="todo-app__root">
                <header className="todo-app__header">
                    <h1 className="todo-app__title">todos</h1>
                </header>
                <section className="todo-app__main">
                    <input type="text" className="todo-app__input" placeholder="What needs to be done?" />
                    <ul className="todo-app__list" id="todo-list">{
                        this.state.todos
                        .filter(e => {
                            switch (this.state.currPage) {
                                case 'act': return !e.done
                                case 'cpt': return e.done
                                default: return true
                            }
                        }).map( (item) => 
                            <li className="todo-app__item" key={ 'todo-b' + item.id }>
                                <div className="todo-app__checkbox">
                                    <input type="checkbox" id={ 'todo-c' + item.id } defaultChecked={item.done} onClick={ this.handleTodoDoneChange }/>
                                    <label htmlFor={ 'todo-c' + item.id }></label>
                                </div>
                                <h1 className={`todo-app__item-detail ${item.done ? 'done' : ''}`}> { item.name } </h1>
                                <img className="todo-app__item-x" alt="Remove this todo" src={removeIcon}
                                    id={ 'todo-r' + item.id } onClick={ this.handleRemoveTodo }/>
                            </li>
                        )}
                    </ul>
                </section>
                <footer className={`todo-app__footer ${this.state.todos.length ? '' : 'hide'}`} id="toto-footer">
                    <div className="todo-app__total">
                        { this.state.todos.filter(e => { return !e.done }).length } left
                    </div>
                    <ul  className="todo-app__view-buttons">
                        <li><button name="ftr-btn-all" className={this.state.currPage === 'all' ? 'active' : ''} onClick={ this.handleChangeView }>All</button></li>
                        <li><button name="ftr-btn-act" className={this.state.currPage === 'act' ? 'active' : ''} onClick={ this.handleChangeView }>Active</button></li>
                        <li><button name="ftr-btn-cpt" className={this.state.currPage === 'cpt' ? 'active' : ''} onClick={ this.handleChangeView }>Completed</button></li>
                    </ul>
                    <div className={`todo-app__clean ${this.state.todos.filter(e=>{return e.done}).length ? '' : 'hide'}`}>
                        <button onClick={this.handleRemoveDoneTodo}>Clear completed</button>
                    </div>
                </footer>
            </div>
        )
    }

    handleAddTodo (e) {
        this.setState({
            todos: [...this.state.todos, {
                id: this.getRandomIdentifier(),
                name: e.target.value,
                done: false
            }]
        })
        e.target.value = ''
    }

    handleTodoDoneChange (e) {
        const changeId = this.getIndexByIdentifier(e.target.id.replace('todo-c',''))
        let todos = [...this.state.todos]
        let todo = {...todos[changeId]}
        todo.done = !todo.done
        todos[changeId] = todo
        this.setState({todos})
    }

    handleRemoveTodo (e) {
        const removeId = this.getIndexByIdentifier(e.target.id.replace('todo-r',''))
        let todos = [...this.state.todos]
        todos.splice(removeId, 1)
        this.setState({todos})
    }

    handleChangeView (e) {
        this.setState({
            currPage: e.target.name.replace('ftr-btn-', '')
        })
    }

    handleRemoveDoneTodo () {
        let todos = [...this.state.todos]
        todos = todos.filter(e => { return !e.done })
        this.setState({todos})
    }

    getRandomIdentifier () { return Math.random().toString(36).substring(2,8) }
    
    getIndexByIdentifier (id) { return this.state.todos.findIndex(o => o.id === id) }

    componentDidMount () {
        const inputElem = document.getElementsByClassName('todo-app__input')[0]
        inputElem.addEventListener('keypress', (e)=>{
            if (e.key === 'Enter' && inputElem.value.replace(/ /g,'') !== '') {
                e.preventDefault()
                this.handleAddTodo(e)
            }
        })
    }
}

export default App
