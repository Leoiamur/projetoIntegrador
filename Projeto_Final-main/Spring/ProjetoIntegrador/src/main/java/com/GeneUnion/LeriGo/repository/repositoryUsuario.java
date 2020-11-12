package com.GeneUnion.LeriGo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.GeneUnion.LeriGo.model.modelUsuario;

public interface repositoryUsuario extends JpaRepository<modelUsuario,Long>{

	public List<modelUsuario> findAllByNomeContainingIgnoreCase(String nome);

}
