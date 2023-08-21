package com.example.stackoverflow.user.repository;

import com.example.stackoverflow.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findByEmail(String email);
    public Page<User> findByDisplayNameContaining(String keyword, Pageable pageable);
}
