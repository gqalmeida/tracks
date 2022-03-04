import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

import { 
  Provider as AuthProvider, 
  Context as AuthContext 
} from "./src/context/AuthContext";
import {
  Provider as LocationProvider,
} from './src/context/LocationContext';
import {
  Provider as TrackProvider,
} from './src/context/TrackContext';


const AuthStack = createStackNavigator();
const TrackStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator 
      initialRouteName="Signup" 
      screenOptions={{ 
        headerShown: false 
      }}>
      <AuthStack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{
        }} 
      />
      <AuthStack.Screen
        name="Signin" 
        component={SigninScreen} 
        options={{
        }}
      /> 
      </AuthStack.Navigator>
  );
};

const TrackStackScreens = () => {
  return (
    <TrackStack.Navigator 
      initialRouteName="TrackListScreen" 
      screenOptions={{ 
        headerShown: false 
      }}
    >
      <TrackStack.Screen 
        name="TrackListScreen" 
        component={TrackListScreen} 
      />
      <TrackStack.Screen 
        name="TrackDetailScreen" 
        component={TrackDetailScreen} 
      />
    </TrackStack.Navigator>
  );
};

const TrackTabsScreens = () => {
  return (
    <Tab.Navigator 
      initialRouteName="Tracks"
      screenOptions={{ 
        headerShown: false 
      }}>
      <Tab.Screen 
        name="Tracks"
        component={TrackStackScreens}
        options={{

        }}
      />
      <Tab.Screen 
        name="TrackCreateScreen" 
        component={TrackCreateScreen} 
      />
      <Tab.Screen 
        name="AccountScreen" 
        component={AccountScreen} 
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const { state, tryLocalSignin } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignin();
  }, []);
 
  if (state.isLoading) return <ResolveAuthScreen />;
 
  return (
    <NavigationContainer>
      {state.token ? <TrackTabsScreens /> : <AuthStackScreens />}
    </NavigationContainer>
  );
};

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};