package com.example.stackoverflow.answercomment.mapper;

import com.example.stackoverflow.answercomment.dto.AnswerCommentPatchDto;
import com.example.stackoverflow.answercomment.dto.AnswerCommentPostDto;
import com.example.stackoverflow.answercomment.dto.AnswerCommentResponseDto;
import com.example.stackoverflow.answercomment.entity.AnswerComment;
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
public class AnswerCommentMapperImpl implements AnswerCommentMapper {

    @Override
    public AnswerComment answerCommentPostDtoToAnswer(AnswerCommentPostDto answerCommentPostDto) {
        if ( answerCommentPostDto == null ) {
            return null;
        }

        AnswerComment answerComment = new AnswerComment();

        answerComment.setAnswer( answerCommentPostDto.getAnswer() );
        answerComment.setAnswerComment_content( answerCommentPostDto.getAnswerComment_content() );

        return answerComment;
    }

    @Override
    public AnswerComment answerCommentPatchDtoToAnswer(AnswerCommentPatchDto answerCommentPatchDto) {
        if ( answerCommentPatchDto == null ) {
            return null;
        }

        AnswerComment answerComment = new AnswerComment();

        answerComment.setAnswerComment_id( answerCommentPatchDto.getAnswerComment_id() );
        answerComment.setAnswerComment_content( answerCommentPatchDto.getAnswerComment_content() );

        return answerComment;
    }

    @Override
    public AnswerCommentResponseDto answerCommentToAnswerCommentResponseDto(AnswerComment answerComment) {
        if ( answerComment == null ) {
            return null;
        }

        AnswerCommentResponseDto answerCommentResponseDto = new AnswerCommentResponseDto();

        if ( answerComment.getAnswerComment_id() != null ) {
            answerCommentResponseDto.setAnswerComment_id( answerComment.getAnswerComment_id() );
        }
        answerCommentResponseDto.setAnswerComment_content( answerComment.getAnswerComment_content() );
        answerCommentResponseDto.setAnswerComment_createdAt( answerComment.getAnswerComment_createdAt() );
        answerCommentResponseDto.setAnswerComment_modifiedAt( answerComment.getAnswerComment_modifiedAt() );

        return answerCommentResponseDto;
    }

    @Override
    public List<AnswerComment> answerCommentToAnswerCommentResponseDtos(List<AnswerComment> answerComments) {
        if ( answerComments == null ) {
            return null;
        }

        List<AnswerComment> list = new ArrayList<AnswerComment>( answerComments.size() );
        for ( AnswerComment answerComment : answerComments ) {
            list.add( answerComment );
        }

        return list;
    }
}
