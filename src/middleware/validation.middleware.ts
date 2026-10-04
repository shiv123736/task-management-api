import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate = (
    schema: z.ZodType<any>,
    source?: "query" | "params" | "body"
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            let validatedData;
            if (source === "query") {
                validatedData = schema.parse(req.query);
            } else if (source === "params") {
                validatedData = schema.parse(req.params);
            } else {
                validatedData = schema.parse(req.body);
            }

            res.locals.validatedData = validatedData;
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    error: error.issues,
                });
                return;
            }

            res.status(500).json({
                error: "Validation failed",
            });
        }
    };
};