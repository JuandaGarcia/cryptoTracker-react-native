class Http {
	static instance = new Http()

	get = async url => {
		try {
			const req = await fetch(url)
			const json = await req.json()
			return json
		} catch (error) {
			console.log('http get method err', err)
			throw Error(error)
		}
	}

	post = async (url, body) => {
		try {
			const requet = await fetch(url, {
				method: 'POST',
				body,
			})
			const json = await requet.json()
			return json
		} catch (err) {
			console.error('HTTP POST Error: ', err)
			throw Error(err)
		}
	}
}

export default Http
