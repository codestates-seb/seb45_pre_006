package com.example.stackoverflow.answer.mapper;

import com.example.stackoverflow.answer.dto.AnswerPatchDto;
import com.example.stackoverflow.answer.dto.AnswerPostDto;
import com.example.stackoverflow.answer.dto.AnswerResponseDto;
import com.example.stackoverflow.answer.entity.Answer;
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
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto) {
        if ( answerPostDto == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setQuestion( answerPostDto.getQuestion() );
        answer.setAnswer_content( answerPostDto.getAnswer_content() );

        return answer;
    }

    @Override
    public Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto) {
        if ( answerPatchDto == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswer_id( answerPatchDto.getAnswer_id() );
        answer.setAnswer_content( answerPatchDto.getAnswer_content() );

        return answer;
    }

    @Override
    public AnswerResponseDto answerToAnswerResponseDto(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        AnswerResponseDto answerResponseDto = new AnswerResponseDto();

        answerResponseDto.setQuestion( answer.getQuestion() );
        answerResponseDto.setAnswer_id( answer.getAnswer_id() );
        answerResponseDto.setAnswer_content( answer.getAnswer_content() );
        answerResponseDto.setAnswer_createdAt( answer.getAnswer_createdAt() );
        answerResponseDto.setAnswer_modifiedAt( answer.getAnswer_modifiedAt() );
        answerResponseDto.setAnswer_accepted( answer.getAnswer_accepted() );
        answerResponseDto.setAnswer_recommendation( answer.getAnswer_recommendation() );
        answerResponseDto.setAnswerCommentList( answerCommentListToAnswerCommentResponseDtoList( answer.getAnswerCommentList() ) );

        return answerResponseDto;
    }

    protected AnswerCommentResponseDto answerCommentToAnswerCommentResponseDto(AnswerComment answerComment) {
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

    protected List<AnswerCommentResponseDto> answerCommentListToAnswerCommentResponseDtoList(List<AnswerComment> list) {
        if ( list == null ) {
            return null;
        }

        List<AnswerCommentResponseDto> list1 = new ArrayList<AnswerCommentResponseDto>( list.size() );
        for ( AnswerComment answerComment : list ) {
            list1.add( answerCommentToAnswerCommentResponseDto( answerComment ) );
        }

        return list1;
    }
}
