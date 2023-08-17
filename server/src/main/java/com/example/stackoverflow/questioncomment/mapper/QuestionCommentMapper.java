package com.example.stackoverflow.questioncomment.mapper;

import com.example.stackoverflow.questioncomment.dto.QuestionCommentPatchDto;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentPostDto;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentResponseDto;
import com.example.stackoverflow.questioncomment.entity.QuestionComment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionCommentMapper {
    QuestionComment questionCommentPostDtoToQuestionComment(QuestionCommentPostDto questionCommentPostDto);
    QuestionComment questionCommentPatchDtoToQuestionComment(QuestionCommentPatchDto questionCommentPatchDto);
    QuestionCommentResponseDto questionCommentToResponseDto(QuestionComment questionComment);
    List<QuestionCommentResponseDto> questionCommentToResponseDtos(List<QuestionComment> questionComments);
}
