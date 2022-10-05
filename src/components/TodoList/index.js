import { Col, Row, Input, Button, Select, Tag } from "antd";
import Todo from "../Todo";
import { useDispatch, useSelector } from "react-redux";
// import { addTodo } from "../../redux/actions";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { todoListRemainingSelector } from "../../redux/selectors";

// redux toolkit
import todoListSlice, { addTodos } from "./todosSlice";

export default function TodoList() {
  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Medium");

  const dispatch = useDispatch();

  // const todoList = useSelector((state) => state.todoList);
  const todoList = useSelector(todoListRemainingSelector);
  // const searchText = useSelector(searchSelector);

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  // const handleAddButtonClick = () => {
  //   if(todoName) {
  //     dispatch(
  //       addTodo({
  //         id: uuidv4(),
  //         name: todoName,
  //         completed: false,
  //         priority: priority,
  //       })
  //     );
  //     setTodoName("");
  //     setPriority("Medium");
  //   } else {
  //     alert('Field can not be empty');
  //   }
  // };

  const handleAddButtonClick = () => {
    if (todoName) {
      // This is dispatch action creator
      dispatch(
        todoListSlice.actions.addTodo({
          id: uuidv4(),
          name: todoName,
          completed: false,
          priority: priority,
        })
      );

      // This is dispatch thunk action creator
      // dispatch(
      //   addTodos({
      //     id: uuidv4(),
      //     name: todoName,
      //     completed: false,
      //     priority: priority,
      //   })
      // );
      setTodoName("");
      setPriority("Medium");
    } else {
      alert("Field can not be empty");
    }
  };

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {/* <Todo name='Learn React' priority='High' />
        <Todo name='Learn Redux' priority='Medium' />
        <Todo name='Learn JavaScript' priority='Low' /> */}
        {todoList.map((todo) => (
          <Todo
            name={todo.name}
            priority={todo.priority}
            key={todo.id}
            completed={todo.completed}
            id={todo.id}
          />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={todoName} onChange={handleInputChange} />
          <Select
            defaultValue="Medium"
            value={priority}
            onChange={handlePriorityChange}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
