package projeto_atualizado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projeto_atualizado.model.Usuario;
import projeto_atualizado.repository.UsuarioRepository;

import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping("/cadastrar")
    public Usuario cadastrar(@RequestBody Usuario novoUsuario) {
        return repository.save(novoUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario dadosLogin) {
        Optional<Usuario> usuario = repository.findByEmail(dadosLogin.getEmail());

        if (usuario.isPresent() && usuario.get().getSenha().equals(dadosLogin.getSenha())) {
            return ResponseEntity.ok(usuario.get());
        }
        return ResponseEntity.status(401).body("E-mail ou senha inválidos");
    }
}