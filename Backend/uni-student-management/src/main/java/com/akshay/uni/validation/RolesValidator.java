package com.akshay.uni.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class RolesValidator implements ConstraintValidator<Roles, String> {

	private String[] values;

	@Override
	public void initialize(Roles roles) {
		values = roles.values();
	}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null)
			return true;
		for (String v : values) {
			if (value.equals(v))
				return true;
		}
		return false;
	}

}