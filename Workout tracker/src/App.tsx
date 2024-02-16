// Dependencies
import React from "react";
import { useState } from "react";

// Styles
import "./tailwind.output.css";

const App = () => {
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem("workouts");
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });

  const emptyInput = {
    title: "",
    reps: "",
    load: "",
  };

  const [inputValues, setInputValues] = useState(emptyInput);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = () => {
    const newWorkouts = [...workouts, inputValues];
    setWorkouts(newWorkouts);
    setInputValues(emptyInput);
    localStorage.setItem("workouts", JSON.stringify(newWorkouts));
    setInputValues(emptyInput);
  };

  const handleDelete = (index) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(index, 1);
    setWorkouts(updatedWorkouts);
    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
  };

  return (
    <div className="h-screen p-3 flex flex-row justify-around bg-gray-200">
      <div className="w-2/3">
        {workouts.map((workout, index) => (
          //map function (very cool function) => for each workout with index
          <div className="pb-8">
            <div className="flex flex-row">
              <div className="pr-64">
                <p className="text-xl text-green-600 font-bold py">
                  {" "}
                  {workout.title}
                </p>
                <p>{workout.load} lbs</p>
                <p>{workout.reps} reps</p>
              </div>
              <div>
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-md mt-3"
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 flex flex-col">
        <p className="font-bold mb-3">Add a New Workout</p>
        <input
          placeholder="Exercise Name"
          type="text"
          onChange={handleChange}
          name="title"
          value={inputValues.title}
          className="p-1 mb-3 rounded-md"
        />
        <input
          placeholder="Load (in lbs)"
          type="number"
          onChange={handleChange}
          name="load"
          value={inputValues.load}
          min="0"
          className="p-1 mb-3 rounded-md"
        />
        <input
          placeholder="Reps"
          type="number"
          onChange={handleChange}
          name="reps"
          value={inputValues.reps}
          min="0"
          className="p-1 mb-3 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white py-2 px-4 rounded-md"
        >
          Add Workout
        </button>
      </div>
    </div>
  );
};

export default App;
