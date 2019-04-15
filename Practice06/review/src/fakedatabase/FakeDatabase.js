import data from './data'

class FakeDatabase {
	static initDatabase = () => {
		console.log(localStorage.length)
		if (localStorage.length <= 3) {
			localStorage.clear()

			data.posts.forEach(({ id, title, author, content }) => {
				this._add({ id, title, author, content })
			})
		}
	}
	static getLength = () => {
		return (this.getAll().length)
	}
	static getPostById = id => {
		const postStr = localStorage.getItem(id.toString())
		if (!postStr) return null

		const [title, author, content] = postStr.split('|')

		return { id, title, author, content }
	}

	static getAll = () => {
		const indices = this.getIndices()

		const posts = []
		indices.forEach(id => {
			const post = this.getPostById(id)
			posts.push(post)
		})

		return posts
	}

	static deleteAll = () => {
		localStorage.clear()
	}

	static addPost = ({ title, author, content }) => {
		const id = this.getIndices().length.toString()

		this._add({ id, title, author, content })
	}

	static deletePost = id => {
		const indices = this.getIndices()

		localStorage.removeItem(id.toString())
		localStorage.setItem('indices', indices.filter(ID => ID !== id).join('|'))
	}

	static getIndices = () =>
		localStorage
			.getItem('indices')
			.split('|')
			.filter(str => str)

	static _add = ({ id, title, author, content }) => {
		const indicesStr = localStorage.getItem('indices')
		localStorage.setItem(id, `${title}|${author}|${content}`)
		localStorage.setItem('indices', (indicesStr ? indicesStr : '') + `|${id}`)
	}
}

export default FakeDatabase
