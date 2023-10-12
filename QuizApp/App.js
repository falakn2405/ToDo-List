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
        <Stack.Screen name="QuizApp" component={QuizApp} options={{headerStyle: {backgroundColor: '#FFB4A2'}}}/>
        <Stack.Screen name="SkillTest" component={Playground} options={{headerStyle: {backgroundColor: '#01ab9d'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

