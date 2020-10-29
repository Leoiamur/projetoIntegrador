CRIAR TABELA `Produtos` (
	ʻId_produto` INT (255) NÃO NULO AUTO_INCREMENT,
	`Nome` varchar (255) NÃO NULO,
	`Tamanho` varchar (255) NÃO NULO,
	INT, NÃO NULO, `Quantidade`
	`Preco` DECIMAL (6, 2) NÃO NULO,
	ʻId_categoria` INT NOT NULL,
	PRIMARY KEY (ʻid_produto`)
);

CRIAR TABELA `Categoria` (
	ʻId_categoria` INT NOT NULL AUTO_INCREMENT,
	`Tipo` varchar (255) NÃO NULO,
	`Destino` varchar (255) NÃO NULO,
	`Classificação` varchar (255) NÃO NULO,
	CHAVE PRIMÁRIA (ʻid_categoria`)
);

CRIAR TABELA ʻUsuário` (
	ʻId_usuario` INT NOT NULL AUTO_INCREMENT,
	`Nome` varchar (255) NÃO NULO,
	E-mail` varchar (255) NÃO NULO,
	`Senha` varchar (255) NÃO NULO,
	CHAVE PRIMÁRIA (ʻid_usuario`)
);

ALTER TABLE `Produtos` ADD CONSTRAINT` Produtos_fk0` FOREIGN KEY (ʻid_categoria`) REFERÊNCIAS `Categoria` (ʻid_categoria`);

