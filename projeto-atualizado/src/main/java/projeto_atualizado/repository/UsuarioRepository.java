package projeto_atualizado.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projeto_atualizado.model.Usuario;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}