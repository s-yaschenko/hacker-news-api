import React from "react"
import { Layout } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";



const App = () => {
  return (
    <Layout.Content className="site-layout">
      <RouterProvider router={router} />
    </Layout.Content>
  )
};


export default App;
