export const readUser = () => {
	const data = localStorage.getItem('@user')
	return data?JSON.parse(data):{}
}
export const writeUser = (data) => localStorage.setItem('@user', JSON.stringify(data))
export const deleteUser = () => localStorage.removeItem('@user')
