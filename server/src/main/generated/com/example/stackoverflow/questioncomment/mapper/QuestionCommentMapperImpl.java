package com.example.stackoverflow.questioncomment.mapper;

import com.example.stackoverflow.questioncomment.dto.QuestionCommentPatchDto;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentPostDto;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentResponseDto;
import com.example.stackoverflow.questioncomment.entity.QuestionComment;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-19T15:12:36+0900",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class QuestionCommentMapperImpl implements QuestionCommentMapper {

    @Override
    public QuestionComment questionCommentPostDtoToQuestionComment(QuestionCommentPostDto questionCommentPostDto) {
        if ( questionCommentPostDto == null ) {
            return null;
        }

        QuestionComment questionComment = new QuestionComment();

        questionComment.setQuestion( questionCommentPostDto.getQuestion() );
        questionComment.setQuestionComment_content( questionCommentPostDto.getQuestionComment_content() );

        return questionComment;
    }

    @Override
    public QuestionComment questionCommentPatchDtoToQuestionComment(QuestionCommentPatchDto questionCommentPatchDto) {
        if ( questionCommentPatchDto == null ) {
            return null;
        }

        QuestionComment questionComment = new QuestionComment();

        questionComment.setQuestionComment_id( questionCommentPatchDto.getQuestionComment_id() );
        questionComment.setQuestionComment_content( questionCommentPatchDto.getQuestionComment_content() );

        return questionComment;
    }

    @Override
    public QuestionCommentResponseDto questionCommentToResponseDto(QuestionComment questionComment) {
        if ( questionComment == null ) {
            return null;
        }

        QuestionCommentResponseDto questionCommentResponseDto = new QuestionCommentResponseDto();

        questionCommentResponseDto.setQuestionComment_id( questionComment.getQuestionComment_id() );
        questionCommentResponseDto.setQuestionComment_content( questionComment.getQuestionComment_content() );
        questionCommentResponseDto.setQuestionComment_createdAt( questionComment.getQuestionComment_createdAt() );
        questionCommentResponseDto.setQuestionComment_modifiedAt( questionComment.getQuestionComment_modifiedAt() );

        return questionCommentResponseDto;
    }

    @Override
    public List<QuestionCommentResponseDto> questionCommentToResponseDtos(List<QuestionComment> questionComments) {
        if ( questionComments == null ) {
            return null;
        }

        List<QuestionCommentResponseDto> list = new ArrayList<QuestionCommentResponseDto>( questionComments.size() );
        for ( QuestionComment questionComment : questionComments ) {
            list.add( questionCommentToResponseDto( questionComment ) );
        }

        return list;
    }
}
