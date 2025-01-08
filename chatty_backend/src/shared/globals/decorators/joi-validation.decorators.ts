import { JoiValidationError } from "@global/helpers/error-handler";
import { NextFunction, Request } from "express";
import { ObjectSchema } from "joi";

type JoiDecoratorType = (target: any, key: string, descriptor: PropertyDescriptor) => void;

export const joiValidation = (schema: ObjectSchema): JoiDecoratorType => {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async (...args: [Request, Response, NextFunction]) => {
      const req: Request = args[0];
      const { error } = await Promise.resolve(schema.validate(req.body));
      if (error?.details) {
        throw new JoiValidationError(error.details[0].message);
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
};
