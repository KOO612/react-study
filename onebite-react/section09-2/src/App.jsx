import Editor from './components/Editor';
import Header from './components/Header';
import List from './components/List';
import './App.css';
import { useReducer, useRef, useState } from 'react';

const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'react 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: true,
    content: '빨래하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '노래 연습하기',
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) => (item.id === action.targetId ? { ...item, isDone: !item.isDone } : item));
    case 'DELETE':
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  // const [todos, setTodos] = useState(mockData);
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    //   const newTodo = {
    //     id: idRef.current++,
    //     isDone: false,
    //     content: content,
    //     date: new Date().getTime(),
    //   };
    //   setTodos([newTodo, ...todos]);

    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onUpdate = (targetId) => {
    // setTodos(
    // todos.map((todo) => {
    //   if (todo.id === targetId) {
    //     return {
    //       ...todo,
    //       isDone: !todo.isDone,
    //     };
    //   }
    //   return todo;
    // })
    // setTodos(
    // todos.map((todo) => (todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo)));
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    });
  };

  const onDelete = (targetId) => {
    // setTodos(todos.filter((todo) => todo.id !== targetId));
    dispatch({
      type: 'DELETE',
      targetId: targetId,
    });
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
