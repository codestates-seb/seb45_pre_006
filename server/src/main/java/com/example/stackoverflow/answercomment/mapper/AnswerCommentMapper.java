package com.example.stackoverflow.answercomment.mapper;

import com.example.stackoverflow.answercomment.dto.AnswerCommentPatchDto;
import com.example.stackoverflow.answercomment.dto.AnswerCommentPostDto;
import com.example.stackoverflow.answercomment.dto.AnswerCommentResponseDto;
import com.example.stackoverflow.answercomment.entity.AnswerComment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerCommentMapper {
    AnswerComment answerCommentPostDtoToAnswer(AnswerCommentPostDto answerCommentPostDto);
    AnswerComment answerCommentPatchDtoToAnswer(AnswerCommentPatchDto answerCommentPatchDto);
    AnswerCommentResponseDto answerCommentToAnswerCommentResponseDto(AnswerComment answerComment);
    List<AnswerComment> answerCommentToAnswerCommentResponseDtos(List<AnswerComment> answerComments);

}
