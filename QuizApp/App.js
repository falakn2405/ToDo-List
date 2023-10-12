import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QuizApp from "./src/QuizApp";
import Playground from "./src/Playground";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="QuizApp" component={QuizApp} />
        <Stack.Screen name="Playground" component={Playground} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

