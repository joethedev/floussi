import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";

import { HttpError } from "@/utils/http-error";

interface ValidationSchemas {
  body?: ZodObject;
  params?: ZodObject;
  query?: ZodObject;
}

export const validate = ({ body, params, query }: ValidationSchemas) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (body) {
        req.body = body.parse(req.body);
      }

      if (params) {
        const parsedParams = params.parse(req.params) as Request["params"];
        Object.keys(req.params).forEach((key) => {
          delete req.params[key];
        });
        Object.assign(req.params, parsedParams);
      }

      if (query) {
        const parsedQuery = query.parse(req.query) as Request["query"];
        const queryObject = req.query as Record<string, unknown>;

        Object.keys(queryObject).forEach((key) => {
          delete queryObject[key];
        });

        Object.assign(queryObject, parsedQuery as Record<string, unknown>);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new HttpError(400, JSON.stringify(error.flatten())));
      }

      return next(error);
    }
  };
};
