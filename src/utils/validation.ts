import { Request } from "express";

export const validatePage = (req: Request): number => {
  const page = parseInt(req.query.page as string);

  if (isNaN(page) || page < 1) {
    return 1;
  }

  return page;
};

export const validateRequired = (value: any, fieldName: string): void => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    throw new Error(`${fieldName} is required`);
  }
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, "");
};
