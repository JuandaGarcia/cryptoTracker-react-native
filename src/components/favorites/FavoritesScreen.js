import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import Storage from '../../libs/storage'
import colors from '../../res/colors'
import FavoritesEmptyState from './FavoritesEmptyState'
import CoinsItem from '../coins/CoinsItem'

const FavoritesScreen = ({ navigation }) => {
	const [favorites, setFavorites] = useState([])

	useEffect(() => {
		getAllFavorites()
		navigation.addListener('focus', getAllFavorites)

		return () => {
			navigation.removeListener('focus', getAllFavorites)
		}
	}, [])

	const getAllFavorites = async () => {
		try {
			const allKeys = await Storage.instance.getAllkeys()

			const keys = allKeys.filter(key => key.includes('favorite-'))

			const favs = await Storage.instance.multiGet(keys)

			const allFavorites = favs.map(fav => JSON.parse(fav[1]))
			setFavorites(allFavorites)
		} catch (error) {
			console.log('Get favorites err', error)
		}
	}

	const handlePress = coin => {
		navigation.navigate('CoinDetail', { coin })
	}

	return (
		<View style={styles.container}>
			{favorites.length ? (
				<FlatList
					data={favorites}
					renderItem={({ item }) => (
						<CoinsItem item={item} onPress={() => handlePress(item)} />
					)}
				/>
			) : (
				<FavoritesEmptyState />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.charade,
		flex: 1,
	},
})

export default FavoritesScreen
