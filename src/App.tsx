import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BASE_URL } from "./constants/constats";
import { ConfigProvider } from "antd";

import Home from "./screens/Home";

function App() {
  const client = new ApolloClient({
    uri: BASE_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#000",
            colorText: "#FFFFFF",
            colorBgTextHover: "inherit",
          },
        }}
      >
        <Home />
      </ConfigProvider>
    </ApolloProvider>
  );
}

export default App;
