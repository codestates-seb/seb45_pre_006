package com.example.stackoverflow.question.mapper;

import com.example.stackoverflow.question.dto.*;
import com.example.stackoverflow.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuestionMapper {


    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);

    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);


    QuestionResponseDto questionToQuestionResponseDto(Question question);

    QuestionResponseAllDto questionToQuestionResponseAllDto(Question question);

    List<QuestionResponseDto> listQuestionToListQuestionResponseDto(List<Question> questions);

    default List<QuestionTopDto> questionListToQuestionTopDto(List<Question> questionList){
        return questionList.stream()
                .map(question -> new QuestionTopDto(
                        question.getQuestion_id(),
                        question.getQuestion_title(),
                        question.getQuestion_answerCount(),
                        question.getQuestion_createdAt()
                )).collect(Collectors.toList());
    }

}
