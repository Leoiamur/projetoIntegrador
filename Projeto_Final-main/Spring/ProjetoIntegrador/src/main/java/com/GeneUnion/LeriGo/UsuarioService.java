package com.GeneUnion.LeriGo;

import java.nio.charset.Charset;
import java.util.Optional;

import org.apache.commons.codec.binary.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.GeneUnion.LeriGo.model.UsuarioLogin;
import com.GeneUnion.LeriGo.model.modelUsuario;
import com.GeneUnion.LeriGo.repository.repositoryUsuario;

@Service
public class UsuarioService {

	@Autowired
	private repositoryUsuario repository;
	
	public Optional<modelUsuario> CadastrarUsuario(modelUsuario usuario) {
		
		if(repository.findByEmail(usuario.getEmail()).isPresent())
			return null;

		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String senhaEncoder = encoder.encode(usuario.getSenha());
		usuario.setSenha(senhaEncoder);
//		return repository.save(usuario);
		return Optional.of(repository.save(usuario));

	}
	
	public Optional<UsuarioLogin> Logar(Optional<UsuarioLogin> user){
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<modelUsuario> usuario = repository.findByEmail(user.get().getEmail());
		
		if (usuario.isPresent()) {
			if (encoder.matches(user.get().getSenha(), usuario.get().getSenha())) {
				String auth = user.get().getEmail() + ":" + user.get().getSenha();
				byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
				String authHeader = "Basic " + new String(encodedAuth);
				
				user.get().setId(usuario.get().getIdUsuario());
				user.get().setNome(usuario.get().getNome());
				user.get().setToken(authHeader);				
				user.get().setEmail(usuario.get().getEmail());
				return user;
			}
		}
		 return null;
	}

}
