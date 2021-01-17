package com.GeneUnion.LeriGo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.GeneUnion.LeriGo.model.modelProdutos;

public interface repositoryProdutos  extends JpaRepository<modelProdutos ,Long>{
	int teste = 0;

	public List<modelProdutos>findAllByNomeContainingIgnoreCase(String nome);
	
	@Query(value = "select * from tb_produtos where categoria_id_categoria = :id", nativeQuery = true)
	List<modelProdutos>findAllByIdCategoria(@Param("id") Long id);

}
