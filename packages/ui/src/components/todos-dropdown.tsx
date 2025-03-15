"use client";
import { ListChecks, Trash } from "lucide-react";
import { useState, useEffect, FormEvent, useRef } from "react";

export default function TodosDropdown({ className }: { className: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownContentRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    const closeDropdownOnEscPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dropdownContentRef.current?.removeAttribute("open");
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeDropdownOnEscPress);
    return () => window.removeEventListener("keydown", closeDropdownOnEscPress);
  }, []);

  return (
    <details
      ref={dropdownContentRef}
      className={`dropdown dropdown-top dropdown-end ${className}`}
    >
      <summary
        role="button"
        className={`btn ${isOpen ? "" : "btn-outline"} mt-1`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <ListChecks className="w-5 h-5" />
        <span
          className={`
            ml-0 w-0 overflow-hidden
            transition-[width] duration-300 ease-in-out
            ${isOpen ? "w-[3rem] ml-1" : ""}
          `}
        >
          Todos
        </span>
      </summary>
      <div
        className={`dropdown-content card bg-base-100 shadow-md
        transition-all duration-300 ease-in-out
        w-[90vw] h-[70vh] md:w-100 md:h-80
        p-5 z-2 flex flex-col overflow-y-scroll`}
      >
        <TodosList />
      </div>
    </details>
  );
}

const TODOS_STORAGE_KEY = "LOFI_TODOS";

type TodoCategory = string[];
type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
  categories: TodoCategory[];
};

type TodosList = {
  list: Todo[];
  categories: TodoCategory[];
};

const INIT_TODOS = {
  list: [],
  categories: [],
};

const TodosList = () => {
  const [todos, setTodos] = useState<TodosList>(INIT_TODOS);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    const fetchTodosOnStorage = () => {
      const storage = window.localStorage.getItem(TODOS_STORAGE_KEY);
      const todos = storage ? JSON.parse(storage) : INIT_TODOS;
      setTodos(todos);
      setLoading(false);
    };

    fetchTodosOnStorage();
  }, []);

  useEffect(() => {
    const syncTodosOnStorage = () => {
      if (!loading) {
        window.localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
      }
    };

    const debounce = setTimeout(() => {
      syncTodosOnStorage();
    }, 500);

    return () => clearTimeout(debounce);
  }, [todos, loading]);

  const addNewTodo = (todo: Todo) => {
    setTodos((prevState) => ({
      ...prevState,
      list: [todo, ...prevState.list],
    }));
  };

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
      createdAt: Date.now(),
      categories: [],
    };
    addNewTodo(newTodo);
    setNewTodoText("");
  };

  const toggleCompleteStatus = (id: number) => {
    setTodos((prev) => ({
      ...prev,
      list: prev.list.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => ({
      ...prev,
      list: prev.list.filter((t) => t.id !== id),
    }));
  };

  const filteredTodos = todos.list.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleAddTodo} className="flex items-center gap-3">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new task..."
          className="input w-full"
        />
        <button type="submit" className="btn btn-accent">
          Add
        </button>
      </form>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`btn btn-sm btn-accent ${filter === "all" ? "" : "btn-outline"}`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter("active")}
          className={`btn btn-sm btn-accent ${filter === "active" ? "" : "btn-outline"}`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setFilter("completed")}
          className={`btn btn-sm btn-accent ${filter === "completed" ? "" : "btn-outline"}`}
        >
          Completed
        </button>
      </div>

      <ul className="mt-2 flex flex-col gap-2">
        {filteredTodos.length === 0 && (
          <li>
            <span className="text-sm text-gray-500">No tasks to display</span>
          </li>
        )}
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleteStatus(todo.id)}
                className="checkbox checkbox-primary"
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.text}
              </span>
            </label>
            <button
              type="button"
              onClick={() => deleteTodo(todo.id)}
              className="btn btn-soft btn-circle btn-error"
            >
              <Trash className="w-3 h-3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
