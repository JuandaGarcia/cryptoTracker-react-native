import React, { useState } from 'react'
import { TextInput, Platform, View, StyleSheet } from 'react-native'
import colors from '../../res/colors'

const CoinsSearch = ({ onChange }) => {
	const [query, setQuery] = useState('')

	const handleText = newQuery => {
		setQuery(newQuery)
		if (onChange) {
			onChange(newQuery)
		}
	}

	return (
		<View>
			<TextInput
				style={[
					styles.textInput,
					Platform.OS == 'ios' ? styles.textInputIOS : styles.textInputAndroid,
				]}
				onChangeText={handleText}
				value={query}
				placeholder="Search coin"
				placeholderTextColor="#fff"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	textInput: {
		height: 46,
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		paddingLeft: 16,
		color: '#fff',
	},
	textInputAndroid: {
		borderBottomWidth: 2,
		borderBottomColor: colors.zircon,
	},
	textInputIOS: {
		margin: 8,
		borderRadius: 8,
	},
})

export default CoinsSearch
