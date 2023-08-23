package com.example.stackoverflow.questioncomment.entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class QuestionBaseTimeEntity {
    @CreatedDate
    @Column(name = "CREATE_AT", updatable = false)
    private LocalDateTime questionComment_createdAt;
    @LastModifiedDate
    @Column(name = "LAST_MODIFIED_AT")
    private LocalDateTime questionComment_modifiedAt;
}

