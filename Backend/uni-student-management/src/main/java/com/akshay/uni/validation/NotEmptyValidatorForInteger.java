package com.akshay.uni.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class NotEmptyValidatorForInteger implements ConstraintValidator<NotEmpty, Integer> {

	@Override
	public boolean isValid(Integer value, ConstraintValidatorContext context) {
		return (value != 0);
	}

}