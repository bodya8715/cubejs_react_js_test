import "./App.css";
import React from "react";
import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/react";

const cubejsApi = cubejs(
  "d5e87e4889fb3d83d9ac94e84493bb89f1286423f5726d8cb5d31146395bd6c5c1b3f685527c0ccb5972c8da364b0079b2ac2cbd609eebb25504b27c379745f5",
  { apiUrl: "http://localhost:4000/cubejs-api/v1" }
);

const App = () => {
  return (
    <QueryRenderer
      query={{
        dimensions: [
          "Users.first_name",
          "Users.last_name",
          "Users.userId",
          "Users.created_at",
          "Users.life_time",
        ],
        filters: [
          {
            member: "Users.life_time",
            operator: "gt",
            values: ["1482.82"],
          },
          {
            member: "Users.created_at",
            operator: "gte",
            values: ["2022-06-21T19:30:10.186"],
          },
        ],
        order: {
          "Users.created_at": "desc",
        },
        limit: 1,
      }}
      cubejsApi={cubejsApi}
      render={({ resultSet }) => {
        if (!resultSet) {
          return "Loading Analytics...";
        }
        return (
          <>
            <p>Пользователей найдено: {resultSet.loadResponse.results[0].data.length}</p>
            <table>
              <thead>
                <tr>
                  <th>Имф</th>
                  <th>Фамилия</th>
                  <th>UserId</th>
                  <th>Life time</th>
                  <th>Последний заказ</th>
                </tr>
              </thead>
              <tbody>
                {resultSet.loadResponse.results[0].data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item["Users.first_name"]}</td>
                      <td>{item["Users.last_name"]}</td>
                      <td>{item["Users.userId"]}</td>
                      <td>{item["Users.life_time"]}</td>
                      <td>{item["Users.created_at"]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        );
      }}
    />
  );
};

export default App;
