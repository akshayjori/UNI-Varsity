package com.akshay.uni.validation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

/**
 * custom NotEmpty constraint check for Integer type. checks if the Integer is
 * not 0
 */
@Documented
@Retention(RUNTIME)
@Target({ FIELD, PARAMETER })
@Constraint(validatedBy = NotEmptyValidatorForInteger.class)
public @interface NotEmpty {

	String message() default "Field is required";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}