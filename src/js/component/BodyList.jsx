import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'; 
import Pages from './Pages.jsx'
import Input from './Input.jsx'

const BodyList = () => {
    const [inputValue, setInputValue] = useState ("");
	const [todos, setTodos] = useState ([]);

	useEffect(() => {
		getData();
	},[]);

	const getData = async () => {
		const response = await fetch ('https://playground.4geeks.com/apis/fake/todos/user/bego');
		const data = await response.json();
		setTodos(data);
	};

	const addToDo = async () => {
		if (inputValue.trim() === '') return;

		const newToDo = {
			done: false,
			id: uuidv4(),
			label: inputValue,
		}

		const updatedTodos = [...todos, newToDo];

		setTodos(updatedTodos);

		const response = await fetch ('https://playground.4geeks.com/apis/fake/todos/user/bego', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedTodos),
		})
		getData();
		setInputValue('');
	};

	const handleSubmit = (e)=>{
		if (e.key === "Enter") {
			addToDo();
		}
	};

	const deleteToDo = async (itemId) => {
		const updatedTodos = todos.filter(todo => todo.id !== itemId);

		await fetch('https://playground.4geeks.com/apis/fake/todos/user/bego', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedTodos),
		});
		
		getData();
	};

    return (
        <>
            <ul className="container-fluid bg-light shadow-sm p-0" id="Block">
				<Input 
					setInputValue={setInputValue}
					inputValue={inputValue}
					handleSubmit={handleSubmit}
					placeholder="What do you need to do?"
				/>
					{todos.map(todo => (
						<li key={todo.id} className="container d-inline-flex justify-content-between px-5">
							<p>{todo.label}</p>
							<i className="fas fa-times p-0 float-right justify-content-end" onClick={() => deleteToDo(todo.id)}></i>
						</li>
					))}
				<div className="m-0 px-3 pt-2 pb-2" id="itemCounter">{todos.length} item left</div>
			</ul>
			<Pages />
        </>
    )
}

export default BodyList;