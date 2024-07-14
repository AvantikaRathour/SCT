import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { title } from "process";
import { description } from "commander";
import { all } from "micromatch";

const MyBooks = () => {
    const [isCompleteScreen, setisCommpleteScreen] = useState(false);
    const [newTitle, setnewTitle] = useState("");
    const [newDescription, setnewDescription] = useState("");
    const [allToDos, setToDos] = useState([]);
    const [completedToDos, setcompletedToDos] = useState([])
    const [currentedit, setcurrentedit] = useState("")
    const [currenteditedItem, setcurrenteditedItem] = useState("")
    const handleToDo = () => {
        let newToDoItem = {
            title: newTitle,
            description: newDescription
        }
        // ... this creates identical new array
        let updatedToDo = [...allToDos];
        updatedToDo.push(newToDoItem);
        localStorage.setItem('todolist', JSON.stringify(updatedToDo));
        setToDos(updatedToDo);
    }
    const handledeleteToDo = (index) => {
        let reducedToDo = [...allToDos];
        reducedToDo.splice(index, 1);
        setToDos(reducedToDo);
        localStorage.setItem('todolist', JSON.stringify(reducedToDo))
    }
    const handleCompletedeleteToDo = (index) => {
        let reducedToDo = [...completedToDos];
        reducedToDo.splice(index, 1);
        setcompletedToDos(reducedToDo);
        localStorage.setItem('todolist2', JSON.stringify(reducedToDo))
    }
    const handleComplete = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;
        let filteredItem = {
            ...allToDos[index],
            completedOn: completedOn
        }
        let updatedList = [...completedToDos];
        updatedList.push(filteredItem);
        setcompletedToDos(updatedList);
        handledeleteToDo(index);
        localStorage.setItem('todolist2', JSON.stringify(updatedList))
    }
    const handleEdit = (ind, item) => {
        setcurrentedit(ind);
        setcurrenteditedItem(item);
    }
    const handleupdatedTitle = (value) => {
        setcurrenteditedItem((prev) => {
            return { ...prev, title: value }
        })
    }
    const handleupdatedDescription = (value) => {
        setcurrenteditedItem((prev) => {
            return { ...prev, description: value }
        })
    }
    const handleUpdateToDo = () => {
        let newtodo = [...allToDos];
        newtodo[currentedit] = currenteditedItem;
        setToDos(newtodo);
        setcurrentedit("")
    }

    useEffect(() => {
        let savedToDo = JSON.parse(localStorage.getItem('todolist'));
        let savedcompletedToDo = JSON.parse(localStorage.getItem('todolist2'));
        if (savedToDo) {
            setToDos(savedToDo);
        }
        if (savedcompletedToDo) {
            setcompletedToDos(savedcompletedToDo)
        }
    }, [])
    return (
        <>
            <h1 className="heading1">Book Record</h1>
            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label>Title</label>
                        <input type="text" placeholder="What's the task title" value={newTitle} onChange={(e) => setnewTitle(e.target.value)} />
                    </div>
                    <div className="todo-input-item">
                        <label>Description</label>
                        <input type="text" placeholder="What's the task description" value={newDescription} onChange={(e) => setnewDescription(e.target.value)} />
                    </div>
                    <div className="todo-input-item">
                        <button type="button" className="primarybtn " onClick={handleToDo}>Add</button>
                    </div>
                </div>
                <div className="btn-area">
                    <button className={`secondarybtn ${isCompleteScreen === false && 'active'}`}
                        onClick={() => setisCommpleteScreen(false)} >Todo</button>
                    <button className={`secondarybtn ${isCompleteScreen === true && 'active'}`}
                        onClick={() => setisCommpleteScreen(true)}>Completed</button>
                </div>
                <div className="todo-list">
                    {isCompleteScreen === false && allToDos.map((item, index) => {
                        if (currentedit === index) {
                            return (
                                <div className="edit-wrapper" key={index}>
                                    <input placeholder="Updated Title" value={currenteditedItem.title}
                                        onChange={(e) => handleupdatedTitle(e.target.value)} />
                                    <textarea placeholder="Updated Description" value={currenteditedItem.description}
                                        onChange={(e) => handleupdatedDescription(e.target.value)} />
                                    <button type="button" className="primarybtn " onClick={handleUpdateToDo}>Update</button>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="todo-list-item" key={index}>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                    <div>
                                        <MdDelete className="icon" onClick={() => handledeleteToDo(index)} />
                                        <FaCheck className="check-icon"
                                            onClick={() => handleComplete(index)}
                                        />
                                        <FiEdit className="edit-icon" onClick={() => handleEdit(index, item)} />

                                    </div>
                                </div>
                            )
                        }
                    })
                    }

                    {isCompleteScreen === true && completedToDos.map((item, index) => {
                        return (
                            <div className="todo-list-item" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p><small>Completed on : {item.completedOn}</small></p>
                                </div>
                                <div>
                                    <MdDelete className="icon" onClick={() => handleCompletedeleteToDo(index)} />
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}
export default MyBooks;