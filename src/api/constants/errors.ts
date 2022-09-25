export const errors = {
	
	internal_server_error: {
		code: 1500,
		title: "Erro interno do servidor.",
		description: "A ação solicitada não pôde ser executada devido a um mal funcionamento no servidor. Talvez haja alguma incosistência na conexão com o banco de dados, envio de e-mails ou algum outro recurso externo."
	},
	user_not_found: {
		code: 1400,
		title: "Usuário não encontrado.",
		description: "Não existe nenhum usuário cadastrado no banco de dados com o id fornecido. Verifique e tente novamente."
	},
	user_already_registered: {
		code: 1401,
		title: "Usuário já registrado.",
		description: "O endereço de e-mail informado já encontra-se vinculado a uma outra conta."
	},
	invalid_parameter_id_schema: {
		code: 1402,
		title: "Formato do id fornecido inválido.",
		description: "O parâmetro id deve ser um UUID."
	}

};