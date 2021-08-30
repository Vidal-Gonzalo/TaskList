import React, { useState, useContext, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { LoginContext } from "../helpers/Context";
import { withRouter } from "react-router-dom";
import Axios from "axios";

const data = [
  { name: "Group A", value: 0 },
  { name: "Group B", value: 0 },
];

const COLORS = ["red", "blue"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function Home() {
  const { setIsAuth } = useContext(LoginContext);

  const [task, setTask] = useState([]);

  // console.log(task[0].due_on)

  let pending = 0;
  let completed = 0;

  for (let index = 0; index < task.length; index++) {
    const element = task[index];
    if (element.status === "pending") {
      pending += 1;
      data[0].value = pending;
    } else {
      completed += 1;
      data[1].value = completed;
    }
  }

  useEffect(() => {
    Axios.get("https://gorest.co.in/public/v1/todos").then((data) => {
      setTask(data.data.data);
    });
  });

  return (
    <div>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a
              className="navbar-brand logout ms-auto"
              onClick={() => {
                setIsAuth(false);
              }}
              href="#"
            >
              Salir
            </a>
          </div>
        </nav>
      </header>

      <section id="home">
        <div className="container">
          <div className="row">
            <h2 className="referencesTitle ">Referencias</h2>
            <div className="wrapReferences">
              <div className="pendingReference">
                <div className="redsquare"></div>
                <div>
                  <span>Pendientes ({pending})</span>
                </div>
              </div>
              <div className="completedReference">
                <div className="bluesquare"></div>
                <div>
                  <span>Completadas ({completed})</span>
                </div>
              </div>
            </div>
            {pending && completed > 0 ? (
              <>
                <div className="col-12 col-md-6">
                  <PieChart width={1200} height={400}>
                    <Pie
                      data={data}
                      cx={200}
                      cy={200}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
                <div className="col-12 col-md-6">
                  <div className="wrapDetails">
                    <h1 className="detailsTitle">Detalles</h1>
                    {task.map((task) => (
                      <div key={task.id} className="task">
                        <p>
                          <span className="taskInfo">Título:</span> {task.title}
                        </p>
                        <p>
                          <span className="taskInfo">
                            Fecha pactada de finalización:
                          </span>
                          {task.due_on}
                        </p>
                        <p>
                          <span className="taskInfo">Estado:</span>
                          {task.status}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="wrapNoTasks center">
                <p className="noTasks mt-5">Cargando...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default withRouter(Home);
