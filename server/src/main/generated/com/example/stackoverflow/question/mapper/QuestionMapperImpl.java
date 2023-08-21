package com.example.stackoverflow.question.mapper;

import com.example.stackoverflow.answer.dto.AnswerResponseDto;
import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.answercomment.dto.AnswerCommentResponseDto;
import com.example.stackoverflow.answercomment.entity.AnswerComment;
import com.example.stackoverflow.question.dto.QuestionPatchDto;
import com.example.stackoverflow.question.dto.QuestionPostDto;
import com.example.stackoverflow.question.dto.QuestionResponseAllDto;
import com.example.stackoverflow.question.dto.QuestionResponseDto;
import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentResponseDto;
import com.example.stackoverflow.questioncomment.entity.QuestionComment;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-19T21:30:02+0900",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public Question questionPostDtoToQuestion(QuestionPostDto questionPostDto) {
        if ( questionPostDto == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestion_title( questionPostDto.getQuestion_title() );
        question.setQuestion_content( questionPostDto.getQuestion_content() );
        question.setUser( questionPostDto.getUser() );

        return question;
    }

    @Override
    public Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto) {
        if ( questionPatchDto == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestion_id( questionPatchDto.getQuestion_id() );
        question.setQuestion_title( questionPatchDto.getQuestion_title() );
        question.setQuestion_content( questionPatchDto.getQuestion_content() );

        return question;
    }

    @Override
    public QuestionResponseDto questionToQuestionResponseDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponseDto questionResponseDto = new QuestionResponseDto();

        questionResponseDto.setQuestion_id( question.getQuestion_id() );
        questionResponseDto.setQuestion_title( question.getQuestion_title() );
        questionResponseDto.setQuestion_content( question.getQuestion_content() );
        if ( question.getQuestion_viewCount() != null ) {
            questionResponseDto.setQuestion_viewCount( question.getQuestion_viewCount().intValue() );
        }
        questionResponseDto.setQuestion_answerCount( question.getQuestion_answerCount() );
        questionResponseDto.setQuestion_createdAt( question.getQuestion_createdAt() );
        questionResponseDto.setQuestion_modifiedAt( question.getQuestion_modifiedAt() );

        return questionResponseDto;
    }

    @Override
    public QuestionResponseAllDto questionToQuestionResponseAllDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponseAllDto questionResponseAllDto = new QuestionResponseAllDto();

        questionResponseAllDto.setQuestion_id( question.getQuestion_id() );
        questionResponseAllDto.setQuestion_title( question.getQuestion_title() );
        questionResponseAllDto.setQuestion_content( question.getQuestion_content() );
        questionResponseAllDto.setQuestion_createdAt( question.getQuestion_createdAt() );
        questionResponseAllDto.setQuestion_modifiedAt( question.getQuestion_modifiedAt() );
        questionResponseAllDto.setQuestion_answerCount( question.getQuestion_answerCount() );
        questionResponseAllDto.setQuestion_viewCount( question.getQuestion_viewCount() );
        questionResponseAllDto.setQuestionCommentList( questionCommentListToQuestionCommentResponseDtoList( question.getQuestionCommentList() ) );
        questionResponseAllDto.setAnswerList( answerListToAnswerResponseDtoList( question.getAnswerList() ) );

        return questionResponseAllDto;
    }

    @Override
    public List<QuestionResponseDto> listQuestionToListQuestionResponseDto(List<Question> questions) {
        if ( questions == null ) {
            return null;
        }

        List<QuestionResponseDto> list = new ArrayList<QuestionResponseDto>( questions.size() );
        for ( Question question : questions ) {
            list.add( questionToQuestionResponseDto( question ) );
        }

        return list;
    }

    protected QuestionCommentResponseDto questionCommentToQuestionCommentResponseDto(QuestionComment questionComment) {
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

    protected List<QuestionCommentResponseDto> questionCommentListToQuestionCommentResponseDtoList(List<QuestionComment> list) {
        if ( list == null ) {
            return null;
        }

        List<QuestionCommentResponseDto> list1 = new ArrayList<QuestionCommentResponseDto>( list.size() );
        for ( QuestionComment questionComment : list ) {
            list1.add( questionCommentToQuestionCommentResponseDto( questionComment ) );
        }

        return list1;
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

    protected AnswerResponseDto answerToAnswerResponseDto(Answer answer) {
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

    protected List<AnswerResponseDto> answerListToAnswerResponseDtoList(List<Answer> list) {
        if ( list == null ) {
            return null;
        }

        List<AnswerResponseDto> list1 = new ArrayList<AnswerResponseDto>( list.size() );
        for ( Answer answer : list ) {
            list1.add( answerToAnswerResponseDto( answer ) );
        }

        return list1;
    }
}
