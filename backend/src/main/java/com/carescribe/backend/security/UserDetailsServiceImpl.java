package com.carescribe.backend.security;

import com.carescribe.backend.entity.User;
import com.carescribe.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String workerId) throws UsernameNotFoundException {
        User user = userRepository.findByWorkerId(workerId)
                .orElseThrow(() -> new UsernameNotFoundException("Worker ID not found: " + workerId));

        if (!user.isActive()) {
            throw new UsernameNotFoundException("User is disabled");
        }

        List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .map(permission -> new SimpleGrantedAuthority(permission.getName()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
                user.getWorkerId(), user.getPassword(), authorities);
    }
}
