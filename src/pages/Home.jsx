import React, { useState } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, switchTodo } from '../redux/modules/todos';

function Home() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    //데이터가져오기
    const data = useSelector((state) => state.todos);

    console.log('data', data);
    //dispatch
    const dispatch = useDispatch();

    return (
        <>
            <div>
                <Form
                    onSubmit={(event) => {
                        event.preventDefault();

                        const newTodo = {
                            id: shortid.generate(),
                            title,
                            body,
                            isDone: false,
                        };
                        // console.log('newTodo', newTodo);
                        dispatch(addTodo(newTodo));
                    }}
                >
                    <div>
                        <p>제목</p>
                        <input value={title} onChange={(event) => setTitle(event.target.value)}></input>
                    </div>
                    <div>
                        <p>내용</p>
                        <input value={body} onChange={(event) => setBody(event.target.value)}></input>
                    </div>
                    <button>추가하기</button>
                </Form>

                <div>
                    <h2>진행</h2>
                    {data
                        .filter((item) => item.isDone === false)
                        .map((todo) => {
                            return (
                                <TodoDiv key={todo.id}>
                                    <p>{todo.title}</p>
                                    <p>{todo.body}</p>
                                    <button
                                        onClick={() => {
                                            dispatch(switchTodo(todo.id));
                                        }}
                                    >
                                        완료
                                    </button>
                                    <button
                                        onClick={() => {
                                            dispatch(deleteTodo(todo.id));
                                        }}
                                    >
                                        삭제
                                    </button>
                                </TodoDiv>
                            );
                        })}
                </div>
                <div>
                    <h2>완료</h2>
                    {data
                        .filter((item) => item.isDone === true)
                        .map((todo) => {
                            return (
                                <TodoDiv key={todo.id}>
                                    <p>{todo.title}</p>
                                    <p>{todo.body}</p>
                                    <button
                                        onClick={() => {
                                            dispatch(switchTodo(todo.id));
                                        }}
                                    >
                                        완료
                                    </button>
                                    <button
                                        onClick={() => {
                                            dispatch(deleteTodo(todo.id));
                                        }}
                                    >
                                        삭제
                                    </button>
                                </TodoDiv>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

const Form = styled.form`
    display: flex;
`;

const TodoDiv = styled.div`
    border: 1px solid red;
    margin: 10px;
    padding: 10px;
`;

export default Home;
