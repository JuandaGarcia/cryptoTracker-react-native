import React, { useEffect, useState } from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
	SectionList,
	FlatList,
	Pressable,
	Alert,
} from 'react-native'
import Colors from '../../res/colors'
import Http from '../../libs/http'
import CoinMarketItem from './CoinMarketItem'
import Storage from '../../libs/storage'

const CoinDetailScreen = props => {
	const [coin, setCoin] = useState({})
	const [markets, setMarkets] = useState([])
	const [isFavorite, setIsFavorite] = useState(false)
	const key = `favorite-${coin.id}`

	useEffect(() => {
		const { coin } = props.route.params
		props.navigation.setOptions({ title: coin.symbol })
		getMarkets(coin.id)
		setCoin(coin)
		getFavorite(`favorite-${coin.id}`)
	}, [])

	const getSymbolIcon = name => {
		if (name) {
			const symbol = name.toLowerCase().replace(' ', '-')

			return `https://c1.coinlore.com/img/25x25/${symbol}.png`
		}
	}

	const getSections = coin => {
		const sections = [
			{
				title: 'Market cap',
				data: [coin.market_cap_usd],
			},
			{
				title: 'Volume 24h',
				data: [coin.volume24],
			},
			{
				title: 'Change 24h',
				data: [coin.percent_change_24h],
			},
		]

		return sections
	}

	const getMarkets = async coinId => {
		const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`

		const markets = await Http.instance.get(url)

		setMarkets(markets)
	}

	const toggleFavorite = () => {
		if (isFavorite) {
			removeFavorite()
		} else {
			addFavorite()
		}
	}

	const addFavorite = async () => {
		const coinString = JSON.stringify(coin)

		const stored = await Storage.instance.store(key, coinString)

		if (stored) {
			setIsFavorite(true)
		}
	}

	const removeFavorite = () => {
		Alert.alert('Remove favorite', 'Are you sure?', [
			{
				text: 'Cancel',
				onPress: () => {},
				style: 'cancel',
			},
			{
				text: 'Remove',
				onPress: async () => {
					await Storage.instance.remove(key)

					setIsFavorite(false)
				},
				style: 'destructive',
			},
		])
	}

	const getFavorite = async key => {
		try {
			const favStr = await Storage.instance.get(key)

			if (favStr !== null) {
				setIsFavorite(true)
			}
		} catch (error) {
			console.log('get favorites error: ', error)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.subHeader}>
				<View style={styles.row}>
					<Image
						style={styles.iconImg}
						source={{ uri: getSymbolIcon(coin.name) }}
					/>
					<Text style={styles.titleText}>{coin.name}</Text>
				</View>
				<Pressable
					onPress={toggleFavorite}
					style={[
						styles.btnFavorite,
						isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
					]}
				>
					<Text style={styles.btnFavoriteText}>
						{isFavorite ? 'Remove Favorite' : 'Add Favorite'}
					</Text>
				</Pressable>
			</View>
			<SectionList
				style={styles.section}
				sections={getSections(coin)}
				keyExtractor={item => item}
				renderItem={({ item }) => (
					<View style={styles.sectionItem}>
						<Text style={styles.itemText}>{item}</Text>
					</View>
				)}
				renderSectionHeader={({ section }) => (
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionText}>{section.title}</Text>
					</View>
				)}
			/>
			<Text style={styles.marketTitle}>Markerts</Text>
			<FlatList
				style={styles.list}
				horizontal={true}
				data={markets}
				renderItem={({ item }) => <CoinMarketItem item={item} />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.charade,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	subHeader: {
		backgroundColor: 'rgba(0,0,0,0.1)',
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	titleText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff',
		marginLeft: 8,
	},
	iconImg: {
		width: 25,
		height: 25,
	},
	sectionHeader: {
		backgroundColor: 'rgba(0,0,0,0.2)',
		padding: 8,
	},
	sectionItem: {
		padding: 8,
	},
	itemText: {
		color: '#fff',
		fontSize: 14,
	},
	sectionText: {
		color: '#fff',
		fontSize: 14,
		fontWeight: 'bold',
	},
	section: {
		maxHeight: 220,
	},
	list: {
		maxHeight: 100,
		paddingLeft: 16,
	},
	marketTitle: {
		color: '#fff',
		fontSize: 16,
		marginBottom: 16,
		marginLeft: 16,
		fontWeight: 'bold',
	},
	btnFavorite: {
		padding: 8,
		borderRadius: 8,
	},
	btnFavoriteText: {
		color: Colors.white,
	},
	btnFavoriteAdd: {
		backgroundColor: Colors.picton,
	},
	btnFavoriteRemove: {
		backgroundColor: Colors.carmine,
	},
})

export default CoinDetailScreen
