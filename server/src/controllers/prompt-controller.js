const inputPrompt = require("../models/input-prompt")
const openai = require("../config/openai")

module.exports = {
	async sendText(request, response){

		const openaiAPI = openai.configuration()
		const inputModel = new InputPrompt(request.body)

		try {
			const response = await openaiAPI.createCompletion(
				openai.textCompletion(inputModel)
			)

			return response.status(200).json({
				sucess: true,
				data: response.data.choices[0].text
			})

		} catch (error) {

			return response.status(400).json({
				sucess: false,
				error: error.response
				? error.response.data
				: 'Tem um erro no servidor'
			})

		}
	}

}