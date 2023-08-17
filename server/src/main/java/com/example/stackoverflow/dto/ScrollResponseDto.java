package com.example.stackoverflow.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class ScrollResponseDto<T> {
    private List<T> data;
    private boolean hasNextPage;

    public ScrollResponseDto(List<T> data, boolean hasNextPage) {
        this.data = data;
        this.hasNextPage = hasNextPage;
    }
}
