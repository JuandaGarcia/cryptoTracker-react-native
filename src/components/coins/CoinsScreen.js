import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native'
import Http from '../../libs/http'
import CoinsItem from './CoinsItem'
import Colors from '../../res/colors'

const CoinsScreen = ({ navigation }) => {
	const [coins, setCoins] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const coinsRes = await Http.instance.get(
				'https://api.coinlore.net/api/tickers/'
			)

			setCoins(coinsRes.data)
			setLoading(false)
		}
		fetchData()
	}, [])

	const handlePress = coin => {
		navigation.navigate('Coins Detail', { coin })
	}

	return (
		<View style={styles.container}>
			{loading ? (
				<ActivityIndicator style={styles.loader} color="#fff" size="large" />
			) : (
				<FlatList
					data={coins}
					renderItem={({ item }) => (
						<CoinsItem item={item} onPress={() => handlePress(item)} />
					)}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.charade,
	},
	titleText: {
		color: 'white',
		textAlign: 'center',
	},
	btn: {
		padding: 0,
		backgroundColor: 'blue',
		borderRadius: 8,
		margin: 16,
	},
	btnText: {
		color: 'white',
		textAlign: 'center',
	},
	loader: {
		marginTop: 60,
	},
})

export default CoinsScreen
