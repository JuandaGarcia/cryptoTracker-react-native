import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native'
import Http from '../../libs/http'
import CoinsItem from './CoinsItem'
import Colors from '../../res/colors'
import CoinsSearch from './CoinsSearch'

const CoinsScreen = ({ navigation }) => {
	const [allCoins, setAllCoins] = useState([])
	const [coins, setCoins] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getCoins()
	}, [])

	const getCoins = async () => {
		const coinsRes = await Http.instance.get(
			'https://api.coinlore.net/api/tickers/'
		)

		setAllCoins(coinsRes.data)
		setCoins(coinsRes.data)
		setLoading(false)
	}

	const handlePress = coin => {
		navigation.navigate('Coins Detail', { coin })
	}

	const handleSearch = query => {
		const coinsFiltered = allCoins.filter(coin => {
			return (
				coin.name.toLowerCase().includes(query.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(query.toLowerCase())
			)
		})

		setCoins(coinsFiltered)
	}

	return (
		<View style={styles.container}>
			<CoinsSearch onChange={handleSearch} />
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
