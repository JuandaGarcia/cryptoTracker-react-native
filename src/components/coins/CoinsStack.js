import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CoinsScreen from './CoinsScreen'
import CoinDetailScreen from '../coinDetail/CoinDetailScreen'
import Colors from '../../res/colors'

const Stack = createStackNavigator()

const CoinsStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.blackPearl,
					shadowColor: Colors.blackPearl,
				},
				headerTintColor: Colors.white,
			}}
		>
			<Stack.Screen name="Coins" component={CoinsScreen} />
			<Stack.Screen name="Coins Detail" component={CoinDetailScreen} />
		</Stack.Navigator>
	)
}

export default CoinsStack
