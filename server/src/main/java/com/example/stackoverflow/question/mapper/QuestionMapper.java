package com.example.stackoverflow.question.mapper;

import com.example.stackoverflow.question.dto.QuestionPatchDto;
import com.example.stackoverflow.question.dto.QuestionPostDto;
import com.example.stackoverflow.question.dto.QuestionResponseAllDto;
import com.example.stackoverflow.question.dto.QuestionResponseDto;
import com.example.stackoverflow.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {


    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);

    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);


    QuestionResponseDto questionToQuestionResponseDto(Question question);

    QuestionResponseAllDto questionToQuestionResponseAllDto(Question question);

    List<QuestionResponseDto> listQuestionToListQuestionResponseDto(List<Question> questions);

}
