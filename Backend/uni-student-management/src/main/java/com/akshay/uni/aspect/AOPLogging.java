package com.akshay.uni.aspect;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

/**
 * This class uses AOP to log application flow level can be changed by changing
 * selectedPC
 */
@Aspect
@Component
public class AOPLogging {
  private Logger myLogger = Logger.getLogger(getClass().getName());

  // Pointcut declarations - for any class & method in controller package
  @Pointcut("execution(* com.akshay.uni.controller.*.*(..))")
  private void forControllerPackage() {}

  // Pointcut declarations - for any class & method in service package
  @Pointcut("execution(* com.akshay.uni.service.*.*(..))")
  private void forServicePackage() {}

  // Pointcut declarations - for any class & method in dao package
  @Pointcut("execution(* com.akshay.uni.dao.*.*(..))")
  private void forDaoPackage() {}

  @Pointcut("forControllerPackage() || forServicePackage() || forDaoPackage()")
  private void forAppFlow() {}

  // enter the pointcut that you want to use
  @Pointcut("forControllerPackage()")
  // @Pointcut("forAppFlow()")
  private void selectedPC() {}

  @Before("selectedPC()")
  public void before(JoinPoint theJoinPoint) {
    myLogger.info(
      ".............................................................................\n"
    );

    // display method we are calling
    String theMethod = theJoinPoint.getSignature().toShortString();
    myLogger.log(Level.INFO, "===>> Calling method: {0}", theMethod);

    // displaying the arguments to the method
    int counter = 1;
    for (Object tempArg : theJoinPoint.getArgs()) {
      myLogger.info("===>> argument-" + counter++ + " : " + tempArg);
    }
  }

  // add @AfterReturning advice
  @AfterReturning(pointcut = "selectedPC()", returning = "theResult")
  public void afterReturning(JoinPoint theJoinPoint, Object theResult) {
    // display method we are returning from
    String theMethod = theJoinPoint.getSignature().toShortString();
    myLogger.log(Level.INFO, "===>> Returning from method: {0}", theMethod);

    // displaying data returned
    myLogger.log(Level.INFO, "===>> result: {0}", theResult);
  }

  @AfterThrowing(pointcut = "selectedPC()", throwing = "exe")
  public void afterThrowing(JoinPoint theJoinPoint, Throwable exe) {
    // displaying the exception
    String theMethod = theJoinPoint.getSignature().toShortString();
    myLogger.log(Level.SEVERE, "===>> Exception in method: {0}", theMethod);
    myLogger.severe("===>> Exception is: " + exe);
  }
}
